const { format } = require("timeago.js");

const helpers = {};

helpers.timeago = (timestamp) =>{
    return format(timestamp, "es_Es");
};

module.exports = helpers;