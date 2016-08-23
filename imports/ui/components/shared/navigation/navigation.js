import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './navigation.html';

class Navigation {
  constructor($scope, $state, $reactive) {
    'ngInject';

    this.$state = $state;
 
    $reactive(this).attach($scope);

    this.subscribe('users');

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      },
      isUser() {
        if(Meteor.user() && Meteor.user().role === 'user') {
          return Meteor.user().role;
        }
      }
    });
  }

  logout() {
    Meteor.logout(this.$bindToContext(() => {
      this.$state.go('login');
    }));
  }
}

const name = 'navigation';

export default angular.module(name, [angularMeteor])
.component(name, {
  template,
  controllerAs: name,
  controller: Navigation
});