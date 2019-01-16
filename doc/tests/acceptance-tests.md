# Running the Shopozor server's acceptance tests

1. Install the `shopozor_features` requirements

```
pip install shopozor_features/requirements.txt
```

This will install `behave` and `behave-django` (documented [here](https://github.com/behave)) among other things.

2. Set the following environment variable

```
export DJANGO_SETTINGS_MODULE=shopozor_features.settings
```

3. Run the tests

```
python manage.py behave
```

You can fine-tune `behave`'s parameters in the `setup.cfg` configuration file.