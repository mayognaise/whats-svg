(function(){
var _xml, _json, _width, _height, _y,
  _ball, _dragCircle, _radiationLeft, _radiationRight,
  _imageProjector, _tapes,
  _svgWidth, _svgHeight,
  _$svg, _$highlight,
  convert = function(html){
    return html
      .replace(/stroke-miterlimit="10" /g, '')
      .replace(/ class="pointer"/g, '')
      .replace(/&/g, '&amp;').replace(/>/g, '&gt;')
      .replace(/</g, '&lt;').replace(/"/g, '&quot;')
      .replace(/\t/g, '')
      // .replace(/&gt;&lt;/g, '&gt;\n&lt;');
  },
  updateHighlighting = function(html){
    if(html){
      html = '<pre><code id="code" class="html">' + convert(html) + '</code></pre>';
      _$highlight.html(html);
      if(html) hljs.highlightBlock(document.getElementById('code'));
    }
    _$highlight.classed('show', !!(html));
  },
  addShapeElementEvents = function(){
    var g = _$svg.append('g').attr('class', 'info');
    over = function(el){
      var info = el.info, d = {};
      if(info.d_array){
        info.d_array.forEach(function(attr){ d[attr] = el.attr(attr);});
      }
      out();
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
      updateHighlighting(info.highlighting? info.highlighting(el) : el.node().outerHTML);
    }, 
    out = function(el){
      g.text('');
      g.classed('show', false);
      updateHighlighting();
    },
    addGuidesByPoints = function(el){
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
    };
    _data.buttons.forEach(function(d){
      d3.selectAll(d.selector).each(function(){
        var el = d3.select(this);
        el.info = _.clone(d);
        el.info.guides = _.clone(d.guides);
        if(/polyline/.test(d.selector) || /polygon/.test(d.selector))
          addGuidesByPoints(el);
        if(getComputedStyle(el.node()).pointerEvents !== 'none')
          el.classed('pointer', true);
        el.on('mouseover',function(){over(el)});
        el.on('mouseout',function(){out(el)});
      });
    });
  },
  addLinks = function(){
    _data.links.forEach(function(d){
      var el = d3.select(d.selector),
          url = d.url;
      el.on('click', function(){
        window.open(url, '_blank');
      });
    });
  },
  adjustFonts = function(arr){
    arr.forEach(function(selector){
      d3.selectAll(selector).each(function(){
        var el = d3.select(this), family = el.attr('font-family');
        if(family) el.attr('class', family.replace(/'/g, ''));
      });
    });
  },
  update = function(){
    if(_width !== undefined && _height !== undefined && _y !== undefined){
      var ratio = _width / _svgWidth,
          highlightWidth = _svgWidth - 100;
      if(_$svg) _$svg.attr({'width': _width, 'height': ratio * _svgHeight});
      if(_$highlight) _$highlight.style({'font-size': ratio + 'em', 'width': ratio * highlightWidth, 'margin-left': ratio * highlightWidth / -2});
      if(_ball) _ball.update(_width, _height, _y, ratio);
      if(_tapes) _tapes.update(_width, _height, _y, ratio);
      if(_radiationLeft) _radiationLeft.update(_y);
      if(_radiationRight) _radiationRight.update(_y);
    }
  },
  onscroll = function(){
    // console.log('onrscroll');
    _y = window.pageYOffset;
    update();
  },
  onresize = function(){
    // console.log('onresize');
    _width = window.innerWidth;
    _height = window.innerHeight;
    // console.log(_width, _height);
    update();
  },
  setup = function(){
    document.body.appendChild(_xml.documentElement);
    adjustFonts(['tspan', 'text']);
    _$highlight = d3.select('#highlight');
    _$svg = d3.select('svg');
    _svgWidth = parseInt(_$svg.attr('width'));
    _svgHeight = parseInt(_$svg.attr('height'));
    _ball = new Ball();
    _dragCircle = new Drag();
    _radiationLeft = new Radiation('#radiationLeft');
    _radiationRight = new Radiation('#radiationRight');
    _imageProjector = new ImageProjector();
    _tapes = new Tapes();
    new CatMask();
    new Pattern();
    addShapeElementEvents();
    addLinks();
    onresize();
    onscroll();
    window.onresize = onresize;
    window.onscroll = onscroll;
  },
  init = function(){
    queue()
      .defer(d3.xml, 'index.svg', 'image/svg+xml')
      // .defer(d3.json, 'data.json')
      // .await(function(error, xml, json){
      .await(function(error, xml){
        _xml = xml;
        // _json = json;
        setup();
    });
  };
init();
})();