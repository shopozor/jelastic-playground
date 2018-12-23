# Development installation of saleor in an Ubuntu VM

## Installing postgres

1. Install postgresql software (Version 9.5 on Ubuntu 16.04) : 

```
sudo apt-get install postgresql
```

2. Define a password for the postgres user, following [this answer](https://serverfault.com/questions/110154/whats-the-default-superuser-username-password-for-postgres-after-a-new-install):

```
sudo -u postgres psql postgres
```

In the postgresql command-line, type

```
\password postgres
```

Once the password is set, leave that command-line with

```
\q
```

3. Create the PostgreSQL user `saleor` with password `saleor`:

```
sudo -u postgres createuser --interactive --pwprompt --superuser saleor
```

Provide user `saleor` with superuser rights. **Do not do that in production deployments**.

4. Create the PostgreSQL database `saleor`:

```
sudo -u postgres createdb -O saleor -e saleor
```

## Installing Python 3.6

See https://askubuntu.com/questions/865554/how-do-i-install-python-3-6-using-apt-get

```{bash}
sudo add-apt-repository ppa:jonathonf/python-3.6
sudo apt update
sudo apt install python3.6 python3.6-dev
```

## Installing Gtk+

## Installing saleor 

Proceed with the following steps, [documented by saleor](https://saleor.readthedocs.io/en/latest/gettingstarted/installation-linux.html),

1. Install the following packages:

```
sudo apt install build-essential python3-venv python3-dev python3-pip python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```

2. Install the `pipenv` package using any method, for exemple with `pip` :

```{bash}
pip3 install pipenv
```

3. Clone our forked saleor repository:

```
git clone https://github.com/softozor/saleor.git
```

4. Install saleor requirements and let `pipenv` automaticaly create a virtualenv
```
cd saleor
pipenv install
```

5. Activate the virtualenv from within newly created `saleor` directory :
```{bash}
pipenv shell
```

6. Add secret key to `$VIRTUAL_ENV/bin/postactivate` script (cf. [this answer](https://stackoverflow.com/questions/9554087/setting-an-environment-variable-in-virtualenv)):

```
export SECRET_KEY=theSecretKey
```

7. Prepare the database

```
./manage.py migrate
```

8. Install frontend

```
npm i
npm run build-assets
npm run build-emails
```

9. Run the development server:

```
./manage.py runserver
```
