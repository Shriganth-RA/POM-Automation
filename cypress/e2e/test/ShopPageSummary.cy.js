import HomePagePom from "../../pages/HomePage.pom"
import ProductPagePom from "../../pages/ProductPage.pom";


describe('Practice automation website', () => {
      let details;
      let user_details;

      before(() => {
            // Load the CSV file
            cy.fixture('userDetails.csv').then((fdata) => {
                  user_details = fdata;
            });

            // Load the JSON file
            cy.fixture('details.json').then((fdata) => {
                  details = fdata;
            })
      })

      beforeEach(() => {
            // Navigate to the URL
            HomePagePom.visit(details.url);
      })

      // Test Case 01
      // it('Shop-Filter By Price Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.adjustPriceFilter(150, 450);
      // })


      // Test Case 02
      // it ('Shop-Product Categories Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();

      //       ProductPagePom.clickProduct("Android Quick Start Guide");
      // })


      // Test Case 03
      // it ('Shop-Default Sorting Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();

      //       ProductPagePom.popularityFilter('Sort by popularity');
      // })


      // Test Case 04
      // it ('Shop-Default Sorting Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();

      //       ProductPagePom.popularityFilter('Sort by average rating');
      // })


      // Test Case 05
      // it('Shop-Default Sorting Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();

      //       ProductPagePom.popularityFilter('Sort by newness');
      // })


      // Test Case 06
      // it('Shop-Default Sorting Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();

      //       ProductPagePom.popularityFilter('Sort by price: low to high');
      // })


      // Test Case 06
      // it('Shop-Default Sorting Functionality', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();

      //       ProductPagePom.popularityFilter('Sort by price: high to low');
      // })


      // Test Case 07
      it ('Shop-Read More Functionality', () => {

      })
})