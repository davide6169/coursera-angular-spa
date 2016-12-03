(function(){
  'use strict';

  // ---------------------- 
  // routes
  // ---------------------- 
  // home
  // categories
  // items
  // ---------------------- 
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    // ---------------------- 
    .state('home', {
      url: '/',
      templateUrl: 'src/home.html'
    })
    // ---------------------- 
    // ---------------------- 
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
    // ---------------------- 
    // ---------------------- 
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
    // ---------------------- 
  };  
  // ---------------------- 

})();
