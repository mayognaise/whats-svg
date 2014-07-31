var CatMask;

CatMask = (function() {
  function CatMask() {
    this.g = d3Select('#catMaskG');
    this.init();
  }

  CatMask.prototype.init = function(){
    var that = this,
        maskId = 'catMask',
        clipPath = this.g.select('path'),
        bbox = this.g.node().getBBox(),
        width = Math.ceil(bbox.width),
        height = Math.ceil(bbox.height),
        src = 'http://placekitten.com/' + width + '/' + height + '',
        img = new Image();
    this.g.append('defs').append('svg:clipPath')
      .attr({
        id: maskId
      })
      .append('path')
      .attr('d', clipPath.attr('d'));
    // clipPath.remove();
    img.onload = function(){
      that.g.append('image')
        .attr({
          'x': Math.floor(bbox.x), 'y': Math.floor(bbox.y), 
          'width': width, 'height': height,
          'xlink:href': src,
          'clip-path': 'url(#' + maskId + ')'
        });
    };
    img.src = src;
  };
  return CatMask;

})();
