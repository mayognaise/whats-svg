var ImageProjector;

ImageProjector = (function() {
  function ImageProjector() {
    this.skewY = Math.atan(-1 / 2)*(180 / Math.PI);
    this.x = 100;
    this.y = 2300;
    this.width = 200;
    this.height = 200;
    // this.g = d3.select('svg').insert('g', '#obj')
    this.g = d3.select('svg').append('g')
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
            var $img = that.imageG.select('image'),
            tid = setTimeout(function(){
              tid = null;
              that.showImage(++that.count);
            }, 20000);
            $img.on('click', function(){
              if(tid){
                clearTimeout(tid);
                that.showImage(++that.count);
              }
            });
          };
          img.src = url;
    }else{
      var num = (this.pageIndex + 1) % this.pageLength;
      this.imageSearchManager.gotoPage(num);
      // console.log('gotoPage', num);
    }
    this.count = count;
  };

  ImageProjector.prototype.output = function(res){
    if(res.status === 'success'){
      this.results = res.results;
      this.cursor = this.imageSearchManager.getCursor();
      this.pageLength = this.cursor.pages.length;
      this.pageIndex = this.cursor.currentPageIndex;
      // console.log(this.pageIndex);
      this.showImage(0);
    }
  };


  ImageProjector.prototype.showBranding = function(res){
    // console.log(res);
    var text = res.querySelector('div.gsc-branding-text').innerHTML,
        img = res.querySelector('img');
    // console.log(img.width, img.height); // 51, 15
    var g = d3.select('svg').append('g')
      .attr({
        'transform': this.getTransform({
          x: 300, y: 2400 - (img.height || 15), 
          skewY: Math.atan(1 / 2)*(180 / Math.PI)})
      });
    g.append('image')
      .attr({
        'x': 60, 'y': 0, 
        'width': (img.width || 51), 'height': (img.height || 15),
        'xlink:href': img.src
      });
    g.append('text')
      .attr({
        'font-size': '.6em',
        'transform': this.getTransform({x: 5, y: 10})
      }).text(text);
  };

  ImageProjector.prototype.init = function(){
    var that = this;
    this.imageSearchManager = new ImageSearchManager();
    this.imageSearchManager.ready(function(){
      that.imageSearchManager.execute('gif doge', function(res){ that.output(res); });
      // branding
      that.imageSearchManager.getBranding(function(res){
        that.showBranding(res);
      });
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
