import angular from 'angular';
import moment from 'moment';

const name = 'printedYearFilter';

function PrintedYearFilter(yearCode) {
  return moment().year(yearCode).format('YYYY');
}

export default angular.module(name, [])
.filter(name, () => {
  return PrintedYearFilter
});