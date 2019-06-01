import {
	device, expect, element, by, waitFor
} from 'detox';

describe('Entry', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Render', () => {
    it('should render sign in button', async () => {
      await expect(element(by.id('signInButton'))).toBeVisible();
    });
    it('should render sign up button', async () => {
      await expect(element(by.id('signUpButton'))).toBeVisible();
    });
  });
  
  describe('Usage', () => {
    it('sign in button should lead to Login page', async () => {
      await element(by.id('signInButton')).tap();
      await waitFor(element(by.id('LoginView'))).toBeVisible().withTimeout(20000);
      await expect(element(by.id('LoginView'))).toBeVisible();
    });
    it('sign up button should lead to Register page', async () => {
      await element(by.id('signUpButton')).tap();
      await waitFor(element(by.id('RegisterView'))).toBeVisible().withTimeout(20000);
      await expect(element(by.id('RegisterView'))).toBeVisible();
    });
  });
  
})