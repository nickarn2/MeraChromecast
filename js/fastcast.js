/**
 * @file FastCast
 */

/**
 * @module FastCast
 */
var FastCast = (function(){

    var clientCallbacks = {},
        TAG = "FastCast",
        chunkMessage = null;

    /**
     * Returns handler registered to the event.
     * @func setCallback
     * @memberof module:FastCast
     * @private
     * @param {string} event - event name
     * @returns {function}
     */
    function setCallback(event) {
        return function(callback) {
            clientCallbacks[event] = callback;
        }
    }

    /**
     * Client connect from castReceiverContext.
     * @func onSenderConnected
     * @memberof module:FastCast
     * @private
     * @param {Object} event - client data
     * @returns {undefined}
     */
    function onSenderConnected(event) {
        if (!clientCallbacks["connect"]) return;
        clientCallbacks["connect"](event);
    }

    /**
     * Client disconnect from castReceiverContext.
     * @func onSenderDisconnected
     * @memberof module:FastCast
     * @private
     * @param {Object} event - client data
     * @returns {undefined}
     */
    function onSenderDisconnected(event) {
        if (!clientCallbacks["disconnect"]) return;
        clientCallbacks["disconnect"](event);
    }

    function connect() {
        // handler for 'senderconnected' event
        window.castReceiverContext.onSenderConnected = onSenderConnected;
        // handler for 'senderdisconnected' event
        window.castReceiverContext.onSenderDisconnected = onSenderDisconnected;
    }

    function sendTheMessage(data) {
        debugger;
        //context.sendCustomMessage("urn:x-cast:sncr-cloud", data);
    }
    /**
     * Initializes FastCast. Expects 2 arguments: namespace
     * and a callback function. Namespace name is required.
     * Callback function is optional. If provided, does not receive any arguments.
     * @method init
     * @memberof module:FastCast
     * @access private
     * @param {string} namespace - namespace to create CastMessageBus to handle messages
     * @param {function} [callback] - function to be called after initialization
     * @returns {undefined}
     */
     const context = cast.framework.CastReceiverContext.getInstance();
     const CUSTOM_CHANNEL_TWO = "urn:x-cast:verizon-cloud";
     const CUSTOM_CHANNEL = "urn:x-cast:com.verizon.smartview";
     function getTheContext() {
         debugger;
        try {//nn 
            context.sendCustomMessage(CUSTOM_CHANNEL, "try text");
        } catch(e) {
            console.error(Constants.APP_INFO, TAG, e);
            debugger;
        }
        try {//nn 
            context.sendCustomMessage('urn:x-cast:verizon-cloud', "try text");
        } catch(e) {
            console.error(Constants.APP_INFO, TAG, e);
            debugger;
        }
        // const objToSender = 
        // {
        //   type: 'status',
        //   message: 'Playing'
        // };
        // try {
        //     context.sendCustomMessage('urn:x-cast:verizon-cloud', objToSender);
        // } catch(e) {
        //     console.error(Constants.APP_INFO, TAG, e);
        //     debugger;
        // }
        // try {
        //     context.sendCustomMessage(CUSTOM_CHANNEL, objToSender);
        // } catch(e) {
        //     console.error(Constants.APP_INFO, TAG, e);
        //     debugger;
        // }
        // var message_1 = {
        //     "event": "ERROR"
        // };
        // try {
        //     context.sendCustomMessage("urn:x-cast:verizon-cloud", message_1);
        // } catch(e) {
        //     console.error(Constants.APP_INFO, TAG, e);
        //     debugger;
        // }
        // try {
        //     context.sendCustomMessage("urn:x-cast:com.verizon.smartview", objToSender);
        // } catch(e) {
        //     console.error(Constants.APP_INFO, TAG, e);
        //     debugger;
        // }
        return context;
    }
    function init(namespace, callback) {
        //const context = cast.framework.CastReceiverContext.getInstance();
        console.log(Constants.APP_INFO, TAG, 'Starting Receiver Manager');
        const playerManager = context.getPlayerManager();
        const options = new cast.framework.CastReceiverOptions();
        options.maxInactivity = 3600;

        const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
        const LOG_TAG = 'MeraChrome';
//nn1

context.addCustomMessageListener(CUSTOM_CHANNEL, function(customEvent) {
      // handle customEvent.
      console.log("addCustomMessageListener: " + customEvent);
      console.log("addCustomMessageListener: " + JSON.stringify(customEvent));
      
      //var parsedPre = JSON.parse(customEvent);
    var parsed = customEvent.data;//JSON.parse(customEvent.data);
    var event = parsed.event;
    var type = parsed.media && parsed.media.type;

    if (parsed.media) tvApp.stateObj = parsed;

    switch(event) {
        case 'LOAD_START':
            tvApp.stateObj.loadStarted = false;
            console.log(Constants.APP_INFO, TAG, type);

            type = type && typeof type == 'string' && type.toLowerCase();
            Utils.triggerEvent("load_start_"+type, parsed);
            break;
        case 'RESUME':
        case 'PAUSE':
        case 'START_SLIDESHOW':
        case 'ADD_SLIDESHOW':
        case 'STOP_SLIDESHOW':
        case 'STOP_MEDIA':
        case 'NEXT_SLIDE':
        case 'PREVIOUS_SLIDE':
            event = event.toLowerCase();
            Utils.triggerEvent(event, parsed);
            break;

    }
});
// intercept the LOAD request to be able to read in a contentId and get data
playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    loadRequestData => {
    //nn !!    
        debugger;
        console.log("loadRequestData " + JSON.stringify(loadRequestData));
        if (loadRequestData.media.contentType == "image/jpeg") {
            tvApp.stateObj.loadStarted = false;
            //var parsed = {"event":"LOAD_START","media":{"duration":0,"type":"PICTURE","url":"https://lkg07-mediamanager.verizonwireless.com/media/thumbnail/APRjM1LpYsyoemakufXPkNUannOwpUW9GTi_3-8oXLdOiHKiu49bWehVy_UF9sYiSxbnAh-wwFoP7AwfoMhnPmQ%7E?tw=1920&th=1080&ignorePivot=true&NWB=ALvoqLxXjadIC8-3OADJi9XBVfinSCdEnz-7IjVDjWTjk2yM1CExE193LYR0Dr4l0CAsdPOA_X_09pEW6DQW39iIWTrJye_3WZMXOhNkfdd3qCZR8ba9l_sQkQYFLf_BpxbfPdmTWa6lOj3uYbfN0rblML3xMSAjZ8X5AVyDmayBkwLWystoJ4_uuMRKbxvB7YlykdhSL4vkxgf_xPHI0fk~","thumbnail":"https://lkg07-mediamanager.verizonwireless.com/media/thumbnail/APRjM1LpYsyoemakufXPkNUannOwpUW9GTi_3-8oXLdOiHKiu49bWehVy_UF9sYiSxbnAh-wwFoP7AwfoMhnPmQ%7E?tw=200&th=113&ignorePivot=true&NWB=ALvoqLxXjadIC8-3OADJi9XBVfinSCdEnz-7IjVDjWTjk2yM1CExE193LYR0Dr4l0CAsdPOA_X_09pEW6DQW39iIWTrJye_3WZMXOhNkfdd3qCZR8ba9l_sQkQYFLf_BpxbfPdmTWa6lOj3uYbfN0rblML3xMSAjZ8X5AVyDmayBkwLWystoJ4_uuMRKbxvB7YlykdhSL4vkxgf_xPHI0fk~"},"loadStarted":false}
            //Utils.triggerEvent("load_start_picture", parsed);
            Utils.triggerEvent("load_start_picture", {media: loadRequestData.media});
            return null;
        } else if (loadRequestData.media.contentType == "video/mp4") {
            tvApp.stateObj.loadStarted = false;
            Utils.triggerEvent("load_start_video", {media: loadRequestData.media});
            return null;
            //nn return loadRequestData;
        } else {    
            console.log("loadRequestData " + JSON.stringify(loadRequestData.media.contentType));
        }
        return loadRequestData;
    }
);
playerManager.addEventListener(
  cast.framework.events.category.CORE,
  event => {
    console.log("playerManager = " + event.type);
    console.log("CastContext", "Core event: " + JSON.stringify(event));
  }
);

//nn2
// handler for the 'ready' event
// works but does not show video :(
// context.addEventListener(cast.framework.system.EventType.READY,  function(event) {
//     console.log("!!! ReadyEvent  !!!");
//     console.log(Constants.APP_INFO, TAG, 'Received Ready event: ' + JSON.stringify(event.data));
//     window.castReceiverContext.setApplicationState("Application status is ready...");
//     const deviceCapabilities = context.getDeviceCapabilities();
//     if (deviceCapabilities &&
//         deviceCapabilities[cast.framework.system.DeviceCapabilities.IS_HDR_SUPPORTED]) {
//       // Write your own event handling code, for example
//       // using the deviceCapabilities[cast.framework.system.DeviceCapabilities.IS_HDR_SUPPORTED] value
//     }
//     if (deviceCapabilities &&
//         deviceCapabilities[cast.framework.system.DeviceCapabilities.IS_DV_SUPPORTED]) {
//       // Write your own event handling code, for example
//       // using the deviceCapabilities[cast.framework.system.DeviceCapabilities.IS_DV_SUPPORTED] value
//     }
// });
//nn2
//nn3
// const playbackConfig = new cast.framework.PlaybackConfig();
// playbackConfig.autoResumeDuration = 5;
// const options = cast.framework.CastReceiverOptions();
// options.customNamespaces = { 'urn:x-cast:testChannel': 'STRING' }
// context.start({ playbackConfig: playbackConfig });        
// context.sendCustomMessage(CUSTOM_CHANNEL, "message from receiver");
//nn3
//nn4
//const options = cast.framework.CastReceiverOptions();
// options.customNamespaces = {
//     "urn:x-cast:verizon-cloud" : cast.framework.system.MessageType.STRING,
//     "urn:x-cast:testChannel": cast.framework.system.MessageType.STRING
// };
// options.customNamespaces = {
//     "urn:x-cast:verizon-cloud" : cast.framework.system.MessageType.STRING
// };
// options.customNamespaces = Object.assign({});
// options.customNamespaces[CUSTOM_CHANNEL] = cast.framework.system.MessageType.JSON;
// options.customNamespaces = {
//     CUSTOM_CHANNEL: cast.framework.system.MessageType.JSON
// };
// context.start(options);
//nn4
//nn5
// const options = new cast.framework.CastReceiverOptions();
// options.customNamespaces = Object.assign({});
// options.customNamespaces[CUSTOM_CHANNEL] = cast.framework.system.MessageType.JSON;

//   //receiving sender message
//   //context.addCustomMessageListener(CUSTOM_CHANNEL,  customEvent => document.getElementById("main").innerHTML = customEvent.data.msg);
  
// //   const objToSender = 
// //   {
// //     type: 'status',
// //     message: 'Playing'
// //   };
//   //message to sender app
//   //context.sendCustomMessage(CUSTOM_CHANNEL, objToSender);
//   context.start(options);
//   //context.sendCustomMessage(CUSTOM_CHANNEL, objToSender);
//nn5
//nn6
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoResumeDuration = 5;
//const namespaces = { 'urn:x-cast:testChannel': 'STRING' };
const namespaces = {'urn:x-cast:com.verizon.smartview' : 'JSON',
'urn:x-cast:verizon-cloud' : 'JSON' };
context.start({ playbackConfig: playbackConfig,
    customNamespaces:  namespaces});        
context.sendCustomMessage(CUSTOM_CHANNEL, "message from receiver");



//nn6




window.castReceiverContext = context;

//nn commented

        // // create a CastMessageBus to handle messages for a custom namespace
        // window.messageBus = window.castReceiverContext.getCastMessageBus( namespace );

        // // handler for the CastMessageBus message event
        // window.messageBus.onMessage = function(event) {
        //     tvApp.senderId = event.senderId;

        //     try {
        //         var parsed = JSON.parse(event.data);
        //         var event = parsed.event;
        //         var type = parsed.media && parsed.media.type;

        //         if (parsed.media) tvApp.stateObj = parsed;

        //         switch(event) {
        //             case 'LOAD_START':
        //                 tvApp.stateObj.loadStarted = false;
        //                 console.log(Constants.APP_INFO, TAG, type);

        //                 type = type && typeof type == 'string' && type.toLowerCase();
        //                 Utils.triggerEvent("load_start_"+type, parsed);
        //                 break;

        //             case 'RESUME':
        //             case 'PAUSE':
        //             case 'START_SLIDESHOW':
        //             case 'ADD_SLIDESHOW':
        //             case 'STOP_SLIDESHOW':
        //             case 'STOP_MEDIA':
        //             case 'NEXT_SLIDE':
        //             case 'PREVIOUS_SLIDE':
        //                 event = event.toLowerCase();
        //                 Utils.triggerEvent(event, parsed);
        //                 break;
        //             case 'CHUNK_MESSAGE':
        //                 chunkMessage = null;
        //                 try {
        //                     chunkMessage = new ChunkMessage(parsed.id, parsed.chunk_count);
        //                     console.log(Constants.APP_INFO, TAG, 'Chunk message obj', chunkMessage);
        //                 } catch(e) {
        //                     console.log(Constants.APP_INFO, TAG, 'Chunk message obj creation error', e);
        //                 }
        //                 break;
        //             case 'CHUNK_PART':
        //                 if (!chunkMessage) break;
        //                 try {
        //                     chunkMessage.addChunk(parsed.id, parsed.chunk_index, parsed.message);
        //                     console.log(Constants.APP_INFO, TAG, 'Chunk message "'+ parsed.chunk_index +'" is added');
        //                     if (chunkMessage.received) {
        //                         var message = JSON.parse(chunkMessage.message);
        //                         event = message.event && message.event.toLowerCase();
        //                         console.log(Constants.APP_INFO, TAG, 'Chunk message received');
        //                         Utils.triggerEvent(event, message);
        //                     }
        //                 } catch(e) {
        //                     console.log(Constants.APP_INFO, TAG, 'Chunk part error', e);
        //                 }
        //                 break;
        //         }
        //     } catch (event) {
        //         console.log(Constants.APP_INFO, TAG, 'Parse message error: ', event);
        //     }
        // }

        // // initialize the castReceiverContext with an application status message
        // window.castReceiverContext.start({statusText: "Application is starting"});
        console.log(Constants.APP_INFO, TAG, 'Receiver Manager started');

        callback && callback();
    }

    return {
        /**
         * Initializes FastCast. Register messages.
         * @access public
         * @param {string} namespace - namespace to create CastMessageBus to handle messages
         * @param {function} [callback] - function to be called after initialization
         * @returns {undefined}
         */
        init: init,
        /**
         * Registers sender connect event handler.
         * @method onSenderConnected
         * @memberof module:FastCast
         * @access public
         * @returns {undefined}
         * @example
         * //show sender data when it connects
         * FastCast.onSenderConnected(function (event) {
         *     console.log("Received Sender Connected event: " + event.data);
         * });
         */
        onSenderConnected: setCallback('connect'),

        /**
         * Registers sender disconnect event handler.
         * @method onSenderDisconnected
         * @memberof module:FastCast
         * @access public
         * @returns {undefined}
         * @example
         * //show sender data when it connects
         * FastCast.onSenderDisconnected(function (event) {
         *     console.log("Received Sender Connected event: " + event.data);
         * });
         */
        onSenderDisconnected: setCallback('disconnect'),

        sendTheMessage: sendTheMessage,
        getTheContext: getTheContext,

        /**
         * Register sender connect/disconnect events
         * @func connect
         * @memberof module:FastCast
         * @access public
         * @returns {undefined}
         * @example
         * FastCast.connect();
         */
        connect: connect
    }
}());

if (typeof module !== "undefined" && module.exports) {
    module.exports.FastCast = FastCast;
}
