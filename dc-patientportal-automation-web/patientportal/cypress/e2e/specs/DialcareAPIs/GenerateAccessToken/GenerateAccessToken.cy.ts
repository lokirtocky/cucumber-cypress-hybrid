import AuthUtil from "cypress/support/utils/AuthUtils";

describe("Generate Access token if token is not expired within 1 hour", () => {
  it("Your Token is: ", () => {
    const token = AuthUtil.getAccessToken();
    cy.task("log", token);
  });
});
