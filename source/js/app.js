define(["jquery", "components/catalogue", "components/experiment", "components/adapters/soundcloud"], function($, Catalogue, Experiment, Soundcloud) {
  var App;
  return App = (function() {
    function App() {
      console.log("Hello World :)");
      Soundcloud.load();
      App.Catalogue = new Catalogue();
      App.Experiment = new Experiment();
    }

    return App;

  })();
});

/*
//# sourceMappingURL=../../source/js/app.js.map
*/