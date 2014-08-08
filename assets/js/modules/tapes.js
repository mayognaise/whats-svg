var Tape = require('./tape');

module.exports = (function(){
  function Tapes() {
    this.init();
  }

  Tapes.prototype.update = function(width, height, y, ratio){
    var _initY = 3250,
        _endY = 4000,
        _y = y / ratio,
        _h = height / ratio,
        _bottom = (_y + _h - _initY) / (_endY - _initY),
        _len = this.tapes.length,
        _p = _bottom / _len;
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
  return Tapes;

})();