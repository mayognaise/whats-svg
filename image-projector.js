var ImageProjector;

ImageProjector = (function() {
  function ImageProjector() {
    this.resultContainer = [];
    this.skewY = 26.5;
    this.x = 600; // 600
    this.y = 1750; // 1625
    this.width = 148; // 150
    this.height = 150; // 400
    this.g = d3.select('svg').insert('g', '#obj')
    // this.g = d3.select('svg').append('g')
      .attr({
        'id': 'imageProjector',
        'transform': this.getTransform({x: this.x, y: this.y, skewY: this.skewY})
      });
    this.mask = this.g.append('defs').append('clipPath')
      .attr({
        id: 'clipMask'
      }).append('rect')
      .attr({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      });
    this.imageG = this.g.append('g');
    this.init();
  }

  ImageProjector.prototype.showImage = function(count){
    var that = this;
    if(!count) count = 0;
    if(count < this.results.length){
      var result = this.results[count],
          // url = result.unescapedUrl,
          url = result.tbUrl,
          img = new Image();
          img.onload = function(){
            var w, h, x, y;
            if(img.width / img.height > that.width / that.height){
              h = that.height;
              w = that.height * img.width / img.height;
              x = (that.width - w) / 2;
              y = 0;
            }else{
              w = that.width;
              h = that.width * img.height / img.width;
              x = 0;
              y = (that.height - h) / 2;
            }
            that.imageG.text('').append('image')
              .attr({
                'x': x, 'y': y, 
                'width': w, 'height': h,
                'xlink:href': result.unescapedUrl,
                'clip-path': 'url(#clipMask)'
              });
            setTimeout(function(){
              that.showImage(++that.count);
            }, 20000);
          };
          img.src = url;
    }else{
      var num = (this.cursor.currentPageIndex + 1) % this.pageLength;
      if(this.resultContainer[num]){
        this.results = this.resultContainer[num];
        this.showImage(0);
      }else{
        this.imageSearchManager.gotoPage(num);
      }
      console.log('gotoPage', num);
    }
    this.count = count;
  };

  ImageProjector.prototype.output = function(res){
    if(res.status === 'success'){
      this.results = res.results;
      this.cursor = this.imageSearchManager.getCursor();
      this.pageLength = this.cursor.pages.length;
      this.resultContainer[this.cursor.currentPageIndex] = this.results;
      this.showImage(0);
    }
  };


  ImageProjector.prototype.init = function(){
    var that = this;
    this.imageSearchManager = new ImageSearchManager();
    this.imageSearchManager.ready(function(){
      that.imageSearchManager.execute('doge', function(res){ that.output(res); });
    });
  };

  ImageProjector.prototype.getTransform = function(obj){
    return 'translate(' + [ obj.x || 0, obj.y || 0 ] + ') ' +
      'rotate(' + [ obj.angle || 0, obj.orientationX || 0, obj.orientationY || 0 ] + ') ' + 
      'scale(' + [ obj.scale || 1 ] + ') ' +
      'skewX(' + [ obj.skewX || 0 ] + ') ' +
      'skewY(' + [ obj.skewY || 0 ] + ')';
  };

  // ImageProjector.prototype.init = function(){};
  return ImageProjector;

})();
