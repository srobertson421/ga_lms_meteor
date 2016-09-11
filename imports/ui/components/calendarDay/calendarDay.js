import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import template from './calendarDay.html';
import './calendarDay.css';

import { Events } from '../../../api/events';

class CalendarDay {
  constructor($scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);

    this.subscribe('user.events');

    this.helpers({
      isToday() {
        return moment().format('DDD') == this.day.format('DDD');
      },
      events() {
        return Events.find({date: this.getReactively('day').format('LL')});
      }
    });
  }

  updateDay() {
    this.onDayUpdate({day: this.day});
  }
}

const name = 'calendarDay';

export default angular.module(name, [angularMeteor])
.component(name, {
  template,
  bindings: {
    day: '<',
    onDayUpdate: '&'
  },
  controllerAs: name,
  controller: CalendarDay
});