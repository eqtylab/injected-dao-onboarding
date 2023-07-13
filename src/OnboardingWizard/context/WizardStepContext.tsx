import { FunctionComponent, ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";

export type WizardStep = "connect" | "view-account";

const initialStep: WizardStep = "connect";

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
