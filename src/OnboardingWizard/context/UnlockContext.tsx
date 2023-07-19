import { ComponentChildren, FunctionComponent, createContext } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { Paywall } from "@unlock-protocol/paywall";
import { Web3Service } from "@unlock-protocol/unlock-js";
import { paywall as initialPaywall, PaywallConfig } from "../../lib/paywall";
import { web3Service as initialWeb3Service } from "../../lib/web3Service";
import { useAccount } from "../hooks/useAccount";
import { useNetwork } from "../hooks/useNetwork";

type KeyInfo = {
  lock: string;
  owner: string;
  expiration: number;
  tokenId: number;
};

type UnlockContextType = {
  paywall?: Paywall;
  web3Service?: Web3Service;
  keyInfo?: KeyInfo;
  hasValidKey: boolean;
  checkHasValidKey: () => Promise<void>;
  loading: boolean;
};

export const UnlockContext = createContext<UnlockContextType>({
  paywall: undefined,
  web3Service: undefined,
  keyInfo: undefined,
  hasValidKey: false,
  checkHasValidKey: async () => {},
  loading: true,
});

interface UnlockProviderProps {
  children: ComponentChildren;
  paywallConfig: PaywallConfig;
}


export const UnlockProvider: FunctionComponent<UnlockProviderProps> = ({
  children,
  paywallConfig,
}) => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const [loading, setLoading] = useState(true);
  const [keyInfo, setKeyInfo] = useState<KeyInfo>();
  const [hasValidKey, setHasValidKey] = useState(false);

  const [paywall, setPaywall] = useState<Paywall>();
  const [web3Service, setWeb3Service] = useState<Web3Service>();

  // Hydrate paywall & web3Service instances once on mount
  useEffect(() => {
    setPaywall(initialPaywall);
    setWeb3Service(initialWeb3Service);
  }, []);

  // Set / update the paywall config
  useEffect(() => {
    if (paywall) {
      paywall?.setPaywallConfig(paywallConfig);
    }
  }, [paywall, paywallConfig]);

  // Set the rpc provider for paywall
  useEffect(() => {
    if (paywall && network) {
      paywall.connect(network.provider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, paywall, account]);

  // Create function that hydrates the hasValidKey state variable
  const checkHasValidKey = useCallback(async () => {
    if (account?.publicAddress && web3Service) {
      setLoading(true);
      try {
        const [lockAddress] = Object.entries(paywallConfig.locks).find(
          ([_, lockConfig]) => {
            return lockConfig?.network === paywallConfig.network;
          }
        );

        const hasValidKey = await web3Service.getHasValidKey(
          lockAddress,
          account.publicAddress,
          paywallConfig.network
        );
        setHasValidKey(hasValidKey);

        if (hasValidKey) {
          const keyInfo = await web3Service.getKeyByLockForOwner(
            lockAddress,
            account.publicAddress,
            paywallConfig.network
          )
          setKeyInfo(keyInfo);
        }
      } catch (error) {
        /* no-op */
      }
    }
    setLoading(false);
  }, [account, web3Service]);

  // Check if connected account has key for lock
  useEffect(() => {
    checkHasValidKey();
  }, [checkHasValidKey]);

  if (!paywall || !web3Service) {
    return null;
  }

  return (
    <UnlockContext.Provider
      value={{
        web3Service,
        paywall,
        keyInfo,
        hasValidKey,
        loading,
        checkHasValidKey,
      }}
    >
      {children}
    </UnlockContext.Provider>
  );
};
