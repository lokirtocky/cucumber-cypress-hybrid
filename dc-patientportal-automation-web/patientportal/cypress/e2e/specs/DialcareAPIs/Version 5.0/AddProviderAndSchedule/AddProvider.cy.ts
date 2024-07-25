import { faker } from '@faker-js/faker';
import AuthUtil from "cypress/support/utils/AuthUtils";
import apiMethods from "../../../../../fixtures/apiMethods.json";

describe("Add Provider And Schedule", () => {
    let providerId : any;
    it("Add Provider UC post Request", () => {
        const generateSameDayRandomDateTimes = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startHour = Math.floor(Math.random() * 24);
            const startMinute = Math.floor(Math.random() * 60);
            const startDateTime = new Date(today);
            startDateTime.setHours(startHour, startMinute);
            const endDateTime = new Date(startDateTime);
            endDateTime.setMonth(endDateTime.getMonth() + 8);
            const formatDateTime = (date:any) => {
                return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
            };

            return {
                startDateTime: formatDateTime(startDateTime),
                endDateTime: formatDateTime(endDateTime),
            };
        };

        const randomDateTimes = generateSameDayRandomDateTimes();

        const requestBody = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "middleInitial": "s",
            "gender": "M",
            "dob": faker.date.past(50, new Date()).toISOString().split('T')[0] + 'T00:00:00.000Z',
            "tin": faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
            "npi": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
            practicingSince: faker.date.past(20, new Date()).getFullYear(),
            agesTreatedFrom: faker.datatype.number({ min: 0, max: 10 }),
            agesTreatedTo: faker.datatype.number({ min: 11, max: 100 }),
            speciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            subSpeciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            "statusCode": "A",
            "createdBy": "system",
            "updatedBy": "system",
            "specialityOther": null,
            "profiles": [
                {
                    "providerId": 0,
                    "personalSuffix": "I",
                    "professionalSuffix": "D.O.",
                    "aliasName": "eee",
                    "preferredTimeZone": randomDateTimes.startDateTime,
                    "clientCode": "code",
                    "networkCode": "DCUC",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "contacts": [
                {
                    "providerId": 0,
                    "entityType": "email",
                    "contact": faker.person.firstName() + faker.person.lastName() + "01" + "UC@mailinator.com",
                    "isPrimary": true,
                    "receiveNotification": true,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "entityType": "Phone",
                    "contact": faker.phone.number("##########"),
                    "isPrimary": true,
                    "receiveNotification": false,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "addresses": [
                {
                    "providerId": 0,
                    "addressType": "B",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "stateCode": "AL",
                    "zip": "75034",
                    "timeZone": "CST",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "addressType": "M",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "zip": "75034",
                    "timeZone": "CST",
                    "stateCode": "AL",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "academics": [
                {
                    "providerId": 0,
                    "schoolName": "Christ the king convent school",
                    "degree": "high school",
                    "graduationDate": "2024-02-13T09:39:56.743Z",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "languages": [
                {
                    "providerId": 0,
                    "language": "EN",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "id": 0,
            "createdOn": "2024-02-13T09:39:56.743Z",
            "updatedOn": "2024-02-13T09:39:56.743Z",
            "licenses": [{
                "providerId": 0,
                "stateCode": "CA",
                "licenseNumber": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
                "licenseStatus": "Active",
                "expirationDate": randomDateTimes.endDateTime,
                "modeOfVerification": "https://www.bhec.texas.gov/verify-a-license/index.html",
                "statusCode": "A",
                "id": 0,
                "createdBy": "string",
                "createdOn": "2023-07-06T15:38:31.763",
                "updatedBy": "string",
                "updatedOn": "2024-02-16T10:29:13.633"
            }]
        };

        cy.fixture<{ AddProviderEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
            const AddProviderEndPoint =
                apiEndpoints.AddProviderEndPoint;
            const url = `${apiUrl}${AddProviderEndPoint}`;
            cy.task('getAccessToken').then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(201);
                        providerId = response.body.id;
                        cy.wrap(providerId).as('providerId');
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        })
    });

    it("Add Provider TD post Request", () => {
        const generateSameDayRandomDateTimes = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const startHour = Math.floor(Math.random() * 24);
            const startMinute = Math.floor(Math.random() * 60);
            const startDateTime = new Date(today);
            startDateTime.setHours(startHour, startMinute);

            const endDateTime = new Date(startDateTime);
            endDateTime.setMonth(endDateTime.getMonth() + 8);

            const formatDateTime = (date: any) => {
                return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
            };

            return {
                startDateTime: formatDateTime(startDateTime),
                endDateTime: formatDateTime(endDateTime),
            };
        };

        const randomDateTimes = generateSameDayRandomDateTimes();

        const requestBody = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "middleInitial": "s",
            "gender": "M",
            "dob": faker.date.past(50, new Date()).toISOString().split('T')[0] + 'T00:00:00.000Z',
            "tin": faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
            "npi": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
            practicingSince: faker.date.past(20, new Date()).getFullYear(),
            agesTreatedFrom: faker.datatype.number({ min: 0, max: 10 }),
            agesTreatedTo: faker.datatype.number({ min: 11, max: 100 }),
            speciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            subSpeciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            "statusCode": "A",
            "createdBy": "system",
            "updatedBy": "system",
            "specialityOther": null,
            "profiles": [
                {
                    "providerId": 0,
                    "personalSuffix": "I",
                    "professionalSuffix": "D.O.",
                    "aliasName": "eee",
                    "preferredTimeZone": randomDateTimes.startDateTime,
                    "clientCode": "code",
                    "networkCode": "DCTD",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "contacts": [
                {
                    "providerId": 0,
                    "entityType": "email",
                    "contact": faker.person.firstName() + faker.person.lastName() + "01" + "TD@mailinator.com",
                    "isPrimary": true,
                    "receiveNotification": true,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "entityType": "Phone",
                    "contact": faker.phone.number("##########"),
                    "isPrimary": true,
                    "receiveNotification": false,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "addresses": [
                {
                    "providerId": 0,
                    "addressType": "B",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "stateCode": "AL",
                    "zip": "75034",
                    "timeZone": "CST",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "addressType": "M",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "zip": "75034",
                    "timeZone": "CST",
                    "stateCode": "AL",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "academics": [
                {
                    "providerId": 0,
                    "schoolName": "Christ the king convent school",
                    "degree": "high school",
                    "graduationDate": "2024-02-13T09:39:56.743Z",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "languages": [
                {
                    "providerId": 0,
                    "language": "EN",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "id": 0,
            "createdOn": "2024-02-13T09:39:56.743Z",
            "updatedOn": "2024-02-13T09:39:56.743Z",
            "licenses": [{
                "providerId": 0,
                "stateCode": "CA",
                "licenseNumber": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
                "licenseStatus": "Active",
                "expirationDate": randomDateTimes.endDateTime,
                "modeOfVerification": "https://www.bhec.texas.gov/verify-a-license/index.html",
                "statusCode": "A",
                "id": 0,
                "createdBy": "string",
                "createdOn": "2023-07-06T15:38:31.763",
                "updatedBy": "string",
                "updatedOn": "2024-02-16T10:29:13.633"
            }]
        };

        cy.fixture<{ AddProviderEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
            const AddProviderEndPoint =
                apiEndpoints.AddProviderEndPoint;
            const url = `${apiUrl}${AddProviderEndPoint}`;
            cy.task('getAccessToken').then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(201);
                        providerId = response.body.id;
                        cy.wrap(providerId).as('providerId');
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        })
    });

    it("Add Provider TH post Request", () => {
        const generateSameDayRandomDateTimes = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const startHour = Math.floor(Math.random() * 24);
            const startMinute = Math.floor(Math.random() * 60);
            const startDateTime = new Date(today);
            startDateTime.setHours(startHour, startMinute);

            const endDateTime = new Date(startDateTime);
            endDateTime.setMonth(endDateTime.getMonth() + 8);

            const formatDateTime = (date: any) => {
                return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
            };

            return {
                startDateTime: formatDateTime(startDateTime),
                endDateTime: formatDateTime(endDateTime),
            };
        };

        const randomDateTimes = generateSameDayRandomDateTimes();

        const requestBody = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "middleInitial": "s",
            "gender": "M",
            "dob": faker.date.past(50, new Date()).toISOString().split('T')[0] + 'T00:00:00.000Z',
            "tin": faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
            "npi": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
            practicingSince: faker.date.past(20, new Date()).getFullYear(),
            agesTreatedFrom: faker.datatype.number({ min: 0, max: 10 }),
            agesTreatedTo: faker.datatype.number({ min: 11, max: 100 }),
            speciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            subSpeciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            "statusCode": "A",
            "createdBy": "system",
            "updatedBy": "system",
            "specialityOther": null,
            "profiles": [
                {
                    "providerId": 0,
                    "personalSuffix": "I",
                    "professionalSuffix": "D.O.",
                    "aliasName": "eee",
                    "preferredTimeZone": randomDateTimes.startDateTime,
                    "clientCode": "code",
                    "networkCode": "DCTH",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "contacts": [
                {
                    "providerId": 0,
                    "entityType": "email",
                    "contact": faker.person.firstName() + faker.person.lastName() + "01" + "Th@mailinator.com",
                    "isPrimary": true,
                    "receiveNotification": true,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "entityType": "Phone",
                    "contact": faker.phone.number("##########"),
                    "isPrimary": true,
                    "receiveNotification": false,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "addresses": [
                {
                    "providerId": 0,
                    "addressType": "B",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "stateCode": "AL",
                    "zip": "75034",
                    "timeZone": "CST",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "addressType": "M",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "zip": "75034",
                    "timeZone": "CST",
                    "stateCode": "AL",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "academics": [
                {
                    "providerId": 0,
                    "schoolName": "Christ the king convent school",
                    "degree": "high school",
                    "graduationDate": "2024-02-13T09:39:56.743Z",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "languages": [
                {
                    "providerId": 0,
                    "language": "EN",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "id": 0,
            "createdOn": "2024-02-13T09:39:56.743Z",
            "updatedOn": "2024-02-13T09:39:56.743Z",
            "licenses": [{
                "providerId": 0,
                "stateCode": "CA",
                "licenseNumber": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
                "licenseStatus": "Active",
                "expirationDate": randomDateTimes.endDateTime,
                "modeOfVerification": "https://www.bhec.texas.gov/verify-a-license/index.html",
                "statusCode": "A",
                "id": 0,
                "createdBy": "string",
                "createdOn": "2023-07-06T15:38:31.763",
                "updatedBy": "string",
                "updatedOn": "2024-02-16T10:29:13.633"
            }]
        };

        cy.fixture<{ AddProviderEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
            const AddProviderEndPoint =
                apiEndpoints.AddProviderEndPoint;
            const url = `${apiUrl}${AddProviderEndPoint}`;
            cy.task('getAccessToken').then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(201);
                        providerId = response.body.id;
                        cy.wrap(providerId).as('providerId');
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        })
    });

    it("Add Provider VV post Request", () => {
        const generateSameDayRandomDateTimes = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startHour = Math.floor(Math.random() * 24);
            const startMinute = Math.floor(Math.random() * 60);
            const startDateTime = new Date(today);
            startDateTime.setHours(startHour, startMinute);
            const endDateTime = new Date(startDateTime);
            endDateTime.setMonth(endDateTime.getMonth() + 8);
            const formatDateTime = (date: any) => {
                return date.toISOString().replace(/:\d{2}\.\d{3}Z$/, "");
            };

            return {
                startDateTime: formatDateTime(startDateTime),
                endDateTime: formatDateTime(endDateTime),
            };
        };

        const randomDateTimes = generateSameDayRandomDateTimes();

        const requestBody = {
            "firstName": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "middleInitial": "s",
            "gender": "M",
            "dob": faker.date.past(50, new Date()).toISOString().split('T')[0] + 'T00:00:00.000Z',
            "tin": faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
            "npi": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
            practicingSince: faker.date.past(20, new Date()).getFullYear(),
            agesTreatedFrom: faker.datatype.number({ min: 0, max: 10 }),
            agesTreatedTo: faker.datatype.number({ min: 11, max: 100 }),
            speciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            subSpeciality: faker.datatype.number({ min: 1, max: 5 }).toString(),
            "statusCode": "A",
            "createdBy": "system",
            "updatedBy": "system",
            "specialityOther": null,
            "profiles": [
                {
                    "providerId": 0,
                    "personalSuffix": "I",
                    "professionalSuffix": "D.O.",
                    "aliasName": "eee",
                    "preferredTimeZone": randomDateTimes.startDateTime,
                    "clientCode": "code",
                    "networkCode": "DCVV",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "contacts": [
                {
                    "providerId": 0,
                    "entityType": "email",
                    "contact": faker.person.firstName() + faker.person.lastName() + "01" + "VV@mailinator.com",
                    "isPrimary": true,
                    "receiveNotification": true,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "entityType": "Phone",
                    "contact": faker.phone.number("##########"),
                    "isPrimary": true,
                    "receiveNotification": false,
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "addresses": [
                {
                    "providerId": 0,
                    "addressType": "B",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "stateCode": "AL",
                    "zip": "75034",
                    "timeZone": "CST",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                },
                {
                    "providerId": 0,
                    "addressType": "M",
                    "address1": "7400 Gaylord Parkway",
                    "address2": "Lakeside At Frisco",
                    "city": "Frisco",
                    "zip": "75034",
                    "timeZone": "CST",
                    "stateCode": "AL",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "academics": [
                {
                    "providerId": 0,
                    "schoolName": "Christ the king convent school",
                    "degree": "high school",
                    "graduationDate": "2024-02-13T09:39:56.743Z",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "languages": [
                {
                    "providerId": 0,
                    "language": "EN",
                    "id": 0,
                    "createdBy": "system",
                    "updatedBy": "system",
                    "createdOn": "2024-02-13T09:39:56.743Z",
                    "updatedOn": "2024-02-13T09:39:56.743Z"
                }
            ],
            "id": 0,
            "createdOn": "2024-02-13T09:39:56.743Z",
            "updatedOn": "2024-02-13T09:39:56.743Z",
            "licenses": [{
                "providerId": 0,
                "stateCode": "CA",
                "licenseNumber": faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
                "licenseStatus": "Active",
                "expirationDate": randomDateTimes.endDateTime,
                "modeOfVerification": "https://www.bhec.texas.gov/verify-a-license/index.html",
                "statusCode": "A",
                "id": 0,
                "createdBy": "string",
                "createdOn": "2023-07-06T15:38:31.763",
                "updatedBy": "string",
                "updatedOn": "2024-02-16T10:29:13.633"
            }]
        };

        cy.fixture<{ AddProviderEndPoint: string }>(
            "apiEndpoints.json"
        ).then((apiEndpoints) => {
            const apiUrl: string =
                "https://provider-api." + Cypress.env("env") + ".dctelemedplatform.com";
            const AddProviderEndPoint =
                apiEndpoints.AddProviderEndPoint;
            const url = `${apiUrl}${AddProviderEndPoint}`;
            cy.task('getAccessToken').then((token) => {
                if (!token) {
                    throw new Error("Failed to retrieve access token");
                }

                const headers = AuthUtil.getHeaders(token);
                cy.log(`API URL: ${url}`);
                cy.log(`API Headers: ${JSON.stringify(headers)}`);
                cy.log(`API Payload: ${JSON.stringify(requestBody)}`);
                cy.sendRequestWithBody(url, requestBody, headers, apiMethods.POST).then(
                    (response) => {
                        expect(response.status).to.eq(201);
                        providerId = response.body.id;
                        cy.wrap(providerId).as('providerId');
                        cy.log(`API Response: ${JSON.stringify(response.body)}`);
                    }
                );
            });
        })
    });
});