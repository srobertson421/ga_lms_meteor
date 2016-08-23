import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './addProject.html';

class AddProject {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.subscribe('user.projects');

    this.project = {};
  }

  submit() {
    Meteor.call('addProject', this.project, this.$bindToContext((newProject) => {
      this.$state.go('home');
    }));
  }
}

const name = 'addProject';

export default angular.module(name, [angularMeteor, uiRouter])
.component(name, {
  template,
  controllerAs: name,
  controller: AddProject
})
.config(config);

function config($stateProvider) {
  'ngInject'

  $stateProvider
  .state('addProject', {
    url: '/add-project',
    template: '<add-project></add-project>',
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