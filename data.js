var _data = {
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
      ]
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
      "selector": "rect",
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
    }
  ]
};
