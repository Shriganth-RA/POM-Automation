describe('Practice automation website', () => {
      it('Home page - Arrivals - Image - Add to basket', () => {
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

            cy.get('.price').invoke('text').then((priceText) => {
                  const price = priceText.trim();  // Store the price to a variable

                  cy.get('button[type="submit').contains('Add to basket').click();  // Click the Cart button
                  cy.get('.woocommerce-message').should('contain.text', 'has been added to your basket.');  // Verify the product added to the basket

                  cy.get('#menu-icon').click();  // Click the menu icon
                  cy.get('#main-nav-wrap #main-nav').find('li').eq(5).should('contain.text', price);  // Check the product price is display in the menu
            });

      });
});