const autobahn = require('autobahn')

const {
  POLONIEX_API_KEY,
  POLONIEX_API_SECRET,
} = process.env;

const connection = new autobahn.Connection({
  url: "wss://api.poloniex.com",
  realm: "realm1"
})

function onOpen(session) {
  console.log("Websocket connection opened");

  // session.subscribe('BTC_XMR', marketEvent);
  // session.subscribe('ticker', tickerEvent);
  // session.subscribe('trollbox', trollboxEvent);
}

function onClose() {
  console.log("Websocket connection closed");
}

function marketEvent (args,kwargs) {
  console.log(args);
}

function tickerEvent (args,kwargs) {
  console.log(args);
}

function trollboxEvent (args,kwargs) {
  console.log(args);
}

// connection.onopen = onOpen
// connection.onclose = onClose

connection.open()

module.exports = connection
