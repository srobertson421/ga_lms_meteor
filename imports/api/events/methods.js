import { Meteor } from 'meteor/meteor';
import { Events } from './collection';

Meteor.methods({
  addEvent: function(newEvent) {
    if (!this.userId) {
      throw new Meteor.Error(400, 'You have to be logged in!');
    }

    newEvent.ownerId = this.userId;

    return Events.insert(newEvent);
  }
});