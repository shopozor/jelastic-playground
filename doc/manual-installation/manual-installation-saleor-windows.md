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

## Install PostgreSQL

1. Install the [latest PostgreSQL version for Windows](https://www.postgresql.org/download/windows/). This will then start PostgreSQL as a service.

2. Create user `saleor` with password `saleor` and super user privileges by means of the pgAdmin interface.

3. Create database `saleor` with owner `saleor` user by means of the pgAdmin interface.


## Run saleor development server

1. Install saleor requirements:

```
cd path-to-saleor
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