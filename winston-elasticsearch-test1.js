// We need these three modules: winston, winston-elasticsearch, elasticsearch
var winston = require('winston');
var Elasticsearch = require('winston-elasticsearch');
var elasticsearch = require('elasticsearch');

// Define the tansports to use.
var esTransportOpts = {
  level: 'info',    //Messages logged with a severity greater or equal to the given one are logged to ES; others are discarded.
  client: new elasticsearch.Client({
  	host: 'localhost:9200',  // this is the default one if we don't specify one.
  	log: 'trace'
  })
};

// Create a new logger using the transport/client created before.
var logger = new winston.Logger({
  rewriters: [
    (level, msg, meta) => {
        meta.app = 'myApp3';
        return meta;
    }
  ],
  transports: [
    new Elasticsearch(esTransportOpts)
  ]
});

// That's it!
logger.info('Hello World 10');