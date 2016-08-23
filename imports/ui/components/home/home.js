import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';

import { Projects } from '../../../api/projects';

import template from './home.html';

class Home {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('user.projects');

    this.helpers({
      projects() {
        return Projects.find({ownerId: Meteor.userId()});
      },

      currentUser() {
        return Meteor.user();
      },

      currentEmail() {
        var user = Meteor.user();
        if(user) {
          if(user.services.github) {
            return user.services.github.email;
          } else if(user.emails) {
            return user.emails[0].address
          }
        } else {
          return;
        }

        return false;
      }
    });
  }
}

const name = 'home';

export default angular.module(name, [angularMeteor, uiRouter])
.component(name, {
  template,
  controllerAs: name,
  controller: Home
})
.config(config);

function config($stateProvider) {
  'ngInject'

  $stateProvider
  .state('home', {
    url: '/',
    template: '<home></home>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}