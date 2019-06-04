# tie-api-example-line
This node.js example connector allows you to make your Teneo bot available on LINE. The connector acts as middleware between LINE and Teneo and uses the Messaging API to receive messages from Line. This guide will take you through the steps of creating a new LINE Provider and deploying the connector to respond to events sent by Teneo.


## Prerequisites
### Https
Making the connector available via https is preferred. Ngrok is recommended for this.

### LINE App
The LINE app should already be running with an active account on your device.

### Teneo Engine
Your bot needs to be published and you need to know the engine URL.


## Setup instructions
### Create and configure a Line Provider
1. Log in with your LINE account here: [https://account.line.biz](https://account.line.biz/login), using a QR Code or an email address.
2. Click on Create New Provider, give it a name. Now create a Messaging API Channel, and fill in description, icon, category, etc. 
3. Open the newly created channel and copy the CHANNEL_SECRET value.
4. Issue a CHANNEL_ACCESS_TOKEN (set expiration time to 0 hours for now, so the token doesn expire), and copy that value too.
5. Go to the `Use Webhooks section`, and set it to `Enabled`. You will be setting the `Webhook_URL` after the next steps.


### Running the connector locally
If you want to run the connector locally, follow the steps below. 
1. Download or clone the connector source code:
    ```
    git clone https://github.com/artificialsolutions/tie-api-example-line.git
    ```
2. Install dependencies by running the following command in the folder where you stored the source:
    ```
    npm install
    ``` 
3. Create a `.env` file in the folder where you stored the source and add the URL of your engine. Optionally you can also specify the langauges for Speech To Text and Text To Speech:
    ```
    TENEO_ENGINE_URL=<your_engine_url>
    CHANNEL_SECRET=<that value obtained in the previous section>
    CHANNEL_ACCESS_TOKEN=<that other value issued in the previous section>
    ```
4. Start the connector:
    ```
    node server.js
    ```

Next, we need to make the connector available via https. We'll use [ngrok](https://ngrok.com) for this.

1. Start ngrok. The connector runs on port 1337 by default, so we need to start ngrok like this:
    ```
    ngrok http 3000
    ```
2. Running the command above will display a public https URL. Copy it, and use it to finish step 5. of the previous version by pasting it in the <mark>Webhook URL</mark> field.


### Start chatting with the bot.
Go back to the Channel settings of your Provider, and scroll down to the QR code in the bots section. Use it to add your bot as a new contact to your LINE APP. 
That's it! Your bot should now be available in Slack and responding to messages that are sent to it.