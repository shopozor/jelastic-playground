# Running unit tests

In order to run the tests, you don't need `saleor`'s server running. If you have your own tests, you need to adapt the following section of the `setup.cfg` file:

```
[tool:pytest]
addopts = -n auto --vcr-record-mode=none --cov --cov-report=
testpaths = tests saleor
filterwarnings =
    ignore::DeprecationWarning
    ignore::PendingDeprecationWarning
DJANGO_SETTINGS_MODULE = saleor.settings
```

You indeed need to import your settings and add the path to them to the `testpaths` variable. We think a good idea is to do the following:

```
[tool:pytest]
addopts = -n auto --vcr-record-mode=none --cov --cov-report=
testpaths = shopozor.tests tests saleor
filterwarnings =
    ignore::DeprecationWarning
    ignore::PendingDeprecationWarning
```

From our experience, setting the `DJANGO_SETTINGS_MODULE` variable in that config file doesn't affect anything. That is why we removed it in the above snippet. 

Finally, run

```
export DJANGO_SETTINGS_MODULE=shopozor.tests.settings
py.test -ra
```

All the tests will pass if you built the assets and the emails and if you disabled the `RAZORPAY` and `STRIPE` payment gateways in saleor's `settings.py`:

```
PAYMENT_GATEWAYS = {
    DUMMY: {
        'module': 'saleor.payment.gateways.dummy',
        'connection_params': {}},
    BRAINTREE: {
        'module': 'saleor.payment.gateways.braintree',
        'connection_params': {
            'sandbox_mode': get_bool_from_env('BRAINTREE_SANDBOX_MODE', True),
            'merchant_id': os.environ.get('BRAINTREE_MERCHANT_ID'),
            'public_key': os.environ.get('BRAINTREE_PUBLIC_KEY'),
            'private_key': os.environ.get('BRAINTREE_PRIVATE_KEY')
        }
    }#,
    # RAZORPAY: {
    #     'module': 'saleor.payment.gateways.razorpay',
    #     'connection_params': {
    #         'public_key': os.environ.get('RAZORPAY_PUBLIC_KEY'),
    #         'secret_key': os.environ.get('RAZORPAY_SECRET_KEY'),
    #         'prefill': get_bool_from_env('RAZORPAY_PREFILL', True),
    #         'store_name': os.environ.get('RAZORPAY_STORE_NAME'),
    #         'store_image': os.environ.get('RAZORPAY_STORE_IMAGE')
    #     }
    # },
    # STRIPE: {
    #     'module': 'saleor.payment.gateways.stripe',
    #     'connection_params': {
    #         'public_key': os.environ.get('STRIPE_PUBLIC_KEY'),
    #         'secret_key': os.environ.get('STRIPE_SECRET_KEY'),
    #         'store_name': os.environ.get(
    #             'STRIPE_STORE_NAME', 'Saleor'),
    #         'store_image': os.environ.get('STRIPE_STORE_IMAGE', None),
    #         'prefill': get_bool_from_env('STRIPE_PREFILL', True),
    #         'remember_me': os.environ.get('STRIPE_REMEMBER_ME', True),
    #         'locale': os.environ.get('STRIPE_LOCALE', 'auto'),
    #         'enable_billing_address': os.environ.get(
    #             'STRIPE_ENABLE_BILLING_ADDRESS', False),
    #         'enable_shipping_address': os.environ.get(
    #             'STRIPE_ENABLE_SHIPPING_ADDRESS', False)
    #     }
    # }
}
```


