import { FunctionComponent, ComponentChildren } from "preact";

export interface StepHeaderProps {
  title: string;
  description?: string;
  cta?: ComponentChildren;
}

export const StepHeader: FunctionComponent<StepHeaderProps> = ({
  title,
  description,
  cta,
}) => {
  return (
    <header className="step-header">
      <div className="step-header-container">
        <div className="step-header-title-block">
          <h3 className="step-header-title">{title}</h3>
          {description && (
            <p className="step-header-description">{description}</p>
          )}
        </div>
        {cta && <div className="step-header-cta-block">{cta}</div>}
      </div>
    </header>
  );
};
