const moment = require('moment'); //Using moment


//Message
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a') // time format
  };
}

module.exports = formatMessage;