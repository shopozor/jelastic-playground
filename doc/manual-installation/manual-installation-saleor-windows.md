# Manual installation of saleor under Windows

## Install Python

1. Install the [latest Python version](https://www.python.org/downloads/). Don't forget to add the path to its installation in the `PATH` variable. On my machine, the Python installation is located under

```
C:\Users\<username>\AppData\Local\Programs\Python\Python37
```

2. Add the following path to the `PATH` variable to have access to `pip`: 

```
C:\Users\<username>\AppData\Local\Programs\Python\Python37\Scripts
```

3. Install `virtualenv`:

```
pip install virtualenv
```

Once this is installed, you don't need the path

```
C:\Users\<username>\AppData\Local\Programs\Python\Python37\Scripts
```

in your `PATH` variable any more.

4. Create virtual environment for saleor:

```
cd path-to-saleor-project
virtualenv saleor-env
```

This creates for example the activate script under

```
path-to-saleor/saleor-env/Scripts/activate.bat
```

5. You can activate the `saleor-env` with the following command in the Command Prompt:

```
cd path-to-saleor
saleor-env\Scripts\activate.bat
```

or in the git bash:

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
```

## Install Gtk+

As explained on `saleor`'s [Windows installation guidelines](https://saleor.readthedocs.io/en/latest/gettingstarted/installation-windows.html), download Gtk+'s latest release from [this page](https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases).

## Install PostgreSQL

1. Install the [latest PostgreSQL version for Windows](https://www.postgresql.org/download/windows/). This will then start PostgreSQL as a service.

2. Create user `saleor` with password `saleor` and super user privileges by means of the pgAdmin interface.

3. Create database `saleor` with owner `saleor` user by means of the pgAdmin interface.

## Enable CORS

Following the advice found [here](https://github.com/ottoyiu/django-cors-headers/#configuration):

1. Install Django CORS headers:

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
pip install django-cors-headers
```

2. Add `corsheaders` to the `INSTALLED_APPS`

```
INSTALLED_APPS = (
    ...
    'corsheaders',
    ...
)
```

3. Add CORS middleware to the top of saleor's middleware list:

```
MIDDLEWARE = [
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.security.SecurityMiddleware',
  'django.middleware.common.CommonMiddleware',
  ...
]
```

4. Finally, either define the following environment variable's value to `true` or set it directly in the `settings.py` file:

```
CORS_ORIGIN_ALLOW_ALL = True
```

## Run saleor development server

1. Install saleor requirements:

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
pip install -r requirements.txt
```

2. Add `SECRET_KEY` value to script `saleor-env/Scripts/activate/activate`

```
export SECRET_KEY="hahahahahaha"
```

3. Run django migration

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
python manage.py migrate
```

4. Run django server

```
cd path-to-saleor
source ./saleor-env/Scripts/activate
python manage.py runserver
```

5. Make sure that the clients using the `graphql` endpoint refer to 

```
http://localhost/graphql/
```

i.e. they are including the trailing slash.

## Run the tests

In order to run the tests, you don't need `saleor`'s server running. You need a populated database, which you get with the following commands:

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