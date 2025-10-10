class CartPage {

      checkUrl(pageName) {
            cy.url().should('include')
      }

      clickProceedToCheckout() {
            cy.get('.wc-proceed-to-checkout a').click();  // Click the "Proceed to checkout" button
      }

      applyCouponCode(couponCode) {
            cy.get('input[name="coupon_code"]').type(couponCode).should('have.value', couponCode);  // Enter a coupon code
            cy.get('input[name="apply_coupon"]').click();
      }

      getSubTotal() {
            // Get subTotal
            cy.get('tr.cart-subtotal td span.woocommerce-Price-amount')
                  .invoke('text')
                  .then((subtotalText) => {
                        const subTotal = parseFloat(subtotalText.replace(/[₹,]/g, '').trim());
                        cy.wrap(subTotal).as('subTotal');
                  });
      }

      getDiscount() {
            // Get discount
            cy.get('tr.cart-discount td span.woocommerce-Price-amount')
                  .invoke('text')
                  .then((discountText) => {
                        const discount = parseFloat(discountText.replace(/[₹,]/g, '').trim());
                        cy.wrap(discount).as('discount');
                  });
      }

      getTaxRate() {
            // Get tax rate
            cy.get('tr.tax-rate td span.woocommerce-Price-amount')
                  .invoke('text')
                  .then((taxText) => {
                        const tax = parseFloat(taxText.replace(/[₹,]/g, '').trim());
                        cy.wrap(tax).as('tax');
                  });
      }

      compareTotalAndActualTotal() {
            cy.get('@subTotal').then((subTotal) => {
                  cy.get('@discount').then((discount) => {
                        cy.get('@tax').then((tax) => {
                              const expectedTotal = subTotal - discount + tax;  // Correct calculation
                              cy.get('tr.order-total td span.woocommerce-Price-amount')
                                    .invoke('text')
                                    .then((totalText) => {
                                          const total = parseFloat(totalText.replace(/[₹,]/g, '').trim());

                                          cy.log(`Actual: ${total}`);
                                          const totalWithDiscount = total + discount;

                                          expect(expectedTotal.toFixed(2)).to.eq(total.toFixed(2));  // Check the expected total and actual total are equal
                                          expect(subTotal).to.be.lessThan(totalWithDiscount);  // Check the subTotal is less the total
                                    });
                        });
                  });
            });
      }

      removeItemFromCart() {
            // Now remove the item safely
            cy.get('.cart_item', { timeout: 10000 }).should('exist').first().within(() => {
                  cy.get('td.product-name').invoke('text').then((cartItem) => {
                        cy.wrap(cartItem.trim()).as('cartItem');
                  });
            });

            cy.get('.cart_item .product-remove a.remove', { timeout: 10000 }).first().click();
      }

      verifyRemovalmsgFromCart() {
            // Verify removal message
            cy.get('@cartItem').then((cartItem) => {
                  cy.get('.woocommerce-message', { timeout: 10000 })
                        .should('be.visible')
                        .and('contain.text', `${cartItem} removed`);
            });
      }

      checkIsEmpty() {
            // Confirm basket is empty
            cy.get('.cart-empty', { timeout: 10000 })
                  .should('contain.text', 'Your basket is currently empty');
      }

      updateTheCart(updateQuantity) {
            cy.get('table.shop_table').find('tr.cart_item').eq(0).within(() => {
                  cy.get('.product-quantity .quantity input[type="number"]').clear().type(updateQuantity).should('have.value', updateQuantity);  // Increase the quantity
            });
            cy.get('input[name="update_cart"]').should('be.visible').click();  // Click the update-cart button
      }

      verifyCartUpdated() {
            cy.get('.woocommerce-message').should('be.visible').and('have.text', 'Basket updated.');  // Verify the basket is updated
      }

      

}

export default new CartPage;