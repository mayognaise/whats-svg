require('./assets/css/solarized_dark.css');
require('./assets/scss/index.scss');
require('./assets/scss/walking-bird.scss');

var queue = require('queue-async'),
    Stage = require('./assets/js/modules/stage.js');

queue()
  .defer(d3.xml, './index.svg', 'image/svg+xml')
  .await(function (error, xml) {
    if(!error) new Stage(xml);
  });