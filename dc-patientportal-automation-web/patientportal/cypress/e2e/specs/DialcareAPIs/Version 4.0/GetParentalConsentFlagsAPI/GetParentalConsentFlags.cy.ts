import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Get Parental Consent Flags Get", () => {
  const apiUrl: string =
    "https://patients-api." + Cypress.env("env") + ".dctelemedplatform.com";
  it("Validate - Get Parental Consent Flags Get Request", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=TX&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Validate - Get Parental Consent Flags Get Request state code TX", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=TX&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code AK", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=AK&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code AZ", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=AZ&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code AL", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=AL&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code CA", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=CA&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code CO", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=CO&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code FL", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=FL&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code GA", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=GA&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code KS", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=KS&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code KY", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=KY&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code NE", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=NE&dob=2020-04-05&patientId=13&languageCode=en";
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

  it("Negative - Get Parental Consent Flags Get Request state code ND", () => {
    cy.fixture<{ GetParentalConsentFlagsEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetParentalConsentFlagsEndPoint =
        apiEndpoints.GetParentalConsentFlagsEndPoint;
      const url =
        `${apiUrl}${GetParentalConsentFlagsEndPoint}` +
        "?state_code=ND&dob=2020-04-05&patientId=13&languageCode=en";
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
});
