import {
  expect, element, by, waitFor,
} from 'detox';
import { navigateToTasks } from '../helpers/navigate';
import data from '../data';

describe('Tasks', () => {
  beforeAll(async () => {
    await navigateToTasks();
  });
  describe('Render', () => {
    it('has tasks list', async () => {
      await expect(element(by.id('tasksList'))).toBeVisible();
    });
    it('has add task button', async () => {
      await expect(element(by.id('addTaskButton'))).toBeVisible();
    });
  });
  describe('Usage', () => {
    beforeEach(async () => {
      await navigateToTasks();
    });
    describe('add task', () => {
      it('succeeds when data is given', async () => {
        await element(by.id('addTaskButton')).tap();
        await element(by.id('taskNameInput')).replaceText(data.taskName);
        await element(by.id('sendTaskButton')).tap();
        await waitFor(element(by.text('Added task successfully!'))).toBeVisible().withTimeout(10000);
        await expect(element(by.text('Added task successfully!'))).toBeVisible();
      });
      it('fails when no name is given', async () => {
        await element(by.id('addTaskButton')).tap();
        await element(by.id('sendTaskButton')).tap();
        await waitFor(element(by.text('You need to fill all fields!'))).toBeVisible().withTimeout(10000);
        await expect(element(by.text('You need to fill all fields!'))).toBeVisible();
        await element(by.id('addTaskButton')).tap();
      });
    });
  });
});
