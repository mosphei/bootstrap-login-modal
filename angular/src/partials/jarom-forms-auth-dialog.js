angular.module("jarom.forms-auth-dialog",['ui.bootstrap'])
.provider("loginModal", function () {
	var loginUrl = null;
	this.setLoginUrl = function (value) {
		loginUrl = value;
		console.log("setLoginUrl " + value);
	};
	this.$get=["$uibModal", function($uibModal) {
    return {
      open:function() {
        var instance = $uibModal.open({
          templateUrl:"modal.html",
          controller:'LoginModalCtrl',
          controllerAs: 'LoginModalCtrl',
          resolve:{
            loginUrl:function(){ return loginUrl;}
          }
        });
        return instance.closed;
      },
    };
	}];
})
.controller('LoginModalCtrl', function ($scope, loginUrl) {
  this.cancel = function() {
    console.log('LoginModalCtrl.cancel()');
    $scope.$close('closed');
  };
  $scope.loginUrl=loginUrl;
});
