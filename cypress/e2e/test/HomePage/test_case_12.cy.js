describe('Practice automation website', () => {
      it('Home page - Arrivals - Add to basket - Items - Add book', () => {
            cy.fixture('user_details.json').then((data) => {
                  cy.visit('https://practice.automationtesting.in/');  // Navigate to this url

                  cy.get('#menu-icon').click();  // Click the menu icon

                  cy.get('#main-nav-wrap #main-nav').find('li').eq(0).click();  // Click the shop icon
                  cy.url().should('include', '/shop');  // Verify the url

                  cy.get('#content .woocommerce-breadcrumb').contains('Home').click();  // Click the home icon
                  cy.url().should('eq', 'https://practice.automationtesting.in/');  // Verify the url

                  cy.get('.products').should('have.length', 3); // Verify the length of the arrival

                  cy.get('#menu-icon').click();  // Click the menu icon

                  cy.get('#main-nav-wrap #main-nav').find('li').eq(0).click();  // Click the shop icon
                  cy.url().should('include', '/shop');  // Verify the url


                  // const product = cy.get('.products').eq(0);
                  cy.get('.products').find('li').eq(1).within(() => {
                        cy.get('h3').invoke('text').then((productName) => {
                              cy.wrap(productName).as('productName');  // Wrap the product
                        });
                        cy.get('img').click();  // Click the product image
                  });

                  cy.get('@productName').then((productName) => {
                        const slug = productName.toLowerCase().replace(/\s+/g, '-');
                        cy.url().should('include', `/product/${slug}/`);  // Verify the url
                  })


                  cy.get('.price').invoke('text').then((priceText) => {
                        let price = parseInt(priceText.replace(/[₹,]/g, '').trim());  // Store the price to a variable
                        price = parseFloat(price);
                        cy.log(`Price: ${price}`);

                        const quantity = 30;
                        cy.get('.quantity input[type="number"]').clear().type(quantity.toString()).should('have.value', quantity.toString());

                        cy.get('button[type="submit"]').contains('Add to basket').click();  // Click the Cart button
                        // Verify the product added to the basket
                        cy.get('.woocommerce-message').should(($msg) => {
                              const text = $msg.text();
                              expect(text).to.include('have been added to your basket');
                              expect(text).to.include(quantity.toString());
                        });

                        let total_price = price * quantity;
                        cy.log(`Total price: ${total_price}`);

                        cy.get('#menu-icon').click();  // Click the menu icon
                        // Check the product price is display in the menu
                        cy.get('#main-nav-wrap #main-nav').find('li').eq(5).then(($li) => {
                              const text = $li.text().replace(/\s+/g, '');

                              expect(text.toLowerCase()).to.include(`${quantity}items`);

                              let formattedPrice = `₹${total_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

                              expect(text).to.include(formattedPrice);
                        });
                  });

                  cy.get('#main-nav-wrap #main-nav').find('li').eq(5).click();  // Click the icon

                  cy.get('table.shop_table').find('tr.cart_item').eq(0).within(() => {
                        cy.get('.product-quantity .quantity input[type="number"]').clear().type("20").should('have.value', '20');  // Increase the quantity
                  })

                  cy.get('input[name="update_cart"]').should('be.visible').click();  // Click the update-cart button
                  cy.get('.woocommerce-message').should('be.visible').and('have.text', 'Basket updated.');  // Verify the basket is updated

            });
      });
});