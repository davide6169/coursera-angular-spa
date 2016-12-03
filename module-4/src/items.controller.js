(function(){
  'use strict';

  // ---------------------- 
  // controller ItemsController
  // ---------------------- 
  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];

  function ItemsController(items) {
    var itemsCtrl = this;
    itemsCtrl.items = items;
  }; 
  // ---------------------- 

})();
