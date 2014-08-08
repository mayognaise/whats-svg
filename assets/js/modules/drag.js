module.exports = (function(){
  function Drag() {
    this.g = $('#drag');
    this.stars = this.g.select('#stars');
    this.init();
  }

  Drag.prototype.init = function(){
    var el = this.g.select('circle'),
      x = parseInt(el.attr('cx')),
      y = parseInt(el.attr('cy')),
      r = parseInt(el.attr('r')),
      fill = el.attr('fill');
    el.remove();
    this.g.selectAll('circle')
      .data([{x: 0, y: 0, stars: this.stars}])
      .enter().append('circle')
      .attr({cx: x, cy: y, r: r, fill: fill})
      .call(this.drag)

  };

  Drag.prototype.drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('dragstart', function(d){
      d3.event.sourceEvent.stopPropagation();
    })
    .on('drag', function(d){
      var x = d3.event.x,
          y = d3.event.y;
      d.x = Math.floor(Math.min(200, Math.max(0, x)));
      d.y = Math.floor(Math.min(200, Math.max(0, y)));
      d3.select(this).attr('transform', 'translate(' + [d.x, d.y] + ')');
      d.stars.attr('transform', 'translate(' + [d.x, d.y] + ')');
    })
    .on('dragend', function(d){
    });
  return Drag;

})();