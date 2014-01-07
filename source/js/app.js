define(["jquery", "components/catalogue"], function($, Catalogue) {
  var App;
  return App = (function() {
    function App() {
      console.log("Hello World :)");
      App.Catologue = new Catalogue();
    }

    return App;

  })();
});

/*
//# sourceMappingURL=../../source/js/app.js.map
*/