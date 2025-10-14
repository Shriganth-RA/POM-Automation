describe('Practice automation website', () => {
      it('Home page with three arrivals only', () => {
            cy.visit('https://practice.automationtesting.in/');  // Navigate to this url

            cy.get('#menu-icon').click();  // Click the menu icon

            cy.get('#main-nav-wrap #main-nav').find('li').eq(0).click();  // Click the shop icon
            cy.url().should('include', '/shop');  // Verify the url

            cy.get('#content .woocommerce-breadcrumb').contains('Home').click();  // Click the home icon
            cy.url().should('eq', 'https://practice.automationtesting.in/');  // Verify the url

            cy.get('.products').should('have.length', 3); // Verify the length of the arrival
      });
});