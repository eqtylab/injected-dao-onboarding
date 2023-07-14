import { EthNetworkName } from "@magic-sdk/types";
import { mainnet, goerli } from "@unlock-protocol/networks";

export type UnlockConfig = {
  name: string;
  network: EthNetworkName;
  lockAddress: string;
};

export const getUnlockNetworkConfig = (networkId: number) => {
  if (networkId === 1) {
    return mainnet;
  } else if (networkId === 5) {
    return goerli;
  } else {
    throw new Error(`Network id is unsupported: ${networkId}`);
  }
};
