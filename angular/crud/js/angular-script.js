// Application module
var crudApp = angular.module('crudApp',['ngRoute']);

// configure our routes
crudApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'templates/home.html',
				controller  : 'DbController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'templates/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'templates/contact.html',
				controller  : 'contactController'
			})
			.when('/dashboard', {
				templateUrl : 'templates/dashboard.html',
				controller  : 'dashboardController'
				
			});
	});
//maincontroller
crudApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});
//aboutController
crudApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});
//contactController
crudApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});
//dashboardController
crudApp.controller('dashboardController', function($scope) {
		$scope.message = 'Welcome to dashboard.';
	});

//dbcontroller
crudApp.controller("DbController",['$scope','$http', function($scope,$http){
// Function to get employee details from the database
getInfo();
function getInfo(){
// Sending request to EmpDetails.php files 
$http.post('databaseFiles/empDetails.php').success(function(data){
// Stored the returned data into scope 
$scope.details = data;
});
}

// Setting default value of gender 
$scope.empInfo = {'gender' : 'male'};
// Enabling show_form variable to enable Add employee button
$scope.show_form = true;
// Function to add toggle behaviour to form
$scope.formToggle =function(){
$('#empForm').slideToggle();
$('#editForm').css('display', 'none');
}
$scope.insertInfo = function(info){
$http.post('databaseFiles/insertDetails.php',{"name":info.name,"email":info.email,"address":info.address,"gender":info.gender}).success(function(data){
if (data == true) {
getInfo();
$('#empForm').css('display', 'none');
}
});
}
$scope.deleteInfo = function(info){
	if(confirm('Are you sure to delete the record?')){
		$http.post('databaseFiles/deleteDetails.php',{"del_id":info.emp_id}).success(function(data){
		if (data == true) {
		getInfo();
		}
		});
	}
}
$scope.currentUser = {};
$scope.editInfo = function(info){
$scope.currentUser = info;
$('#empForm').slideUp();
$('#editForm').slideToggle();
}
$scope.UpdateInfo = function(info){
$http.post('databaseFiles/updateDetails.php',{"id":info.emp_id,"name":info.emp_name,"email":info.emp_email,"address":info.emp_address,"gender":info.emp_gender}).success(function(data){
$scope.show_form = true;
if (data == true) {
getInfo();
}
});
}
$scope.updateMsg = function(emp_id){
$('#editForm').css('display', 'none');
}
}]);