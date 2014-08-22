require('./assets/scss/walking-bird.scss');

var WalkingBird = require('./assets/js/modules/walking-bird.js');
  walkingBird = new WalkingBird('walkingBird', {
    scale: 0.5,
    tlanslate: [100, 200]
  });


setTimeout(function(){
  walkingBird.open();
}, 1000);