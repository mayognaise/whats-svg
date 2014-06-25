var Ball;

Ball = (function() {
  function Ball() {
    this.speed = 600;
    this.g = d3.select('#ballG');
    this.el = this.g.select('circle');
    this.others = this.g.select('g');
    this.shadow = this.others.select('path');
    this.pattern = this.others.select('image');
    this.gHole = d3.select('#hole');
    this.hole = this.gHole.select('ellipse');
    this.$guideRotation = d3.select('#guide'); // circulation guide
    this.guideRotation = this.$guideRotation.node();
    this.guideWalk = d3.select('#ballAnimeGuideWalk').node();
    this.init();
  }

  Ball.prototype.init = function(){
    var that = this;
    this.el.attr('id', 'ball');
    this.x = parseInt(this.el.attr('cx'));
    this.y = parseInt(this.el.attr('cy'));
    this.r = parseInt(this.el.attr('r'));
    this.holeX = parseInt(this.hole.attr('cx'));
    this.holeY = parseInt(this.hole.attr('cy'));
    this.maxX = this.holeX - this.x;
    this.minX = 100 - this.x;
    this.minLastX = 450 - this.x;
    this.turnUpY = -250;
    this.turnDownY = 375;
    this.patternOriginX = this.x - this.r;
    this.patternOriginY = this.y - this.r;
    this.rPathLength = this.guideRotation.getTotalLength();
    this.wPathLength = this.guideWalk.getTotalLength();
    this.wPathArray = [];
    for(var i = 0; i < this.wPathLength; i ++){
      var point = this.guideWalk.getPointAtLength(i);
      this.wPathArray[Math.floor(point.y)] = Math.floor(point.x);
    }
    this.$guideRotation.on('click', function(){
      that.pauseAnimation();
    });
  };

  Ball.prototype.update = function(width, height, y, ratio){
    var cy = Math.floor(((height / 2) + y) / ratio),
        cx = this.wPathArray[cy],
        per = (y - this.y + height / 2) / height,
        vect = 1,
        angle = 0;
    // console.log(y / ratio);
    if(!cx && cy < 1000) cx = this.wPathArray[550];
    if(cx){
      this.stopAnimation();
      if(cy < 850 || 1450 < cy) vect = -1;
      if(cy < 850 || 900 < cy && cy < 1200 || 1450 < cy) angle = y * vect * 2;
      this.move(cx, cy, angle);
    }else if(y / ratio > 1775){
      this.stopAnimation();
      cy = 1450;
      cx = this.wPathArray[1449];
      this.move(cx, cy);
    }else if(!this.animationIid){
      this.startAnimation();
    }
  };
  Ball.prototype.move = function(x, y, angle){
    this.el.attr({cx: x, cy: y});
    var left = x - this.x, top = y - this.y;
    this.others.attr('transform','translate(' + [left, top] + ')');
    // this.shadow.attr('transform','rotate(' + (angle || 0) + ', ' + this.x + ', ' + this.y + ')');
    this.pattern.attr('transform','translate(' + [this.patternOriginX, this.patternOriginY] + ') rotate(' + [(angle || 0), this.r, this.r] + ')');
  };
  Ball.prototype.pauseAnimation = function(){
    this.pauseFlag = !this.pauseFlag;
    if(this.pauseFlag) console.log(this.animationCount);
  };
  Ball.prototype.stopAnimation = function(){
    this.animationFlag = false;
    this.pauseFlag = false;
    clearInterval(this.animationIid);
    this.animationIid = null;
  };
  Ball.prototype.startAnimation = function(){
    var that = this, count = Math.floor(that.rPathLength);
    this.animationIid = setInterval(function(){
      if(that.pauseFlag) return;
      that.animationCount = count;
      var info = that.getAnimeInfo(count, 10);
      that.move(info.x, info.y, info.angle);
      count = info.count;
      // console.log(info.angle);
    }, 33);
  };
  Ball.prototype.getAnimeInfo = function(count, amount){
    // get current point
    var point = this.guideRotation.getPointAtLength(count);
    // get previous point
    count -= amount;
    if(count < 0){ count = this.rPathLength; }
    var pointPrevious = this.guideRotation.getPointAtLength(count);
    // get x1
    var x1 = point.y - pointPrevious.y;
    // get x2
    var x2 = point.x - pointPrevious.x;
    // get the angle in radians and convert it to degrees
    var angle = Math.atan(x1/x2)*(180/Math.PI) * 2;
    return {
      x: point.x,
      y: point.y,
      angle: angle > 0? angle : 360 + angle,
      count: count
    };
  };
  // Ball.prototype.init = function(){};

  return Ball;

})();
