(function(){
  'use strict';

  // ---------------------- 
  // component categories
  // ---------------------- 
  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/categories.component.html',
    bindings: {
      items: '<'
    }
  });  
  // ---------------------- 

})();
