const setup = () => {
  console.log('Setting up onboarding UI...')
  
  if (typeof window?.Onboarding === 'undefined') {
    throw new Error('No onboarding object found!')
  }

  const onboarding = new Onboarding();
}

setup();