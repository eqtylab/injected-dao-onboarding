import { OAuthRedirectConfiguration } from "@magic-ext/oauth";
import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useNetwork } from "../hooks/useNetwork";

interface ConnectWithOauthButtonProps extends OAuthRedirectConfiguration {}

export const ConnectWithOauthButton: FunctionComponent<ConnectWithOauthButtonProps> = (
  oauthRedirect
) => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const { network, prefersInjected, setPrefersInjected } = useNetwork();

  useEffect(() => {
    if (network && !prefersInjected && shouldConnect) {
      network.connect({ oauthRedirect });
    }
  }, [network, prefersInjected, shouldConnect]);

  const buttonLabel =
    oauthRedirect.provider.charAt(0).toUpperCase() +
    oauthRedirect.provider.slice(1);
  return (
    <button
      className="step-cta"
      onClick={() => {
        setShouldConnect(true);
        setPrefersInjected(false);
        network.connect(oauthRedirect);
      }}
    >
      {buttonLabel}
    </button>
  );
};
