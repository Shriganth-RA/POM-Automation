import HomePagePom from "./HomePage.pom";

class AccountPage {

      // Login In Functionality
      logIn(username, password) {
            HomePagePom.clickMenu();

            cy.get('#main-nav-wrap #main-nav li').contains('My Account').click(); // Click "MyAccount"

            cy.get('input#username').type(username).should('have.value', username);
            cy.get('input#password').type(password).should('have.value', password);
            cy.get('.u-column1 input[type="submit"]').click();
            HomePagePom.clickLogo();
      }


      // Log Out Functionality
}


export default new AccountPage();