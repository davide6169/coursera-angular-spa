(function(){
  'use strict';
 
  // modules

  angular.module('MenuApp',['data','ui.router']);
  angular.module('data',[]);

  // routes

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    // states: home,categories,items
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/home.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories.html',
      controller: 'CategoriesController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories().then(function(response) {
            return response.data;
          });
        }]
      }
    })
    .state('items', {
      url: '/items/{category}',
      templateUrl: 'src/items.html',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.category).then(function(response) {
            return response.data.menu_items;
          });
        }]
      }
    });
  };
  
  // services

  angular.module('data')
  .service('MenuDataService',MenuDataService); 

  MenuDataService.$inject = ['$http'];

  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function() {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/categories.json'
      });
    }

    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
        params: {category: categoryShortName}
      });
    }
  };

  // components

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/categories.component.html',
    bindings: {
      items: '<'
    }
  });

  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/items.component.html',
    bindings: {
      items: '<'
    }
  });
 
  // controllers

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];

  function CategoriesController(categories) {
    var categoriesCtrl = this;
    categoriesCtrl.categories = categories;
  };

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];

  function ItemsController(items) {
    var itemsCtrl = this;
    itemsCtrl.items = items;
  };
})();
