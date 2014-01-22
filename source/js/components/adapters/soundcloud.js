define(["jquery", "soundcloud-api"], function($, SC) {
  var SoundcloudAPI;
  return SoundcloudAPI = (function() {
    function SoundcloudAPI() {}

    SoundcloudAPI.CLIENTID = '4f4e41c6b6d715009ee6b8f62255b525';

    SoundcloudAPI.REDIRECT_URL = 'http://youtellme/callback.html';

    SoundcloudAPI.load = function() {
      console.log('init');
      return SC.initialize({
        client_id: SoundcloudAPI.CLIENTID,
        redirect_uri: SoundcloudAPI.REDIRECT_URL
      });
    };

    SoundcloudAPI.auth = function(callback) {
      if (callback == null) {
        callback = {};
      }
      return SC.connect(function() {
        return SC.get('/me', function(me) {
          return callback.success(me);
        });
      });
    };

    SoundcloudAPI.authSuccess = function(me) {
      return console.log(me);
    };

    SoundcloudAPI._resolve = function(url, callback) {
      return $.getJSON("http://api.soundcloud.com/resolve.json?url=" + url + "&client_id=" + SoundcloudAPI.CLIENTID, callback);
    };

    SoundcloudAPI.getTracksByUser = function(id, callback) {
      return this._resolve('http://soundcloud.com/' + id, function(result) {
        return SC.get("/users/" + result.id + "/tracks", {
          limit: 50
        }, callback);
      });
    };

    return SoundcloudAPI;

  }).call(this);
});

/*
//# sourceMappingURL=../../../../source/js/components/adapters/soundcloud.js.map
*/