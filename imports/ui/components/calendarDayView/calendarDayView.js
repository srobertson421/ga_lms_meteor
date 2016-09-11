import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import template from './calendarDayView.html';
import { Events } from '../../../api/events';

import CalendarHelper from '../../helpers/calendar';
const calHelper = new CalendarHelper();

class CalendarDayView {
  constructor($reactive, $scope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('user.events');

    this.event = {
      name: '',
      time: '12:30 AM'
    }

    this.halfHours = calHelper.getHalfHours(this.day);

    this.helpers({
      events() {
        return Events.find({date: this.getReactively('day').format('LL')});
      }
    });
  }

  submitEvent() {
    this.event.date = this.day.format('LL');
    
    Meteor.call('addEvent', this.event, function() {
      $('#newEventCollapse').collapse('toggle');
      this.event = {
        eventName: '',
        eventTime: '12:30 AM'
      }
    });

    this.event = {
      name: '',
      time: '12:30 AM'
    }
  }
}

const name = 'calendarDayView';

export default angular.module(name, [angularMeteor])
.component(name, {
  template,
  bindings: {
    day: '<'
  },
  controllerAs: name,
  controller: CalendarDayView
});