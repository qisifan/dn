(function() {

    /**
     * doubanApp Module
     *
     * Description
     */
    var doubanApp = angular.module('doubanApp', ['ngRoute','doubanApp.detail', 'doubanApp.listModule' ]);

    //路由  每个模块的路由单独放到子模块中配置
    doubanApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        otherwise({
            redirectTo: '/in_theaters'
        })
    }])

    //定义一个不变的值
    doubanApp.constant('appConfig',{
        listUrl:"https://api.douban.com/v2/movie/",
        detaiUrl:"https://api.douban.com/v2/movie/subject/",
        pageCount:5
    })

    doubanApp.directive('search', ['$route','$routeParams','$location','$timeout',function($route,$routeParams,$location,$timeout){
        // Runs during compile
        return {
            // scope:{},
            replace:true,
            template: '<form  ng-submit="search()" class="navbar-form navbar-right">\
                    <input ng-model="input" type="text" class="form-control" placeholder="Search...">\
                </form>',
            link: function($scope, iElm, iAttrs, controller) {
                
                $scope.search = function  () {

                    if ($routeParams.category) {
                        console.log('列表页');
                        $route.updateParams({category:'search',q:$scope.input});
                    }else{
                        // console.log($routeParams);
                        $location.path('search');
                        $timeout(function  () {
                            $route.updateParams({category:'search',q:$scope.input});
                        },0)
                        
                    }
                    
                    
                }
            }
        };
    }]);

    doubanApp.directive('page', [ function(){
        // Runs during compile
        return {
            template: '<ul class="pagination">\
                            <li><a href="">1</a></li>\
                            <li><a href="">2</a></li>\
                            <li><a href="">3</a></li>\
                            <li><a href="">4</a></li>\
                            <li><a href="">5</a></li>\
                        </ul>',
            link: function($scope, iElm, iAttrs, controller) {
                
            }
        };
    }]);



})();
