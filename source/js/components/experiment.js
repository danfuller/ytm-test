define(["jquery", "io", "ractive", "rv!/template/experiment.html"], function($, io, Ractive, template) {
  var Experiment;
  return Experiment = Ractive.extend({
    el: document.body,
    append: true,
    template: template,
    users: null,
    init: function() {
      console.log('asd');
      this.socket = io.connect('http://localhost:1234');
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
      return document.addEventListener('mousemove', function(e) {
        return _this._mouseMoveHandler(_this, e);
      });
    },
    _userConnect: function() {
      return this.socket.emit('connect');
    },
    _mouseMoveHandler: function(Experiment, e) {
      var mouse;
      mouse = {
        x: e.x,
        y: e.y
      };
      return Experiment.socket.emit('mousemove', mouse);
    },
    _socketEvents: function() {
      var _this = this;
      console.log('socketEvents');
      this.socket.on('users_updated', function(data) {
        console.log(data);
        return _this.set('users', data);
      });
      return this.socket.on('mouse_updated', function(data) {
        console.log(data);
        return _this.set('users', data);
      });
    }
  });
});

/*
//# sourceMappingURL=../../../source/js/components/experiment.js.map
*/