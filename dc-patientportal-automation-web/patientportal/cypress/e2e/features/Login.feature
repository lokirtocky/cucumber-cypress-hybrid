Feature: Login Scenario

     Scenario: Verify user should be able to Logout the application
          When Enter the "AutomationTesting" and "Test@1234" fields
          Then User verify dasboard page url "/dashboard" is visible
          When User Logout the application
          Then User verify the "/B2C_1A_DisplayControl_sendgrid_Signin" url

     Scenario: Verifies error message "We can't seem to find your account." in login page
          Then Verify user invalid "invalidUser" and invalid password "invalidPassword" and validate get error "We can't seem to find your account." message
         
     Scenario: Verifies error message "Your password is incorrect." in login page
          Then Verify user invalid "AutomationTesting" and invalid password "invalidPassword" and validate get error "Your password is incorrect." message