import { ComponentChildren, FunctionComponent, createContext } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { Network } from "../../lib/network";
import { MagicType } from "../../lib/magic";
import { EthNetworkName } from "magic-sdk";
import { OAuthRedirectConfiguration } from "@magic-ext/oauth";

type NetworkContextType = {
  network: Network | null;
  oauthRedirects: OAuthRedirectConfiguration[];
  prefersInjected: boolean;
  setPrefersInjected: (prefersInjected: boolean) => void;
};

export const NetworkContext = createContext<NetworkContextType>({
  network: null,
  oauthRedirects: [],
  prefersInjected: false,
  setPrefersInjected: (prefersInjected: boolean) => {},
});

export const NetworkProvider: FunctionComponent<{
  networkName: EthNetworkName;
  magic: MagicType;
  oauthRedirects: OAuthRedirectConfiguration[];
  children: ComponentChildren;
}> = ({ networkName, magic, oauthRedirects, children }) => {
  // Local state for preferring injected connection
  const [prefersInjected, setPrefersInjected] = useState<boolean>(
    window.localStorage.getItem("prefersInjected") === "true"
  );

  // Local state for network instance
  const [network, setNetwork] = useState<Network | null>(null);

  // A function to update our network instance based on the network
  const updateNetwork = useCallback(
    async (networkName: EthNetworkName) => {
      const network = Network.create(
        networkName,
        magic,
        oauthRedirects,
        prefersInjected
      );
      setNetwork(network);
    },
    [prefersInjected]
  );

  useEffect(() => {
    updateNetwork(networkName);
  }, [updateNetwork, networkName]);

  if (!network) {
    return null;
  }

  return (
    <NetworkContext.Provider
      value={{
        network,
        prefersInjected,
        oauthRedirects,
        setPrefersInjected: (bool) => {
          localStorage.setItem("prefersInjected", bool ? "true" : "false");
          setPrefersInjected(bool);
        },
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
