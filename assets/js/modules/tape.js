module.exports = (function(){
  function Tape(selector, vect, incline) {
    this.el = $(selector);
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
  };

  Tape.prototype.points = function(per){
    var endX = this.width * per * this.vect + this.x,
        p0 = [this.x, Math.round(this.y + this.height)],
        p1 = [this.x, this.y],
        p2 = [Math.round(endX), Math.round(p1[1] + (endX - p1[0]) * this.incline / 2 * this.vect)],
        p3 = [p2[0], Math.round(p2[1] + this.height)];
    return [p0.join(','), p1.join(','), p2.join(','), p3.join(',')].join(' ');

  };
  return Tape;

})();