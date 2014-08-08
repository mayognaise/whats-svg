module.exports = (function(){
  function HightlightElement(el, g, d){
    this.el = d3.select(el);
    this.el.info = d;
    this.parent = g;
    this.init();
  }

  HightlightElement.prototype.on = function(evtName, fnc){
    this['_' + evtName] = fnc;
  };
  HightlightElement.prototype.over = function(){
    var g = this.parent,
      el = this.el,
      info = el.info,
      d = {};
    if(info.d_array){
      info.d_array.forEach(function(attr){ d[attr] = el.attr(attr);});
    }
    this.out();
    if(info.guides){
      info.guides.forEach(function(guide){
        var el = g.append(guide.shape)
          .attr('class', 'info-guide-' + guide.shape)
          .classed('guideline', guide.guideline);
        for(var id in guide.attr) el.attr(id, guide.attr[id](d));
        if(guide.shape === 'circle'){
          if(!guide.guideline){
            var x = parseInt(el.attr('cx')),
            y = parseInt(el.attr('cy'));
            g.append('text').attr('class', 'info-text')
              .text('(' + [x,y] + ')')
              .attr('transform','translate(' + [(x + 5),(y - 5)] + ')');
          }
        }
      });
      g.classed('show', true);
    }
    if(this._over) this._over({target: this.el});
  };
  HightlightElement.prototype.out = function(){
    var g = this.parent;
    g.text('').classed('show', false);
    if(this._out) this._out({target: this.el});
  };

  HightlightElement.prototype.init = function(){
    var that = this,
      el = this.el,
      d = el.info;

    if(/polyline/.test(d.selector) || /polygon/.test(d.selector)){
      var points = el.attr('points').split(' ');
      points.forEach(function(point){
        if(/,/.test(point)){
          var coords = point.split(',');
          el.info.guides.push({
            shape: 'circle',
            attr: {
              cx: function(d){ return coords[0]; },
              cy: function(d){ return coords[1]; },
              r: function(d){ return 3; }
            }
          });
        }
      });
    }
    if(getComputedStyle(el.node()).pointerEvents !== 'none'){
      el.classed('pointer', true);
    }
    el.on('mouseover',function(){that.over();});
    el.on('mouseout',function(){that.out();});
  };


  return HightlightElement;

})();