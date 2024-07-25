import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Pets update APIs", () => {
  it("Positive - Validate Update pets Information API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PutSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PutSavePetsEndPoint = apiEndpoints.PutSavePetsEndPoint;
        const url = `${apiUrl}${PutSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information  patient Id negative  API POST", () => {
    const requestBody = {
      id: 12,
      patientId: -133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information name value is null API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information invalid pet type API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "test",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information invalid pet type is null API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information gender is null API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information gender is invalid API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "N",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information  is 12 month API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 12,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information Height is zero API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "0",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information weight is zero API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 0,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information heigt is int API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: 3,
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(400);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information states code is null API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information  status code is invalid API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "X",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information  height is in negative API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "-3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Negative - Validate Update pets with Information weight is in negative API POST", () => {
    const requestBody = {
      id: 12,
      patientId: 133,
      name: "Janit",
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: "",
      breed: "",
      height: "3",
      weight: -5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ PostSavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const apiUrl: string =
          "https://patients-api." +
          Cypress.env("env") +
          ".dctelemedplatform.com";
        const PostSavePetsEndPoint = apiEndpoints.PostSavePetsEndPoint;
        const url = `${apiUrl}${PostSavePetsEndPoint}`;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
          cy.sendRequestWithBody(
            url,
            requestBody,
            headers,
            apiMethods.PUT
          ).then((response) => {
            expect(response.status).to.eq(422);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });
});
