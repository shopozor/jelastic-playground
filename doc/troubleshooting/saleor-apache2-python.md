# Troubleshooting on a saleor installation with apache2-python

## Access rights to the PostgreSQL during installation

At first, we implemented a hack to configure the PostgreSQL instance by means of the following `pg_hba.conf` file:

```
local   all         all                               trust
host    all         all         127.0.0.1/32          trust
host    all         all         ::1/128               trust
host    all         all         0.0.0.0/0             trust
```

We uploaded that file to the PostgreSQL node, performed the necessary changes to the database, and then put it back to its original version

```
local   all         all                               md5
host    all         all         127.0.0.1/32          ident
host    all         all         ::1/128               ident
host    all         all         0.0.0.0/0             md5
```

With the help of [hidora support](www.hidora.com), we were able to come up with a solution where we can actually run the `psql` command without hacks:

```
createDatabase:
  cmd[sqldb]:
    - jem passwd set -p ${globals.PG_PASSWORD}
    - export PGPASSWORD='${globals.PG_PASSWORD}'
    - psql -U webadmin -d postgres -c "CREATE ROLE ${globals.DB_USERNAME} PASSWORD '${globals.DB_USER_PASSWORD}' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;"
    - psql -U webadmin -d postgres -c "CREATE DATABASE saleor OWNER ${globals.DB_USERNAME} ENCODING 'utf-8' TEMPLATE template0;"
  user: root
```
