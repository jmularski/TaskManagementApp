import { expect, element, by } from "detox";
import { navigateToMembers } from "../helpers/navigate";

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
