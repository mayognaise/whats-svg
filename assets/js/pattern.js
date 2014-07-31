var Pattern;

Pattern = (function() {
  function Pattern() {
    this.g = d3Select('#dogeRight');
    this.init();
  }

  Pattern.prototype.init = function(){
    var that = this,
        patternId = 'dustPattern',
        polygon = this.g.select('polygon'),
        src = 'assets/imgs/bone.png',
        img = new Image(),
        pattern = this.g.append('defs').append('pattern').attr({
          id: patternId,
          patternUnits: 'userSpaceOnUse'
        });
    this.g.append('polygon').attr({
      'points': polygon.attr('points'),
      'fill': 'url(#' + patternId + ')'
    });
    img.onload = function(){
      var w = img.width / 2,
          h = img.height / 2;
      pattern.attr({
        'width': w, 'height': h
      });
      pattern.append('image')
        .attr({
          'x': 0, 'y': 0, 
          'width': w, 'height': h,
          'xlink:href': src
        });
    };
    img.src = src;
  };
  return Pattern;

})();
