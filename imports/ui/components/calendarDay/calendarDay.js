import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './calendarDay.html';

class CalendarDay {
  constructor($scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);

  }

  showDay() {
    console.log('clicked day');
  }
}

const name = 'calendarDay';

export default angular.module(name, [angularMeteor])
.component(name, {
  template,
  bindings: {
    data: '<'
  },
  controllerAs: name,
  controller: CalendarDay
});