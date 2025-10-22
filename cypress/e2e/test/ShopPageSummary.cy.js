import CartPagePom from "../../pages/CartPage.pom";
import CheckoutPagePom from "../../pages/CheckoutPage.pom";
import HomePagePom from "../../pages/HomePage.pom"
import ProductPagePom from "../../pages/ProductPage.pom";
import AccountPagePom from "../../pages/AccountPage.pom";


describe('Practice automation website', () => {
      let details;
      let user_details;

      before(() => {
            // Load the CSV file
            cy.loadCsv('userDetails.csv').then((data) => {
                  user_details = data[0]; // first row
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


      // Test Case 02
      it ('Shop-Product Categories Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.clickProduct("Android Quick Start Guide");
      })


      // Test Case 03
      it ('Shop-Default Sorting Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.popularityFilter('Sort by popularity');
      })


      // Test Case 04
      it ('Shop-Default Sorting Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.popularityFilter('Sort by average rating');
      })


      // Test Case 05
      it('Shop-Default Sorting Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.popularityFilter('Sort by newness');
      })


      // Test Case 06
      it('Shop-Default Sorting Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.popularityFilter('Sort by price: low to high');
      })


      // Test Case 07
      it('Shop-Default Sorting Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.popularityFilter('Sort by price: high to low');
      })


      // Test Case 08
      // it ('Shop-Read More Functionality', () => {

      // })


      // Test Case 09
      it ('Shop-Sale Functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.clickMostSaleProduct();
      })


      // Test Case 10
      it('Shop-Add To Basket-View Basket Functionality', () => {
            AccountPagePom.logIn(details.email, details.password);

            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.clickProduct(details.productName);

            HomePagePom.verifyUrlContains(details.productName);

            ProductPagePom.getPrice();
            ProductPagePom.checkPriceInMenu();
            ProductPagePom.clickCartInMenu();

            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();

            CheckoutPagePom.billingDetails(details.firstName, details.lastName, details.companyName, details.email, details.phone, details.country, details.streetAddress, details.apartmentName, details.town, details.state, details.postCode, details.password, details.orderNotes);
            CheckoutPagePom.paymentMethod();
            CheckoutPagePom.clickPlaceOrderButton();
            CheckoutPagePom.checkOrderPlaced();

      })


      // Test Case 11
      it('Shop-Add To Basket-View Basket Through Item Link', () => {
            AccountPagePom.logIn(details.email, details.password);

            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.clickProduct(details.productName);

            HomePagePom.verifyUrlContains(details.productName);

            ProductPagePom.getPrice();
            ProductPagePom.checkPriceInMenu();
            ProductPagePom.clickCartInMenu();

            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();

            CheckoutPagePom.billingDetails(details.firstName, details.lastName, details.companyName, details.email, details.phone, details.country, details.streetAddress, details.apartmentName, details.town, details.state, details.postCode, details.password, details.orderNotes);
            CheckoutPagePom.paymentMethod();
            CheckoutPagePom.clickPlaceOrderButton();
            CheckoutPagePom.checkOrderPlaced();

      })


      // Test Case 12
      it('Shop-Add To Basket-View Basket-Tax Functionality', () => {
            AccountPagePom.logIn(details.email, details.password);
            AccountPagePom.clearSessionandStorage();

            HomePagePom.clickMenu();
            HomePagePom.clickShop();

            ProductPagePom.clickProduct(details.productName);

            HomePagePom.verifyUrlContains(details.productName);

            ProductPagePom.getPrice();
            ProductPagePom.checkPriceInMenu();
            ProductPagePom.clickCartInMenu();

            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();

            CheckoutPagePom.billingDetails(details.firstName, details.lastName, details.companyName, details.email, details.phone, details.country, details.streetAddress, details.apartmentName, details.town, details.state, details.postCode, details.password, details.orderNotes);
            CheckoutPagePom.compareTaxPercentage(details.country, details.taxPercentIND, details.taxPercentABROD);

      })

})