import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";
import { faker } from "@faker-js/faker";

describe("Patient Provider info APIs", () => {
  const apiUrl: string = Cypress.env("apiUrl");
  const dogBreeds: string[] = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "French Bulldog",
    "Bulldog",
    "Poodle",
    "Beagle",
    "Rottweiler",
    "German Shorthaired Pointer",
    "Yorkshire Terrier",
  ];
  function getRandomDogBreed(): string {
    const randomIndex: number = faker.datatype.number({
      min: 0,
      max: dogBreeds.length - 1,
    });
    return dogBreeds[randomIndex];
  }

  const dogColors: string[] = [
    "Black",
    "White",
    "Brown",
    "Golden",
    "Brindle",
    "Gray",
    "Tan",
  ];

  function getRandomDogColors(): string {
    const randomIndex: number = faker.datatype.number({
      min: 0,
      max: dogColors.length - 1,
    });
    return dogColors[randomIndex];
  }

  it("Save Pets API POST Request", () => {
    const requestBody = {
      id: 0,
      patientId: 133,
      name: faker.animal.dog(),
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: getRandomDogColors(),
      breed: getRandomDogBreed(),
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };

    cy.fixture<{ SavePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const SavePetsEndPoint = apiEndpoints.SavePetsEndPoint;
        const url = `${apiUrl}${SavePetsEndPoint}`;
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
            apiMethods.POST
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Pet list API POST Request", () => {
    const requestBody = {
      ids: [161],
    };
    cy.fixture<{ PetListPostEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const PetListPostEndPoint = apiEndpoints.PetListPostEndPoint;
        const url = `${apiUrl}${PetListPostEndPoint}`;
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
            apiMethods.POST
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it("Pets Details by Patient Id API GET Request", () => {
    cy.fixture<{ GetPetDetailsByPatientIDGetEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const GetPetDetailsByPatientIDGetEndPoint =
        apiEndpoints.GetPetDetailsByPatientIDGetEndPoint;
      const url = `${apiUrl}${GetPetDetailsByPatientIDGetEndPoint}`;
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

  it("Pets Details API GET Request", () => {
    cy.fixture<{ PetDetailsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const PetDetailsEndPoint = apiEndpoints.PetDetailsEndPoint;
        const url = `${apiUrl}${PetDetailsEndPoint}`;
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

  it("Pet Details By Dependent Id API GET Request", () => {
    cy.fixture<{ PetDetailsByDependentIdEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const PetDetailsByDependentIdEndPoint =
        apiEndpoints.PetDetailsByDependentIdEndPoint;
      const url = `${apiUrl}${PetDetailsByDependentIdEndPoint}`;
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

  it("Search Pets And Owners API POST Request", () => {
    const requestBody = {
      firstName: faker.person.firstName(),
      patientId: 0,
      groupCode: "GRPDCUCVV50",
      dob: "2020-01-17T15:10:04.572Z",
      pageNo: 1,
      pageSize: 10,
    };
    cy.fixture<{ SearchPetsAndOwnersEndPoint: string }>(
      "apiEndpoints.json"
    ).then((apiEndpoints) => {
      const SearchPetsAndOwnersEndPoint =
        apiEndpoints.SearchPetsAndOwnersEndPoint;
      const url = `${apiUrl}${SearchPetsAndOwnersEndPoint}`;
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
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          }
        );
      });
    });
  });

  it.skip("Pet Search API POST Request", () => {
    // currently having a issue in this API  "Value cannot be null. (Parameter 'source')"
    const requestBody = {
      patientId: 133,
      name: "",
      patientFirstName: "",
      patientLastName: "",
      dob: null,
      petType: "",
      color: "",
      breed: "",
      statusCode: "",
      gender: "",
    };
    cy.fixture<{ petSearchEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const petSearchEndPoint = apiEndpoints.petSearchEndPoint;
        const url = `${apiUrl}${petSearchEndPoint}`;
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
            apiMethods.POST
          ).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(`API Response: ${JSON.stringify(response.body)}`);
          });
        });
      }
    );
  });

  it.skip("Positive - update Pet API PUT Request", () => {
    //currently there is issue in this api
    const requestBody = {
      id: 547,
      patientId: 133,
      name: faker.animal.dog(),
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: getRandomDogColors(),
      breed: getRandomDogBreed(),
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };
    cy.fixture<{ updatePetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const updatePetEndPoint = apiEndpoints.updatePetEndPoint;
        const url = `${apiUrl}${updatePetEndPoint}`;
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

  it.skip("Negative - id with zero value Pet user will not able to update ", () => {
    // there is issue in this api
    const requestBody = {
      id: 0,
      patientId: 133,
      name: faker.animal.dog(),
      petType: "dog",
      gender: "f",
      years: 29,
      months: 11,
      profileImagePath: "string",
      color: getRandomDogColors(),
      breed: getRandomDogBreed(),
      height: "3",
      weight: 5,
      isPetAddressAsPrimary: true,
      isNeutered: true,
      statusCode: "A",
    };
    cy.fixture<{ updatePetEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const updatePetEndPoint = apiEndpoints.updatePetEndPoint;
        const url = `${apiUrl}${updatePetEndPoint}`;
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

  it("Delete Pets API DELETE Request", () => {
    cy.fixture<{ deletePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const deletePetsEndPoint = apiEndpoints.deletePetsEndPoint;
        const url = `${apiUrl}${deletePetsEndPoint}` + 547;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.DELETE).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Negative - not able to Delete Pets API DELETE Request", () => {
    cy.fixture<{ deletePetsEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const deletePetsEndPoint = apiEndpoints.deletePetsEndPoint;
        const url = `${apiUrl}${deletePetsEndPoint}` + 547456789045676;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.DELETE).then(
            (response) => {
              expect(response.status).to.eq(400);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Positive - Reactive Pets API PUT Request", () => {
    cy.fixture<{ ReactivePetsPutEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const ReactivePetsPutEndPoint = apiEndpoints.ReactivePetsPutEndPoint;
        const url = `${apiUrl}${ReactivePetsPutEndPoint}` + 547;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.PUT).then(
            (response) => {
              expect(response.status).to.eq(200);
              cy.log(`API Response: ${JSON.stringify(response.body)}`);
            }
          );
        });
      }
    );
  });

  it("Negative - not able to Reactive Pets API PUT Request", () => {
    cy.fixture<{ ReactivePetsPutEndPoint: string }>("apiEndpoints.json").then(
      (apiEndpoints) => {
        const ReactivePetsPutEndPoint = apiEndpoints.ReactivePetsPutEndPoint;
        const url = `${apiUrl}${ReactivePetsPutEndPoint}` + 5478888456789;
        cy.task("getAccessToken").then((token) => {
          if (!token) {
            throw new Error("Failed to retrieve access token");
          }

          const headers = AuthUtil.getHeaders(token);
          cy.log(`API URL: ${url}`);
          cy.log(`API Headers: ${JSON.stringify(headers)}`);
          cy.sendRequestWithOutBody(url, headers, apiMethods.PUT).then(
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
