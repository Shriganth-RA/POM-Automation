describe('Practice automation website', () => {
      it('Home page - Arrivals - Image - Description', () => {
            cy.visit('https://practice.automationtesting.in/');  // Navigate to this url

            cy.get('#menu-icon').click();  // Click the menu icon

            cy.get('#main-nav-wrap #main-nav').find('li').eq(0).click();  // Click the shop icon
            cy.url().should('include', '/shop');  // Verify the url

            cy.get('#content .woocommerce-breadcrumb').contains('Home').click();  // Click the home icon
            cy.url().should('eq', 'https://practice.automationtesting.in/');  // Verify the url

            cy.get('.products').should('have.length', 3); // Verify the length of the arrival

            // const product = cy.get('.products').eq(0);
            cy.get('.products').eq(0).click();  // Click the product image
            cy.url().should('include', '/product/selenium-ruby/');  // Verify the url

            cy.get('div[itemprop="description"] p').should('exist').and('be.visible');  // Verify the product has description

            cy.get('button[type="submit').contains('Add to basket').click();  // Click the Cart button
            cy.get('.woocommerce-message').should('contain.text', 'has been added to your basket.');  // Verify the product added to the basket
      });
});