describe('Practice automation website', () => {
      it('Home page - Arrivals - Add to basket with more products', () => {
            cy.fixture('user_details.json').then((data) => {
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
                        const price = parseFloat(priceText.replace(/[₹,]/g, '').trim());  // Store the price to a variable

                        cy.get('.quantity input[type="number"]').clear().type(data.quantity.toString()).should('have.value', data.quantity.toString());

                        cy.get('button[type="submit"]').contains('Add to basket').click();  // Click the Cart button
                        // Verify the product added to the basket
                        cy.get('.woocommerce-message').should(($msg) => {
                              const text = $msg.text();
                              expect(text).to.include('have been added to your basket');
                              expect(text).to.include(data.quantity.toString());
                        });

                        let total_price = price * data.quantity;
                        cy.log(`Total price: ${total_price}`);

                        cy.get('#menu-icon').click();  // Click the menu icon
                        // Check the product price is display in the menu
                        cy.get('#main-nav-wrap #main-nav').find('li').eq(5).then(($li) => {
                              const text = $li.text().replace(/\s+/g, '');

                              expect(text.toLowerCase()).to.include(`${data.quantity}items`);
                              const formattedPrice = `₹${total_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
                              expect(text).to.include(formattedPrice);
                        });
                  });
            });
      });
});