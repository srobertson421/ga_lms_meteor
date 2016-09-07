import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';
import CalendarHelper from '../../helpers/calendar';
const calHelper = new CalendarHelper();

import { name as CalendarDay } from '../calendarDay/calendarDay';

import { name as PrintedMonthFilter } from '../../filters/printedMonthFilter';
import { name as PrintedYearFilter } from '../../filters/printedYearFilter';

import template from './calendar.html';

class Calendar {
  constructor($scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);

    this.year = moment().year();
    this.month = moment().month();
    this.calendar = calHelper.getCalendar(this.year, this.month);

    this.helpers({});
  }

  nextMonth() {
    if(this.month === 11) {
      this.month = 0;
      this.year++
    } else {
      this.month++
    }

    this.calendar = calHelper.getCalendar(this.year, this.month);
  }

  prevMonth() {
    if(this.month === 0) {
      this.month = 11;
      this.year--
    } else {
      this.month--
    }

    this.calendar = calHelper.getCalendar(this.year, this.month);
  }
}

const name = 'calendar';

export default angular.module(name, [angularMeteor, CalendarDay, PrintedMonthFilter, PrintedYearFilter])
.component(name, {
  template,
  controllerAs: name,
  controller: Calendar
});