const app = angular.module('registration', ['ui.bootstrap', 'ipCookie'])


app.controller('myModalCtrl', function($scope, $modal, ipCookie) {

    var init = function() {
        if (ipCookie('username')) {
            console.log('have data')
            var loginModalInstance = $modal.open({
                templateUrl: 'loginModal.html',
                controller: 'loginInstanceCtrl',
                size: 'lg',
                resolve: {
                    password: function() {
                        return ipCookie('password')
                    }
                }
            })

         $scope.password = ipCookie('password')
            $scope.username = ipCookie('username')
            console.log($scope.password)
        } else {
            console.log('no data')
        }
    }

    init()
  


    let vm = this
    $scope.log = function(x) {
        console.log(x)
    }

    $scope.user = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        address1: '',
        address2: '',
        town: '',
        county: '',
        zip: '',
        tel: ''
        
    }

    $scope.complete = false
    
    $scope.errorMessage = null

     $scope.open = function() {
         console.log(vm.titles)
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                user: function() {
                    return $scope.user
                },
                titles: function() {
                    return $scope.titles
                }
            }
        })


       
    }
})

app.controller('loginInstanceCtrl', function($scope, $modalInstance, ipCookie) {

     $scope.password = ipCookie('password')
     $scope.username = ipCookie('username')
})

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, user, ipCookie) {
    $scope.close = function() {
        console.log('closing')
        $modalInstance.dismiss()
    }

    $scope.cancel= function() {
        $scope.user = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            address1: '',
            address2: '',
            town: '',
            county: '',
            zip: '',
            tel: ''
            
        }
        console.log($scope.user)
        $modalInstance.dismiss()
    }

    $scope.titles = ["Mr", "Mrs", "Ms", "Dr", 'Prof']
    // $scope.complete = false

    $scope.pwdCheck = function() {
        if ($scope.user.password1 !== $scope.user.password2) {
            // alert('passwords do not match')
            $scope.errorMessage="no password match"
        } else {
            $scope.errorMessage = null
        }
        console.log($scope.user)
    }

    $scope.submitForm = function() {
        ipCookie('password', $scope.user.password2);
        ipCookie('username', $scope.user.username);
        $modalInstance.dismiss()
    }

    $scope.complete = function() {
        $scope.complete = true
    }

    $scope.log = function(x) {
        console.log(x)
    }
 })