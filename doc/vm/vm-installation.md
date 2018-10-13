# Installation of vue-storefront in a VM

## Installing vuestorefront

Follow the instructions from vue-storefront github repo:
```
git clone https://github.com/DivanteLtd/vue-storefront.git
cd vue-storefront
yarn
yarn installer
```
This is successful, contrary to the advice given in the medium article on vuestorefront:
```
cd vue-storefront
yarn install
npm run installer
```
This fails.

### How to restart vuestorefront?

1. in vuestorefront folder, run 
```
npm run dev
```
2. in vuestorefront-api folder, run
```
docker-compose up -d
npm run dev
```

## Install Magento2
```
git clone https://github.com/alexcheng1982/docker-magento2
cd docker-magento2
docker-compose up -d
```
Then add 
```
127.0.0.1    local.magento
```
to /etc/hosts.

Then set
```
MAGENTO_URL=http://local.magento
```
in env file

Finally run
```
docker exec -it docker-magento2_web_1 install-magento
docker exec -it docker-magento2_web_1 install-sampledata
```
The sampledata are coming from Magento2 example products dataset.

## Use mage2vuestorefront

1. Follow the advice given in mage2vuestorefront github repo:
```
git clone https://github.com/DivanteLtd/mage2vuestorefront.git
cd mage2vuestorefront/src
npm install
```
2. Add new integration in the System -> Integrations  in Magento2

I got the following tokens:

* Consumer Key        : 2uqsdrt61n6v5l0d90gmssjx7oyj229v
* Consumer Secret   	: aderivm5s4yprgvji94233gw2sc73j1u
* Access Token        : n5p7s6vli4ise05xplo44en5llyidex3
* Access Token Secret : 60v6yivu7ew6l018b4cdf3tv3s89dh0u

3.  Add
```
export MAGENTO_CONSUMER_KEY=2uqsdrt61n6v5l0d90gmssjx7oyj229v
export MAGENTO_CONSUMER_SECRET=aderivm5s4yprgvji94233gw2sc73j1u
export MAGENTO_ACCESS_TOKEN=n5p7s6vli4ise05xplo44en5llyidex3
export MAGENTO_ACCESS_TOKEN_SECRET=60v6yivu7ew6l018b4cdf3tv3s89dh0u
export MAGENTO_URL=http://local.magento/rest
```
to the .bashrc file (note the "/rest"!).

4. Configure the magento2 synchronization with vue-storefront-api:

Make sure the following sections of vue-storefront-api/config/local.json contain the correct parameters:
```
"magento2": {
  "url": "http://local.magento", // <-- modify this
  "imgUrl": "http://local.magento/pub/media/catalog/product",  // <-- modify this!
  "assetPath": "/../var/magento2-sample-data/pub/media",
  "magentoUserName": "",
  "magentoUserPassword": "",
  "httpUserName": "",
  "httpUserPassword": "",
  "api": {  // <-- modify this!
      "url": "http://local.magento/rest",
      "consumerKey": "2uqsdrt61n6v5l0d90gmssjx7oyj229v",
      "consumerSecret": "aderivm5s4yprgvji94233gw2sc73j1u",
      "accessToken": "n5p7s6vli4ise05xplo44en5llyidex3",
      "accessTokenSecret": "60v6yivu7ew6l018b4cdf3tv3s89dh0u"
    }
  },
"imageable": {
  "namespace": "",
    "maxListeners": 512,
    "imageSizeLimit": 1024,
    "timeouts": {
      "convert": 5000,
      "identify": 100,
      "download": 1000
    },
    "whitelist": {
      "allowedHosts": [
        "localhost",
        "local.magento" // <-- add this!
      ],
      "trustedHosts": [
        "localhost",
        "local.magento"  // <-- add this!
      ]
    },
    "keepDownloads": true,
    "maxDownloadCacheSize": 1000,
    "tmpPathRoot": "/tmp",
    "debug": false
   }
```
5. run (references in parentheses are made to System -> Integrations -> MyIntegration -> API)
```
node ./cli.js taxrule               # (enabled by Stores -> Taxes)
node ./cli.js attributes            # (enabled by Stores -> Attributes)
node ./cli.js categories            # (enabled by Catalog)
node ./cli.js productcategories     # (enabled by Catalog)
node ./cli.js products              # (enabled by Stores)
```
in the mage2vuestorefront/src folder.

6. re-index the database:

In the vue-storefront-api folder, run
```
npm run db rebuild -- --indexName=vue_storefront_catalog
```
7. synchronize with
```
node cli.js productsdelta --removeNonExistient=true
```
8. To allow for the carts / user synchronization, you need to enable the following systems in the System -> Integrations -> <MyIntegration> -> API:

Catalog, Sales, My Account and Carts

## MAGENTO API KEYS

These keys are stored in
```
~/.bashrc
~/workspace/vue-storefront-api/config/local.json
```

## Configuring the products synchronization webhook
[NOT WORKING] Upgrade Magento2 with magento2-vsbridge
```
git clone https://github.com/DivanteLtd/magento2-vsbridge
docker cp magento2-vsbridge/Divante docker-magento2_web_1:/var/www/html/app/
docker exec -it docker-magento2_web_1 bash
```
In the folder /var/www/html of the docker-magento2_web_1 container, run
```
php bin/magento setup:upgrade
```
Exit the console.

Caution: it seems like it deleted all the data I had in Magento.
Setup the on-demand indexer support for mage2vuestorefront
In the folder mage2vuestorefront/src, run
```
export TIME_TO_EXIT=2000
export PORT=6060

node webapi.js
```
