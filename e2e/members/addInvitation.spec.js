import { expect, element, by } from "detox";
import { navigateToInvitations } from "../helpers/navigate";

describe("Add invitation", () => {
  beforeAll(async () => {
    await navigateToInvitations();
  });

  describe("Render", () => {
    it("has input field", async () => {
      await expect(element(by.id("searchInput"))).toBeVisible();
    });
    it("has search button", async () => {
      await expect(element(by.id("searchButton"))).toBeVisible();
    });
    it("has friends list", async () => {
      await expect(element(by.id("foundUserList"))).toBeVisible();
    });
  });
});
