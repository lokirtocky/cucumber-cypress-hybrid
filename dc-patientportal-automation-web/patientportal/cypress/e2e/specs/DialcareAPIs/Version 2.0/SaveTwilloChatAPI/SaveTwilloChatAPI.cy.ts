import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Save Twilio Chat APIs", () => {
  it.skip("Save Twilio Chat API POST", () => {
    // currently have issue with twillo chat
    const requestBody = {
      id: 0,
      createdBy: "system",
      createdOn: "2024-04-08T07:01:43.884Z",
      updatedBy: "Admin",
      updatedOn: "2024-04-08T07:01:43.884Z",
      chatHistory: "[]",
      consultationId: 2280,
      userId: "235",
      channelId: "CH51e16963f00f4518ab87f36257610f6c",
      userType: "patient",
      consultationType: "OnDemand",
    };

    cy.fixture<{ SaveTwilioChatPostEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const SaveTwilioChatPostEndPoint =
        apiEndpoints.SaveTwilioChatPostEndPoint;
      const url = `${apiUrl}${SaveTwilioChatPostEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
        cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
          (response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys("result", "errors");
            expect(response.body.result).to.be.true;
            expect(response.body.errors).to.deep.equal({});
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });
});
