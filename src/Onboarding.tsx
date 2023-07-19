import { render } from "preact";
import { MutableRef, useRef } from "preact/hooks";
import { EthNetworkName, Magic } from "magic-sdk";
import { OAuthExtension, OAuthRedirectConfiguration } from "@magic-ext/oauth";
import { MagicConfig, MagicType } from "./lib/magic";
import { UnlockConfig } from "./lib/unlock";
import { buildPaywallConfig, PaywallConfig } from "./lib/paywall";
import { OnboardingWizard } from "./OnboardingWizard/index";

type OnboardingConstructorArgs = {
  id?: string;
  network: EthNetworkName;
  magicConfig: Omit<MagicConfig, 'network'>;
  unlockConfig: Omit<UnlockConfig, 'network'>;
};

export class Onboarding {
  public id: string;
  public networkName: EthNetworkName;
  public magic: MagicType;
  public oauthRedirects: OAuthRedirectConfiguration[];
  public paywallConfig: PaywallConfig;
  private ref: OnboardingWizard;

  constructor(args: OnboardingConstructorArgs) {
    const { id, network, magicConfig, unlockConfig } = args;
    this.id = id || "onboarding-wizard";
    this.networkName = network;
    this.magic = new Magic(magicConfig.apiKey, {
      network,
      extensions: magicConfig.oauthRedirects.length
        ? [new OAuthExtension()]
        : [],
    });
    this.oauthRedirects = magicConfig.oauthRedirects || [];
    this.paywallConfig = buildPaywallConfig({ network, ...unlockConfig });
  }

  render(root: HTMLElement, isVisibleDefault?: boolean) {    
    const ref = ((cmp: OnboardingWizard) => 
      this.ref = cmp
    ).bind(this)
    
    render(
      <OnboardingWizard
        id={this.id}
        ref={ref}
        isVisibleDefault={isVisibleDefault}
        magic={this.magic}
        networkName={this.networkName}
        oauthRedirects={this.oauthRedirects}
        paywallConfig={this.paywallConfig}
      />,
      root
    );
  }

  show() {
    if (this.ref) {
      this.ref.show();
    }
  }

  hide() {
    if (this.ref) {
      this.ref.hide();
    }
  }
}
