# tie-api-example-line
This node.js example connector allows you to make your Teneo bot available on LINE. The connector acts as middleware between LINE and Teneo, by using the Messaging API to receive exchange messages. This guide will take you through the steps of creating a new LINE Provider and deploying the connector to respond to events sent by Teneo.


## Prerequisites
### Https
Making the connector available via https is preferred. Ngrok is recommended for this.

### LINE App
The LINE app should already be running with an active account on your device.

### Teneo Engine
Your bot needs to be published and you need to know the engine URL.


## Setup instructions
### Create and configure a Line Provider
1. Log in with your LINE account here: [https://developers.line.biz/en/](https://developers.line.biz/en/). Use a QR Code or an email address. You may need to complete your developer profile after you've logged in.
2. Click on Create New Provider, and give it a name. 
3. Now, create a Messaging API Channel, and fill in the necessary fields: description, icon, category, etc. 
4. Open the newly created channel, find and copy the CHANNEL_SECRET value for later use.
5. Scroll down on the page and issue a CHANNEL_ACCESS_TOKEN (set expiration time to 0 hours for now, so the token doesn't expire), and copy that value too.
6. Go to the 'Use Webhooks' section, and set it to 'Enabled'. You will be setting the 'Webhook_URL' after the next steps.
7. Next, scroll down to the 'Using LINE features' section and disable 'Auto-reply messages' by clicking the 'Set message' link.


### Running the connector locally
1. Download or clone the connector source code:
    ```
    git clone https://github.com/artificialsolutions/tie-api-example-line.git
    ```
2. Install dependencies by running the following command in the folder where you stored the source:
    ```
    npm install
    ``` 
3. Create a `.env` file in the folder where you stored the source, and add values for TENEO_ENGINE_URL, CHANNEL_SECRET, and CHANNEL_ACCESS_TOKEN:
    ```
    TENEO_ENGINE_URL=<your_engine_url>
    CHANNEL_SECRET=<that value obtained in the previous section>
    CHANNEL_ACCESS_TOKEN=<that other value issued in the previous section>
    ```
4. Start the connector in Console:
    ```
    node server.js
    ```

Next, we need to make the connector available via https. We'll use [ngrok](https://ngrok.com) for this.

1. Start ngrok. The connector runs on port 3000 by default, so we need to start ngrok like this:
    ```
    ngrok http 3000
    ```
2. Running the command above will display a public https URL. Copy it, you will need it in the next section.


### Update Webhook URL in the line provider
1. Once the connector is available via https, copy the public https URL from the previous step andp paste in into the Webhook URL of your Line Channel provider. Also, add a /callback suffix to the URL field. The final Webhook URL should look roughly like this:
    ```
    https://7a6e4de6.ngrok.io/callback
    ```
2. Click the blue 'Update' button to save the url.

### Start chatting with the bot.
Go back to the Channel settings of your Provider, and scroll down to the QR code shown in the bots section. Use it to add your bot as a new contact to your LINE app. 

That's it! Your bot should now be available in LINE and responding to messages that are sent to it.
