import { ComponentChildren, FunctionComponent, createContext } from "preact";
import { useContext, useState, useCallback, useEffect } from "preact/hooks";
import { AccountData } from "../../lib/account";
import { useNetwork } from "../hooks/useNetwork";

// Define context
type AccountContextType = {
  loading: boolean;
  account: AccountData | null;
  setAccount: (maybeAccount: AccountData | null) => void;
};

// Create context with a default value
export const AccountContext = createContext<AccountContextType>({
  loading: true,
  account: null, // Initially, no user is logged in
  setAccount: () => {}, // Placeholder function, will be overwritten by provider
});

// Provider component that wraps the app
export const AccountProvider: FunctionComponent<{ children: ComponentChildren }> = ({
  children,
}) => {
  // Access the network context
  const { network } = useNetwork();

  // Local state for storing account data
  const [account, setAccount] = useState<AccountData | null>(null);
  // Local state for loading status
  const [loading, setLoading] = useState<boolean>(true);

  const _hydrateAccountState = useCallback(async () => {
    try {
      // Set loading to true while we are fetching account status
      if (await network?.isConnected()) {
        const accountData = await network?.getAccount();
        if (accountData) {
          // Pull account data, update the state
          setAccount(accountData);
        } else {
          // Reset the account state
          setAccount(null);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [network, setAccount, setLoading]);

  // Hydrate account state once component is mounted
  useEffect(() => {
    _hydrateAccountState();
    // Add an empty dependency array so the useEffect only runs once upon page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider
      value={{
        loading,
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
