import {
  expect, element, by, waitFor,
} from 'detox';
import { navigateToRegister } from '../helpers/navigate';
import data from '../data';


describe('Register', () => {
  beforeAll(async () => {
    await navigateToRegister();
  });

  describe('Render', () => {
    it('should display image', async () => {
      await expect(element(by.id('registerImage'))).toBeVisible();
    });
    it('should have welcome text', async () => {
      await expect(element(by.id('registerText'))).toBeVisible();
    });
    it('should have email input', async () => {
      await expect(element(by.id('registerEmailInput'))).toBeVisible();
    });
    it('should have password input', async () => {
      await expect(element(by.id('registerPasswordInput'))).toBeVisible();
    });
    it('should have repeat password input', async () => {
      await expect(element(by.id('registerRepeatPasswordInput'))).toBeVisible();
    });
    it('should have register button', async () => {
      await expect(element(by.id('registerButton'))).toBeVisible();
    });
    describe('should render social buttons', () => {
      it('facebook one', async () => {
        await expect(element(by.id('registerFacebookButton'))).toBeVisible();
      });
      it('google one', async () => {
        await expect(element(by.id('registerGoogleButton'))).toBeVisible();
      });
      it('twitter one', async () => {
        await expect(element(by.id('registerTwitterButton'))).toBeVisible();
      });
    });
  });

  describe('Usage', () => {
    beforeEach(async () => {
      await navigateToRegister();
    });
    it('should throw error when password is empty', async () => {
      await element(by.id('registerEmailInput')).replaceText(data.registerEmail);
      await element(by.id('registerButton')).tap();
      await waitFor(element(by.text('You have to fill up all fields.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('You have to fill up all fields.'))).toBeVisible();
    });
    it('should throw error when email is empty', async () => {
      await element(by.id('registerPasswordInput')).replaceText(data.password);
      await element(by.id('registerRepeatPasswordInput')).replaceText(data.password);
      await element(by.id('registerButton')).tap();
      await waitFor(element(by.text('You have to fill up all fields.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('You have to fill up all fields.'))).toBeVisible();
    });
    it('should throw error when email is in bad format', async () => {
      await element(by.id('registerEmailInput')).replaceText('wrong_format');
      await element(by.id('registerPasswordInput')).replaceText(data.password);
      await element(by.id('registerRepeatPasswordInput')).replaceText(data.password);
      await element(by.id('registerButton')).tap();
      await waitFor(element(by.text('Your email was in wrong format.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('Your email was in wrong format.'))).toBeVisible();
    });
    it('should throw errow when password is too simple', async () => {
      await element(by.id('registerEmailInput')).replaceText(data.registerEmail);
      await element(by.id('registerPasswordInput')).replaceText('abcd');
      await element(by.id('registerRepeatPasswordInput')).replaceText('abcd');
      await element(by.id('registerButton')).tap();
      await waitFor(element(by.text('Password is too weak!'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('Password is too weak!'))).toBeVisible();
    });
    it('should throw error when email is taken', async () => {
      await element(by.id('registerEmailInput')).replaceText(data.email);
      await element(by.id('registerPasswordInput')).replaceText(data.password);
      await element(by.id('registerRepeatPasswordInput')).replaceText(data.password);
      await element(by.id('registerButton')).tap();
      await waitFor(element(by.text('The user already exists.'))).toBeVisible().withTimeout(10000);
      await expect(element(by.text('The user already exists.'))).toBeVisible();
    });
    it('should direct to card page when is successful', async () => {
      await element(by.id('registerEmailInput')).replaceText(data.registerEmail);
      await element(by.id('registerPasswordInput')).replaceText(data.password);
      await element(by.id('registerRepeatPasswordInput')).replaceText(data.password);
      await element(by.id('registerButton')).tap();
      await waitFor(element(by.text('Card'))).toBeVisible().withTimeout(20000);
      await expect(element(by.text('Card'))).toBeVisible();
    });
  });
});
