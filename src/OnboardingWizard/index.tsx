import { h, FunctionComponent } from "preact";
import { MagicType } from "../lib/magic";
import { PaywallConfig } from "../lib/paywall";
import { NetworkProvider } from "./context/NetworkContex";
import { WizardStepProvider } from "./context/WizardStepContext";
import { WizardStepSelector } from "./components/WizardStepSelector";
import { EthNetworkName } from "magic-sdk";
import { OAuthRedirectConfiguration } from "@magic-ext/oauth";

interface OnboardingWizardProps {
  id: string;
  magic: MagicType;
  networkName: EthNetworkName;
  oauthRedirects: OAuthRedirectConfiguration[];
  paywallConfig: PaywallConfig;
}

export const OnboardingWizard: FunctionComponent<OnboardingWizardProps> = ({
  id,
  magic,
  networkName,
  oauthRedirects,
  paywallConfig
}) => {
  return (
    <NetworkProvider
      networkName={networkName}
      magic={magic}
      oauthRedirects={oauthRedirects}
    >
      <WizardStepProvider>
        <div id={id}>
          <div id='modal-background'>
            <div id='modal-content'>
              <WizardStepSelector />
            </div>
          </div>
        </div>
      </WizardStepProvider>
    </NetworkProvider>
  );
};
