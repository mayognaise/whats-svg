/*
 *
 * selector for Safari / they don't get selector correctly
 *
 */
var d3Select = function(selector){
  var el = d3.select(selector);
  if(!el.node()){
    d3.select('svg').selectAll('*').each(function(){
      var el2 = d3.select(this),
          id = el2.attr('id');
      if(id){
        if(('#' + id) === selector) el = el2;
      }
    });
  }
  // console.log(el.node());
  return el;
};