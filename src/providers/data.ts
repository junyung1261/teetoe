import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class DataProvider {
  // Data Provider
  // This is the provider class for most of the Firebase observables in the app.

  constructor(public angularfireDatabase: AngularFireDatabase) {
    console.log("Initializing Data Provider");
  }

  // Get all users
  getUsers() {
    return this.angularfireDatabase.list('/users', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  // Get user with username
  getUserWithUsername(username) {
    return this.angularfireDatabase.list('/users', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    });
  }

  getUserWithUserId(userId) {
    return this.angularfireDatabase.list('/users', {
      query: {
        orderByChild: 'id',
        equalTo: userId
      }
    });
  }

  // Get logged in user data
  getCurrentUser() {
    return this.angularfireDatabase.object('/users/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    return this.angularfireDatabase.object('/users/' + userId);
  }

  // Get requests given the userId.
  getRequests(userId) {
    return this.angularfireDatabase.object('/requests/' + userId);
  }

  // Get friend requests given the userId.
  getFriendRequests(userId) {
    return this.angularfireDatabase.list('/requests', {
      query: {
        orderByChild: 'receiver',
        equalTo: userId
      }
    });
  }

  // Get conversation given the conversationId.
  getConversation(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId);
  }

  // Get conversations of the current logged in user.
  getConversations() {
    return this.angularfireDatabase.list('/users/' + firebase.auth().currentUser.uid + '/conversations');
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId + '/messages');
  }

  ////////////////////////////////////// Schedule /////////////////////////////////////////////
  // Get conversation given the conversationId.
  getScheduleComment(scheduleCommentId) {
    return this.angularfireDatabase.object('/scheduleComments/' + scheduleCommentId);
  }

  // Get conversations of the current logged in user.
  getScheduleComments() {
    return this.angularfireDatabase.list('/users/' + firebase.auth().currentUser.uid + '/conversations');
  }

  // Get messages of the conversation given the Id.
  getScheduleCommentMessages(scheduleCommentId) {
    return this.angularfireDatabase.object('/scheduleComments/' + scheduleCommentId + '/comments');
  }

  // Get messages of the group given the Id.
  getGroupMessages(groupId) {
    return this.angularfireDatabase.object('/groups/' + groupId + '/messages');
  }

  // Get groups of the logged in user.
  getGroups() {
    return this.angularfireDatabase.list('/users/' + firebase.auth().currentUser.uid + '/groups');
  }

  // Get group info given the groupId.
  getGroup(groupId) {
    return this.angularfireDatabase.object('/groups/' + groupId);
  }



   ////////////////////////////////////// Chart /////////////////////////////////////////////

   


   ////////////////////////////////////// Academy ////////////////////////////////////////////

   getAcademy(academyId){
    return this.angularfireDatabase.object('/academy/' + academyId);
   }

   getClasses(academyId){
    return this.angularfireDatabase.list('/academy/' + academyId +'/class');
   }

   getClass(academyId, classId){
    return this.angularfireDatabase.object('/academy/' + academyId +'/class/' + classId);
   }
}
