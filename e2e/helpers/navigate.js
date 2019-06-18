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
};

export async function navigateToRegister() {
  await device.reloadReactNative();
  await waitFor(element(by.id('WelcomeView')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('signUpButton')).tap();
  await waitFor(element(by.id('RegisterView')))
    .toBeVisible()
    .withTimeout(2000);
};

export async function login() {
  await navigateToLogin();
  await element(by.id('loginEmailInput')).replaceText(data.email);
  await element(by.id('loginPasswordInput')).replaceText(data.password);
  await element(by.id('loginButton')).tap();
  await waitFor(element(by.text('Projects'))).toBeVisible().withTimeout(20000);
};

export async function register() {
  const email = `${randomstring.generate()}@test.hello`;
  await navigateToRegister();
  await element(by.id('registerEmailInput')).replaceText(email);
  await element(by.id('registerFullNameInput')).replaceText(data.fullName);
  await element(by.id('registerPasswordInput')).replaceText(data.password);
  await element(by.id('registerRepeatPasswordInput')).replaceText(data.password);
  await element(by.id('registerButton')).tap();
  await waitFor(element(by.text('Projects'))).toBeVisible().withTimeout(20000);
  return email;
};

export async function navigateToOptions() {
  const email = await register();
  await waitFor(element(by.text('Projects')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('optionsButton')).tap();
  await waitFor(element(by.id('Options')))
    .toBeVisible()
    .withTimeout(2000);
  return email;
};

export async function createProject() {
  await register();
  await waitFor(element(by.text('Projects')))
    .toBeVisible()
    .withTimeout(2000);
  await element(by.id('card0')).tap();
  await element(by.id('projectNameInput')).replaceText(data.projectName);
  await element(by.id('projectDescInput')).replaceText(data.projectDesc);
  await element(by.id('addNewProjectButton')).tap();
};

export async function navigateToTasks() {
  await createProject();
  await waitFor(element(by.id('card1')))
    .toBeVisible()
    .withTimeout(10000);
  await element(by.text(data.projectName)).tap();
  await waitFor(element(by.text('Tasks')))
    .toBeVisible()
    .withTimeout(2000);
};