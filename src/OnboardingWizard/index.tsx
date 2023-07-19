import { Component } from "preact";
import { MagicType } from "../lib/magic";
import { PaywallConfig } from "../lib/paywall";
import { NetworkProvider } from "./context/NetworkContex";
import { AccountProvider } from "./context/AccountContext";
import { UnlockProvider } from "./context/UnlockContext";
import { WizardStepProvider } from "./context/WizardStepContext";
import { WizardStepSelector } from "./components/WizardStepSelector";
import { EthNetworkName } from "magic-sdk";
import { OAuthRedirectConfiguration } from "@magic-ext/oauth";

interface OnboardingWizardProps {
  id: string;
  isVisibleDefault?: boolean;
  magic: MagicType;
  networkName: EthNetworkName;
  oauthRedirects: OAuthRedirectConfiguration[];
  paywallConfig: PaywallConfig;
}

interface OnboardingWizardState {
  isVisible: boolean;
}

export class OnboardingWizard extends Component<
  OnboardingWizardProps,
  OnboardingWizardState
> {
  constructor(props: OnboardingWizardProps) {
    super();
    this.state = { isVisible: props.isVisibleDefault || false };
  }

  show() {
    this.setState({ isVisible: true });
  }

  hide() {
    this.setState({ isVisible: false });
  }

  render(props: OnboardingWizardProps, state: OnboardingWizardState) {
    const { id, magic, networkName, oauthRedirects, paywallConfig } = props;
    const { isVisible } = state;

    return (
      <NetworkProvider
        magic={magic}
        networkName={networkName}
        oauthRedirects={oauthRedirects}
      >
        <AccountProvider>
          <UnlockProvider paywallConfig={paywallConfig}>
            <WizardStepProvider>
              <div id={id}>
                {isVisible && (
                  <div id="modal-background" onClick={this.hide.bind(this)}>
                    <div id="modal-container">
                      <div
                        id="modal-content"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <WizardStepSelector />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </WizardStepProvider>
          </UnlockProvider>
        </AccountProvider>
      </NetworkProvider>
    );
  }
}
