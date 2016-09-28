'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = firebase.database().ref();
  $scope.contacts = $firebaseArray(ref);
  // console.log($scope.contacts);

  $scope.showAddForm = function () {
    $scope.addFormShow = true;
  }

  $scope.showEditForm = function (contact) {
    // console.log(contact.$id);
    $scope.editFormShow = true;

    $scope.id = contact.$id;
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;
    $scope.mobile_phone = contact.phones.work;
    $scope.work_phone = contact.phones.home;
    $scope.home_phone = contact.phones.mobile;
    $scope.street_address = contact.address.street_address;
    $scope.city = contact.address.city;
    $scope.state = contact.address.state;
    $scope.zipcode = contact.address.zipcode;
  }

  $scope.hideContactDetails = function () {
    $scope.contactShow = false;
    clearFields();
  }

  $scope.hide = function () {
    $scope.addFormShow = false;
    $scope.editFormShow = false;
    clearFields();
  }

  $scope.addFormSubmit = function () {
    console.log('Adding contact.');
    console.log($scope);

    if ($scope.name) { var name = $scope.name} else { var name = '' }
    if ($scope.email) { var email = $scope.email} else { var email = '' }
    if ($scope.company) { var company = $scope.company} else { var company = '' }
    if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone} else { var mobile_phone = '' }
    if ($scope.home_phone) { var home_phone = $scope.home_phone} else { var home_phone = '' }
    if ($scope.work_phone) { var work_phone = $scope.work_phone} else { var work_phone = '' }
    if ($scope.street_address) { var street_address = $scope.street_address} else { var street_address = '' }
    if ($scope.city) { var city = $scope.city} else { var city = '' }
    if ($scope.state) { var state = $scope.state} else { var state = '' }
    if ($scope.zipcode) { var zipcode = $scope.zipcode} else { var zipcode = '' }

    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: {
          mobile: mobile_phone,
          home: home_phone,
          work: work_phone
      },
      address: {
          street_address: street_address,
          city: city,
          state: state,
          zipcode: zipcode
      }
    }).then(function (ref) {
      var id = ref.key;
      console.log('Added contact with id ' + id);
      clearFields();
      $scope.addFormShow = false;
      $scope.msg = 'Contact added';
    });
  }

  $scope.editFormSubmit = function () {
    console.log($scope);
    var id = $scope.id;
    console.log("ID: " + id);
    var record = $scope.contacts.$getRecord(id);
    record.name = $scope.name;
    record.email = $scope.email;
    record.company = $scope.company;
    record.phones.work = $scope.work_phone;
    record.phones.home = $scope.home_phone;
    record.phones.mobile = $scope.mobile_phone;
    record.address.street_address = $scope.street_address;
    record.address.city = $scope.city;
    record.address.state = $scope.state;
    record.address.zipcode = $scope.zipcode;

    $scope.contacts.$save(record).then(function (ref) {
      console.log(ref.key);
    });

    clearFields();
    $scope.editFormShow = false;
    $scope.msg = 'Contact Updated';
  }

  $scope.showContact = function (contact) {
    console.log('Getting contact...');

    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;
    $scope.mobile_phone = contact.phones.work;
    $scope.work_phone = contact.phones.home;
    $scope.home_phone = contact.phones.mobile;
    $scope.street_address = contact.address.street_address;
    $scope.city = contact.address.city;
    $scope.state = contact.address.state;
    $scope.zipcode = contact.address.zipcode;

    $scope.contactShow = true;

  }

  $scope.removeContact = function(contact) {
    console.log('Removing contact...');
    $scope.contacts.$remove(contact);
    $scope.msg = 'Contact removed.';
  }

  function clearFields(){
    console.log('Clearing all fields...');

    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }
}]);
