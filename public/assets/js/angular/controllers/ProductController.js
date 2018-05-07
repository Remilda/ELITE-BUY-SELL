craiglist.controller("ProductController", ['$scope', '$rootScope', '$localStorage', '$location','ProductService', '$window', 'Upload', '$routeParams', function($scope, $rootScope, $localStorage, $location, ProductService, $window, Upload, $routeParams){
	$scope.descactive = "resp-tab-active";
	$scope.otheractive = "";
	$scope.desctabselected = true;
	$scope.infotabselected = false;
	$scope.curtab = "description";
	$scope.avail = "Available for Sale";
	$scope.similar_by_user = [];
	$scope.similar_by_category = [];
	ProductService.getProduct($routeParams.id).then(function ( response ) {
        $scope.product = response.data.product;
        ProductService.getSimilarByUser($scope.product._id, $scope.product.owner._id).then(function(similar){
        	$scope.similar_by_user = similar.data.similar_by_user;
        });
        ProductService.getSimilarByCategory($scope.product._id, $scope.product.category._id).then(function(similar){
        	$scope.similar_by_category = similar.data.similar_by_category;
        });

        if($scope.product.is_sold == false) {
			$scope.avail = "Available for Sale";
        } else {
			$scope.avail = "Sold Out";
        }
    });

	$scope.showTab = function(tab) {
		if(tab == "description"){
			$scope.descactive = "resp-tab-active";
			$scope.otheractive = "";
			$scope.curtab = "description";
		}
		if(tab == "information"){
			$scope.descactive = "";
			$scope.otheractive = "resp-tab-active";
			$scope.curtab = "information";
		}
	}
	//var vm = this;
	$scope.imagesBuffer = [];
	$scope.showContent = function($fileContent){
		$scope.imagesBuffer.push($fileContent);
	}

	$scope.addproduct = function(){
    ProductService.uploadImage({"id":"5ab553e70bba00fe27044efd", "images":$scope.productimg}).then(function(image){
			console.log(image);
		}, function(error){
			console.log(error);
		});

	var params = {"title":$scope.title,"price":$scope.price,"quantity":$scope.quantity,"category":$scope.category,"description":$scope.description, "images": $scope.imagesBuffer};
		ProductService.saveProduct(params).then(function(product){
			alert('Product added');
		}, function(error){
			console.log(error);
		});
    }
}]);

craiglist.controller("AuctionController", ['$scope', '$rootScope', '$window', '$routeParams', '$http', 'api_url', function($scope, $rootScope, $window, $routeParams, $http, api_url){
	$scope.auction = []
	$http({
		url:api_url.url+'auction/'+$routeParams.id
	}).then(function(response){
		$scope.auction = response.data.auction;
	},function(error){
		$scope.auction = [];
		alert("Looks like something went wrong");
		console.log(error);
		$window.location.href = "/";
	});
	$scope.bids = []
	$http({
		url:api_url.url+'auction/'+$routeParams.id+'/bids'
	}).then(function(response){
		$scope.bids = response.data.bids;
	},function(error){
		$scope.auction = [];
	});
	$scope.descactive = "resp-tab-active";
	$scope.otheractive = "";
	$scope.desctabselected = true;
	$scope.infotabselected = false;
	$scope.curtab = "description";
	$scope.showTab = function(tab) {
		if(tab == "description"){
			$scope.descactive = "resp-tab-active";
			$scope.otheractive = "";
			$scope.curtab = "description";
		}
		if(tab == "information"){
			$scope.descactive = "";
			$scope.otheractive = "resp-tab-active";
			$scope.curtab = "information";
		}
	}

	$scope.addBid = function(){
		$http({
			url:api_url.url+'auction/bid',
			method:'POST',
			data: {'auction':$routeParams.id, 'email':$scope.email, 'bid_amount':$scope.amount}
		}).then(function(response){
			alert('Successfulyy bidded for this auction');
			$scope.bids.push(response.data.bid);
		}, function(error){
			alert("Something went wrong, try after sometime");
			console.log(error);
			$window.location.href = "/";
		});
	}
}]);
