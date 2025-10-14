describe('Practice automation website', () => {
      it('Home page with three sliders only', () => {
            cy.visit('https://practice.automationtesting.in/');  // Navigate to this url

            cy.get('#menu-icon').click();  // Click the menu icon

            cy.get('#main-nav-wrap #main-nav').find('li').first().click();  // Click the shop icon
            cy.url().should('include', '/shop');  // Verify the url

            cy.get('#content .woocommerce-breadcrumb').contains('Home').click();  // Click the home icon
            cy.url().should('eq', 'https://practice.automationtesting.in/');  // Verify the url

            cy.get('.n2-padding').find('.n2-ss-slide-background-image').should('have.length', 3); // Verify the length of the slider
      });
});