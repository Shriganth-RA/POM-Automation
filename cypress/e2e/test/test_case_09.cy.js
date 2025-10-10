describe('Practice automation website', () => {
      it('Home page - Arrivals - Add to basket - Items - Coupons', () => {
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

                  cy.get('#main-nav-wrap #main-nav').find('li').eq(5).click();  // Click the icon

                  cy.get('input[name="coupon_code"]').type(data.couponCode).should('have.value', data.couponCode);  // Enter a coupon code
                  cy.get('input[name="apply_coupon"]').click();

                  // Get subTotal
                  cy.get('tr.cart-subtotal td span.woocommerce-Price-amount')
                        .invoke('text')
                        .then((subtotalText) => {
                              const subTotal = parseFloat(subtotalText.replace(/[₹,]/g, '').trim());
                              cy.wrap(subTotal).as('subTotal');
                        });

                  // Get discount
                  cy.get('tr.cart-discount td span.woocommerce-Price-amount')
                        .invoke('text')
                        .then((discountText) => {
                              const discount = parseFloat(discountText.replace(/[₹,]/g, '').trim());
                              cy.wrap(discount).as('discount');
                        });

                  // Get tax rate
                  cy.get('tr.tax-rate td span.woocommerce-Price-amount')
                        .invoke('text')
                        .then((taxText) => {
                              const tax = parseFloat(taxText.replace(/[₹,]/g, '').trim());
                              cy.wrap(tax).as('tax');
                        });

                  cy.get('@subTotal').then((subTotal) => {
                        cy.get('@discount').then((discount) => {
                              cy.get('@tax').then((tax) => {
                                    const expectedTotal = subTotal - discount + tax;  // Correct calculation
                                    cy.get('tr.order-total td span.woocommerce-Price-amount')
                                          .invoke('text')
                                          .then((totalText) => {
                                                const total = parseFloat(totalText.replace(/[₹,]/g, '').trim());

                                                cy.log(`Actual: ${total}`);

                                                expect(expectedTotal.toFixed(2)).to.eq(total.toFixed(2));  // Check the expected total and actual total are equal
                                          });
                                    });
                              });
                        });
                        
                  cy.get('.wc-proceed-to-checkout a').click();  // Click the "Proceed to checkout" button
                  cy.url().should('include', '/checkout/');  // Check the url
            });
      });
});