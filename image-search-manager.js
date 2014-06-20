/*
 *
 * Image manager for Google Image Search
 * https://developers.google.com/image-search/v1/devguide
 * 
 * 
 */

var ImageSearchManager;

ImageSearchManager = (function() {
  function ImageSearchManager() {
    this.imageSearch = undefined;
    this.isReady = false;
    this.init();
  }

  ImageSearchManager.prototype.init = function(){
    var that = this;
    // google.load('search', '1');
    google.setOnLoadCallback(function(){
      that.imageSearch = new google.search.ImageSearch();
      that.isReady = true;
    });
  };

  ImageSearchManager.prototype.onSearchComplete = function(callback){
    if(this.imageSearch.results && this.imageSearch.results.length > 0){
      callback({
        status: 'success',
        results: this.imageSearch.results
      });
    }else{
      callback({
        status: 'no result'
      });
    }
  };

  ImageSearchManager.prototype.execute = function(val, callback){
    var that = this;
    this.imageSearch.setSearchCompleteCallback(this, function(){ that.onSearchComplete(callback); }, null);
    this.imageSearch.execute(val);
  };

  ImageSearchManager.prototype.gotoPage = function(pageId, callback){
    if(callback){
      var that = this;
      this.imageSearch.setSearchCompleteCallback(this, function(){ that.onSearchComplete(callback); }, null);
    }
    this.imageSearch.gotoPage(pageId);
  };

  ImageSearchManager.prototype.getCursor = function(){
    return this.imageSearch.cursor;
  };


  ImageSearchManager.prototype.ready = function(callback){
    var that = this;
    var iid = setInterval(function(){
      if(that.isReady){
        clearInterval(iid);
        callback()
      }
    }, 500);
  };

  // Include the required Google branding
  ImageSearchManager.prototype.getBranding = function(callback, isVertical){
    var div = document.createElement('div'),
        iid = setInterval(function(){
          if(div.innerHTML){
            clearInterval(iid);
            callback(div.innerHTML);
          }
        }, 500);
    var orientation = isVertical? google.search.Search.VERTICAL_BRANDING : google.search.Search.HORIZONTAL_BRANDING;
    google.search.Search.getBranding(div, orientation);
  };


  // ImageSearchManager.prototype.fnc = function(){};

  return ImageSearchManager;

})();
