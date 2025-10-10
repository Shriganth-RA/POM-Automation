class HomePage {
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
}

export default new HomePage();
