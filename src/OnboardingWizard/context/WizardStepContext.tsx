import { FunctionComponent, ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useAccount } from "../hooks/useAccount";

export type WizardStep = "loading" | "pre-connect" | "connect-with-email" | "view-account";
const initialStep: WizardStep = "loading";

type WizardStepContextType = {
  step: WizardStep;
  setStep: (step: WizardStep) => void;
};

export const WizardStepContext = createContext<WizardStepContextType>({
  step: initialStep,
  setStep: () => {}, // Placeholder function will be overwritten by provider
});

export const WizardStepProvider: FunctionComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const [step, setStep] = useState<WizardStep>(initialStep);
  const { account, loading } = useAccount();

  useEffect(() => {
    if (loading) {
      setStep('loading');
    } else if (!loading && account) {
      setStep('view-account');
    } else {
      setStep('pre-connect')
    }
  }, [account, loading]);

  return (
    <WizardStepContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </WizardStepContext.Provider>
  );
};
