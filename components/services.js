/* Services */
var servs = angular.module('wwwApp.services', ['ngResource']);

/************************************************************************************************
*
* General data services
*
************************************************************************************************/
// Get the most recently added products and show in main page
servs.factory('mainProductsList',function($resource){
	return $resource('/data/lastProducts.php',{},{query:{method:'GET',params:{},isArray:true}});
});

servs.factory('mainPromoList',function($resource){
  return $resource('/data/lastPromos.php',{},{query:{method:'GET',params:{}, isArray:true}});
});

servs.factory('Products',function($resource){
  return $resource('/data/product-list.php',{},{
    query : { method : 'GET', isArray : true },
    save: {method: 'POST'},
    show: { method: 'GET'},
    edit: { method: 'GET'},
    update: { method: 'PUT'},
    destroy: { method: 'DELETE' }
  });
});

/************************************************************************************************
*
* data services
*
************************************************************************************************/
servs.factory('UsersRest', ['$resource', function($resource) {
  return $resource('/data/UsersRest.php',{},{
    query : { method : 'GET', params:{}, isArray : true },
    save: {method: 'POST'},
    show: { method: 'GET'},
    edit: { method: 'GET'},
    update: { method: 'PUT'},
    destroy: { method: 'DELETE' }
  });
}]);

servs.factory('ProductsRest', ['$resource', function($resource) {
  return $resource('/data/ProductsRest.php',{},{
    query : { method : 'GET', params:{} ,isArray : true },
    save: {method: 'POST'},
    show: { method: 'GET'},
    edit: { method: 'GET'},
    update: { method: 'PUT'},
    destroy: { method: 'DELETE' }
  });
}]);


servs.factory('ContactsRest', ['$resource', function($resource) {
  return $resource('/data/ContactRest.php',{},{
    query : { method : 'GET', params:{} ,isArray : true },
    save: {method: 'POST'},
    show: { method: 'GET'},
    edit: { method: 'GET'},
    update: { method: 'PUT'},
    destroy: { method: 'DELETE' }
  });
}]);

servs.factory('CommentsRest', ['$resource', function($resource) {
  return $resource('/data/CommentsRest.php',{},{
    query : { method : 'GET', params:{} ,isArray : true },
    save: {method: 'POST'},
    show: { method: 'GET'},
    edit: { method: 'GET'},
    update: { method: 'PUT'},
    destroy: { method: 'DELETE' }
  });
}]);

