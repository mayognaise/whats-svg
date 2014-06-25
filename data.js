var _data = {
  "links": [
    {
      "selector": "#linkRect",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect"
    },
    {
      "selector": "#linkCircle",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle"
    },
    {
      "selector": "#linkEllipse",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse"
    },
    {
      "selector": "#linkLine",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line"
    },
    {
      "selector": "#linkPolyline",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline"
    },
    {
      "selector": "#linkPolygon",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon"
    },
    {
      "selector": "#linkPath",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path"
    },
    {
      "selector": "#linkG",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g"
    },
    {
      "selector": "#linkAnime",
      "url": "http://blog.legomushroom.com/2014/03/defining-advanced-animation-path/"
    },
    {
      "selector": "#linkImage",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image"
    },
    {
      "selector": "#linkClipPath",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clippath"
    },
    {
      "selector": "#linkPattern",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern"
    },
    {
      "selector": "#linkElements",
      "url": "https://developer.mozilla.org/en-US/docs/Web/SVG/Element/"
    },
    {
      "selector": "#linkD3Js",
      "url": "http://d3js.org/"
    },
    {
      "selector": "#linkTwoJs",
      "url": "http://jonobr1.github.io/two.js/"
    },
    {
      "selector": "#linkRaphael",
      "url": "http://raphaeljs.com/"
    },
    {
      "selector": "#linkSnapSvg",
      "url": "http://snapsvg.io/"
    },
    {
      "selector": "#linkSvgJS",
      "url": "http://svgjs.com/"
    },
    {
      "selector": "#linkPhantomJs",
      "url": "http://phantomjs.org/"
    },
    {
      "selector": "#linkFabricJs",
      "url": "http://fabricjs.com/"
    },
    {
      "selector": "#linkQueueJs",
      "url": "http://giscollective.org/d3-queue-js/"
    },
    {
      "selector": "#linkIllustrator",
      "url": "http://css-tricks.com/using-svg/"
    },
    {
      "selector": "#linkForce",
      "url": "https://github.com/mbostock/d3/wiki/Force-Layout"
    },
    {
      "selector": "#linkStory",
      "url": "http://story-build.ne-zu.com/"
    },
    {
      "selector": "#linkRay",
      "url": "https://github.com/RayPatterson"
    }
  ],
  "buttons": [
    {
      "selector": "circle",
      "d_array": [ "cx", "cy", "r" ],
      "guides": [
        {
          "shape": "circle",
          "attr": {
            "cx": function(d){ return d.cx; },
            "cy": function(d){ return d.cy; },
            "r": function(d){ return 3; }
          }
        },
        {
          "shape": "circle",
          "attr": {
            "cx": function(d){ return d.cx; },
            "cy": function(d){ return d.cy; },
            "r": function(d){ return d.r; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          },
          "guideline": true
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return d.cx - d.r / Math.sqrt(2); },
            "y1": function(d){ return d.cy - d.r / Math.sqrt(2); },
            "x2": function(d){ return d.cx; },
            "y2": function(d){ return d.cy; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return 0; },
            "y1": function(d){ return d.cy; },
            "x2": function(d){ return d.cx; },
            "y2": function(d){ return d.cy; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return d.cx; },
            "y1": function(d){ return 0; },
            "x2": function(d){ return d.cx; },
            "y2": function(d){ return d.cy; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        }
      ],
      "highlighting": function(el){
        var node = el.node(),
            parentNode = node.parentElement;
        if(parentNode.id === 'drag'){
          var stars = d3.select('#stars'),
              starHTML = stars.node().outerHTML;
              arr = [];
          stars.selectAll('polygon').each(function(){
            var points = d3.select(this).attr('points');
            console.log(points);
            // starHTML.replace(points, '...');
            starHTML = starHTML.replace(points.substring(5, points.split('').length - 10), '...');
          });
          return el.node().outerHTML + '\n' + starHTML;
        // }else if(parentNode.id === 'ball'){
        //   return el.node().outerHTML.replace('<circle', '<circle id="ball"');
        }else{
          return el.node().outerHTML;
        }
      }
    },
    {
      "selector": "ellipse",
      "d_array": [ "cx", "cy", "rx", "ry" ],
      "guides": [
        {
          "shape": "circle",
          "attr": {
            "cx": function(d){ return d.cx; },
            "cy": function(d){ return d.cy; },
            "r": function(d){ return 3; }
          }
        },
        {
          "shape": "ellipse",
          "attr": {
            "cx": function(d){ return d.cx; },
            "cy": function(d){ return d.cy; },
            "rx": function(d){ return d.rx; },
            "ry": function(d){ return d.ry; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          },
          "guideline": true
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return 0; },
            "y1": function(d){ return d.cy; },
            "x2": function(d){ return Number(d.cx) + Number(d.rx); },
            "y2": function(d){ return d.cy; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return d.cx; },
            "y1": function(d){ return 0; },
            "x2": function(d){ return d.cx; },
            "y2": function(d){ return Number(d.cy) + Number(d.ry); },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        }
      ]
    },
    {
      "selector": "line",
      "d_array": [ "x1", "y1", "x2", "y2" ],
      "guides": [
        {
          "shape": "circle",
          "attr": {
            "cx": function(d){ return d.x1; },
            "cy": function(d){ return d.y1; },
            "r": function(d){ return 3; }
          }
        },
        {
          "shape": "circle",
          "attr": {
            "cx": function(d){ return d.x2; },
            "cy": function(d){ return d.y2; },
            "r": function(d){ return 3; }
          }
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return d.x1; },
            "y1": function(d){ return d.y1; },
            "x2": function(d){ return d.x2; },
            "y2": function(d){ return d.y2; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        }
      ]
    },
    {
      "selector": "#obj rect",
      "d_array": [ "x", "y", "width", "height" ],
      "guides": [
        {
          "shape": "circle",
          "attr": {
            "cx": function(d){ return d.x; },
            "cy": function(d){ return d.y; },
            "r": function(d){ return 3; }
          }
        },
        {
          "shape": "rect",
          "attr": {
            "x": function(d){ return d.x; },
            "y": function(d){ return d.y; },
            "width": function(d){ return d.width; },
            "height": function(d){ return d.height; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return 0; },
            "y1": function(d){ return d.y; },
            "x2": function(d){ return d.x; },
            "y2": function(d){ return d.y; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        },
        {
          "shape": "line",
          "attr": {
            "x1": function(d){ return d.x; },
            "y1": function(d){ return 0; },
            "x2": function(d){ return d.x; },
            "y2": function(d){ return d.y; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        }
      ]
    },
    {
      "selector": "polyline",
      "d_array": [ "points" ],
      "guides": [
        {
          "shape": "polyline",
          "attr": {
            "points": function(d){ return d.points; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        }
      ]
    },
    {
      "selector": "polygon",
      "d_array": [ "points" ],
      "guides": [
        {
          "shape": "polygon",
          "attr": {
            "points": function(d){ return d.points; },
            "stroke-dasharray": function(d){ return "2, 3"; }
          }
        }
      ]
    },
    {
      "selector": "#catMaskG",
      "d_array": [],
      "guides": [],
      "highlighting": function(el){
        var d = el.select('path').attr('d'),
            defs = el.select('defs'),
            image = el.select('image');
        d = d.substring(10, d.split('').length - 10);
        return defs.node().outerHTML.replace(d, '...') + '\n' + image.node().outerHTML;
      }
    },
    {
      "selector": "#imageProjector",
      "d_array": [],
      "guides": [],
      "highlighting": function(el){
        var image = el.select('image');
        return image.node().outerHTML.replace(' clip-path="url(#clipMask)"', '');
      }
    },
    {
      "selector": "#dogeRight",
      "d_array": [],
      "guides": [],
      "highlighting": function(el){
        var p = el.selectAll('polygon'),
            defs = el.select('defs').node().outerHTML;
        return defs.replace('<image', '\n<image') + '\n' + p[0][1].outerHTML;
      }
    },
    {
      "selector": "#guide",
      "d_array": [],
      "guides": []
    }
  ]
};


