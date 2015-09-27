var geoTodoApp = angular.module('geoTodoApp', [
    'ngRoute',
    'geoTodoController',
    'uiGmapgoogle-maps',
    'pascalprecht.translate'
]);
var app = geoTodoApp;

geoTodoApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/map', {
                templateUrl: 'partials/map.html',
                controller: 'MapCtrl'
            }).
            when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'ListCtrl'
            }).
            when('/detail/:locationId', {
                templateUrl: 'partials/detail.html',
                controller: 'DetailCtrl'
            }).
            when('/new', {
                templateUrl: 'partials/new.html',
                controller: 'NewCtrl'
            }).
            otherwise({
                redirectTo: '/map'
            });
    }]);

geoTodoApp.controller('MenuCtrl', function($scope) {
});