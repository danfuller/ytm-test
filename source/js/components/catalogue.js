define(["jquery", "ractive", "components/adapters/soundcloud", "rv!/template/catalogue.html"], function($, Ractive, Soundcloud, template) {
  var Catalogue;
  return Catalogue = Ractive.extend({
    el: document.body,
    template: template,
    append: true,
    data: {
      tracks: []
    },
    colors: ['#EE7944', '#EE7944', '#45EEA9', '#EE4562'],
    init: function() {
      console.log("Hello Catalogue :)");
      this._getTracks();
      return this._eventListeners();
    },
    _getTracks: function() {
      return Soundcloud.getTracksByUser('trap-door-official', this._addToCatalogue.bind(this));
    },
    _eventListeners: function() {
      return this.on('activate', this._activate);
    },
    _activate: function(e) {
      var track, _i, _len, _ref;
      _ref = this.data.tracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        track = _ref[_i];
        track.active = false;
      }
      e.context.active = true;
      return this.update();
    },
    _addToCatalogue: function(data) {
      var i, track, _i, _len;
      console.log(data);
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        track = data[i];
        track.artwork_url = track.artwork_url.replace('large.jpg', 't300x300.jpg');
        if (i === 3) {
          track.active = true;
        }
        track.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.data.tracks.push(track);
      }
      return this._layout();
    },
    _layout: function() {
      return this.set('width', this.data.tracks.length * 330);
    }
  });
});

/*
//# sourceMappingURL=../../../source/js/catalogue.js.map
*/