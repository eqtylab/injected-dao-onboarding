import { FunctionComponent } from "preact";
import { StepContainer } from "./StepContainer";
import { useNetwork } from "../hooks/useNetwork";
import { useAccount } from "../hooks/useAccount";
import { useUnlock } from "../hooks/useUnlock";
import { useWizardStep } from "../hooks/useWizardStep";
import { StepHeaderCta } from "./StepHeaderCta";
import { useCallback } from "preact/hooks";
import { Spinner } from "./Spinner";

export const ViewAccountStep: FunctionComponent = () => {
  const { network, setPrefersInjected } = useNetwork();
  const { setStep } = useWizardStep();
  const { account, loading, setAccount } = useAccount();
  const { loading: loadingUnlock, paywall, hasValidKey, checkHasValidKey, keyInfo } = useUnlock();

  const handleDisconnect = useCallback(async () => {
    await setAccount(null);
    await setPrefersInjected(false);
    await network.disconnect();
    setStep("pre-connect");
  }, [setStep, setAccount, network]);

  const handleSubscribe = useCallback(
    async (e: any) => {
      e.preventDefault();
      await paywall.loadCheckoutModal();
      await checkHasValidKey();
    },
    [paywall]
  );

  return (
    <StepContainer
      header={{
        title: "Dashboard",
        description: "View your account details",
        cta: (
          <StepHeaderCta onClick={handleDisconnect}>Disconnect</StepHeaderCta>
        ),
      }}
    >
      {loading && <Spinner />}
      {account?.email && (
        <div className="form-control">
          <label className="form-label">Email</label>
          <p>{account.email}</p>
        </div>
      )}
      {account?.publicAddress && (
        <div className="form-control">
          <label className="form-label">Address</label>
          <a
            href={`https://${
              network.networkName === "goerli" ? "goerli." : ""
            }etherscan.io/address/${account.publicAddress}`}
            target="_blank"
          >
            <code>
              {account.publicAddress.slice(0, 8)}...
              {account.publicAddress.slice(account.publicAddress.length - 5)}
            </code>
          </a>
        </div>
      )}
      <div className="form-control">
        <label className="form-label">Membership</label>
        {loadingUnlock && (
          <p>
            <code>Checking...</code>
          </p>
        )}
        {!loadingUnlock && !hasValidKey && (
          <p>
            <code>Not-subscribed</code>
          </p>
        )}
        {!loadingUnlock && hasValidKey && (
          <p>
            <code>{keyInfo?.expiration
              ? keyInfo.expiration === -1
                ? 'Subscribed, expires never'
                : `Subscribed, expires ${new Date(keyInfo.expiration).toLocaleDateString()}`
              : 'Subscribed'
            }</code>
          </p>
        )}
      </div>
      {!loadingUnlock && !hasValidKey && (
        <button className="step-cta" onClick={handleSubscribe}>
          Subscribe
        </button>
      )}
      {!loadingUnlock && hasValidKey && keyInfo && (
        <a
          href={`https://${
            network.networkName === "goerli" ? "goerli." : ""
          }etherscan.io/nft/${keyInfo.lock}/${keyInfo.tokenId}`}
          target="_blank"
        >
          <button className='step-cta'>
            View membership NFT
          </button>
        </a>
      )}
    </StepContainer>
  );
};
