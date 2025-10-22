class CheckoutPage {
      billingDetails(firstName, lastName, companyName, email, phone, country, streetAddress, apartmentName, town, state, postCode, password, orderNotes) {
            // First name
            cy.get('.woocommerce-billing-fields input[name="billing_first_name"]')
                  .clear()                              // clear existing text first
                  .type(firstName)
                  .should('have.value', firstName);


            // Last name
            cy.get('.woocommerce-billing-fields input[name="billing_last_name"]').clear().type(lastName).should('have.value', lastName);

            // Company name
            cy.get('#billing_company_field').clear().type(companyName);

            // Email
            cy.get('#billing_email_field input[type="email"]').clear().type(email).should('have.value', email);

            // Phone number
            cy.get('#billing_phone_field input[type="tel"]').clear().type(phone).should('have.value', phone);

            // Country
            cy.get('#billing_country_field #billing_country').select(country, { force: true });

            // Address
            cy.get('#billing_address_1_field input[type="text"]').clear().type(streetAddress).should('have.value', streetAddress);

            // Apartment / building name
            cy.get('#billing_address_2_field input[type="text"]').clear().type(apartmentName).should('have.value', apartmentName);

            // City
            cy.get('#billing_city_field input[type="text"]').clear().type(town).should('have.value', town);

            // State
            cy.get('#billing_state_field #s2id_billing_state').click();
            cy.get('#s2id_autogen2_search').type(`${state}{enter}`);

            // Post / ZIP code
            cy.get('#billing_postcode_field #billing_postcode').clear().type(postCode).should('have.value', postCode);

            // Click the create-account
            // cy.get('.woocommerce-billing-fields #createaccount').check();

            // Password
            // cy.get('#account_password_field #account_password').clear().type(password).should('have.value', password);

            // Additional information        
            cy.get('.woocommerce-shipping-fields #order_comments_field textarea').clear().type(orderNotes);
      }


      paymentMethod() {
            // Payment method        
            cy.get('#payment_method_cod').click();
            cy.get('.form-row.place-order input[type="submit"]').click();
      }


      clickPlaceOrderButton() {
            // ✅ Ensure button is visible and enabled before clicking
            cy.get('#place_order', { timeout: 10000 })
                  .should('exist')
                  .should('be.visible')
                  .should('not.be.disabled');

            // ✅ Reselect (prevents stale element reference)
            cy.get('#place_order').click({ force: true });

            // ✅ Wait for redirect confirmation
            cy.url({ timeout: 20000 }).should('include', '/order-received');
      }



      checkOrderPlaced() {
            cy.get('.woocommerce-thankyou-order-received').should('be.visible').and('have.text', 'Thank you. Your order has been received.');
      }


      compareTaxPercentage(country, Indtax, Abrodtax) {
            if (country === "IN") {
                  cy.get('@subTotal').then((subTotal) => {
                        cy.get('@tax').then((tax) => {
                              const percentage = (tax / subTotal) * 100;
                              cy.wrap(percentage).as('percentage');
                              cy.log(`Percentage: ${percentage}`);

                              cy.get('@percentage').should('eq', Indtax);
                        })
                  })
            } else {
                  cy.get('@subTotal').then((subTotal) => {
                        cy.get('@tax').then((tax) => {
                              const percentage = (tax / subTotal) * 100;
                              cy.wrap(percentage).as('percentage');
                              cy.log(`Percentage: ${percentage}`);

                              cy.get('@percentage').should('eq', Abrodtax);
                        })
                  })
            }
      }

}

export default new CheckoutPage;