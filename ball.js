var Ball;

Ball = (function() {
  function Ball() {
    this.speed = 1500;
    this.g = d3.select('#ball');
    this.el = this.g.select('circle');
    this.shadow = this.g.select('path');
    // this.pattern = this.g.select('g');
    this.gHole = d3.select('#hole');
    this.hole = this.gHole.select('ellipse');
    this.init();
  }

  Ball.prototype.init = function(){
    this.x = parseInt(this.el.attr('cx'));
    this.y = parseInt(this.el.attr('cy'));
    this.holeX = parseInt(this.hole.attr('cx'));
    this.holeY = parseInt(this.hole.attr('cy'));
    this.maxX = this.holeX - this.x;
    this.minX = 100 - this.x;
    this.minLastX = 450 - this.x;
    this.turnUpY = -250;
    this.turnDownY = 375;
  };

  Ball.prototype.update = function(width, height, y){
    var per = (y - this.y + height / 2) / height,
        _x = per * this.speed,
        _y = _x / 2;
    if(_x > this.maxX){
      // DOWN
      _y += _x - this.maxX;
      _x = this.maxX;
      if(_y > this.turnDownY){
        _x += this.turnDownY - _y;
        _x = Math.max(-1, _x);
        _y = (_x - this.maxX) / -2 + this.turnDownY;
      }
    }else if(_x < this.minX){
      // UP
      _y -= - _x + this.minX;
      _x = this.minX;
      if(_y < this.turnUpY){
        _x += this.turnUpY - _y;
        _y = (_x - this.minX) / -2 + this.turnUpY;
      }
    }
    _x = Math.round(_x);
    _y = Math.round(_y);
    this.el.attr({
      cx: this.x + _x,
      cy: this.y + _y
    });
    this.shadow.attr('transform','translate(' + [_x, _y] + ')');
    // this.pattern.attr('transform','translate(' + [_x, _y] + ') rotate(' + 10 + ')');
  };
  // Ball.prototype.init = function(){};

  return Ball;

})();
