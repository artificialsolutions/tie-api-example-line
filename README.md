# tie-api-example-line

> [!IMPORTANT]
> This project has been retired and archived  
> If there is a need of continued use / development of this project for your own needs please feel free to fork the project - which will remain here in archived form.

This node.js example connector allows you to make your Teneo bot available on LINE. The connector acts as middleware between LINE and Teneo, by using the Messaging API to receive exchange messages. This guide will take you through the steps of creating a new LINE Provider and deploying the connector to respond to events sent by Teneo.

## Prerequisites
### Https
Making the connector available via https is preferred. Ngrok is recommended for this.

### LINE App
The LINE app should already be running with an active account on your device.

### Teneo Engine
Your bot needs to be published and you need to know the engine URL.


## Setup instructions
### Create a Line Provider
1. Log in with your LINE account here: [https://developers.line.biz/en/](https://developers.line.biz/en/). Use a QR Code or an email address. You may need to complete your developer profile after you've logged in.
2. Click on Create New Provider, and give it a name. 
3. Now, create a Messaging API Channel, and fill in the necessary fields: description, icon, category, etc. 
4. Open the newly created channel, find and copy the CHANNEL_SECRET value for later use.

### Running the connector locally
#### Setup the connector
1. Download or clone the connector source code:
    ```
    git clone https://github.com/artificialsolutions/tie-api-example-line.git
    ```
2. Install dependencies by running the following command in the folder where you stored the source:
    ```
    npm install
    ``` 
3. A file .env.sample file is included in the project. Use it as a reference to create a `.env` file in the folder where you stored the source, and add values for CHANNEL_SECRET and TENEO_ENGINE_URL. CHANNEL_ACCESS_TOKEN will be set later on.
    ```
    TENEO_ENGINE_URL=<your_engine_url>
    CHANNEL_SECRET=<that value obtained in the previous section>
    CHANNEL_ACCESS_TOKEN=<value issued in the upcoming section>
    ```
4. Start the connector in Console:
    ```
    node server.js
    ```

#### Make the connector available via HTTPS
Next, we need to make the connector available via https. We'll use [ngrok](https://ngrok.com) for this.

1. Start ngrok - The connector runs on port 3000 by default, so we need to start ngrok like this:
    ```
    ngrok http 3000
    ```
2. Running the command above will display a public https URL. Copy it, you will need it in the next section.


#### Update Webhook URL in the Line Provider
1. Next, in the 'LINE Official Account Features' section > 'Auto-reply messages', click on 'Edit'.
2. Set 'Response mode' to Bot. Disable 'Auto-Response' and 'Greeting Message'.
Set 'Webhooks' to Enabled. 
3. Go back to 'Messaging API' > 'Webhook Settings' and set 'Webhook URL' by using the public https URL obtained from ngrok in the previous step, and attaching the suffix '/callback'. The URL will look roughly like this:
    ```
    https://12345abcde.ngrok.io/callback
    ```

4. Click 'Verify' and also Enable 'Use Webhook'.

5. Browse to 'Message API' > Channel Access Token. Click issue, and copy the 'Channel Access Token' value for later use. 
It is very important to note that this token must be re-issued everytime the Webhook URL is changed, to prevent authentication errors.

#### Update and restart the Connector
1. Finally, update the CHANNEL_ACCESS_TOKEN variable in .env file of your project source with the 'Channel Access Token' value obtained in the previous step:

TENEO_ENGINE_URL=< your_engine_url >
CHANNEL_SECRET=< The value obtained in previous steps>
CHANNEL_ACCESS_TOKEN=< 'Channel Access Token', from the previous step >

2. Restart the connector in Console:
    ```
    node server.js
    ```

### Start chatting with the bot.
Go back to the Basic Settings section of your Provider, and locate the QR code shown in the bots section. Use it to add your bot as a new contact to your LINE app. 

That's it! Your bot should now be available in LINE and responding to messages that are sent to it.
