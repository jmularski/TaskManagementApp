import { expect, element, by, waitFor } from "detox";
import { navigateToMembers } from "../helpers/navigate";
import data from "../data";

describe("Get members", () => {
  beforeAll(async () => {
    await navigateToMembers();
  });
  describe("Render", () => {
    it("has invitations list", async () => {
      await expect(element(by.id("invitationList"))).toBeVisible();
    });
  });
});
