import {
  device, expect, element, by, waitFor,
} from 'detox';

export async function navigateToLogin() {
  await device.reloadReactNative();
  await waitFor(element(by.id('WelcomeView'))).toBeVisible().withTimeout(2000);
  await element(by.id('signInButton')).tap();
  await waitFor(element(by.id('LoginView'))).toBeVisible().withTimeout(2000);
}

export async function navigateToRegister() {
  await device.reloadReactNative();
  await waitFor(element(by.id('WelcomeView'))).toBeVisible().withTimeout(2000);
  await element(by.id('signUpButton')).tap();
  await waitFor(element(by.id('RegisterView'))).toBeVisible().withTimeout(2000);
}
