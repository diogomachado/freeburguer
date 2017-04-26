(function() {


    angular.module('app').directive('barFixed', function ($timeout, $window) {

        var $win = angular.element($window); // wrap window object as jQuery object

        return {
            restrict: 'C',
            link: function (scope, iElement, iAttrs) {

                scope.$on('$viewContentLoaded', function(){

                    $timeout(function(){
                        var content = angular.element(document.getElementsByClassName('content'));
                        var height  = iElement[0].offsetHeight;
                        content[0].style.paddingTop = height + 'px';
                    });
                });

            },
        };
    });

})();