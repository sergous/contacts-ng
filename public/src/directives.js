angular.module('ContactsApp')
    .value('FieldTypes', {
        text: ['Text', 'should be text'],
        emiail: ['Email', 'should be an email address'],
        number: ['Number', 'should be a number'],
        date: ['Date', 'should be a date'],
        datetime: ['Datetime', 'should be a datetime'],
        time: ['Time', 'should be a time'],
        month: ['Month', 'should be a month'],
        week: ['Week', 'should be a week'],
        url: ['URL', 'should be a URL'],
        tel: ['Phone Number', 'should be a phone number'],
        color: ['Color', 'should be a color']
    })
    .directive('formField', function ($timeout, FieldTypes) {
            return {
                    restrict: 'EA',
                    templateUrl: 'views/form-field.html',
                    replace: true,
                    scope: {
                            record: '=',
                            field: '@',
                            live: '@',
                            required: '@'
                    },
                    link: function ($scope, element, attr) {
                            $scope.$on('record:invalid', function () {
                                    $scope[$scope.field].$setDirty();
                            });

                            $scope.types = FieldTypes;

                            $scope.remove = function (field) {
                                    delete $scope.record[field];
                                    $scope.blurUpdate();
                            };

                            //add to field live="true" for save field value on blur
                            $scope.blurUpdate = function () {
                                    if ($scope.live) {
                                            $scope.record.$update(function (updatedRecord) {
                                                    $scope.record = updatedRecord;
                                            });
                                    }
                            };

                            var saveTimeOut;

                            $scope.update = function () {
                                    $timeout.cancel(saveTimeOut);
                                    saveTimeOut = $timeout($scope.blurUpdate, 1000);
                            };
                    }
            }
    });