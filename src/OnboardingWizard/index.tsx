import { h, FunctionComponent } from "preact";
import { MagicType } from "../lib/magic";
import { PaywallConfig } from "../lib/paywall";
import { WizardStepProvider } from "./context/WizardStepContext";
import { WizardStepSelector } from "./components/WizardStepSelector";

interface OnboardingWizardProps {
  id: string;
  magic: MagicType;
  paywallConfig: PaywallConfig
}

export const OnboardingWizard: FunctionComponent<OnboardingWizardProps> = ({
  id,
  magic,
  paywallConfig
}) => {
  return (
    <WizardStepProvider>
      <div id={id}>
        <div id='modal-background'>
          <div id='modal-content'>
            <WizardStepSelector />
          </div>
        </div>
      </div>
    </WizardStepProvider>
  );
};
