'use strict';

/*
*				Main Controller
*/
wwwApp.controller('MainCtrl', function($scope,mainProductsList, mainPromoList, $http, $templateCache,$location, $timeout) {


	//.. Products
	// get products
	$scope.list = mainProductsList.query();
	// get promos
	$scope.promos = mainPromoList.query();
	//
	// Product Detail
	$scope.Message = "Product Detail";
	$scope.Product = {
		Name:"", Description:"", Price: 0, Image:"", Item: null
	};
	$scope.setProduct = function(item){
		$scope.Product.Name = item.Name;
		$scope.Product.Description =  item.Description;
		$scope.Product.Price = item.Price;
		$scope.Product.Image = item.ImagePath;
		$scope.Product.Item = item;
	};


	//.. User Validation
	$scope.showLoginMessage =  false;
	$scope.errorLoginDetail = "verify user and password and try again";
	$scope.boxUser = {
		user:"",pass:""
	};
	// user validation
	$scope.SignIn = function(){

		$http({method: 'JSONP', url: 'data/validUser.php?callback=JSON_CALLBACK&username=' + $scope.boxUser.user + '&password=' +  $scope.boxUser.pass, cache: $templateCache}).
		  success(function(data, status) {
		    $scope.data = data;
		    if ($scope.data.validUser == false){
		    	$scope.showLoginMessage =  true;
		    	$scope.errorLoginDetail = "verify user and password and try again";
		    	$timeout($scope.cleanErrorMessage, 5000);
		    }else{
		    	// set local storate
		    	$scope.setUserStatus( data.Name, true,$scope.boxUser.user, data.Profile);	
		    	$scope.boxUser = {user:"",pass:""};
		    	//$location.path("/admin");
		    }
		  }).
		  error(function(data, status) {
	    	$scope.showLoginMessage =  true;
		    $scope.errorLoginDetail = "please try again [request error ocurred]";
	    	$timeout($scope.cleanErrorMessage, 5000);
		});

	};
	// clean error message
	$scope.cleanErrorMessage  = function(){
		$scope.showLoginMessage =  false;
	}



//**end
});


/*
*				Product Controller
*/
wwwApp.controller('ProductsCtrl', function($scope,ProductsRest, $routeParams){
	//..
	$scope.productName = "";
	$scope.currentPage = 0;
	$scope.bound = 12;
	$scope.totalPages = [{pageidx:1}];
	$scope.initRecord = 0;
	var current = $scope.currentPage;

	//..
	$scope.getPage =  function(idx){
		var init = $scope.bound * idx ;
		//if (idx>0){init+=1;}
		$scope.initRecord =  init;
		$scope.list =  ProductsRest.query({"init-rec":init, "end-rec":$scope.bound },function(){
			$scope.getTotalPages($scope.list[0].records);	
			$scope.productName = "";
		});
		
	};
	$scope.getTotalPages = function(rows){
		$scope.totalPages = [];
		for (var i = 1; i <= parseInt(rows/12) + ((rows%12>0)?1:0); i++) {
			$scope.totalPages.push({pageidx:i});
		};
	};
	$scope.changePage= function(idx){
		$scope.getPage(idx);
		$scope.currentPage = idx;
	};
	$scope.nextPage =  function(){
		if ($scope.currentPage == ($scope.totalPages.length -1)){return;}
		$scope.currentPage +=1;
		$scope.getPage($scope.currentPage);

	};
	$scope.prevPage = function(){
		if ($scope.currentPage == 0){return;}
		$scope.currentPage -=1;
		$scope.getPage($scope.currentPage);
	};

	//..
	$scope.getPage(0);


	//..
	$scope.Product = {
		Name:"", Description:"", Price: 0, Image:"", Item: null
	};
	$scope.setProduct = function(item){
		$scope.Product.Name = item.Name;
		$scope.Product.Description =  item.Description;
		$scope.Product.Price = item.Price;
		$scope.Product.Image = item.ImagePath;
		$scope.Product.Item = item;
	};

});


/*
*				Cart Controller
*/
wwwApp.controller('CartCtrl',function($scope){

	// set filter
	$scope.cartFilter = {completed : true};

});


/*
*				User Controller
*/
wwwApp.controller('UserCtrl',function($scope, UsersRest,$timeout){
	// initialization
	$scope.registerStatus = "success";
	$scope.showMessage = false;
	$scope.registerHeader = "";
	$scope.registerDetail = "";

	var user = $scope.user = {
		Name: "", Active:"A", CodeProfile:"USER", Pass:"", User:"", Confirm: ""
	};


	$scope.proceedToCreateUser = function(){
		UsersRest.save(user, function(){
			$scope.registerStatus = "success";
			$scope.showMessage = true;
			$scope.registerHeader = "User registered";
			$scope.registerDetail = "User " + user.User + " was created successfully ! thanks !";
			user = $scope.user ={
				Name: "", Active:"A", CodeProfile:"USER", Pass:"", User:"", Confirm: ""
			};
			$timeout($scope.FadeOutMessage, 5000);		
		},function(){
			$scope.registerStatus = "danger";
			$scope.showMessage = true;
			$scope.registerHeader = "Error Creating User";
			$scope.registerDetail = "An error ocurred creating the user, please try again or contact administrator";		
			$timeout($scope.FadeOutMessage, 5000);		
		});
	};


	$scope.FadeOutMessage = function(){
		$scope.registerStatus = "success";
		$scope.showMessage = false;
		$scope.registerHeader = "";
		$scope.registerDetail = "";		
	};

});


/*
*				Profile Controller
*/
wwwApp.controller('ProfileCtrl', function($scope, UsersRest, $timeout){
	//.. user box
	$scope.user = {};
	//.. load 
	UsersRest.query({uuser:$scope.uuser},function(data){
		console.log(data[0]);
		$scope.user = data[0];
	});

	//.. 
	$scope.registerStatus="success";
	$scope.registerHeader="";
	$scope.registerDetail="";
	$scope.showMessage = false;

	//.. 
	$scope.updateUser = function(){
		UsersRest.update($scope.user,function(){
			$scope.registerStatus = "success";
			$scope.showMessage = true;
			$scope.registerHeader = "User updated";
			$scope.registerDetail = "User " + $scope.user.User + " was updated successfully!";
			$scope.setUserStatus($scope.user.Name , true, $scope.user.User , $scope.user.CodeProfile);
			$timeout($scope.FadeOutMessage, 5000);		
		},function(){
			$scope.registerStatus = "danger";
			$scope.showMessage = true;
			$scope.registerHeader = "Error Updating User";
			$scope.registerDetail = "An error ocurred updating the user, please try again or contact administrator";		
			$timeout($scope.FadeOutMessage, 5000);		
		});
	};

	//..
	$scope.FadeOutMessage = function(){
		$scope.registerStatus = "success";
		$scope.showMessage = false;
		$scope.registerHeader = "";
		$scope.registerDetail = "";		
	};

});


/*
*				Admin Controller
*/
wwwApp.controller('AdminCtrl',function($scope, UsersRest,$timeout, ProductsRest, ContactsRest, CommentsRest){

	//..
	$scope.mroute = "views/maintenance/mto_default.html";
	$scope.url = "default";
	$scope.current={};
	$scope.New = false;
	$scope.Edit = false;
	$scope.Delete = false;
	//..
	$scope.MessageOperation = "";
	$scope.registerHeader = "";
	$scope.registerDetail = "";
	$scope.showMessage = false;
	$scope.registerStatus = "success";
	//..
	$scope.changeMto = function(url){
		$scope.mroute = "views/maintenance/mto_" +  url + ".html";
		$scope.url = url;
		$scope.current={};
		$scope.getPage(0);	
		$scope.New = false;
		$scope.Edit = false;
		$scope.Delete = false;
	};
	$scope.setItem = function(item){
		$scope.current =  item;
		$scope.New = false;
		$scope.Edit =  true;
		$scope.Delete =  false;
	};
	$scope.newItem =  function(){
		$scope.New = true;
		$scope.Edit = false;
		$scope.Delete =  false;
		$scope.current={};
	}
	$scope.isKey = function(key){
		if (key==$scope.returnKey()){
			if ($scope.New){
				return false;
			}
			else{
				return true;
			}
		}else{
			if ($scope.New){
				return false;
			}else{
				if ($scope.Edit){
					return false;
				}else{
					return true;
				}
			}
		}
	};
	$scope.returnKey = function(){
		if ($scope.url == "users") {return "User";}
		if ($scope.url == "products") {return "Code";}
		if ($scope.url == "contacts") {return "Code";}
		if ($scope.url == "comments") {return "Code";}

	};
	$scope.setDataOperation = function(action){
		if (action=='Update'){
			if ($scope.New){
				$scope.MessageOperation = "Create new " + $scope.url;
			}else{
				$scope.MessageOperation = "Update " + $scope.url + " Info";
			}
		}else{
			if (action=='Delete'){
					$scope.MessageOperation = "Delete " + $scope.url;
					$scope.Delete =  true;
					$scope.Edit = false;
					$scope.New = false;
			}
		}
	};

	$scope.Proceed = function(){

			if ($scope.url=='users'){
				if ($scope.New){
					UsersRest.save($scope.current,function(){
						$scope.showResult('created');
					});	
				}else if($scope.Edit){
					UsersRest.update($scope.current,function(){
						$scope.showResult('updated');
					});
				}else if($scope.Delete){
					UsersRest.destroy($scope.current, function(){
						$scope.showResult('deleted');
					});
				}
				
			}else if($scope.url=='products'){
				if ($scope.New){
					ProductsRest.save($scope.current,function(){
						$scope.showResult('created');
					});	
				}else if($scope.Edit){
					ProductsRest.update($scope.current,function(){
						$scope.showResult('updated');
					});
				}else if($scope.Delete){
					ProductsRest.destroy($scope.current, function(){
						$scope.showResult('deleted');
					});
				}

			}else if($scope.url=='contacts'){
				if ($scope.New){
					ContactsRest.save($scope.current,function(){
						$scope.showResult('created');
					});	
				}else if($scope.Edit){
					ContactsRest.update($scope.current,function(){
						$scope.showResult('updated');
					});
				}else if($scope.Delete){
					ContactsRest.destroy($scope.current, function(){
						$scope.showResult('deleted');
					});
				}

			}else if($scope.url=='comments'){
				if ($scope.New){
					CommentsRest.save($scope.current,function(){
						$scope.showResult('created');
					});	
				}else if($scope.Edit){
					CommentsRest.update($scope.current,function(){
						$scope.showResult('updated');
					});
				}else if($scope.Delete){
					CommentsRest.destroy($scope.current, function(){
						$scope.showResult('deleted');
					});
				}

			}


	};
	//..
	$scope.FadeOutMessage = function(){
		$scope.registerStatus = "success";
		$scope.showMessage = false;
		$scope.registerHeader = "";
		$scope.registerDetail = "";		
	};
	$scope.showResult = function(message){
		$scope.showMessage = true;
		$scope.registerHeader = "Record " + message;
		$scope.registerDetail = "Record was " + message + " successfully!";	
		$scope.current ={};
		$scope.New = false;
		$scope.Edit = false;
		$scope.Delete = false;
		$scope.getPage(0);	
		$scope.currentPage = 0;	
		$timeout($scope.FadeOutMessage, 5000);
	};
	//..
	$scope.currentPage = 0;
	$scope.bound = 5;
	$scope.totalPages = [{pageidx:1}];
	$scope.initRecord = 0;
	var current = $scope.currentPage;

	//..
	$scope.getPage =  function(idx){
		var init = $scope.bound * idx ;
		//if (idx>0){init+=1;}
		$scope.initRecord =  init;

		if ($scope.url=='users'){
			UsersRest.query({"init-rec":init, "end-rec":$scope.bound },function(data){
				$scope.list = data;
				$scope.getTotalPages(data[0].records);	
				$scope.productName = "";
			});
		}else if($scope.url=='products'){
			ProductsRest.query({"init-rec":init, "end-rec":$scope.bound },function(data){
				$scope.list = data;
				$scope.getTotalPages(data[0].records);	
				$scope.productName = "";
			});
		}else if($scope.url=='contacts'){
			ContactsRest.query({"init-rec":init, "end-rec":$scope.bound },function(data){
				$scope.list = data;
				$scope.getTotalPages(data[0].records);	
				$scope.productName = "";
			});
		}else if($scope.url=='comments'){
			CommentsRest.query({"init-rec":init, "end-rec":$scope.bound },function(data){
				$scope.list = data;
				$scope.getTotalPages(data[0].records);	
				$scope.productName = "";
			});
		}


	};
	$scope.getTotalPages = function(rows){
		$scope.totalPages = [];
		for (var i = 1; i <= parseInt(rows/5) + ((rows%5>0)?1:0); i++) {
			$scope.totalPages.push({pageidx:i});
		};
	};
	$scope.changePage= function(idx){
		$scope.getPage(idx);
		$scope.currentPage = idx;
	};
	$scope.nextPage =  function(){
		if ($scope.currentPage == ($scope.totalPages.length -1)){return;}
		$scope.currentPage +=1;
		$scope.getPage($scope.currentPage);

	};
	$scope.prevPage = function(){
		if ($scope.currentPage == 0){return;}
		$scope.currentPage -=1;
		$scope.getPage($scope.currentPage);
	};




});












