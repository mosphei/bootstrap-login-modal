angular.module("SampleAuthApp",[])
.config(["loginModalProvider",function(loginModalProvider){
	loginModalProvider.setLoginUrl('LogonDialog.aspx');
}])
.config(function ($httpProvider) {
	$httpProvider.interceptors.push(function ($timeout, $q, $injector) {
		var loginModal, $http, $route;
		var block = false; //use this to prevent multiple dialogs

		// this trick must be done so that we don't receive
		// `Uncaught Error: [$injector:cdep] Circular dependency found`
		$timeout(function () {
			loginModal = $injector.get('loginModal');
			$http = $injector.get('$http');
			$route = $injector.get('$route');
			console.log('', $route);
		});

		return {
			responseError: function (rejection) {
				console.log('intercepted rejection', rejection);
				if (rejection.status !== 401) {
					return rejection;
				}

				var deferred = $q.defer();
				if (block) {
					//try again in 1000ms
					$timeout(function () { deferred.resolve($http(rejection.config)); }, 1000);
				} else {
					block = true;
					loginModal.open()
					.then(function () {
						console.log("responseError loginModal then");
						deferred.resolve($http(rejection.config));
						block = false;
					})
					.catch(function (err) {
						console.log("responseError loginModal err", err);
						deferred.reject(rejection);
					});
				}
				return deferred.promise;
			}
		};
	});
})