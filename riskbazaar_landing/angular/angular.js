var application = angular.module('application',[]);

application.config(function($routeProvider){

	$routeProvider

	.when('/',{ templateUrl: 'partials/landing.html' })
	.when('/whitepaper',{ templateUrl: 'partials/white_paper.html' })
	.otherwise( { redirectTo: "/" });

});

// controller
application.controller('landingController',function($scope, landingFactory){

	$scope.Send = function () {

		// validations 
		if( $scope.contact_form.name == undefined || $scope.contact_form.name == null || $scope.contact_form.name.length < 3 ){
			document.getElementById('form-error').style.backgroundColor = 'red';
			document.getElementById('form-sent').style.backgroundColor = 'transparent';
			$scope.contact_form = '';
			return;

		}else if( $scope.contact_form.email == null || $scope.contact_form.email == undefined ){
			document.getElementById('form-error').style.backgroundColor = 'red';
			document.getElementById('form-sent').style.backgroundColor = 'transparent';
			$scope.contact_form = '';
			return;

		} else if( $scope.contact_form.message.length < 10 || $scope.contact_form.message == null || $scope.contact_form.message == undefined){
			document.getElementById('form-error').style.backgroundColor = 'red';
			document.getElementById('form-sent').style.backgroundColor = 'transparent';
			$scope.contact_form = '';
			return;

		} else{ 
			//all good with validations
			document.getElementById('form-error').style.backgroundColor = 'transparent';
			document.getElementById('form-sent').style.backgroundColor = 'green';
			
			// send email
			// landingFactory.Send($scope.contact_form, function(data){
			// 	console.log(data);
			// 	document.getElementById('form-sent').style.backgroundColor = 'green';
			// });

		}

	}

	// $scope.Update = function () {

	// 	console.log($scope.update_form);

	// 	// validations 
	// 	if( $scope.update_form.email == null || $scope.update_form.email == undefined ){
	// 		$scope.update_form = '';
	// 		return;

	// 	} else{ 
	// 		//all good with validations
	// 		// send email
	// 		landingFactory.Update($scope.update_form, function(data){
	// 			console.log(data);
	// 			document.getElementById('update-sent').style.backgroundColor = 'green';
	// 		});

	// 	}

	// }
});

//factory
application.factory('landingFactory', function($http){
	var factory = {};

	factory.Send = function(form_details, callback){
		console.log(form_details);

		$http.post('/send_contact_form', form_details).success(function(output){
			callback(output);
		})
	};

	factory.Update = function(update_details, callback){

		$http.post('/send_update_form', update_details).success(function(output){
			callback(output);
		})
	}

	return factory;
});