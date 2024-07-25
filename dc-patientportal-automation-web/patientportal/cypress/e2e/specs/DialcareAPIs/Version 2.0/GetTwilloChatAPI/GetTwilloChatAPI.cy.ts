import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Zoom video Signature R API APIs", () => {
  it("Positive - Get Twillo Chat API GET", () => {
    cy.fixture<{ twilloChatGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const twilloChatGetEndPoint = apiEndpoints.twilloChatGetEndPoint;
        const url = `${apiUrl}${twilloChatGetEndPoint}`;
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
      }
    );
  });

  it("Positive - Twillo Generate Token API GET", () => {
    cy.fixture<{ twilloGenerateTokenGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const twilloGenerateTokenGetEndPoint =
        apiEndpoints.twilloGenerateTokenGetEndPoint;
      const url =
        `${apiUrl}${twilloGenerateTokenGetEndPoint}` +
        "serviceSID=123&identity=11";
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

  it("Negative - Twillo Generate Token API GET", () => {
    cy.fixture<{ twilloGenerateTokenGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const apiUrl: string =
        "https://consultation-api." +
        Cypress.env("env") +
        ".dctelemedplatform.com";
      const twilloGenerateTokenGetEndPoint =
        apiEndpoints.twilloGenerateTokenGetEndPoint;
      const url =
        `${apiUrl}${twilloGenerateTokenGetEndPoint}` +
        "serviceSID=String&identity=String";
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

  it("Positive - Get Twilio Chat API GET", () => {
    cy.fixture<{ GetTwilioChatGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const GetTwilioChatGetEndPoint = apiEndpoints.GetTwilioChatGetEndPoint;
        const url =
          `${apiUrl}${GetTwilioChatGetEndPoint}` +
          "2280&channelId=CH51e16963f00f4518ab87f36257610f6c";
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
      }
    );
  });

  it("Negative - Get Twilio Chat API GET", () => {
    cy.fixture<{ GetTwilioChatGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const GetTwilioChatGetEndPoint = apiEndpoints.GetTwilioChatGetEndPoint;
        const url = `${apiUrl}${GetTwilioChatGetEndPoint}` + 987656787545678;
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
      }
    );
  });

  it("Negative - Get Twilio Chat with string API GET", () => {
    cy.fixture<{ GetTwilioChatGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const GetTwilioChatGetEndPoint = apiEndpoints.GetTwilioChatGetEndPoint;
        const url = `${apiUrl}${GetTwilioChatGetEndPoint}` + "Admin";
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
      }
    );
  });

  it("Negative - Get Twilio Chat with special chracter API GET", () => {
    cy.fixture<{ GetTwilioChatGetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const GetTwilioChatGetEndPoint = apiEndpoints.GetTwilioChatGetEndPoint;
        const url = `${apiUrl}${GetTwilioChatGetEndPoint}` + "@#$%^&";
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
      }
    );
  });

  it("Positive - Chat Started Post API", () => {
    cy.fixture<{ ChatStartedPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const ChatStartedPostEndPoint = apiEndpoints.ChatStartedPostEndPoint;
        const url = `${apiUrl}${ChatStartedPostEndPoint}` + 20;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Negative - Chat Started Post API", () => {
    cy.fixture<{ ChatStartedPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const ChatStartedPostEndPoint = apiEndpoints.ChatStartedPostEndPoint;
        const url = `${apiUrl}${ChatStartedPostEndPoint}` + 987654567854;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
            (response) => {
              expect(response.status).to.eq(400);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Negative - Chat Started Post API with String", () => {
    cy.fixture<{ ChatStartedPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const ChatStartedPostEndPoint = apiEndpoints.ChatStartedPostEndPoint;
        const url = `${apiUrl}${ChatStartedPostEndPoint}` + "Admin";
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
            (response) => {
              expect(response.status).to.eq(400);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Negative - Chat Started Post API with special chracter", () => {
    cy.fixture<{ ChatStartedPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://consultation-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const ChatStartedPostEndPoint = apiEndpoints.ChatStartedPostEndPoint;
        const url = `${apiUrl}${ChatStartedPostEndPoint}` + "*$#$%^&";
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.POST).then(
            (response) => {
              expect(response.status).to.eq(400);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });
});
