import { Node } from "..";
import http from "http";
import url from "url";
import prom_client, { register } from "prom-client";

export async function asyncSetup(this: Node): Promise<void> {
  // check if basic runtime classes are defined
  if (!this.runtime) {
    this.logger.error(`Runtime is not defined. Exiting ...`);
    process.exit(1);
  }

  if (!this.storageProvider) {
    this.logger.error(`Storage Provider is not defined. Exiting ...`);
    process.exit(1);
  }

  if (!this.compression) {
    this.logger.error(`Compression is not defined. Exiting ...`);
    process.exit(1);
  }

  if (!this.cache) {
    this.logger.error(`Cache is not defined. Exiting ...`);
    process.exit(1);
  }

  // retrieve mnemonic of account from file backend
  const [mnemonic, wallet] = await this.backend.getMultiple(
    [`valaccount.${this.account}`, `wallet.${this.wallet}`],
    this.usePassword,
    this.config
  );

  if (!mnemonic) {
    this.logger.error(
      `Valaccount ${this.account} or wallet ${this.wallet} not found. Exiting ...`
    );
    process.exit(1);
  }

  if (!wallet) {
    this.logger.error(`Wallet ${this.wallet} not found. Exiting ...`);
    process.exit(1);
  }

  // validate mnemonic
  const parsedValue = mnemonic.split(" ");

  if (!(parsedValue.length === 12 || parsedValue.length === 24)) {
    this.logger.error(`Mnemonic has an invalid format. Exiting ...`);
    this.logger.debug(mnemonic);
    process.exit(1);
  }

  try {
    this.client = await this.sdk.fromMnemonic(mnemonic);
  } catch (error) {
    this.logger.error(`Failed to init KYVE client. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }

  this.name = this.generateName();

  // init metrics server
  if (this.metrics) {
    this.logger.info(
      "Starting metric server on: http://localhost:8080/metrics"
    );

    prom_client.collectDefaultMetrics({
      labels: { app: "kyve-core" },
    });

    this.metricsCurrentCacheItems = new prom_client.Gauge({
      name: "current_cache_items",
      help: "The amount of data items currently in the cache.",
    });

    this.metricsTotalSuccessfulTxs = new prom_client.Counter({
      name: "total_successful_txs",
      help: "The amount of transactions with receipt code = 0.",
    });

    this.metricsTotalUnsuccessfulTxs = new prom_client.Counter({
      name: "total_unsuccessful_txs",
      help: "The amount of transactions with receipt code != 0.",
    });

    this.metricsTotalFailedTxs = new prom_client.Counter({
      name: "total_failed_txs",
      help: "The amount of transactions that failed with an error.",
    });

    this.prometheus = prom_client;

    // HTTP server which exposes the metrics on http://localhost:8080/metrics
    http
      .createServer(async (req: any, res: any) => {
        // Retrieve route from request object
        const route = url.parse(req.url).pathname;

        if (route === "/metrics") {
          // Return all metrics the Prometheus exposition format
          res.setHeader("Content-Type", register.contentType);
          const metrics = await prom_client.register.metrics();
          res.end(metrics);
        }
      })
      .listen(8080);
  }

  // init storage provider with wallet
  this.storageProvider = this.storageProvider.init(wallet);

  // init cache with work dir
  this.cache = this.cache.init(`./cache/${this.name}`);

  // check if valaccount already joined pool
  await this.canValidate();

  // log basic node info on startup
  this.logger.info("Starting node ...\n");
  this.logger.info(`Name \t\t = ${this.name}`);
  this.logger.info(`Account \t\t = ${this.account}`);
  this.logger.info(`Address \t\t = ${this.client.account.address}`);
  this.logger.info(`Pool Id \t\t = ${this.poolId}\n`);

  this.logger.info(`Runtime \t\t = ${this.runtime.name}`);
  this.logger.info(`Storage \t\t = ${this.storageProvider.name}`);
  this.logger.info(`Compression \t = ${this.compression.name}`);
  this.logger.info(`Cache \t\t = ${this.cache.name}\n`);

  this.logger.info(`Network \t\t = ${this.network}`);
  this.logger.info(`@kyve/core \t = v${this.coreVersion}`);
  this.logger.info(`${this.runtime.name} \t = v${this.runtime.version}\n`);

  await this.syncPoolState();

  this.logger.debug(`Attempting to clear cache`);
  await this.cache.drop();

  if (this.metrics) {
    this.metricsCurrentCacheItems.set(0);
  }

  this.logger.info(`Cleared cache\n`);

  this.validateRuntime();
  this.validateVersion();

  await this.syncPoolState();

  this.validateActiveNode();
}
