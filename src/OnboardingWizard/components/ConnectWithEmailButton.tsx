import { FunctionComponent } from "preact";
import { useNetwork } from "../hooks/useNetwork";
import { useWizardStep } from "../hooks/useWizardStep";
import { useCallback } from "preact/hooks";

export const ConnectWithEmailButton: FunctionComponent = () => {
  const { setStep } = useWizardStep();
  const { setPrefersInjected } = useNetwork();

  const handleClick = useCallback(() => {
    setPrefersInjected(false);
    setStep("connect-with-email");
  }, [setPrefersInjected, setStep]);

  return (
    <button className="step-cta" onClick={handleClick}>
      Email
    </button>
  );
};
