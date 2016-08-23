import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as Navigation } from '../shared/navigation/navigation';
import { name as Signup } from '../signup/signup';
import { name as Login } from '../login/login';
import { name as AddProject } from '../addProject/addProject';
import { name as Home } from '../home/home';
import { name as About } from '../about/about';

import template from './main.html'

class Main {}

const name = 'main';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  'accounts.ui',
  Navigation,
  Signup,
  Login,
  AddProject,
  Home,
  About
])
.component(name, {
  template,
  controllerAs: name,
  controller: Main
})
.config(config)
.run(run);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    if(error === 'AUTH_REQUIRED') {
      $state.go('signup');
    }
  });
}