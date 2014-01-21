var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["jquery", "soundcloud-api"], function($, SC) {
  var SoundcloudAPI;
  return SoundcloudAPI = (function() {
    SoundcloudAPI.CLIENTID = '4f4e41c6b6d715009ee6b8f62255b525';

    function SoundcloudAPI() {
      this._resolve = __bind(this._resolve, this);
      console.log('Hello SoundcloudApi');
      SC.initialize({
        client_id: SoundcloudAPI.CLIENTID
      });
    }

    SoundcloudAPI.prototype._resolve = function(url, callback) {
      return $.getJSON("http://api.soundcloud.com/resolve.json?url=" + url + "&client_id=" + SoundcloudAPI.CLIENTID, callback);
    };

    SoundcloudAPI.prototype.getTracksByUser = function(id, callback) {
      return this._resolve('http://soundcloud.com/' + id, function(result) {
        return SC.get("/users/" + result.id + "/tracks", {
          limit: 50
        }, callback);
      });
    };

    return SoundcloudAPI;

  })();
});

/*
//# sourceMappingURL=../../../../source/js/soundcloud.js.map
*/