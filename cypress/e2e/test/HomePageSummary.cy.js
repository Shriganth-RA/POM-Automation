import HomePagePom from "../../pages/HomePage.pom";
import ProductPagePom from "../../pages/ProductPage.pom";
import CartPagePom from "../../pages/CartPage.pom";
import CheckoutPagepom from "../../pages/CheckoutPage.pom";
import AccountPagePom from "../../pages/AccountPage.pom";

describe('Practice automation website', () => {
      let data;

      before(() => {
            // Load fixture before running tests
            cy.fixture('details.json').then((fData) => {
                  data = fData;
            });
      });

      beforeEach(() => {
            // Visit URL before each test
            HomePagePom.visit(data.url);
      });


      // Test Case 01
      it('Home page with three sliders only', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isSliderLength(data.sliderLength);
      });


      // Test Case 02
      it('Home page with three arrivals only', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
      });


      // Test Case 03
      it('Home page - Image in arrivals should navigate', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.addToCart();
            ProductPagePom.getCartMsg();
      });


      // Test Case 04
      it('Home page - Arrivals - Image - Description', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.isProductDescription();
            ProductPagePom.addToCart();
            ProductPagePom.getCartMsg();
      });


      // Test Case 05
      it('Home page - Arrivals - Image - Reviews', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.isProductDescription();
            ProductPagePom.isProductReviews();
            ProductPagePom.addToCart();
            ProductPagePom.getCartMsg();
      });


      // Test Case 06
      it('Home page - Arrivals - Image - Add to basket', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.getPrice();
            ProductPagePom.checkPriceInMenu();
      });


      // Test Case 07
      it('Home page - Arrivals - Add to basket with more products', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
      });


      // Test Case 08
      it('Home page - Arrivals - Add to basket - Items', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
            ProductPagePom.clickCartInMenu();
            CartPagePom.clickProceedToCheckout();

            HomePagePom.verifyUrlContains("checkout");
      });


      // Test Case 09
      it('Home page - Arrivals - Add to basket - Items - Coupons', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
            ProductPagePom.clickCartInMenu();

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();

            HomePagePom.verifyUrlContains("checkout");
      });


      // Test Case 10
      it('Home page - Arrivals - Add to basket - Items - Coupons value < 450', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductId();
            HomePagePom.verifyUrlContains("selenium-ruby");

            ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
            ProductPagePom.clickCartInMenu();

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();

            HomePagePom.verifyUrlContains("checkout");
      });


      // Test Case 11
      it('Home page - Arrivals - Add to basket - Items - Remove book', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                        CartPagePom.removeItemFromCart();
                        CartPagePom.verifyRemovalmsgFromCart();
                        CartPagePom.checkIsEmpty();
                  });
      });


      // Test Case 12
      it('Home page - Arrivals - Add to basket - Items - Add book', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });
            CartPagePom.updateTheCart(data.updateQuantity);
            CartPagePom.verifyCartUpdated();
      });


      // Test Case 13
      it('Home page - Arrivals - Add to basket - Items - Add book', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
      });


      // Test Case 14
      it('Home page - Arrivals - Add to basket - Items - Check-out - Update basket', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });

            CartPagePom.updateTheCart(data.updateQuantity);
            CartPagePom.verifyCartUpdated();
      });


      // Test Case 15
      it('Home page - Arrivals - Add to basket - Items - Check-out total & Sub-total condition', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
      });


      // Test Case 16
      it('Home page - Arrivals - Add to basket - Items - Check-out functionality', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();
            CartPagePom.checkUrl("checkout");
      });


      // Test Case 17
      it('Home page - Arrivals - Add to basket - Items - Check-out - Payment gateway', () => {
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();
            CartPagePom.checkUrl("checkout");

            CheckoutPagepom.billingDetails(data.firstName, data.lastName, data.companyName, data.email, data.phone, data.country, data.streetAddress, data.apartmentName, data.town, data.state, data.postCode, data.password, data.orderNotes);
            CheckoutPagepom.paymentMethod();

            HomePagePom.clickMenu();

            ProductPagePom.clickCartInMenu();

            CartPagePom.removeItemFromCart();
            CartPagePom.verifyRemovalmsgFromCart();
      });


      // Test Case 18
      it('Home page - Arrivals - Add to basket - Items - Check-out - Payment gateway', () => {
            AccountPagePom.logIn(data.email, data.password);

            HomePagePom.verifyBaseUrl();
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.clickHome();
            HomePagePom.verifyBaseUrl();
            HomePagePom.isArrivalProductLength(data.arrivalLength);
            HomePagePom.clickMenu();
            HomePagePom.clickShop();
            HomePagePom.verifyUrlContains("shop");
            HomePagePom.getProductFromShop();
            HomePagePom.checkUrlwithProductName();

            // ✅ Chain everything properly
            ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity)
                  .then(() => {
                        ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
                  });

            CartPagePom.applyCouponCode(data.couponCode);
            CartPagePom.getSubTotal();
            CartPagePom.getDiscount();
            CartPagePom.getTaxRate();
            CartPagePom.compareTotalAndActualTotal();
            CartPagePom.clickProceedToCheckout();
            CartPagePom.checkUrl("checkout");

            CheckoutPagepom.billingDetails(data.firstName, data.lastName, data.companyName, data.email, data.phone, data.country, data.streetAddress, data.apartmentName, data.town, data.state, data.postCode, data.password, data.orderNotes);
            CheckoutPagepom.paymentMethod();
            CheckoutPagepom.clickPlaceOrderButton();
            CheckoutPagepom.checkOrderPlaced();
      });


});