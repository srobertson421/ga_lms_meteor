import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './googleCalendar.html';
import styles from './googleCalendar.css';

class GoogleCalendar {
  constructor($scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);
  }
}

const name = 'googleCalendar';

export default angular.module(name, [angularMeteor])
.component(name, {
  template,
  controllerAs: name,
  controller: GoogleCalendar
});