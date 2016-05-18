
module.exports = function(ngModule, $interval, $timeout, $rootScope) {

    ngModule.service('OrdersService', ['$rootScope', '$http', function($rootScope, $http) {
        var dataService = {},
            rootUrl = 'http://127.0.0.1:3000';

        dataService.getData = function() {
            return $http.get(rootUrl + '/backend/orders');
        };

        dataService.getDataByCompany = function(company) {
            return $http({
                url: rootUrl + '/backend/orders',
                method: "GET",
                params: {company: company}
            });
        };

        dataService.getDataByAddress = function(address) {
            return $http({
                url: rootUrl + '/backend/orders',
                method: "GET",
                params: {address: address}
            });
        };

        dataService.deleteOrder = function(orderId) {
            return $http({
                method: 'DELETE',
                url: rootUrl + '/backend/orders',
                params: {id: orderId}
            });
        };

        dataService.countOrders = function() {
            return $http({
                url: rootUrl + '/backend/orders',
                method: "GET",
                params: {orderCounter: true}
            });
        };

        return dataService;
    }]);

};