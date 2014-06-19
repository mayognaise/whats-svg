var Radiation;

Radiation = (function() {
  function Radiation(selector) {
    this.el = d3.select(selector);
    this.arr = [];
    this.side = /Left/.test(selector)? 'left': 'right';
    this.init();
  }

  Radiation.prototype.init = function(){
    this.d = this.el.attr('d');
    // console.log(this.d);
    if(this.side === 'left'){
      /*
      M92.061,271.268    C65.148,325.059,50,385.76,50,450c0,64.233,15.145,124.927,42.051,178.713
      L250,550l199.506-100.059l-199.982-99.963
      L92.061,271.268z 
      */
      this.ds = [
        { status: 'silent', val: 'M' },
        { status: 'changeable', val: 92.061, x: true },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 271.268, y: true },
        { status: 'silent', val: 'C' },
        { status: 'changeable', val: 65.148 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 325.059 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 50 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 385.76 },
        { status: 'silent', val: ',' },

        { status: 'silent', val: '50,450' },
        // { status: 'changeable', val: 50, cx: true },
        // { status: 'silent', val: ',' },
        // { status: 'changeable', val: 450, cy: true },

        { status: 'silent', val: 'c' },
        { status: 'changeable', val: 0 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 64.233 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 15.145 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 124.927 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 42.051 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 178.713 },
        { status: 'silent', val: 'L250,550l199.506-100.059l-199.982-99.963L' },
        { status: 'x' },
        { status: 'silent', val: ',' },
        { status: 'y' },
        { status: 'silent', val: 'z' }
      ];
    }else{
      /*
      M850,450    c0-64.428-15.238-125.294-42.297-179.202
      L649.5,349.919L449.506,449.941L649.5,549.909
      l158.288,79.123    C834.795,575.167,850,514.36,850,450z 
      */
      this.ds = [
        { status: 'silent', val: 'M850,450c' },
        { status: 'changeable', val: 0 },
        { status: 'silent', val: '-' },
        { status: 'changeable', val: 64.428 },
        { status: 'silent', val: '-' },
        { status: 'changeable', val: 15.238 },
        { status: 'silent', val: '-' },
        { status: 'changeable', val: 125.294 },
        { status: 'silent', val: '-' },
        { status: 'changeable', val: 42.297 },
        { status: 'silent', val: '-' },
        { status: 'changeable', val: 179.202 },
        { status: 'silent', val: 'L649.5,349.919L449.506,449.941L649.5,549.909l' },
        { status: 'changeable', val: 158.288 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 79.123 },
        { status: 'silent', val: 'C' },
        { status: 'changeable', val: 834.795 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 575.167 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 850 },
        { status: 'silent', val: ',' },
        { status: 'changeable', val: 514.36 },
        { status: 'silent', val: ',850,450z' }
      ];
    }

    this.initD = this.getRandomD(true);
  };

  Radiation.prototype.update = function(y){
    var d, el = this.el, init = this.initD;
    if(y === 0){
      d = init;
    }else{
      d = this.getRandomD().replace(/--/g,'-');
    }
    el
      // .interrupt()
      // .transition()
      // .duration(100)
      .attr('d', d);
    if(y !== 0){
      setTimeout(function(){ el.attr('d', init); }, 50);
    }
  };
  Radiation.prototype.getRandomD = function(init){
    var arr = [], x, y, item, ran,
        random = function(val){
          var num = 100;
          return Math.floor(val + Math.random() * num - num / 2);
        };
    for (var i = 0; i < this.ds.length; i++) {
      item = this.ds[i];
      if(item.status === 'silent'){
        arr.push(item.val);
      }else if(item.status === 'changeable'){
        ran = init? item.val : random(item.val);
        arr.push(ran);
        if(item.x) x = ran;
        if(item.y) y = ran;
      }else if(item.status === 'x' || item.status === 'y'){
        arr.push((item.status === 'x')? x : y);
      }
    };
    return arr.join('');
  };
  
  // Radiation.prototype.init = function(){};


  return Radiation;

})();
