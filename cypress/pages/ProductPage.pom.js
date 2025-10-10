import HomePagePom from "./HomePage.pom";

class ProductPage {

      addToCart() {
            cy.get('button[type="submit"]').contains('Add to basket').click();  // Click the Cart button
      }

      getCartMsg() {
            cy.get('.woocommerce-message').should('contain.text', 'has been added to your basket.');  // Verify the product added to the basket
      }

      getCartMsgWithQuantity(quantity) {
            // Verify the product added to the basket
            cy.get('.woocommerce-message').should(($msg) => {
                  const text = $msg.text();
                  expect(text).to.include('have been added to your basket');
                  expect(text).to.include(quantity.toString());
            });
      }

      isProductDescription() {
            cy.get('div[itemprop="description"] p').should('exist').and('be.visible');  // Verify the product has description
      }

      isProductReviews() {
            cy.get('.reviews_tab').click();  // Click the review button
            cy.get('#reviews #comments').should('be.visible').and('contain.text', 'Reviews'); // Ensure reviews section is displayed
      }

      getPrice() {
            // return cy.get('.price ins .woocommerce-Price-amount').invoke('text').then((priceText) => {
            //       let price = parseInt(priceText.replace(/[₹,]/g, '').trim());  // Store the price to a variable
            //             price = parseFloat(price);
            //             cy.wrap(price).as('price');
            //             cy.log(`Price: ${price}`);
            // });

            cy.get('.price').then(($div) => {
                  if ($div.find('del').length == 0) {
                        return cy.get('.price').invoke('text').then((priceText) => {
                              let price = parseInt(priceText.replace(/[₹,]/g, '').trim());  // Store the price to a variable
                              price = parseFloat(price);
                              cy.wrap(price).as('price');
                              cy.log(`Price: ${price}`);
                        });
                  } else {
                        return cy.get('.price ins .woocommerce-Price-amount').invoke('text').then((priceText) => {
                              let price = parseInt(priceText.replace(/[₹,]/g, '').trim());  // Store the price to a variable
                              price = parseFloat(price);
                              cy.wrap(price).as('price');
                              cy.log(`Price: ${price}`);
                        });
                  }
            });
      }

      checkPriceInMenu(price) {
            this.addToCart();
            this.getCartMsg();

            HomePagePom.clickMenu();

            cy.get('#main-nav-wrap #main-nav').find('li').eq(5).should('contain.text', price);  // Check the product price is display in the menu
      }

      checkTotalPriceAndQuantityInMenu(total_price, quantity) {
            return cy.get('#main-nav-wrap #main-nav').find('li').eq(5).then(($li) => {
                  const text = $li.text().replace(/\s+/g, '');

                  expect(text.toLowerCase()).to.include(`${quantity}`);

                  let formattedPrice = `₹${total_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

                  expect(text).to.include(formattedPrice);
            });
      }



      setQuantity(quantity) {
            // Set quantity
            cy.get('.quantity input[type="number"]')
                  .clear()
                  .type(quantity.toString())
                  .should('have.value', quantity.toString());
      }

      addProductToCartAndVerifyMenuPrice(quantity) {

            this.getPrice();

            // Step 1: Get product price
            return cy.get('@price').then((price) => {
                  cy.log(`Price: ${price}`);
                  const total_price = price * quantity;
                  cy.log(`Total price: ${total_price}`);

                  cy.log(`Detected product price: ₹${price}`);
                  cy.log(`Expected total for ${quantity} items: ₹${total_price}`);

                  // Step 2: Set quantity and add to cart
                  this.setQuantity(quantity);
                  this.addToCart();
                  this.getCartMsgWithQuantity(quantity);

                  // Step 3: Wait for cart update and open menu
                  cy.wait(1000);
                  HomePagePom.clickMenu();

                  // Step 4: Verify the total inside a Cypress chain
                  return this.checkTotalPriceAndQuantityInMenu(total_price, quantity)
                        .then(() => {
                              cy.log(`Returning total price: ${total_price}`);
                              return cy.wrap(total_price);
                        });  // ✅ wrap numeric value before returning
            });
      }



      clickCartInMenu() {
            cy.get('#main-nav-wrap #main-nav').find('li').eq(5).click();  // Click the icon
      }




}

export default new ProductPage;