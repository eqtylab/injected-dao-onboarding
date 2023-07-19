import { FunctionComponent } from "preact";
import { useWizardStep } from "../hooks/useWizardStep";

import { LoadingStep } from "./LoadingStep";
import { PreConnectStep } from "./PreConnectStep";
import { ConnectWithEmailStep } from "./ConnectWithEmailStep";
import { ViewAccountStep } from "./ViewAccountStep";

export const WizardStepSelector: FunctionComponent = () => {
  const { step } = useWizardStep();

  return {
    "loading": <LoadingStep />,
    "pre-connect": <PreConnectStep />,
    "connect-with-email": <ConnectWithEmailStep />,
    "view-account": <ViewAccountStep />,
  }[step];
};
