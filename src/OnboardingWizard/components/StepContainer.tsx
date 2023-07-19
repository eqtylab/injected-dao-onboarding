import { FunctionComponent, ComponentChildren } from "preact";
import { StepHeader, StepHeaderProps } from "./StepHeader";

interface StepContainerProps {
  header: StepHeaderProps;
  children?: ComponentChildren;
}

export const StepContainer: FunctionComponent<StepContainerProps> = ({
  header,
  children
}) => {
  return (
    <div className='step-container'>
      <StepHeader {...header} />
      <div className='step-content'>
        {children}
      </div>
    </div>
  )
}