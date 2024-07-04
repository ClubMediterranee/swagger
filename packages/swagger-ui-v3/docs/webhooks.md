---
title: Webhooks
banner: |
  Webhooks allow you to build or set up integrations, such as OAuth Apps, which subscribe to certain events on `api.clubmed.com`.
  \n\nWhen one of those events is triggered, we'll send a HTTP POST payload to the webhook's configured URL. Webhooks can be used to update an external information like the room_status. You're only limited by your imagination.
  \n\nA webhook can be configured on one or multiple events by using the admin routes `POST /v0/api_webhooks` and needs some information like the `Payload URL`, `Content-Type`, etc...
---

## Configuration

### Payload URL

The payload URL is the URL of the server that will receive the webhook POST requests.

### Content type

Webhooks can be delivered using different content types:

- The `application/json` content type will deliver the JSON payload directly as the body of the POST request.
- The `application/x-www-form-urlencoded` content type will send the JSON payload as a form parameter called payload.

Choose the one that best fits your needs.

### Secret

Setting a webhook secret allows you to ensure that `POST` requests sent to the payload URL are from Clubmed.
When you set a secret, you'll receive the `X-Clubmed-Signature` header in the webhook `POST` request.

Here is an example in Node.js to secure your payload:

```ts
import { createHmac } from "crypto";
import express, { Next } from "express";

const app = express();

function getSignature(body: string, secret: string) {
  const hmac = createHmac("sha256", secret).update(body).digest("hex");

  return `sha256=${hmac}`;
}

function rawBodyMiddleware(request: Request, response: Response, next: Next) {
  request.rawBody = "";
  request.on("data", (chunk: string) => {
    request.rawBody += chunk;
    next();
  });
}

app.post("/api/callback", rawBodyMiddleware, (request: Request, response: Response) => {
  const signature = request.get("X-Clubmed-Signature");

  if (getSignature(request.rawBody, YOUR_SECRET_KEY) !== signature) {
    throw new Error("Bad signature");
  }

  const body = JSON.parse(payload);
  console.log(body);
});
```

## Ping and Logs

When you create a new webhook, we'll send you a simple ping event to let you know you've set up the webhook correctly.
Call the `POST /v0/api_webhooks/ping` route to trigger the `ping` event with your custom payload then call `GET /v0/api_webhooks/logs` to see
all logs events registered by the Clubmed API.

## Exposing localhost to the internet

To test your webhook integration with your local application, you can use `ngrok` to expose your local application on internet.
We'll use ngrok to do this. ngrok is available, free of charge, for all major operating systems. For more information, see the [ngrok download page](https://ngrok.com/download).

After installing ngrok, you can expose your localhost by running `ngrok http 4567` on the command line. `4567` is the port number on which our server will listen for messages.
You should see a line that looks something like this:

```sh
$ Forwarding http://7e9ea9dc.ngrok.io -> 127.0.0.1:4567
```

Use `http://7e9ea9dc.ngrok.io` url as Payload Url for your webhook configuration:

```sh
PATCH /v0/api_webhooks/your_uuid_configuration

{
  "url": "http://7e9ea9dc.ngrok.io"
}
```

Then call the route `POST /v0/api_webhooks/ping`.
