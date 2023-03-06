const redis = require('redis')

const CHANNELS = {
    TEST: 'TEST',

}

class PubSub {
    constructor(){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        // allows the subscriber to see any messages posted to the test channel
        this.subscriber.subscribe(CHANNELS.TEST);

        this.subscriber.on(
            'message',
            (channel, message) => this.handleMessage(channel,message) );
    }
    handleMessage(channel,message){
        console.log(`message received. Channel: ${channel}. Message: ${message}`)
    }
}

const testPubSub = new PubSub();

testPubSub.publisher.publish(CHANNELS.TEST, 'foo');

// const PubNub = require('pubnub')


// const credentials = {
//     publishKey: 'pub-c-328f9bc7-6d2b-491f-b58e-3adf3b092f70',
//     subscribeKey: 'sub-c-85442a04-b505-11ec-a938-7ec486788b75',
//     secretKey: 'sec-c-Mjk0Zjg0YzMtMzhlYy00MGNlLThjMDgtMjMyYzA2YzYzOTUx'
// }

// const CHANNELS = {
//     TEST: 'TEST',
//     BLOCKCHAIN: 'BLOCKCHAIN'
// }

// class PubSub {
//     constructor(){
//         this.pubnub = new PubNub(credentials);

//         this.pubnub.subscribe({ channels: Object.values(CHANNELS) }); 

//         this.pubnub.addListener(this.listener());
//     }

//     listener() {
//         return{
//             message: messageObject => {
//                 const { channel, message } = messageObject;
                
//                 console.log(`Message received. Channel: ${channel}. Message: ${message}`);
//             }
//         }
//     }
//     publish({channel, message}){
//         this.pubnub.publish({channel, message});
//     }
// }


// const testPubSub = new PubSub();
// testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello pubnub'});


// module.exports = PubSub;