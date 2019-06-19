import {
  expect, element, by, waitFor,
} from 'detox';
import { login, register } from '../helpers/navigate';
import data from '../data';

describe('Projects screen', () => {
  beforeAll(async () => {
    await login();
  });
  describe('Render', () => {
    it('has options icon', () => {
      expect(element(by.id('optionsButton'))).toBeVisible();
    });
    it('has projects list', () => {
      expect(element(by.id('projectList'))).toBeVisible();
    });
    it('has latest notifications list', () => {
      expect(element(by.id('notificationsList'))).toBeVisible();
    });
  });
  describe('Usage', () => {
    beforeEach(async () => {
      await register();
    });
    describe('Add new project', () => {
      it('succeeds when all needed data is given', async () => {
        await element(by.id('card0')).tap();
        await element(by.id('projectNameInput')).replaceText(data.projectName);
        await element(by.id('projectDescInput')).replaceText(data.projectDesc);
        await element(by.id('addNewProjectButton')).tap();
        await waitFor(element(by.text('Added project successfully!'))).toBeVisible().withTimeout(10000);
        await expect(element(by.text('Added project successfully!'))).toBeVisible();
      });
      it('fails when no name is given', async () => {
        await element(by.id('card0')).tap();
        await element(by.id('projectDescInput')).replaceText(data.projectDesc);
        await element(by.id('addNewProjectButton')).tap();
        await element(by.id('card0')).tap();
        await waitFor(element(by.text('You need to fill all fields'))).toBeVisible().withTimeout(10000);
        await expect(element(by.text('You need to fill all fields'))).toBeVisible();
      });
      it('fails when no description is given', async () => {
        await element(by.id('card0')).tap();
        await element(by.id('projectNameInput')).replaceText(data.projectName);
        await element(by.id('addNewProjectButton')).tap();
        await element(by.id('card0')).tap();
        await waitFor(element(by.text('You need to fill all fields'))).toBeVisible().withTimeout(10000);
        await expect(element(by.text('You need to fill all fields'))).toBeVisible();
      });
    });
  });
});
