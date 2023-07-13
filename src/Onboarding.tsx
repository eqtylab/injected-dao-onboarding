import { render } from "preact";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { MagicConfig, MagicType } from "./lib/magic";
import { UnlockConfig } from "./lib/unlock";
import { OnboardingWizard } from "./OnboardingWizard/index";
import { buildPaywallConfig, PaywallConfig } from "./lib/paywall";

type OnboardingConstructorArgs = {
  id?: string;
  magicConfig: MagicConfig;
  unlockConfig: UnlockConfig;
};

export class Onboarding {
  public id: string;
  public magic: MagicType;
  public paywallConfig: PaywallConfig;

  constructor(args: OnboardingConstructorArgs) {
    const { id, magicConfig, unlockConfig } = args;
    this.id = id || 'onboarding-wizard';
    this.magic = new Magic(magicConfig.apiKey, {
      network: magicConfig.network,
      extensions: magicConfig.ssoProviders.length ? [new OAuthExtension()] : [],
    });
    this.paywallConfig = buildPaywallConfig(unlockConfig);
  }

  render(root: HTMLElement) {
    render(
      <OnboardingWizard
        id={this.id}
        magic={this.magic}
        paywallConfig={this.paywallConfig}
      />,
      root
    );
  }
}
