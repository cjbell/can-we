var CanWe = {};

CanWe.Common = {
  initialize: function() {

  }
};

CanWe.Content = {
  initialize: function(){
    new Gallery({ el: $('.gallery-content') });
  }
};

// Bind the App modules to fire when the dom is ready
new BigBird.Initializer({ modules: CanWe });