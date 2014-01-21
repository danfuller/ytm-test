define(["jquery", "components/catalogue", "components/experiment"], function($, Catalogue, Experiment) {
  var App;
  return App = (function() {
    function App() {
      console.log("Hello World :)");
      App.Catalogue = new Catalogue();
      App.Experiment = new Experiment();
    }

    return App;

  })();
});

/*
//# sourceMappingURL=../../source/js/app.js.map
*/