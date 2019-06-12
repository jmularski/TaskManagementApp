import {
  expect, element, by, waitFor,
} from 'detox';
import { navigateToLogin } from '../helpers/navigate';
import data from '../data';


describe('Login', () => {
  beforeAll(async () => {
    await navigateToLogin();
  });

  describe('Render', () => {
    it('should display image', async () => {
      await expect(element(by.id('loginImage'))).toBeVisible();
    });
    it('should have welcome text', async () => {
      await expect(element(by.id('loginText'))).toBeVisible();
    });
    it('should have email input', async () => {
      await expect(element(by.id('loginEmailInput'))).toBeVisible();
    });
    it('should have password input', async () => {
      await expect(element(by.id('loginPasswordInput'))).toBeVisible();
    });
    it('should have login button', async () => {
      await expect(element(by.id('loginButton'))).toBeVisible();
    });
    describe('should render social buttons', () => {
      it('facebook one', async () => {
        await expect(element(by.id('loginFacebookButton'))).toBeVisible();
      });
      it('google one', async () => {
        await expect(element(by.id('loginGoogleButton'))).toBeVisible();
      });
      it('twitter one', async () => {
        await expect(element(by.id('loginTwitterButton'))).toBeVisible();
      });
    });
  });

  describe('Usage', () => {
    beforeEach(async () => {
      await navigateToLogin();
    });

    it('should throw error when email is empty', async () => {
      await element(by.id('loginPasswordInput')).replaceText(data.password);
      await element(by.id('loginButton')).tap();
      await waitFor(element(by.text('You have to fill up all fields.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('You have to fill up all fields.'))).toBeVisible();
    });
    it('should throw error when password is empty', async () => {
      await element(by.id('loginEmailInput')).replaceText(data.email);
      await element(by.id('loginButton')).tap();
      await waitFor(element(by.text('You have to fill up all fields.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('You have to fill up all fields.'))).toBeVisible();
    });
    it('should throw error when email is in bad format', async () => {
      await element(by.id('loginEmailInput')).replaceText('wrong_format');
      await element(by.id('loginPasswordInput')).replaceText(data.password);
      await element(by.id('loginButton')).tap();
      await waitFor(element(by.text('Your email was in wrong format.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('Your email was in wrong format.'))).toBeVisible();
    });
    it('should throw error when password is wrong', async () => {
      await element(by.id('loginEmailInput')).replaceText(data.email);
      await element(by.id('loginPasswordInput')).replaceText('wrong');
      await element(by.id('loginButton')).tap();
      await waitFor(element(by.text('Unable to log in with provided credentials.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('Unable to log in with provided credentials.'))).toBeVisible();
    });
    it('should direct to projects page when is successful', async () => {
      await element(by.id('loginEmailInput')).replaceText(data.email);
      await element(by.id('loginPasswordInput')).replaceText(data.password);
      await element(by.id('loginButton')).tap();
      await waitFor(element(by.text('Projects'))).toBeVisible().withTimeout(20000);
      await expect(element(by.text('Projects'))).toBeVisible();
    });
  });
});
