var mongo = require('mongodb');
var logger = require('../service/logging/logger');

logger.debug('dao loaded');

module.exports = {
    db: mongo
};