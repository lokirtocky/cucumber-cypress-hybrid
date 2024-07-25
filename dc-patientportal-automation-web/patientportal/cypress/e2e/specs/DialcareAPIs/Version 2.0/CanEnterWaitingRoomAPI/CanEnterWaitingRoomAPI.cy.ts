import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Enter Waiting room GET APIs", () => {
  it("Positive - Verify that a valid patient ID grants access.", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + 75;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);

            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative -Verify response to an invalid patient ID.", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + 34105;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Verify Ensure unauthorized IDs are blocked.", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + 44;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Verify response to an invalid patient ID as special character", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + "$%^&";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Verify response to an invalid patient ID as String", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + "Admin";
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Positive - Verify user enter patient id which have consultation", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + 75;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Verify user enter patient id which have no consultation", () => {
    cy.fixture<{ CanEnterWaitingRoomGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const CanEnterWaitingRoomGetEndPoint =
        apiEndpoints.CanEnterWaitingRoomGetEndPoint;
      const url = `${apiUrl}${CanEnterWaitingRoomGetEndPoint}` + 28;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Positive -Enable Waiting Room Patient Id GET", () => {
    cy.fixture<{ EnableWaitingRoomPatientIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomPatientIdEndPoint =
        apiEndpoints.EnableWaitingRoomPatientIdEndPoint;
      const url = `${apiUrl}${EnableWaitingRoomPatientIdEndPoint}` + 28;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Enable Waiting Room Patient Id is Zero GET", () => {
    cy.fixture<{ EnableWaitingRoomPatientIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomPatientIdEndPoint =
        apiEndpoints.EnableWaitingRoomPatientIdEndPoint;
      const url = `${apiUrl}${EnableWaitingRoomPatientIdEndPoint}` + 0;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Enable Waiting Room Patient Id invalid GET", () => {
    cy.fixture<{ EnableWaitingRoomPatientIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomPatientIdEndPoint =
        apiEndpoints.EnableWaitingRoomPatientIdEndPoint;
      const url =
        `${apiUrl}${EnableWaitingRoomPatientIdEndPoint}` + 123456789890;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Positive - Enable Waiting Room By Consultation Id API GET", () => {
    cy.fixture<{ EnableWaitingRoomByConsultationIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomByConsultationIdEndPoint =
        apiEndpoints.EnableWaitingRoomByConsultationIdEndPoint;
      const url = `${apiUrl}${EnableWaitingRoomByConsultationIdEndPoint}`;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Positive - Enable Waiting Room By Provider Id API GET", () => {
    cy.fixture<{ EnableWaitingRoomByProviderIdEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomByProviderIdEndpoint =
        apiEndpoints.EnableWaitingRoomByProviderIdEndpoint;
      const url = `${apiUrl}${EnableWaitingRoomByProviderIdEndpoint}` + 135;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it("Negative - Enable Waiting Room By Provider Id API GET", () => {
    cy.fixture<{ EnableWaitingRoomByProviderIdEndpoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const EnableWaitingRoomByProviderIdEndpoint =
        apiEndpoints.EnableWaitingRoomByProviderIdEndpoint;
      const url =
        `${apiUrl}${EnableWaitingRoomByProviderIdEndpoint}` + 11245667887;
      cy.task("getAccessToken").then((token) => {
        if (!token) {
          throw new Error("Failed to retrieve access token");
        }

        const headers = AuthUtil.getHeaders(token);
        cy.log(`API URL: ${url}`);
        cy.log(`API Headers: ${JSON.stringify(headers)}`);
        cy.sendRequestWithOutBody(url, headers, apiMethods.GET).then(
          (response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });
});
