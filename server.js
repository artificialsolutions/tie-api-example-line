/**
 * Copyright 2019 Artificial Solutions. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const TIE = require('@artificialsolutions/tie-api-client');
const line = require('@line/bot-sdk');
const express = require('express');
var request = require('request');
require('dotenv').config();

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
  teneoURL: process.env.TENEO_ENGINE_URL
};

// create LINE SDK client
const client = new line.Client(config);

//Create Teneo API interface
const teneoApi = TIE.init(config.teneoURL);

// initialise session handler, to store mapping between WeChat and engine session id
const sessionHandler = SessionHandler();

// register a webhook handler with the connector
app.post('/callback', line.middleware(config), (req, res) => {

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


// event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const replyForLine =  { type: 'text', text:  await handleLineMessage(event.message.text, event.source.userId)};

  // use reply API, and include the event's original replyToken
  return client.replyMessage(event.replyToken, replyForLine);
}


async function handleLineMessage(userInput, lineClientUserID){

    const userID = lineClientUserID
    console.log(`userinput: ${userInput}`);
    
    // check if we have stored an engine sessionid for this caller
    const teneoSessionId = sessionHandler.getSession(userID);
  
    // send input to engine using stored sessionid and retreive response
    const teneoResponse = await teneoApi.sendInput(teneoSessionId, { 'text': userInput });
    teneoTextReply = teneoResponse.output.text
    console.log(`teneoResponse: ${teneoTextReply}`)
  
    // store engine sessionid for this caller
    sessionHandler.setSession(userID, teneoResponse.sessionId);
    
    return teneoTextReply
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

/***
 * SESSION HANDLER
 ***/
function SessionHandler() {

  // Map the Webchat Sid id to the teneo engine session id. 
  // This code keeps the map in memory, which is ok for testing purposes
  // For production usage it is advised to make use of more resilient storage mechanisms like redis
  const sessionMap = new Map();

  return {
    getSession: (userId) => {
      if (sessionMap.size > 0) {
        return sessionMap.get(userId);
      }
      else {
        return "";
      }
    },
    setSession: (userId, sessionId) => {
      sessionMap.set(userId, sessionId)
    }
  };
}