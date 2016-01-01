angular.module('userService', [])

.factory('User', function($http) {
    var userFactory = {};

    // single user
    userFactory.get = function(id) {
        return $http.get('/api/users/' + id);
    };

    // all users
    userFactory.all = function() {
        return $http.get('/api/users/');
    };

    // create a user
    userFactory.create = function(userData) {
        return $http.post('/api/users/', userData);
    };

    // update a user
    userFactory.update = function (id, userData) {
        return $http.put('/api/users/' + id, userData);
    };

    userFactory.delete = function (id) {
        return $http.delete('/api/users/' + id);
    };

    return userFactory;
});