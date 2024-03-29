import ArweaveClient from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import axios from "axios";
import { IStorageProvider } from "../types";

export class Arweave implements IStorageProvider {
  public name = "Arweave";

  private wallet!: JWKInterface;
  private arweaveClient = new ArweaveClient({
    host: "arweave.net",
    protocol: "https",
  });

  init(wallet: string) {
    // TODO: built in wallet format validation?
    this.wallet = JSON.parse(wallet);

    return this;
  }

  async saveBundle(bundle: Buffer, tags: [string, string][]) {
    const transaction = await this.arweaveClient.createTransaction({
      data: bundle,
    });

    for (let tag of tags) {
      transaction.addTag(...tag);
    }

    await this.arweaveClient.transactions.sign(transaction, this.wallet);

    const balance = await this.arweaveClient.wallets.getBalance(
      await this.arweaveClient.wallets.getAddress(this.wallet)
    );

    if (+transaction.reward > +balance) {
      throw Error(
        `Not enough funds in Arweave wallet. Found = ${balance} required = ${transaction.reward}`
      );
    }

    await this.arweaveClient.transactions.post(transaction);

    return transaction.id;
  }

  async retrieveBundle(storageId: string, timeout: number) {
    const { data: bundle } = await axios.get(
      `https://arweave.net/${storageId}`,
      { responseType: "arraybuffer", timeout }
    );

    return bundle;
  }
}
