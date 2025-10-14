describe('Practice automation website', () => {
      it('Home page - Image in arrivals should navigate', () => {
            cy.visit('https://practice.automationtesting.in/');  // Navigate to this url

            cy.get('#menu-icon').click();  // Click the menu icon

            cy.get('#main-nav-wrap #main-nav').find('li').eq(0).click();  // Click the shop icon
            cy.url().should('include', '/shop');  // Verify the url

            cy.get('#content .woocommerce-breadcrumb').contains('Home').click();  // Click the home icon
            cy.url().should('eq', 'https://practice.automationtesting.in/');  // Verify the url

            cy.get('.products').should('have.length', 3);  // Verify the length of the arrival

            // const product = cy.get('.products').eq(0);
            cy.get('.products').first().click();  // Click the product image
            cy.url().should('include', '/product/selenium-ruby/');  // Verify the url

            // cy.get('.products').first().within(() => {
            //       cy.get('h3').invoke('text').then((productName) => {
            //             cy.wrap(productName).as('productName');  // Wrap the product
            //       });
            //       cy.get('img').click();
            // });
            // cy.get('@productName').then((productName) => {
            //       cy.url().should('include', `/product/${productName}/`);  // Verify the url
            // })

            cy.get('button[type="submit"]').contains('Add to basket').click();  // Click the Cart button
            cy.get('.woocommerce-message').should('contain.text', 'has been added to your basket.');  // Verify the product added to the basket
      });
});