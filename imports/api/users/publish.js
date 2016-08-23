import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1,
        role: 1,
        "services.github.email": 1
      }
    }); 
  });
}