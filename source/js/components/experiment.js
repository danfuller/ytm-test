define(["jquery", "io", "ractive", "rv!/template/experiment.html", "components/adapters/soundcloud"], function($, io, Ractive, template, Soundcloud) {
  var Experiment;
  return Experiment = Ractive.extend({
    el: document.body,
    append: true,
    template: template,
    elLoaded: function() {
      return this.init();
    },
    init: function() {
      this.socket = io.connect('http://192.168.0.10:1234');
      this.set('user', null);
      this._display();
      this._events();
      this._socketEvents();
      return this._userConnect();
    },
    _display: function() {
      return this.set('cheese', 'asd');
    },
    _events: function() {
      var _this = this;
      document.addEventListener('mousemove', function(e) {
        return _this._mouseMoveHandler(_this, e);
      });
      return this.on('join', this._joinHandler);
    },
    _userConnect: function() {
      return this.socket.emit('connect');
    },
    _mouseMoveHandler: function(Experiment, e) {
      var mouse;
      if (!this.data.user) {
        return;
      }
      this.set('scroll', window.scrollX);
      mouse = {
        x: e.pageX,
        y: e.pageY
      };
      this.set('user.mouse', mouse);
      return Experiment.socket.emit('mousemove', mouse);
    },
    _socketEvents: function() {
      var _this = this;
      console.log('socketEvents');
      this.socket.on('users_updated', function(data) {
        console.log('users');
        return _this.set('users', data);
      });
      return this.socket.on('mouse_updated', function(data) {
        var user, _i, _len;
        if ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            user = data[_i];
            _results.push(user.id === this.socket.socket.sessionid);
          }
          return _results;
        }).call(_this)) {
          user.self = true;
        }
        console.log(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          user = data[_i];
          user = null;
        }
        return _this.set('users', data);
      });
    },
    _joinHandler: function() {
      return Soundcloud.auth({
        success: this.loadUser.bind(this)
      });
    },
    loadUser: function(data) {
      this.set('user', data);
      return console.log('lu', this.data.user);
    }
  });
});

/*
//# sourceMappingURL=../../../source/js/components/experiment.js.map
*/