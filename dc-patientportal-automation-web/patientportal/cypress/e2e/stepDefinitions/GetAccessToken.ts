import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AuthUtil from "cypress/support/utils/AuthUtils";

Given("User login the application and get the Access token", () => {
  AuthUtil.getAccessToken();
});
