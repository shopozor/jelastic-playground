# Running the unit tests and saleor own tests

In order to run the tests, you don't need `saleor`'s server running. You need a populated database, which you get with the following commands [*TODO: double-check again if this is really necessary*]:

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
python manage.py populatedb
```

Then you need to adapt the following section of the `setup.cfg` file:

```
[tool:pytest]
addopts = -n auto --vcr-record-mode=none --cov --cov-report=
testpaths = tests saleor
filterwarnings =
    ignore::DeprecationWarning
    ignore::PendingDeprecationWarning
DJANGO_SETTINGS_MODULE = saleor.settings
```

If you add your own tests, you need to import your settings and add the path to them to the `testpaths` variable. We think a good idea is to do the following:

```
[tool:pytest]
addopts = -n auto --vcr-record-mode=none --cov --cov-report=
testpaths = shopozor-tests tests saleor
filterwarnings =
    ignore::DeprecationWarning
    ignore::PendingDeprecationWarning
DJANGO_SETTINGS_MODULE = shopozor-tests.settings
```

Finally, run

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
py.test -ra
```