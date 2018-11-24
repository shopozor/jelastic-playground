# Development installation of saleor in an Ubuntu VM

## Installing postgres

1. Install postgresql software (assuming we are using Ubuntu Bionic 18.04):

```
deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-10 postgresql-client-10 postgresql-client-common
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

## Installing Gtk+

## Installing saleor

Proceed with the following steps, [documented by saleor](https://saleor.readthedocs.io/en/latest/gettingstarted/installation-linux.html),

1. Install the following packages:

```
sudo apt install build-essential python3-venv python3-dev python3-pip python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
pip3 install virtualenvwrapper
```

Following the [advice](https://medium.com/@gitudaniel/installing-virtualenvwrapper-for-python3-ad3dfea7c717), extend the `~/.bashrc` file with

```
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/workspace
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=$HOME/.local/bin/virtualenv
source $HOME/.local/bin/virtualenvwrapper.sh
```

2. Clone our forked saleor repository:

```
git clone https://github.com/softozor/saleor.git
```

3. Create a virtual environment (see [documentation](https://virtualenvwrapper.readthedocs.io/en/latest/install.html#quick-start)) in the saleor repo:

```
cd saleor
mkvirtualenv saleor-env
```

4. Install saleor requirements

```
pip install -r requirements.txt
```

5. Add secret key to `$VIRTUAL_ENV/bin/postactivate` script (cf. [this answer](https://stackoverflow.com/questions/9554087/setting-an-environment-variable-in-virtualenv)):

```
export SECRET_KEY=theSecretKey
```

6. Prepare the database

```
./manage.py migrate
```

7. Install frontend

```
npm i
npm run build-assets
npm run build-emails
```

8. Run the development server:

```
./manage.py runserver
```

## Graphiql

In order to have graphiql working properly, follow [this advice](https://docs.google.com/document/d/1vsqwh_yf2shM_pJbx18wYDhCHwEbsHaEpK0b5aAZLBU/edit#heading=h.9cbyxshl67es).