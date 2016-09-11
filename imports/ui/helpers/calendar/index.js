import moment from 'moment';
import 'moment-range';

export default class CalendarHelper {
  constructor() {
    this.currentDay = moment().date();
  }

  getMonthDays() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];
    
    for(var i = 1; i <= daysInMonth; i++) {
      var current = moment().date(i);
      arrDays.push(current);
    }

    return arrDays;
  }

  getCalendar(year, month){

    var startDate = moment([year, month]);
    var firstDay = moment(startDate).startOf('month');
    var endDay = moment(startDate).endOf('month');
    var monthRange = moment().range(firstDay, endDay);

    var indexOf = [].indexOf || function(item) { 
      for (var i = 0, l = this.length; i < l; i++) { 
        if (i in this && this[i] === item) return i; 
      }
      return -1;
    };
    
    var weeks = [];

    monthRange.by('days', function(moment) {
      var ref;
      if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
        return weeks.push(moment.week());
      }
    });
   
    var calendar = [];
    var daysCalendar = [];

    for (i = 0, len = weeks.length; i < len; i++) {
      week = weeks[i];
      if (i > 0 && week < weeks[i-1]){
        // We have switched to the next year
        var firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
        var lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
      } else {
        var firstWeekDay = moment([year, month]).week(week).day(0);
        var lastWeekDay = moment([year, month]).week(week).day(6);
      }

      var weekRange = moment().range(firstWeekDay, lastWeekDay);
      calendar.push(weekRange);
    }
  
    calendar.forEach(function(weekRange) {
      var days = [];
      weekRange.by('days', function(moment) {
        days.push(moment);
      });

      daysCalendar.push(days);
    });

    return daysCalendar;
  }

  getHalfHours(day) {
    var newDay = moment(day).startOf('day');
    halfHours = [];
    for(var i = 0; i < 48; i++) {
      newDay.add(30, 'm');
      halfHours.push(moment(newDay));
    }
    return halfHours;
  }
}