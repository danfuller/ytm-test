define(["jquery", "ractive", "components/adapters/soundcloud", "rv!/template/catalogue.html"], function($, Ractive, Soundcloud, template) {
  var Catalogue;
  return Catalogue = Ractive.extend({
    el: document.body,
    template: template,
    data: {
      tracks: []
    },
    init: function() {
      console.log("Hello Catalogue :)");
      this._eventListeners();
      Soundcloud = new Soundcloud();
      Soundcloud.getTracksByUser('creamcollective', this._addToCatalogue.bind(this));
      return Soundcloud.getTracksByUser('trap-door-official', this._addToCatalogue.bind(this));
    },
    _addToCatalogue: function(data) {
      var track, _i, _len;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        track = data[_i];
        this.data.tracks.push(track);
      }
      return this._layout();
    },
    _layout: function() {
      var left, top, track, _i, _len, _ref;
      left = 60;
      top = 60;
      _ref = this.data.tracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        track = _ref[_i];
        track.left = left;
        track.top = top;
        left += 200;
        if (left + 160 >= window.innerWidth) {
          left = 60;
          top += 270;
        }
      }
      return this.update();
    },
    _eventListeners: function() {
      var _this = this;
      return document.addEventListener('mousemove', function(e) {
        return _this._mousemoveEventListener(e);
      });
    },
    _mousemoveEventListener: function(e) {
      var displayParams, scrollTop;
      scrollTop = $('.catalogue').scrollTop();
      displayParams = {
        x: e.pageX,
        y: e.pageY + scrollTop
      };
      return this._configureDisplay(displayParams);
    },
    _configureDisplay: function(param) {
      var track, _i, _len, _ref;
      _ref = this.data.tracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        track = _ref[_i];
        track.rotateY = Math.round((((track.left + 80) - param.x) * -1) * 0.03);
        track.rotateX = Math.round(((track.top + 80) - param.y) * 0.03);
      }
      return this.update();
    }
  });
});

/*
//# sourceMappingURL=../../../source/js/components/catalogue.js.map
*/