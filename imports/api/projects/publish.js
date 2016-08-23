import { Meteor } from 'meteor/meteor';
import { Projects } from './collection';

if(Meteor.isServer) {
  Meteor.publish('user.projects', function() {
    return Projects.find({ownerId: this.userId});
  });
}