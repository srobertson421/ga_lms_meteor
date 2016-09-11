import { Meteor } from 'meteor/meteor';
import { Events } from './collection';

if(Meteor.isServer) {
  Meteor.publish('user.events', function() {
    return Events.find({ownerId: this.userId});
  });
}