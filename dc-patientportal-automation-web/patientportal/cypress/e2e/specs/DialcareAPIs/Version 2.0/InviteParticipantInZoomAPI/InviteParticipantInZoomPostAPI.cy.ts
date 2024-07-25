import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";
describe("Invite Participant In Zoom APIs Request", () => {
  // not working on stage
  let email =
    faker.internet.userName() + faker.phone.number("##") + "@mailinator.com";
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  it.skip("Invite Participant In Zoom API POST", () => {
    const requestBody = {
      consultationId: 2097,
      patientId: 133,
      providerId: 130,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: "",
    };

    cy.fixture<{ invitePArticipantInZoomEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const invitePArticipantInZoomEndPoint =
        apiEndpoints.invitePArticipantInZoomEndPoint;
      const url = `${apiUrl}${invitePArticipantInZoomEndPoint}`;
      const headers = AuthUtil.getHeadersWithoutToken();
      cy.log(`API URL: ${url}`);
      cy.log(
        `API Headers: ${JSON.stringify(AuthUtil.getHeadersWithoutToken())}`
      );
      cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
      cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
        (response) => {
          expect(response.status).to.eq(200);
          cy.log(`API Response: ${JSON.stringify(response.body)}`);
        }
      );
    });

    const getIframeBody = () => {
      return cy
        .get("#html_msg_body")
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);
    };
    cy.viewport(1920, 1080);
    cy.visit("https://www.mailinator.com/v4/public/inboxes.jsp?to=" + email);
    let messageOpen =
      '//*[@id="ng-app"]//div[@id="inbox_pane"]/div[3]//table/tbody/tr[1]/td[3]';
    cy.xpath(messageOpen).click();
    getIframeBody()
      .find("td > table  tr > td > p:nth-of-type(1)")
      .should("have.text", "Hello " + firstName + " " + lastName + ",");
    getIframeBody()
      .find(".button-td.button-td-primary > .button-a.button-a-primary")
      .should("have.text", "GET STARTED");
  });
});
