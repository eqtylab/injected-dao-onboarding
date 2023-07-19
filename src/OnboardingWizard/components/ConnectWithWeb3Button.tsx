import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useNetwork } from "../hooks/useNetwork";
import { useAccount } from "../hooks/useAccount";


export const ConnectWithWeb3Button: FunctionComponent = () => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const { setAccount } = useAccount();
  const { network, prefersInjected, setPrefersInjected } = useNetwork();

  useEffect(() => {
    const connectWithWeb3 = async () => {
      try {
        await network.connect({});
        const isConnected = await network.isConnected();
        if (isConnected) {
          const accountData = await network.getAccount();
          setAccount(accountData || null);
        }
      } finally {
        setShouldConnect(false);
      }
    }

    if (network && prefersInjected && shouldConnect) {
      connectWithWeb3();
    }
  }, [network, prefersInjected, shouldConnect]);

  return (
    <button
      className="step-cta"
      onClick={() => {
        setShouldConnect(true);
        setPrefersInjected(true);
      }}
    >
      Web3 wallet
    </button>
  );
};
