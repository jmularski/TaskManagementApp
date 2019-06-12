import {
  device, element, by, waitFor,
} from 'detox';
import data from '../data';

const randomstring = require('randomstring');

export async function navigateToLogin() {
  await device.reloadReactNative();
  await waitFor(element(by.id('WelcomeView')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('signInButton')).tap();
  await waitFor(element(by.id('LoginView')))
    .toBeVisible()
    .withTimeout(2000);
}

export async function navigateToRegister() {
  await device.reloadReactNative();
  await waitFor(element(by.id('WelcomeView')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('signUpButton')).tap();
  await waitFor(element(by.id('RegisterView')))
    .toBeVisible()
    .withTimeout(2000);
}

export async function login() {
  await navigateToLogin();
  await element(by.id('loginEmailInput')).replaceText(data.email);
  await element(by.id('loginPasswordInput')).replaceText(data.password);
  await element(by.id('loginButton')).tap();
  await waitFor(element(by.text('Projects'))).toBeVisible().withTimeout(20000);
}

export async function register() {
  const email = `${randomstring.generate()}@test.hello`;
  await navigateToRegister();
  await element(by.id('registerEmailInput')).replaceText(email);
  await element(by.id('registerFullNameInput')).replaceText(data.fullName);
  await element(by.id('registerPasswordInput')).replaceText(data.password);
  await element(by.id('registerRepeatPasswordInput')).replaceText(data.password);
  await element(by.id('registerButton')).tap();
  await waitFor(element(by.text('Projects'))).toBeVisible().withTimeout(20000);
}

export async function navigateToOptions() {
  await register();
  await waitFor(element(by.text('Projects')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('optionsButton')).tap();
  await waitFor(element(by.id('Options')))
    .toBeVisible()
    .withTimeout(2000);
}
