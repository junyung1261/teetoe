import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { LoadingProvider } from './loading';
import { AlertProvider } from './alert';
import { DataProvider } from './data';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

@Injectable()
export class FirebaseProvider {
  // Firebase Provider
  // This is the provider class for most of the Firebase updates in the app.

  constructor(public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public dataProvider: DataProvider) {
    console.log("Initializing Firebase Provider");
  }

  // Send friend request to userId.
  sendFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var requestsSent;
    // Use take(1) so that subscription will only trigger once.
    this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
      requestsSent = requests.requestsSent;
      if (!requestsSent) {
        requestsSent = [userId];
      } else {
        if (requestsSent.indexOf(userId) == -1)
          requestsSent.push(userId);
      }
      // Add requestsSent information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        requestsSent: requestsSent
      }).then((success) => {
        var friendRequests;
        this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
          friendRequests = requests.socialRequests;
          if (!friendRequests) {
            friendRequests = [{from: loggedInUserId, meta: 'friend'}];
          } else {
            if (friendRequests.indexOf(userId) == -1)
              friendRequests.push({from: loggedInUserId, meta: 'friend'});
          }
          // Add friendRequest information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            socialRequests: friendRequests
          }).then((success) => {
            this.loadingProvider.hide();
            this.alertProvider.showFriendRequestSent();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  // Cancel friend request sent to userId.
  cancelFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var requestsSent;
    this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
      requestsSent = requests.requestsSent;
      requestsSent.splice(requestsSent.indexOf({from: userId}), 1);
      // Update requestSent information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        requestsSent: requestsSent
      }).then((success) => {
        var friendRequests;
        this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
          friendRequests = requests.socialRequests;
          friendRequests.splice(friendRequests.indexOf(loggedInUserId), 1);
          // Update friendRequests information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            socialRequests: friendRequests
          }).then((success) => {
            this.loadingProvider.hide();
            this.alertProvider.showFriendRequestRemoved();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  // Delete friend request.
  deleteFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var friendRequests;
    this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
      friendRequests = requests.socialRequests;
      var index = 0;
      requests.socialRequests.forEach( snap => {
          if(snap.from === userId) {
            friendRequests.splice(index, 1);
            return false;
          }
          index++;
      })
      // Update friendRequests information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        socialRequests: friendRequests
      }).then((success) => {
        var requestsSent;
        this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
          requestsSent = requests.requestsSent;
          requestsSent.splice(requestsSent.indexOf(loggedInUserId), 1);
          // Update requestsSent information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            requestsSent: requestsSent
          }).then((success) => {
            this.loadingProvider.hide();

          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
        //TODO ERROR
      });
    });
  }

  // Accept friend request.
  acceptFriendRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    // Delete friend request.
    this.deleteFriendRequest(userId);

    this.loadingProvider.show();
    this.dataProvider.getUser(loggedInUserId).take(1).subscribe((account) => {
      var friends = account.friends;
      if (!friends) {
        friends = [userId];
      } else {
        friends.push(userId);
      }
      // Add both users as friends.
      this.dataProvider.getUser(loggedInUserId).update({
        friends: friends
      }).then((success) => {
        this.dataProvider.getUser(userId).take(1).subscribe((account) => {
          var friends = account.friends;
          if (!friends) {
            friends = [loggedInUserId];
          } else {
            friends.push(loggedInUserId);
          }
          this.dataProvider.getUser(userId).update({
            friends: friends
          }).then((success) => {
            this.loadingProvider.hide();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  sendMentorRequest(userId) {
      let loggedInUserId = firebase.auth().currentUser.uid;
      this.loadingProvider.show();

      var requestsSent;
      // Use take(1) so that subscription will only trigger once.
      this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
        requestsSent = requests.requestsSent;
        if (!requestsSent) {
          requestsSent = [userId];
        } else {
          if (requestsSent.indexOf(userId) == -1)
            requestsSent.push(userId);
        }
        // Add requestsSent information.
        this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
          requestsSent: requestsSent
        }).then((success) => {
          var mentorRequests;
          this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
            mentorRequests = requests.socialRequests;
            if (!mentorRequests) {
              mentorRequests = [{from: loggedInUserId, meta:'mentor'}];
            } else {
              if (mentorRequests.indexOf(userId) == -1)
                mentorRequests.push({from: loggedInUserId, meta:'mentor'});
            }
            // Add mentorRequests information.
            this.angularfireDatabase.object('/requests/' + userId).update({
              socialRequests: mentorRequests
            }).then((success) => {
              this.loadingProvider.hide();
              this.alertProvider.showFriendRequestSent();
            }).catch((error) => {
              this.loadingProvider.hide();
            });
          });
        }).catch((error) => {
          this.loadingProvider.hide();
        });
      });
    }

  cancelMentorRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var requestsSent;
    this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
      requestsSent = requests.requestsSent;
      requestsSent.splice(requestsSent.indexOf(userId), 1);
      // Update requestSent information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        requestsSent: requestsSent
      }).then((success) => {
        var mentorRequests;
        this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
          mentorRequests = requests.socialRequests;
          mentorRequests.splice(mentorRequests.indexOf(loggedInUserId), 1);
          // Update mentorRequests information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            socialRequests: mentorRequests
          }).then((success) => {
            this.loadingProvider.hide();
            this.alertProvider.showFriendRequestRemoved();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  deleteMentorRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();
    
    var mentorRequests;
    
    this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
      mentorRequests = requests.socialRequests;
      var index = 0;
      requests.socialRequests.forEach( snap => {
          if(snap.from === userId) {
            mentorRequests.splice(index, 1);
            return false;
          }
          index++;
      })
      
      // Update mentorRequests information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        socialRequests: mentorRequests
      }).then((success) => {
        var requestsSent;
        this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
          requestsSent = requests.requestsSent;
          requestsSent.splice(requestsSent.indexOf(loggedInUserId), 1);
          // Update requestsSent information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            requestsSent: requestsSent
          }).then((success) => {
            this.loadingProvider.hide();

          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
        //TODO ERROR
      });
    });
  }

  acceptMentorRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    // Delete mentor request.
    this.deleteMentorRequest(userId);
    
    this.loadingProvider.show();
    this.dataProvider.getUser(loggedInUserId).take(1).subscribe((account) => {
      var mentees = account.mentees;
      if (!mentees) {
        mentees = [userId];
      } else {
        mentees.push(userId);
      }
      // Add both users as mentors.
      this.dataProvider.getUser(loggedInUserId).update({
        mentees: mentees
      }).then((success) => {
        this.dataProvider.getUser(userId).take(1).subscribe((account) => {
          var mentors = account.mentors;
          if (!mentors) {
            mentors = [loggedInUserId];
          } else {
            mentors.push(loggedInUserId);
          }
          this.dataProvider.getUser(userId).update({
            mentors: mentors
          }).then((success) => {
            this.loadingProvider.hide();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  sendMenteeRequest(userId) {
      let loggedInUserId = firebase.auth().currentUser.uid;
      this.loadingProvider.show();

      var requestsSent;
      // Use take(1) so that subscription will only trigger once.
      this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
        requestsSent = requests.requestsSent;
        if (!requestsSent) {
          requestsSent = [userId];
        } else {
          if (requestsSent.indexOf(userId) == -1)
            requestsSent.push(userId);
        }
        // Add requestsSent information.
        this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
          requestsSent: requestsSent
        }).then((success) => {
          var mentorRequests;
          this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
            mentorRequests = requests.mentorRequests;
            if (!mentorRequests) {
              mentorRequests = [loggedInUserId];
            } else {
              if (mentorRequests.indexOf(userId) == -1)
                mentorRequests.push(loggedInUserId);
            }
            // Add mentorRequests information.
            this.angularfireDatabase.object('/requests/' + userId).update({
              mentorRequests: mentorRequests
            }).then((success) => {
              this.loadingProvider.hide();
              this.alertProvider.showFriendRequestSent();
            }).catch((error) => {
              this.loadingProvider.hide();
            });
          });
        }).catch((error) => {
          this.loadingProvider.hide();
        });
      });
    }

  cancelMenteeRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    this.loadingProvider.show();

    var requestsSent;
    this.dataProvider.getRequests(loggedInUserId).take(1).subscribe((requests) => {
      requestsSent = requests.requestsSent;
      requestsSent.splice(requestsSent.indexOf(userId), 1);
      // Update requestSent information.
      this.angularfireDatabase.object('/requests/' + loggedInUserId).update({
        requestsSent: requestsSent
      }).then((success) => {
        var mentorRequests;
        this.dataProvider.getRequests(userId).take(1).subscribe((requests) => {
          mentorRequests = requests.mentorRequests;
          mentorRequests.splice(mentorRequests.indexOf(loggedInUserId), 1);
          // Update mentorRequests information.
          this.angularfireDatabase.object('/requests/' + userId).update({
            mentorRequests: mentorRequests
          }).then((success) => {
            this.loadingProvider.hide();
            this.alertProvider.showFriendRequestRemoved();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  acceptMenteeRequest(userId) {
    let loggedInUserId = firebase.auth().currentUser.uid;
    // Delete mentor request.
    this.deleteFriendRequest(userId);

    this.loadingProvider.show();
    this.dataProvider.getUser(loggedInUserId).take(1).subscribe((account) => {
      var mentors = account.mentors;
      if (!mentors) {
        mentors = [userId];
      } else {
        mentors.push(userId);
      }
      // Add both users as mentors.
      this.dataProvider.getUser(loggedInUserId).update({
        mentors: mentors
      }).then((success) => {
        this.dataProvider.getUser(userId).take(1).subscribe((account) => {
          var mentors = account.mentors;
          if (!mentors) {
            mentors = [loggedInUserId];
          } else {
            mentors.push(loggedInUserId);
          }
          this.dataProvider.getUser(userId).update({
            mentors: mentors
          }).then((success) => {
            this.loadingProvider.hide();
          }).catch((error) => {
            this.loadingProvider.hide();
          });
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }
}
