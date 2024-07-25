Feature: Verify Registration flow is working

     Scenario: Verify Patient registration is working
          When User navigates to stage url and click Verify Your Account link
          And Enter the member verification "113001" and "MW" and  "Nofee" details
          Then Verify 'Verified Successfully' success message is displayed
          Then Verify user navigates to 'registration/patient' page url
          When Select the Preffered language from the dropdown and select the address
          And Enter the Registration details for user to be registered
          And Click on TERMS and CONDITIONS checkbox
          And Click on Go to Dashboard button
          And Logout the user
          And Login with new credentials with user
          Then User verify dasboard page url "/dashboard" is visible

     Scenario: Verify Student Registration is working
          And User enters the student verification "txschoolic" and "test" and "01/01/2003" and "37387500" details
          Then Verify 'Verified Successfully' success message is displayed
          Then Verify user navigates to 'registration/student' page url
          When Select the Preffered language from the dropdown and select the address
          And Enter the Registration details for user to be registered
          Then Verify user navigates to '/registration/parent-information' page url
          And Enter the Parent Guardian Information
          Then Verify user navigates to '/registration/patient-login-info?type=student' page url
          And Click on Go to Dashboard button
          And Logout the user
          And Login with new credentials with user
          Then User verify dasboard page url "/dashboard" is visible