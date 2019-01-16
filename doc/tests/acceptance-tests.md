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

Would you want to preserve the same database from one run of behave to the other, you could launch it this way:

```
python manage.py behave --keepdb
```

This doesn't create a new database each time you run the acceptance tests which can be handy during acceptance tests development.

You can fine-tune `behave`'s parameters in the `setup.cfg` configuration file.
