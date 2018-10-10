# Consumer frontend installation via the dashboard #

##Useful documentation##

* [How to setup a NodeJS application for production on ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
* [Binding NodeJS port 80 using nginx](https://eladnava.com/binding-nodejs-port-80-using-nginx/)
* [Wikipedia about inverse proxy](https://fr.wikipedia.org/wiki/Proxy_inverse)
* [Stackoverflow about NodeJS server only listening on ipv6](https://stackoverflow.com/questions/47797322/node-js-server-only-listening-on-ipv6)
* [Jelastic documentation](http://docs.jelastic.com)
* [Jelastic API documentation](https://docs.jelastic.com/api/)
* [Jelastic CLI documentation](https://docs.jelastic.com/cli)

##Prerequisites
Make sure you work with our fork of vue-storefront’s github repository (see [documentation](https://docs.google.com/document/d/1VUMTTJ9Wy8InI6uaJCInYhiA8GR7LL3e2xkZi1g20Jg/edit#heading=h.cusv6ur2apfw))

##Installing vuestorefront
Note that any node reboot / github deployment on Hidora triggers a 

```
#!shell
${PACKAGE_MANAGER} install
```

![storage1.png](https://bitbucket.org/repo/Eg4LbRA/images/1689784721-storage1.png)

##Environment definition
Create a NodeJS environment with

* an Nginx load balancer which we will use as a reverse proxy (default cloudlets)
* a NodeJS application server with two nodes (between 4 and 10 cloudlets) and

```
#!shell
PACKAGE_MANAGER=yarn
```
* a shared storage

##Software deployment

![frontend2.PNG](https://bitbucket.org/repo/Eg4LbRA/images/3769930364-frontend2.PNG)

Make sure that the github repository is updated in such a way that its package.json start script reads: 

```
#!json
"start": "cross-env NODE_ENV=production pm2 start ./core/scripts/server.js --name vue-storefront"
```

Indeed, the original vue-storefront configuration starts 4 instances of the server on the same node which will be killed by jelastic as it overruns the above defined cloudlet performance.

![frontend3.PNG](https://bitbucket.org/repo/Eg4LbRA/images/2341336868-frontend3.PNG)

Use the [post-hook script](https://bitbucket.org/softozor/shopozor-jelastic-configuration/src/master/consumer-frontend/post-hook-template.sh), with appropriately filled placeholders, which will be stored under

```
/var/lib/jelastic/hooks
```

##Nginx configuration
We need a reverse proxy server in front of our front-end application which we achieve with Nginx. First, the exposed ports need to be configured. To do that, just open the environment variables of Nginx

![nginx-variables.PNG](https://bitbucket.org/repo/Eg4LbRA/images/2709929656-nginx-variables.PNG)

Set the ports accordingly (you need port 3000 in there):

![nginx-ports.PNG](https://bitbucket.org/repo/Eg4LbRA/images/3452057801-nginx-ports.PNG)

and finally reboot the Nginx node.

Alternatively, you can also open the settings panel

![frontend4.PNG](https://bitbucket.org/repo/Eg4LbRA/images/1035848698-frontend4.PNG)

Then edit the `nginx-jelastic.conf` file:

![frontend5.PNG](https://bitbucket.org/repo/Eg4LbRA/images/3288942667-frontend5.PNG)

In this file, add the listening port of the NodeJS server (3000) to all the locations where our nodes’ IP addresses are popping up (there should be two locations per node).
Finally, reboot the nginx node:

![frontend6.PNG](https://bitbucket.org/repo/Eg4LbRA/images/2659248941-frontend6.PNG)

After the reboot is done, you can browse the address vue-storefront-demo.hidora.com.

Double-check the [Production Setup Documentation](https://bitbucket.org/softozor/shopozor-consumer-frontend/src/master/doc/Production%20setup%20(WIP).md) for more details about how to let nginx serve e.g. the assets. 

###Static assets serving
In order for nginx to serve the static assets, you will need to

* copy the assets on the shared storage under the location `/data/assets`
* share the `/data` folder of the shared storage with the nginx node

![storage2.PNG](https://bitbucket.org/repo/Eg4LbRA/images/2136039775-storage2.PNG)

![storage3.PNG](https://bitbucket.org/repo/Eg4LbRA/images/412156269-storage3.PNG)

![storage4.PNG](https://bitbucket.org/repo/Eg4LbRA/images/2988905178-storage4.PNG)

* add the exported data to the nginx locations: in the `nginx-jelastic.conf`, add
```
location /assets {
  root /opt/shared-data;
}
```
and reboot the nginx node.

##SSL certificate installation
