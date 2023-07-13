import { useContext } from 'preact/hooks';
import { WizardStepContext } from '../context/WizardStepContext';

export const useWizardStep = () => useContext(WizardStepContext);