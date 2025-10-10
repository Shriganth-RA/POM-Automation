describe('Practice automation website', () => {
      it('Home page - Arrivals - Add to basket - Items - Check-out - Payment gateway - Place order', () => {
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

                              let formattedPrice = `₹${total_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

                              expect(text).to.include(formattedPrice);
                        });
                  });

                  cy.get('#main-nav-wrap #main-nav').find('li').eq(5).click();  // Click the icon

                  // Get subTotal
                  cy.get('tr.cart-subtotal td span.woocommerce-Price-amount')
                        .invoke('text')
                        .then((subtotalText) => {
                              const subTotal = parseFloat(subtotalText.replace(/[₹,]/g, '').trim());
                              cy.wrap(subTotal).as('subTotal');
                        });

                  // Get discount
                  cy.get('body').then(($body) => {
                        if ($body.find('tr.cart-discount td span.woocommerce-Price-amount').length > 0) {
                              cy.get('tr.cart-discount td span.woocommerce-Price-amount')
                                    .invoke('text')
                                    .then((discountText) => {
                                          const discount = parseFloat(discountText.replace(/[₹,]/g, '').trim());
                                          cy.wrap(discount).as('discount');
                                    });
                        } else {
                              // No discount applied → set discount to 0
                              cy.wrap(0).as('discount');
                              cy.log('No discount applied');
                        }
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
                                                expect(subTotal).to.be.lessThan(total);  // Check the subTotal is less the total
                                          });
                              });
                        });
                  });

                  cy.get('.wc-proceed-to-checkout a').click();  // Click the check-out button
                  cy.url().should('include', '/checkout');  // Verify the url

                  // Add a coupon code
                  // cy.get('.woocommerce-info a.showcoupon').click();
                  // cy.get('input[name="coupon_code"]').type(data.couponCode).should('have.value', data.couponCode);

                  // cy.get('input[name="apply_coupon"]').should('be.visible').click();

                  // Billing details
                  // First name
                  cy.get('.woocommerce-billing-fields input[name="billing_first_name"]').type(data.firstName).should('have.value', data.firstName);

                  // Last name
                  cy.get('.woocommerce-billing-fields input[name="billing_last_name"]').type(data.lastName).should('have.value', data.lastName);

                  // Company name
                  cy.get('#billing_company_field').type(data.companyName);

                  // Email
                  cy.get('#billing_email_field input[type="email"]').type(data.email).should('have.value', data.email);

                  // Phone number
                  cy.get('#billing_phone_field input[type="tel"]').type(data.phone).should('have.value', data.phone);

                  // Country
                  cy.get('#billing_country_field #billing_country').select(data.country, { force: true });

                  // Address
                  cy.get('#billing_address_1_field input[type="text"]').type(data.streetAddress).should('have.value', data.streetAddress);

                  // Apartment / building name
                  cy.get('#billing_address_2_field input[type="text"]').type(data.apartmentName).should('have.value', data.apartmentName);

                  // City
                  cy.get('#billing_city_field input[type="text"]').type(data.town).should('have.value', data.town);

                  // State
                  cy.get('#billing_state_field #s2id_billing_state').click();
                  cy.get('#s2id_autogen2_search').type(`${data.state}{enter}`);

                  // Post / ZIP code
                  cy.get('#billing_postcode_field #billing_postcode').type(data.postCode).should('have.value', data.postCode);

                  // Click the create-account
                  cy.get('.woocommerce-billing-fields #createaccount').check();

                  // Password
                  cy.get('#account_password_field #account_password').type(data.password, {force: true}).should('have.value', data.password);

                  // Additional information        
                  cy.get('.woocommerce-shipping-fields #order_comments_field textarea').type(data.orderNotes);


                  // Payment method        
                  cy.get('#payment_method_cod').click(); 
                  // cy.get('.form-row.place-order input[type="submit"]').click();

                  // Click the place-order button
                  cy.get('#place_order').click({multiple: true});
                  cy.url().should('include', '/order-received');
                  cy.get('.woocommerce-thankyou-order-received').should('be.visible').and('have.text', 'Thank you. Your order has been received.')

            });
      });
});