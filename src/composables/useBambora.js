export default function useBambora({
  cardNumberElementId, isCardNumberComplete, cardNumberError,
  cvvElementId, isCVVComplete, cvvError,
  expiryElementId, isExpiryComplete, expiryError,
  setTokenizedCard, tokenizationError,
  cardBrandSVG,
  setIsLoading,
}) {
  const customCheckoutController = {
    init: function () {
      console.log('checkout.init()');
      this.customCheckout = customcheckout();
      this.createInputs();
      this.addListeners();
    },
    createInputs: function () {
      console.log('checkout.createInputs()');
      var options = {};

      // Create and mount the inputs
      let ccNumberId = cardNumberElementId || '#card-number';
      this.customCheckout.create('card-number', options).mount(ccNumberId);

      let cvvId = cvvElementId || '#card-cvv';
      this.customCheckout.create('cvv', options).mount(cvvId);

      let expiryId = expiryElementId || '#card-expiry'
      this.customCheckout.create('expiry', options).mount(expiryId);
    },
    addListeners: function () {
      var self = this;

      this.customCheckout.on('brand', function (event) {
        console.log('brand: ' + JSON.stringify(event));
        if (event.brand && event.brand !== 'unknown') {
          cardBrandSVG.value = `https://cdn.na.bambora.com/downloads/images/cards/${event.brand}.svg`;
        } else {
          cardBrandSVG.value = undefined;
        }
      });

      this.customCheckout.on('empty', function (event) {
        console.log('empty: ' + JSON.stringify(event));

        if (event.empty) {
          if (event.field === 'card-number') {
            isCardNumberComplete.value = false;

          } else if (event.field === 'cvv') {
            isCVVComplete.value = false;

          } else if (event.field === 'expiry') {
            isExpiryComplete.value = false;
          }
        }
      });

      this.customCheckout.on('complete', function (event) {
        console.log('complete: ' + JSON.stringify(event));

        if (event.field === 'card-number') {
          cardNumberError.value = undefined;
          isCardNumberComplete.value = true;

        } else if (event.field === 'cvv') {
          cvvError.value = undefined;
          isCVVComplete.value = true;

        } else if (event.field === 'expiry') {
          expiryError.value = undefined;
          isExpiryComplete.value = true;
        }
      });

      this.customCheckout.on('error', function (event) {
        console.log('error: ' + JSON.stringify(event));

        if (event.field === 'card-number') {
          cardNumberError.value = event.message;
          isCardNumberComplete.value = false;
        } else if (event.field === 'cvv') {
          cvvError.value = event.message;
          isCVVComplete.value = false;
        } else if (event.field === 'expiry') {
          expiryError.value = event.message;
          isExpiryComplete.value = false;
        }
      });
    },
    onSubmit: function () {
      var self = this;

      console.log('checkout.onSubmit()');
      setTokenizedCard(undefined);
      tokenizationError.value = undefined;

      setIsLoading(true);
      var callback = function (result) {
        console.log('token result : ' + JSON.stringify(result));

        if (result.error) {
          tokenizationError.value = `Error creating token: ${JSON.stringify(result.error, null, 4)}`
        } else {
          setTokenizedCard(result.token);
        }

        setIsLoading(false);
      };

      console.log('checkout.createToken()');
      this.customCheckout.createToken(callback);
    },
  };

  customCheckoutController.init();
  return customCheckoutController;
}