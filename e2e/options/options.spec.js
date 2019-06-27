import { expect, element, by, waitFor } from "detox";
import { navigateToOptions } from "../helpers/navigate";
import data from "../data";

describe("Profile options", () => {
  beforeAll(async () => {
    await navigateToOptions();
  });

  describe("Render", () => {
    it("should display image", async () => {
      expect(element(by.id("optionsImage"))).toBeVisible();
    });
    it("should display email input", async () => {
      expect(element(by.id("optionsEmailInput"))).toBeVisible();
    });
    it("should display name input", async () => {
      expect(element(by.id("optionsNameInput"))).toBeVisible();
    });
    it("should display notif emails checkbox", async () => {
      expect(element(by.id("optionsNotifCheckbox"))).toBeVisible();
    });
    it("should display update profile button", async () => {
      expect(element(by.id("optionsUpdateProfile"))).toBeVisible();
    });
  });

  describe("Usage", () => {
    let email;
    beforeEach(async () => {
      email = await navigateToOptions();
    });
    describe("get data", () => {
      it("should fetch and show correct email", async () => {
        await expect(element(by.text(email))).toBeVisible();
      });
      it("should fetch and show correct full name", async () => {
        await expect(element(by.text(data.fullName))).toBeVisible();
      });
    });
    describe("update", () => {
      it("should throw error when email is empty", async () => {
        await element(by.id("optionsEmailInput")).replaceText("");
        await element(by.id("optionsNameInput")).replaceText(data.optionsName);
        await element(by.id("optionsUpdateProfile")).tap();
        await waitFor(element(by.text("You have to fill up all fields.")))
          .toBeVisible()
          .withTimeout(10000);
        await expect(
          element(by.text("You have to fill up all fields."))
        ).toBeVisible();
      });
      it("should fail when mail is in wrong format", async () => {
        await element(by.id("optionsEmailInput")).replaceText(
          "placeholder_image"
        );
        await element(by.id("optionsNameInput")).replaceText(data.optionsName);
        await element(by.id("optionsUpdateProfile")).tap();
        await waitFor(element(by.text("Your email was in wrong format.")))
          .toBeVisible()
          .withTimeout(10000);
        await expect(
          element(by.text("Your email was in wrong format."))
        ).toBeVisible();
      });
      it("should fail when name is empty", async () => {
        await element(by.id("optionsEmailInput")).replaceText(
          data.registerEmail
        );
        await element(by.id("optionsNameInput")).replaceText("");
        await element(by.id("optionsUpdateProfile")).tap();
        await waitFor(element(by.text("You have to fill up all fields.")))
          .toBeVisible()
          .withTimeout(10000);
        await expect(
          element(by.text("You have to fill up all fields."))
        ).toBeVisible();
      });
      it("should fail when name is in wrong format", async () => {
        await element(by.id("optionsEmailInput")).replaceText(
          data.registerEmail
        );
        await element(by.id("optionsNameInput")).replaceText("TestTest");
        await element(by.id("optionsUpdateProfile")).tap();
        await waitFor(element(by.text("Full name is in wrong format")))
          .toBeVisible()
          .withTimeout(10000);
        await expect(
          element(by.text("Full name is in wrong format"))
        ).toBeVisible();
      });
      it("should succeed when everything is ok", async () => {
        await element(by.id("optionsEmailInput")).replaceText(
          data.registerEmail
        );
        await element(by.id("optionsNameInput")).replaceText(data.optionsName);
        await element(by.id("optionsUpdateProfile")).tap();
        await waitFor(element(by.text("Successful update!")))
          .toBeVisible()
          .withTimeout(10000);
        await expect(element(by.text("Successful update!"))).toBeVisible();
      });
    });
  });
});
