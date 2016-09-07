import angular from 'angular';
import moment from 'moment';

const name = 'printedMonthFilter';

function PrintedMonthFilter(monthCode) {
  return moment().month(monthCode).format('MMMM');
}

export default angular.module(name, [])
.filter(name, () => {
  return PrintedMonthFilter
});