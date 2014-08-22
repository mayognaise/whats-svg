var data = require('./data'),
  Mask = require('./mask'),
  Pattern = require('./pattern'),
  Doge = require('./doge'),
  Tapes = require('./tapes'),
  Drag = require('./drag'),
  Ball = require('./ball'),
  Radiation = require('./radiation'),
  WalkingBird = require('./walking-bird'),
  Highlight = require('./highlighten');

module.exports = (function(){
  function Stage(xml){
    this.xml(xml.documentElement);
    this.init();
  }

  Stage.prototype.addLinks = function(){
    data.links.forEach(function(d){
      var el = $(d.selector),
          url = d.url;
      el.on('click', function(){
        window.open(url, '_blank');
      });
      el.on('mouseout', function(){
        el.select('path').node().innerHTML = '';
      });
      el.on('mouseover', function(){
        el.select('path').node().innerHTML = '<animateTransform attributeName="transform" ' +
          'type="translateX" ' +
          'from="0" to="2" ' +
          'begin="0s" dur="500ms" ' +
          'repeatCount="indefinite" ' +
          '/>';
      });
    });
  };

  Stage.prototype.adjustFonts = function(arr){
    arr.forEach(function(selector){
      d3.selectAll(selector).each(function(){
        var el = d3.select(this), family = el.attr('font-family');
        if(family) el.attr('class', family.replace(/'/g, ''));
      });
    });
  };

  Stage.prototype.update = function(){
    if(this.width !== undefined && this.height !== undefined && this.y !== undefined){
      var width = this.width,
        height = this.height,
        y = this.y,
        sw = this.svgWidth,
        ratio = width / sw;
      if(this.$svg) this.$svg.attr({
        'width': width,
        'height': ratio * this.svgHeight
      });
      if(this.highlight) this.highlight.update(sw, ratio);
      if(this.ball) this.ball.update(width, height, y, ratio);
      if(this.radiationLeft) this.radiationLeft.update(y);
      if(this.radiationRight) this.radiationRight.update(y);
      if(this.tapes) this.tapes.update(width, height, y, ratio);
      if(this.walkingBird) this.walkingBird.update(height, y, ratio);
    }
  };
  Stage.prototype.onresize = function(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.update();
  };
  Stage.prototype.onscroll = function(){
    this.y = window.pageYOffset;
    this.update();
  };

  Stage.prototype.init = function(){
    document.body.appendChild(this.xml());
    this.adjustFonts(['tspan', 'text']);
    this.$svg = d3.select('svg');
    this.svgWidth = parseInt(this.$svg.attr('width'));
    this.svgHeight = parseInt(this.$svg.attr('height'));
    this.ball = new Ball();
    this.radiationLeft = new Radiation('#radiationLeft');
    this.radiationRight = new Radiation('#radiationRight');
    this.$svg.append('g').attr('id', 'walkingbird');
    this.walkingBird = new WalkingBird('walkingbird', {
      scale: 0.355,
      translate: [160, 3800]
    });
    this.tapes = new Tapes();
    new Drag();
    new Doge();
    new Mask();
    new Pattern();
    this.highlight = new Highlight();
    this.addLinks();
    this.onresize();
    this.onscroll();
    var that = this;
    window.onresize = function(){that.onresize();};
    window.onscroll = function(){that.onscroll();};
    if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)){
      document.addEventListener('touchmove', function(){that.onscroll();});
    }
  };

  // setter / getter
  Stage.prototype.xml = function(val){
    if(val) this._xml = val;
    return this._xml;
  };

  return Stage;

})();