import {
  expect, element, by, waitFor,
} from 'detox';
import { login } from '../helpers/navigate';
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
});
