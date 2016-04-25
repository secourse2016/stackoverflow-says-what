angular.module('myApp', ['angular-stripe']);

/* Angular-Stripe exposes stripeProvider */
/* Use the stripeProvider in your config to set the publishable key */
 .config(function (stripeProvider) {
    stripeProvider.setPublishableKey('pk_test_wAzEmAILhEkjKJZdSiui6s98');
  });

 