import {
	device, expect, element, by, waitFor
} from 'detox';

describe('Entry', () => {
  beforeAll(async () => {
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
    beforeEach(async () => {
      await device.reloadReactNative();
    });
    it('sign in button should lead to Login page', async () => {
      await element(by.id('signInButton')).tap();
      await waitFor(element(by.text('Login'))).toBeVisible().withTimeout(20000);
      await expect(element(by.text('Login'))).toBeVisible();
    });
    it('sign up button should lead to Register page', async () => {
      await element(by.id('signUpButton')).tap();
      await waitFor(element(by.text('Register'))).toBeVisible().withTimeout(20000);
      await expect(element(by.text('Register'))).toBeVisible();
    });
  });
  
})