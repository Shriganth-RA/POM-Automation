class HomePage {
      clickLogo() {
            cy.get('.header-bar #site-logo').click();
      }


      visit(url) {
            cy.visit(url); // Navigate to URL
      }


      clickMenu() {
            cy.get('#menu-icon').click({ force: true }); // Click the menu icon
      }


      clickShop() {
            cy.get('#main-nav-wrap #main-nav li').contains('Shop').click(); // Click "Shop"
      }


      clickHome() {
            cy.get('.woocommerce-breadcrumb a').contains('Home').click(); // Click "Home"
      }


      verifyBaseUrl() {
            cy.url().should('eq', 'https://practice.automationtesting.in/'); // Verify homepage
      }


      verifyUrlContains(partialPath) {
            cy.url().should('include', `/${partialPath}`); // Verify URL contains path
      }


      isSliderLength(expectedLength) {
            cy.get('.n2-ss-slide-background-image')
                  .should('have.length', expectedLength); // Verify slider count
      }


      isArrivalProductLength(expectedLength) {
            cy.get('.products .product')
                  .should('have.length', expectedLength); // Verify arrivals count
      }


      getProductId() {
            cy.get('.products').eq(0).click();
      }


      getProductFromShop() {
            cy.get('.products').find('li').eq(1).within(() => {
                  cy.get('h3').invoke('text').then((productName) => {
                        cy.wrap(productName).as('productName');  // Wrap the product
                  });
                  cy.get('img').click();  // Click the product image
            });
      }


      checkUrlwithProductName() {
            cy.get('@productName').then((productName) => {
                  const slug = productName.toLowerCase().replace(/\s+/g, '-');
                  cy.url().should('include', `/product/${slug}/`);  // Verify the url
            })
      }


      adjustPriceFilter(minPrice, targetMax) {
            //Select both slider handles
            cy.get('.ui-slider-handle').first().as('minHandle');
            cy.get('.ui-slider-handle').last().as('maxHandle');

            cy.get('.price_slider').then($slider => {
                  const width = $slider.width();

                  const maxPrice = 500;

                  // Calculate movement percentage for the right handle
                  const percent = (targetMax - minPrice) / (maxPrice - minPrice); // e.g. (450-150)/(500-150)=0.857
                  const targetX = width * percent;

                  // Move the max handle to 75% (example)
                  cy.get('@maxHandle')
                        .trigger('mousedown', { which: 1 })
                        .trigger('mousemove', { clientX: targetX }) // adjust X movement in opposite direction
                        .trigger('mouseup', { force: true });

            });

            // Click the Filter button
            cy.get('.price_slider_amount .button').click();

            // Verify the slider
            cy.get('.price_label .from').invoke('text').then((from) => {
                  cy.wrap(from).as('expectedMinPrice');     // Wrap the minimum price
            });
            cy.get('.price_label .to').invoke('text').then((to) => {
                  cy.wrap(to).as('expectedMaxPrice');
            })

            cy.get('@expectedMinPrice').then((expectPrice) => {
                  // Log the Expected minimum price
                  cy.log(`Expected min price: ${expectPrice}`);
            });
            cy.get('@expectedMaxPrice').then((expectPrice) => {
                  // Log the Expected maximum price
                  cy.log(`Expected max price: ${expectPrice}`);
            });
      }
}

export default new HomePage();
