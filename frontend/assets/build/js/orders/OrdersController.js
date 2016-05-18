
"use strict";
module.exports = function(ngModule) {

    require('./OrdersService')(ngModule);

    ngModule.controller('OrdersCtrl', ['OrdersService', '$scope',
        function(OrdersService, $scope){

            function getDataSuccess(data){
                if (!data || !data.data) {
                    return;
                }

                var res = data.data;
                $scope.selectors = setSelect(res);
            }

            function getDataError(){

            }

            function callbackSuccess(data){
                var res = data.data;

                $scope.actionResult = res;

            }

            function setSelect(orders){
                var addresses = [],
                    ids = [],
                    companies = [];

                for (var i = 0; i < orders.length; i++){
                    if (ids.indexOf(orders[i][0]) < 0) {
                        ids.push(orders[i][0]);
                    }
                    if (companies.indexOf(orders[i][1]) < 0) {
                        companies.push(orders[i][1]);
                    }
                    if (addresses.indexOf(orders[i][2]) < 0) {
                        addresses.push(orders[i][2]);
                    }
                }


                return {
                    addresses: addresses,
                    ids: ids,
                    companies: companies
                };
            }

            $scope.changeCompany = function(company){
                $scope.address = undefined;
                OrdersService.getDataByCompany(company).then(callbackSuccess.bind(this));
            };

            $scope.changeAddress = function(address){
                $scope.company = undefined;
                OrdersService.getDataByAddress(address).then(callbackSuccess.bind(this));
            };

            $scope.deleteOrder = function(id){
                $scope.address = undefined;
                $scope.company = undefined;
                $scope.selectors.ids.splice($scope.selectors.ids.indexOf(id), 1);
                OrdersService.deleteOrder(id).then(callbackSuccess.bind(this));
            };

            $scope.getOrdersCount = function(){

                OrdersService.countOrders().then(callbackSuccess.bind(this));
            };

            OrdersService.getData().then(getDataSuccess.bind(this), getDataError.bind(this));

        }]
    );
};