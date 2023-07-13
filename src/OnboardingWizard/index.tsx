import { h, FunctionComponent } from "preact";
import { MagicType } from "../lib/magic";
import { PaywallConfig } from "../lib/paywall";

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
    <div id={id}>
      <div id='modal-background'>
        <div id='modal-content'>
          <p>{JSON.stringify(paywallConfig, null, 2)}</p>
        </div>
      </div>
    </div>
  );
};
