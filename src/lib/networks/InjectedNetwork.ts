import { ethers } from "ethers";
import { EthNetworkName } from "magic-sdk";
import { Network, getChainId } from "../network";

// EVM provider for Metamask
export class InjectedNetwork extends Network {
  public provider!: any;
  private ethersProvider!: ethers.providers.Web3Provider;

  constructor(networkName: EthNetworkName) {
    super(networkName);

    // Set the ethers provider
    if (typeof window !== "undefined" && (window as any).ethereum) {
      this.provider = (window as any).ethereum;
      this.ethersProvider = new ethers.providers.Web3Provider(this.provider);
      console.info("Network:", "Injected EVM", networkName);
    } else {
      console.debug("No injected rpc provider");
    }
  }

  public async getAccount() {
    return {
      publicAddress: await this.ethersProvider?.getSigner().getAddress(),
    };
  }

  // Method to check if user is logged in using Metamask
  public async connect() {
    try {
      await this.ethersProvider.send("eth_requestAccounts", []);
      await (window as any).ethereum.enabled();
    } catch (err) {
      /* no-op */
    }
  }

  public async isConnected() {
    try {
      // await (window as any).ethereum.enabled();
      const isConnected = await (window as any).ethereum.isConnected();
      if (isConnected) {
        const { chainId } = await this.ethersProvider.getNetwork();
        const desiredChainId = getChainId(this.networkName);
        if (chainId !== desiredChainId) {
          await this.ethersProvider.send("wallet_switchEthereumChain", [
            { chainId: `0x${desiredChainId.toString(16)}` },
          ]);
        }
      }
      return isConnected;
    } catch (err) {
      return false;
    }
  }

  public async onDisconnect() {
    /* no-op */
  }
}
