import { Meteor } from 'meteor/meteor';
import { Projects } from './collection';

Meteor.methods({
  addProject: function(newProject) {
    if (!this.userId) {
      throw new Meteor.Error(400, 'You have to be logged in!');
    }

    newProject.ownerId = this.userId;

    return Projects.insert(newProject);
  }
});