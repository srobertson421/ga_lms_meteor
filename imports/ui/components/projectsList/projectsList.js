import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './projectsList.html';

class ProjectsList {
  constructor($reactive, $scope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('user.projects');

    this.helpers({
      projects() {
        return Projects.find({ownerId: Meteor.userId()});
      }
    });
  }
}

const name = 'projectsList';

export default angular.module(name, [angularMeteor, uiRouter])
.component(name, {
  template,
  controllerAs: name,
  controller: ProjectsList
});