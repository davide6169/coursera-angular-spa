(function(){
  'use strict';

  // ---------------------- 
  // component items
  // ---------------------- 
  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/items.component.html',
    bindings: {
      items: '<'
    }
  });  
  // ---------------------- 

})();
