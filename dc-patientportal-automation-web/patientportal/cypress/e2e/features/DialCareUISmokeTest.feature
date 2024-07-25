Feature: Smoke Test Scenarios
     Background:
          When Enter the "AutomationTesting" and "Test@1234" fields
          Then User verify dasboard page url "/dashboard" is visible

     Scenario: Verify "Email Triggering","CORS Policy" and "ADB2C" is working fine
          When Click on Hamburger icon
          And Click on My Account from hamburger
          Then Verify user navigates to "my-account-info" page url
          When Click on Dependents on MyAccount
          And Click on Add button
          And Enter the Overaged dependent input fields
          And Click on SAVE button
          And Navigates to the mailinator page and click on REGISTER button to register the dependent
          Then Login the overaged dependent with new credentials

     Scenario: Verify "Azure Database" is working
          When Click on Hamburger icon
          And Click on My Account from hamburger
          Then Verify user navigates to '/my-account-info' page url

     Scenario: Verify "DoseSpot - Pharmacy Search" is Working
          When Click on Hamburger icon
          And  Click on Request a Visit Visit
          When Select TELEDENTISTRY Vistual Visit type
          And Select State 'California' from Dropdown
          And Select Phone visit
          And Click on NEXT button
          Then Verify user navigates to '/request-virtual/pharmacy-detail' page url
          When select the reason of visit 1 from the dropdown
          And Click on SEARCH FOR PHARMACY button
          And Enter the Zip code '12345' and click on SEARCH button
          And Select pharmacy from list and click NEXT
          And Click on CONFIRM button
          And Click on NEXT button on pharmacy Details page
          Then Verify intake questions 'request-virtual/intake-questions' page url
          When Fill the intake questions
          And Click on NEXT button
          And Submit the Consent To Treat form
          Then Verify user navigates to 'request-virtual/confirm-payment' page url
          When Enter the input fields on payment page
          And  Click on Confirm and Pay button
          Then Verify 'Payment Approved' message should be displayed