import HomePagePom from "../../pages/HomePage.pom"


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
      it('Shop-Filter By Price Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.adjustPriceFilter(150, 450);
      })
})