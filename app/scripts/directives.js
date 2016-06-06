'use strict';
/**
 * @ngdoc function
 * @name crossoverApp.directive:directive
 * @description
 * # directives
 * Directive of the crossoverApp
 */
angular.module('crossoverApp')
.directive('showTab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
});
