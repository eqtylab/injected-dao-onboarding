import { FunctionComponent } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { StepContainer } from "./StepContainer";
import { useNetwork } from "../hooks/useNetwork";
import { useWizardStep } from "../hooks/useWizardStep";
import { StepHeaderCta } from "./StepHeaderCta";
import { useAccount } from "../hooks/useAccount";
import { AccountData } from "../../lib/account";

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export const ConnectWithEmailStep: FunctionComponent = () => {
  const { setStep } = useWizardStep();
  const { setAccount } = useAccount();
  const { network, setPrefersInjected } = useNetwork();

  useEffect(() => {
    setPrefersInjected(false);
  }, []);

  const [email, setEmail] = useState<string>();

  const handleEmailOnChange = useCallback((event: unknown) => {
    const { target } = event as HTMLElementEvent<HTMLInputElement>;
    console.log(target.value)
    setEmail(target.value);
  }, [setEmail]);

  const handleSubmit = useCallback<any>(
    async (e: any) => {
      e.preventDefault();
      await network.connect({
        email,
        afterLoginSuccess: (userMetadata: AccountData) => {
          setAccount(userMetadata);
          setStep('view-account')
        },
      });
    },
    [network, email]
  );

  return (
    <StepContainer
      header={{
        title: "Connect with email",
        description: "A magic link will be sent to your inbox",
        cta: (
          <StepHeaderCta onClick={() => setStep("pre-connect")}>
            ← {`back`}
          </StepHeaderCta>
        ),
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="form-label">
            What is your email?
          </label>
          <input
            className="form-input"
            name="email"
            type="email"
            required
            placeholder="name@website.com"
            value={email}
            onChange={handleEmailOnChange}
          />
        </div>
        <button className="step-cta">Email magic link</button>
      </form>
    </StepContainer>
  );
};
