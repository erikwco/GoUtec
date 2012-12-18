'use strict';

/*
* 
*   Route Configuration
*
*/
var wwwApp = angular.module('wwwApp', ['wwwApp.services'])
  .config(['$routeProvider', function($routeProvider) {

    // default route
    $routeProvider.when('/', {templateUrl: 'views/main.html',controller: 'MainCtrl'}).otherwise({redirectTo: '/'});

    // products routess
    $routeProvider.when('/productlist',{templateUrl:'views/products-list.html', controller: 'ProductsCtrl'});
                  // .when('/productlist/:page', {templateUrl:'views/product-list.html', controller: 'ProductsCtrl'}) ; 

    // carts route
    $routeProvider.when('/cart',{templateUrl:'views/cart-list.html', controller: 'CartCtrl'});

    // user management
    $routeProvider.when('/register',{templateUrl:'views/register.html', controller:'UserCtrl'})
                  .when('/profile',{templateUrl:'views/profile.html', controller:'ProfileCtrl'})
                  .when('/admin',{templateUrl:'views/admin.html', controller:'AdminCtrl'});

  }]);




/*
* 
*   Cart Engine
*
*/
wwwApp.run(function($rootScope, localStorage){
  // init empty storage only for debug
  // localStorage.set('cart',[]);
  // localStorage.set('cart-count',0);

  // vars
  var cart =  $rootScope.cart = localStorage.get('cart');
  var items = $rootScope.itemsOnCart = localStorage.getN('cart-count');

  // adding item to cart
  $rootScope.addToCart = function(item){
    var itemFound = false;
    if (items>0){
      cart.forEach(function(current){
        if (current.Code == item.Code){
          current.Quantity += 1;
          itemFound=true;
        }
      });
    }

    items += 1;
    if (!itemFound){
      item.Quantity = 1;
      item.completed = true;
      cart.push(item);
    }
    localStorage.set('cart', cart);
    localStorage.set('cart-count',items);
    $rootScope.itemsOnCart = items;
  };


  // remove item from cart
  $rootScope.removeItem = function(item){
    if (items<=0){return false;}
    items -=item.Quantity;
    cart.splice(cart.indexOf(item),1);
    localStorage.set('cart',cart);
    localStorage.set('cart-count', items);
    $rootScope.itemsOnCart = items;
  };

  // get subtotal
  $rootScope.getSubTotal = function(){
    var subtotal = 0;
    cart.forEach(function(current){
      subtotal += Number(current.Price);
    });
    return subtotal;
  };

  // get total
  $rootScope.getGrandTotal =  function(){
    var grandTotal = 0;
    cart.forEach(function(current){
      grandTotal += (Number(current.Price) * Number(current.Quantity));
    });
    return grandTotal;

  };


  // proceed to checkout
  $rootScope.proceedToCheckout = function(){
    cart = $rootScope.cart = [];
    items = $rootScope.itemsOnCart = 0;

    localStorage.set('cart', cart);
    localStorage.set('cart-count',items);

  };
  

});


/*
* 
*   User Managemente for main
*
*/
wwwApp.run(function($rootScope,localStorage, $location){
  //.. watch change on location.path()
  $rootScope.location = $location;
  $rootScope.$watch('location.path()', function( path ) {
    //.. path to logout?
    if (path == '/logout') {  
      $rootScope.setUserStatus('',false,'',false);
      $location.path('/');
    }
  });

  //.. uncomment for cleaning
   // localStorage.set('user-access','');
   // localStorage.set('user-name','');
   // localStorage.set('is-user-signed','false');
   // localStorage.set('user-profile','USER');

  $rootScope.profileName = localStorage.get('user-profile');
  $rootScope.uuser = localStorage.get('user-access');
  $rootScope.userName = localStorage.get('user-name');
  $rootScope.Signed =  localStorage.getB('is-user-signed');

  //.. set user signed or unsigned stae to localStorage
  $rootScope.setUserStatus = function(uname, ustate, uuser, uprofile){
    localStorage.set('user-access', uuser);
    localStorage.set('user-name', uname);
    localStorage.set('is-user-signed', ustate);
    localStorage.set('user-profile', uprofile);
    $rootScope.userName =  uname;
    $rootScope.Signed = ustate;
    $rootScope.uuser = uuser;
    $rootScope.profileName =  uprofile;
  }




});












