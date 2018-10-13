# Consumer api installation via the dashboard

## Environment definition

## Software deployment

## Nginx configuration

## SSL certificate installation

# How to verify that the api is correctly installed?

- upon browsing `consumer-api.hidora.com`, you get the following response:

```
Cannot GET /
```

- upon browsing `consumer-api.hidora.com/api`, you get the following response:

```
{"version":"0.1.0"}
```

- upon browsing `consumer-api.hidora.com/img`, you get the following response:

```
Error: Please provide following parameters: /img/<width>/<height>/<action:crop,fit,resize,identify>/<relative_url>
    at /home/jelastic/ROOT/dist/api/img.js:40:13
    at Layer.handle [as handle_request] (/home/jelastic/ROOT/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/jelastic/ROOT/node_modules/express/lib/router/index.js:317:13)
    at /home/jelastic/ROOT/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/jelastic/ROOT/node_modules/express/lib/router/index.js:335:12)
    at Immediate.next (/home/jelastic/ROOT/node_modules/express/lib/router/index.js:275:10)
    at Immediate._onImmediate (/home/jelastic/ROOT/node_modules/express/lib/router/index.js:635:15)
    at runCallback (timers.js:694:11)
    at tryOnImmediate (timers.js:664:5)
    at processImmediate (timers.js:646:5)
```
