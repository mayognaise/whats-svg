var data = require('./data'),
  // hl = require('highlight').Highlight,
  HightlightElement = require('./highlight-element');

module.exports = (function(){
  function Hightlight(){
    this.init();
  }

  Hightlight.prototype.update = function(width, ratio){
    var highlightWidth = ratio * (width - 100);
    this.$highlight.style({
      'font-size': ratio + 'em',
      'width': highlightWidth + 'px',
      'margin-left': (highlightWidth / -2) + 'px'
    });
  };
  Hightlight.prototype.convert = function(html){
    return html
      .replace(/stroke-miterlimit="10" /g, '')
      .replace(/ class="pointer"/g, '')
      .replace(/&/g, '&amp;').replace(/>/g, '&gt;')
      .replace(/</g, '&lt;').replace(/"/g, '&quot;')
      .replace(/\t/g, '')
      // .replace(/&gt;&lt;/g, '&gt;\n&lt;');
  };
  Hightlight.prototype.updateHighlighting = function(html){
    if(html){
      html = '<pre><code id="code" class="html">' + this.convert(html) + '</code></pre>';
      this.$highlight.html(html);
      if(html) hljs.highlightBlock(document.getElementById('code'));
    }
    this.$highlight.classed('show', !!(html));
  };

  Hightlight.prototype.init = function(){
    this.$highlight = $('#highlight');
    this.g = d3.select('svg').append('g').attr('class', 'info');
    var canHighting = !!(this.g.node().outerHTML),
      that = this;
    data.buttons.forEach(function(d){
      d3.selectAll(d.selector).each(function(){
        var el = new HightlightElement(this, that.g, _.cloneDeep(d));
        if(canHighting){
          el.on('over', function(evt){
            var el = evt.target,
              info = el.info,
              html = info.highlighting? info.highlighting(el) : el.node().outerHTML;
            that.updateHighlighting(html);
          });
          el.on('out', function(evt){
            that.updateHighlighting();
          });
        }
      });
    });
  };


  return Hightlight;

})();