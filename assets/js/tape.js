var Tape;

Tape = (function() {
  function Tape(selector, vect, incline) {
    this.el = d3.select(selector);
    this.vect = vect;
    this.incline = incline;
    this.init();
  }

  Tape.prototype.update = function(per){
    var points = this.points(per);
    this.el.attr('points', points);
  };

  Tape.prototype.init = function(){
    var box = this.el.node().getBBox();
    this.x = (this.vect === 1)? Math.round(box.x) : Math.round(box.x + box.width);
    this.y = (this.incline === 1)? Math.round(box.y) : Math.round(box.y + (box.width / 2));
    this.width = Math.round(box.width);
    this.height = 100;
    // console.log(this.el.attr('points'), box, this);
  };

  Tape.prototype.points = function(per){
    var endX = this.width * per * this.vect + this.x,
        p0 = [this.x, Math.round(this.y + this.height)],
        p1 = [this.x, this.y],
        p2 = [Math.round(endX), Math.round(p1[1] + (endX - p1[0]) * this.incline / 2 * this.vect)],
        p3 = [p2[0], Math.round(p2[1] + this.height)];
    return [p0.join(','), p1.join(','), p2.join(','), p3.join(',')].join(' ');

  };
  // Tape.prototype.init = function(){};
  return Tape;

})();


var Tapes;

Tapes = (function() {
  function Tapes() {
    this.init();
  }

  Tapes.prototype.update = function(width, height, y, ratio){
    var _initY = 3250,
        _endY = 3700,
        _y = y / ratio,
        _h = height / ratio,
        _bottom = (_y + _h - _initY) / (_endY - _initY),
        _len = this.tapes.length,
        _p = _bottom / _len;
    // var cy = this.center(height, y, ratio);
    for(var i = 0; i < this.tapes.length; i ++){
      var a = (i + 1) / _len,
          b = (_bottom - (i / _len)) * _len,
          per = Math.max(0, Math.min(1, b));

      this.tapes[i].update(per);
    }
  };

  Tapes.prototype.init = function(){
    this.tapes = [];
    this.tapes.push(new Tape('#tape1', 1, -1)); // 300,3100 0,3250 0,3150 300,3000
    this.tapes.push(new Tape('#tape2', 1, 1)); // 300,3100 900,3400 900,3300 300,3000
    this.tapes.push(new Tape('#tape3', -1, 1)); // 900,3400 600,3550 600,3450 900,3300
    this.tapes.push(new Tape('#tape4', 1, 1)); // 900,3600 600,3450 600,3550 900,3700
  };

  Tapes.prototype.per = function(targetY, height, y, ratio){
    return (targetY - (y / ratio)) / (height / ratio);
  };

  // Tapes.prototype.center = function(height, y, ratio){
  //   return Math.floor(((height / 2) + y) / ratio);
  // };

  // Tapes.prototype.init = function(){};
  return Tapes;

})();
