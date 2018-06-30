let id = 0;

function setup(connection, messages) {
  connection.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "*",
    Connection: "keep-alive"
  });
  // If a user connects for the first time, send all queued messages
  if (messages) {
    sendEvent(connection, messages, "initialMessages");
  }
}

function sendEvent(connection, data, eventName) {
  const newEvent = buildSSE(id, data, 1000, eventName);
  connection.write(newEvent);
  id++;
}

function buildSSE(id, data, retryWait, eventName) {
  let event = eventName ? `event: ${eventName}\n` : "";
  let eventId = `id: ${id}\n`;
  let message = `data: ${JSON.stringify(data)}\n`;
  let retry = `retry: ${retryWait}\n\n`;

  return event + eventId + message + retry;
}

// event: message\n
// id: 99\n
// data: {message: "HEY", user: "Kait", timeStamp: 187349823234}\n
// retry: 1000
// \n
// \n

module.exports = { setup, sendEvent };
