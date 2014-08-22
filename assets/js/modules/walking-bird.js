
var queue = require('queue-async'),
  parts = [
    {
      id: 'left_leaf',
      origin: [1, 1]
    },
    {
      id: 'right_leaf',
      origin: [0, 1]
    },
    {
      id: 'left_leg',
      origin: [1, 0]
    },
    {
      id: 'right_leg',
      origin: [0, 0]
    },
    {
      id: 'white_eye',
      origin: [0.5, 0.5]
    },
    {
      id: 'black_eye',
      origin: [0.5, 0.5]
    },
    {
      id: 'mouth',
      origin: [0, 1]
    }
  ];

module.exports = (function(){
  function WalkingBrid(id, initTransform) {
    this.el = $('#' + id);
    this.el.classed('walking-bird', true);
    if(initTransform) this.initTransform = initTransform;
    else this.initTransform = {};
    if(this.initTransform.translate === undefined) this.initTransform.translate = [0, 0];
    if(this.initTransform.scale === undefined) this.initTransform.scale = 1;
    if(this.initTransform.rotate === undefined) this.initTransform.rotate = 0;
    this.transformSupport = !!(this.el.node().outerHTML);
    this.init();
  }

  WalkingBrid.prototype.update = function(height, y, ratio){
    var _initY = 3950,
        _endY = 4000,
        _y = y / ratio,
        _h = height / ratio,
        _bottom = (_y + _h - _initY) / (_endY - _initY);
    if(this.transformSupport && _bottom > 0 && !this.openFlag){
      this.openFlag = true;
      this.open();
    }
  };

  WalkingBrid.prototype.open = function(){
    if(!this.transformSupport) return;
    var that = this;
    this.el.classed('anim', true);
    setTimeout(function(){
      that.el.classed('open-leaf', true);
      setTimeout(function(){
        that.el.classed('show-wing', true);
        setTimeout(function(){
          that.el.select('#left_wing path').transition().duration(200)
            .attr('d', that.el.select('#left_wing_after path').attr('d'));
          that.el.select('#right_wing path').transition().duration(200)
            .attr('d', that.el.select('#right_wing_after path').attr('d'))
            .each('end', function(){
              that.el.classed('show-body', true);
              setTimeout(function(){
                that.el.select('#body path').transition().duration(200)
                  .attr('d', that.el.select('#body_after path').attr('d'))
                  .each('end', function(){
                    that.el.classed('ready-leg', true);
                    setTimeout(function(){
                      that.el.classed('show-leg', true);
                      setTimeout(function(){
                        that.el.classed('open-leg', true);
                        var translate =  [that.initTransform.translate[0], (that.initTransform.translate[1] + 10)];
                        that.el.transition().duration(300)
                        .attr('transform', 'translate(' + translate + ')'
                          + ' scale(' + that.initTransform.scale + ')'
                        );
                      }, 100);
                    }, 10);
                  });
              }, 10);
            });
        }, 10);
      }, 300);
    }, 10);
  };

  WalkingBrid.prototype.setup = function(){
    // var that = this,
    //   parent = d3.select('svg').node().getBoundingClientRect();
    // var text = '';
    // _.each(parts, function(part, index){
    //   part.el = that.el.select('#' + part.id);
    //   part.box = part.el.node().getBoundingClientRect();
    //   part.left = part.box.left - parent.left;
    //   part.top = part.box.top - parent.top;
    //   part.originLeft = Math.floor(part.box.width * part.origin[0] + part.left);
    //   part.originTop = Math.floor(part.box.height * part.origin[1] + part.top);
    //   part.el.style({
    //     '-webkit-transform-origin': part.originLeft + 'px ' + part.originTop + 'px',
    //     '-moz-transform-origin': part.originLeft + 'px ' + part.originTop + 'px',
    //     '-ms-transform-origin': part.originLeft + 'px ' + part.originTop + 'px',
    //     'transform-origin': part.originLeft + 'px ' + part.originTop + 'px'
    //   });
    //   text += ('#' + part.id + '{transform-origin: ' + part.originLeft + 'px ' + part.originTop + 'px;}\n');
    // });
    // console.log(text);
    this.el.classed({'init': false, 'active': true});
  };

  WalkingBrid.prototype.init = function(){
    var that = this;
    this.openFlag = false;
    queue()
      .defer(d3.xml, '/assets/svg/walking-bird.svg', 'image/svg+xml')
      .await(function (error, xml) {
        if(!error){
          console.log($('#walkingBird'));
          /* temporary */
          if(window.chrome && !(/Netscape/.test(navigator.appName) && /Trident/.test(navigator.userAgent)))
            $('#walkingBird').remove();
          console.log(xml.documentElement);
          that.el.classed('init', true);
          if(that.transformSupport){
            that.el.html(xml.documentElement.innerHTML);
            that.setup();
          }else{
            that.el.html(xml.documentElement.innerSVG);
            that.el.classed({'init': false, 'innactive': true});
          }
          that.el.attr('transform', 'translate(' + that.initTransform.translate[0] + ', ' + that.initTransform.translate[1] + ')'
            + ' scale(' + that.initTransform.scale + ')'
            // + ' rotate(' + that.initTransform.rotate + 'deg)'
          );
        }
      });
  };

  return WalkingBrid;

})();