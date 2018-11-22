# Consumer frontend installation via the dashboard

## Useful documentation

- [How to setup a NodeJS application for production on ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
- [Binding NodeJS port 80 using nginx](https://eladnava.com/binding-nodejs-port-80-using-nginx/)
- [Wikipedia about inverse proxy](https://fr.wikipedia.org/wiki/Proxy_inverse)
- [Stackoverflow about NodeJS server only listening on ipv6](https://stackoverflow.com/questions/47797322/node-js-server-only-listening-on-ipv6)
- [Jelastic documentation](http://docs.jelastic.com)
- [Jelastic API documentation](https://docs.jelastic.com/api/)
- [Jelastic CLI documentation](https://docs.jelastic.com/cli)

## Prerequisites

Make sure you work with our fork of vue-storefront’s github repository (see [documentation](https://docs.google.com/document/d/1VUMTTJ9Wy8InI6uaJCInYhiA8GR7LL3e2xkZi1g20Jg/edit#heading=h.cusv6ur2apfw))

## Installing vuestorefront

Note that any node reboot / github deployment on Hidora triggers a

```
${PACKAGE_MANAGER} install
```

![storage1.png](/doc/images/storage1.png)

## Environment definition

Create a NodeJS environment with

- an Nginx load balancer which we will use as a reverse proxy (default cloudlets)
- a NodeJS application server with two nodes (between 4 and 10 cloudlets) and

```
PACKAGE_MANAGER=yarn
```

- a shared storage

## Software deployment

![frontend2.PNG](/doc/images/frontend2.png)

Make sure that the github repository is updated in such a way that its package.json start script reads:

```
"start": "cross-env NODE_ENV=production pm2 start ./core/scripts/server.js --name vue-storefront"
```

Indeed, the original vue-storefront configuration starts 4 instances of the server on the same node which will be killed by jelastic as it overruns the above defined cloudlet performance.

![frontend3.PNG](/doc/images/frontend3.png)

Use the [post-hook script](https://bitbucket.org/softozor/shopozor-jelastic-configuration/src/master/consumer-frontend/post-hook-template.sh), with appropriately filled placeholders, which will be stored under

```
/var/lib/jelastic/hooks
```

## Nginx configuration

We need a reverse proxy server in front of our front-end application which we achieve with Nginx. First, the exposed ports need to be configured. To do that, just open the environment variables of Nginx

![nginx-variables.PNG](/doc/images/nginx-variables.png)

Set the ports accordingly (you need port 3000 in there):

![nginx-ports.PNG](/doc/images/nginx-ports.png)

and finally reboot the Nginx node.

Alternatively, you can also open the settings panel

![frontend4.PNG](/doc/images/frontend4.png)

Then edit the `nginx-jelastic.conf` file:

![frontend5.PNG](/doc/images/frontend5.png)

In this file, add the listening port of the NodeJS server (3000) to all the locations where our nodes’ IP addresses are popping up (there should be two locations per node).
Finally, reboot the nginx node:

![frontend6.PNG](/doc/images/frontend6.png)

After the reboot is done, you can browse the address vue-storefront-demo.hidora.com.

Double-check the [Production Setup Documentation](<https://bitbucket.org/softozor/shopozor-vsf-consumer-frontend/src/master/doc/Production%20setup%20(WIP).md>) for more details about how to let nginx serve e.g. the assets.

### Static assets serving

In order for nginx to serve the static assets, you will need to

- copy the assets on the shared storage under the location `/data/assets`
- share the `/data` folder of the shared storage with the nginx node

![storage2.PNG](/doc/images/storage2.png)

![storage3.PNG](/doc/images/storage3.png)

![storage4.PNG](/doc/images/storage4.png)

- add the exported data to the nginx locations: in the `nginx-jelastic.conf`, add

```
location /assets {
  root /opt/shared-data;
}
```

and reboot the nginx node.

## SSL certificate installation
