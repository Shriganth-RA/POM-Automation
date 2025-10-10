import HomePagePom from "../../pages/HomePage.pom";
import ProductPagePom from "../../pages/ProductPage.pom";
import CartPagePom from "../../pages/CartPage.pom";

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


      // it('Home page with three sliders only', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isSliderLength(data.sliderLength);
      // });

      // it('Home page with three arrivals only', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      // });

      // it('Home page - Image in arrivals should navigate', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.addToCart();
      //       ProductPagePom.getCartMsg();
      // });

      // it('Home page - Arrivals - Image - Description', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.isProductDescription();
      //       ProductPagePom.addToCart();
      //       ProductPagePom.getCartMsg();
      // });

      // it('Home page - Arrivals - Image - Reviews', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.isProductDescription();
      //       ProductPagePom.isProductReviews();
      //       ProductPagePom.addToCart();
      //       ProductPagePom.getCartMsg();
      // });

      // it('Home page - Arrivals - Image - Add to basket', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.getPrice().then((price) => {
      //             ProductPagePom.checkPriceInMenu(price);
      //       })
      // });

      // it('Home page - Arrivals - Add to basket with more products', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
      // });

      // it('Home page - Arrivals - Add to basket - Items', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
      //       ProductPagePom.clickCartInMenu();
      //       CartPagePom.clickProceedToCheckout();
      //       HomePagePom.verifyUrlContains("checkout");
      // });

      // it('Home page - Arrivals - Add to basket - Items - Coupons', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
      //       ProductPagePom.clickCartInMenu();
      //       CartPagePom.applyCouponCode(data.couponCode);
      //       CartPagePom.getSubTotal();
      //       CartPagePom.getDiscount();
      //       CartPagePom.getTaxRate();
      //       CartPagePom.compareTotalAndActualTotal();
      //       CartPagePom.clickProceedToCheckout();
      //       HomePagePom.verifyUrlContains("checkout");
      // });

      // it('Home page - Arrivals - Add to basket - Items - Coupons value < 450', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductId();
      //       HomePagePom.verifyUrlContains("selenium-ruby");
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(data.quantity);
      //       ProductPagePom.clickCartInMenu();
      //       CartPagePom.applyCouponCode(data.couponCode);
      //       CartPagePom.getSubTotal();
      //       CartPagePom.getDiscount();
      //       CartPagePom.getTaxRate();
      //       CartPagePom.compareTotalAndActualTotal();
      //       CartPagePom.clickProceedToCheckout();
      //       HomePagePom.verifyUrlContains("checkout");
      // });

      // it('Home page - Arrivals - Add to basket - Items - Remove book', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.getProductFromShop();
      //       HomePagePom.checkUrlwithProductName();

      //       // ✅ Chain everything properly
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
      //             .then(() => {
      //                   ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
      //                   CartPagePom.removeItemFromCart();
      //                   CartPagePom.verifyRemovalmsgFromCart();
      //                   CartPagePom.checkIsEmpty();
      //             });
      // });

      // it('Home page - Arrivals - Add to basket - Items - Add book', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.getProductFromShop();
      //       HomePagePom.checkUrlwithProductName();

      //       // ✅ Chain everything properly
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
      //             .then(() => {
      //                   ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
      //             });
      //       CartPagePom.updateTheCart(data.updateQuantity);
      //       CartPagePom.verifyCartUpdated();
      // });

      // it('Home page - Arrivals - Add to basket - Items - Add book', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.getProductFromShop();
      //       HomePagePom.checkUrlwithProductName();

      //       // ✅ Chain everything properly
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
      //             .then(() => {
      //                   ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
      //             });
      //       CartPagePom.applyCouponCode(data.couponCode);
      //       CartPagePom.getSubTotal();
      //       CartPagePom.getDiscount();
      //       CartPagePom.getTaxRate();
      //       CartPagePom.compareTotalAndActualTotal();
      // });

      // it('Home page - Arrivals - Add to basket - Items - Check-out - Update basket', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.getProductFromShop();
      //       HomePagePom.checkUrlwithProductName();

      //       // ✅ Chain everything properly
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
      //             .then(() => {
      //                   ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
      //             });
      //       CartPagePom.updateTheCart(data.updateQuantity);
      //       CartPagePom.verifyCartUpdated();
      // });

      // it('Home page - Arrivals - Add to basket - Items - Add book', () => {
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.clickHome();
      //       HomePagePom.verifyBaseUrl();
      //       HomePagePom.isArrivalProductLength(data.arrivalLength);
      //       HomePagePom.clickMenu();
      //       HomePagePom.clickShop();
      //       HomePagePom.verifyUrlContains("shop");
      //       HomePagePom.getProductFromShop();
      //       HomePagePom.checkUrlwithProductName();

      //       // ✅ Chain everything properly
      //       ProductPagePom.addProductToCartAndVerifyMenuPrice(3)
      //             .then(() => {
      //                   ProductPagePom.clickCartInMenu();    // Waits properly for previous chain
      //             });
      //       CartPagePom.applyCouponCode(data.couponCode);
      //       CartPagePom.getSubTotal();
      //       CartPagePom.getDiscount();
      //       CartPagePom.getTaxRate();
      //       CartPagePom.compareTotalAndActualTotal();
      // });

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
            CartPagePom.clickProceedToCheckout();
            HomePagePom.checkUrlwithProductName("checkout");
      });

});