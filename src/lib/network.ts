import { EthNetworkName, MagicUserMetadata } from "magic-sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
import { MagicType } from "./magic";
import { OAuthRedirectConfiguration } from "@magic-ext/oauth";

export type AccountData = Partial<MagicUserMetadata>;

export const getChainId = (name: EthNetworkName): number => {
  switch (name) {
    case "mainnet":
      return 1;
    case "goerli":
      return 5;
    default:
      throw new Error(`Network not supported: ${name}`);
  }
}

// Abstract class to handle provider-specific operations
export abstract class Network {
  public abstract provider: JsonRpcProvider;

  // Assign network class property
  constructor(
    public networkName: EthNetworkName,
  ) {
    this.networkName = networkName;
  }

  // Abstract method to get account data
  public abstract getAccount(): AccountData | Promise<AccountData>;

  // Abstract method to connect to a network
  public abstract connect(...args: unknown[]): void | Promise<void>;

  // Abstract method to check if session is connected to a network
  public abstract isConnected(): boolean | Promise<boolean>;

  // Abstract method to handle any disconnection side effects
  public abstract onDisconnect(): void | Promise<void>;

  // Static method to create Network instance based on network type
  public static create(
    networkName: EthNetworkName,
    magic: MagicType,
    oauthRedirects: OAuthRedirectConfiguration[],
    isInjected?: boolean
  ): Network {
    if (isInjected) {
      const { InjectedNetwork } = require("./networks/InjectedNetwork");
      return InjectedNetwork.create(networkName);
    } else {
      const { MagicNetwork } = require('./networks/MagicNetwork');
      return MagicNetwork.create(networkName, magic, oauthRedirects);
    }
  }
}

