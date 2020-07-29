// Be sure to have PayPal's checkout.js library and the Braintree client and PayPal checkout scripts loaded on your page.
// <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>
// <script src="https://js.braintreegateway.com/web/3.39.0/js/client.min.js"></script>
// <script src="https://js.braintreegateway.com/web/3.39.0/js/paypal-checkout.min.js"></script>

paypal.Button.render({
  braintree: braintree,
  client: {
    production: 'CLIENT_TOKEN_FROM_SERVER',
    sandbox: 'CLIENT_TOKEN_FROM_SERVER'
  },
  env: 'production', // Or 'sandbox'
  commit: true, // This will add the transaction amount to the PayPal button

  payment: function (data, actions) {
    return actions.braintree.create({
      flow: 'checkout', // Required
      amount: 10.00, // Required
      currency: 'USD', // Required
      enableShippingAddress: true,
      shippingAddressEditable: false,
      shippingAddressOverride: {
        recipientName: 'Scruff McGruff',
        line1: '1234 Main St.',
        line2: 'Unit 1',
        city: 'Chicago',
        countryCode: 'US',
        postalCode: '60652',
        state: 'IL',
        phone: '123.456.7890'
      }
    });
  },

  onAuthorize: function (payload) {
    // Submit `payload.nonce` to your server.
  },
}, '#paypal-button');

Supp