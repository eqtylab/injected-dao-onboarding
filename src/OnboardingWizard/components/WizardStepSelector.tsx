import { FunctionComponent } from "preact"
import { useWizardStep } from "../hooks/useWizardStep"
import { ConnectStep } from "./ConnectStep";
import { ViewAccountStep } from "./ViewAccountStep";

export const WizardStepSelector: FunctionComponent = () => {
  const { step } = useWizardStep();
  
  return {
    'connect': <ConnectStep />,
    'view-account': <ViewAccountStep />
  }[step];
};

