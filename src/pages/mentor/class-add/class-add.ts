import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { EventProvider } from '../../../providers/event/event'
import { DataProvider } from '../../../providers/data';
import { LoadingProvider } from '../../../providers/loading'
import * as firebase from 'firebase';



@IonicPage()

@Component({
    selector: 'page-class-add',
    templateUrl: 'class-add.html',
    
})
export class ClassAddPage {
   

    private friends: any;
    private mentors: any;
    private user: any;
    private friendRequests: any;
    private searchFriend: any;
    private nowUser: any;
    private peopleView: string;
    private status;
    private classes: any;
    private myClass: any;
    private data: any[] = [{name: '1학년', children:[]},{name: '2학년', children:[{name:'문과', children:[]}, {name:' 이과', children:[]}]},{name: '3학년', children:[{name:'문과', children:[]}, {name:' 이과', children:[]}]}];
    private academy: any;
       
    private middleCheck: boolean = false;
    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public angularfireDatabase: AngularFireDatabase,
                public dataProvider: DataProvider,
                public loadingProvider: LoadingProvider) {
               
      
     
      
    }
  
  
    ionViewDidLoad() {
      
      
      // Initialize
      this.searchFriend = '';
      this.user = this.navParams.get('user');
      this.myClass = this.navParams.get('myClass');
      
      this.loadingProvider.show();
      if(this.user){
        
      this.dataProvider.getClasses(this.user.belong).subscribe((_classes) =>{
        
        if (_classes) {
          this.classes = [];
          _classes.forEach((_class) => {
            
            if(_class.course == 'middle') this.middleCheck = true;
            this.addOrUpdateClass(_class);
            
          });
        } else {
          
          this.classes = [];
        }
        this.loadingProvider.hide();
      });
      
      //this.loadingProvider.show();
    }
      // Get user data on database and get list of friends.
     
     
      setTimeout(()=>{this.init()}, 1000);
      
    }
  
  
   

    addOrUpdateClass(_class) {
      
      if (!this.classes) {
        this.classes = [_class];
      } else {
        var index = -1;
        for (var i = 0; i < this.classes.length; i++) {
          if (this.classes[i].$key == _class.$key) {
            index = i;
          }
        }
        if (index > -1) {
          this.classes[index] = _class;
        } else {
          this.classes.push(_class);
        }
      }

      
       
    }
  
    searchInit(){
      this.searchFriend='';
    }
    searchUser(){
      this.navCtrl.push('PeopleSearchPage');
    }
  
    userProfile(user) {
      console.log(user);
      this.navCtrl.push('UserProfilePage', {uid:user.$key});
    }

    
   
    toggleSection(i){
        this.data[i].open = !this.data[i].open;
        if(!this.data[i].open){
            for(var j=0; j<this.data[i].children.length; j++){
                if(this.data[i].children[j].open) this.data[i].children[j].open = !this.data[i].children[j].open;
            }
        }
        else{
        this.data.forEach( data => {
            if(this.data.indexOf(data) != i) data.open = false;
        })
        }
    }

    toggleItem(i,j){
        this.data[i].children[j].open = !this.data[i].children[j].open;
    }


  init(){
    this.classes.sort(function(a, b) {
      
      
       var c1 = b['course']
       var c2 = a['course']
       var g1 = a['grade']
       var g2 = b['grade']
       var l1 = a['label']
       var l2 = b['label']
       var n1 = a['name']
       var n2 = b['name']
       var s1 = a['school']
       var s2 = b['school']
      
       if (c1 < c2) return -1;
       if (c1 > c2) return 1;
       if (g1 < g2) return -1;
       if (g1 > g2) return 1;
       if (l1 < l2) return -1;
       if (l1 > l2) return 1;
       if (s1 < s2) return -1;
       if (s1 > s2) return 1;
       if (n1 < n2) return -1;
       if (n1 > n2) return 1;
       return 0;
     });
     
     console.log(this.myClass);
     console.log(this.classes);
     
     this.classes.forEach( _class => {
        
           if(_class.grade == '1'){
               this.data[0].children.push({name:_class.name, $key: _class.$key, exist: this.myClass.findIndex(i => i.$key == _class.$key)});
           }else{
             
               if(_class.label =='literal') this.data[_class.grade -1 ].children[0].children.push({name: _class.name,  $key: _class.$key, exist: this.myClass.findIndex(i => i.$key == _class.$key)});
               else this.data[_class.grade -1 ].children[1].children.push({name: _class.name,  $key: _class.$key, exist: this.myClass.findIndex(i => i.$key == _class.$key)});
           }
     })
   }

   addClass(_class){
      this.user.class.push(_class.$key);
      console.log(this.user.$key);
      this.angularfireDatabase.object('/users/' + this.user.$key + '/class/').update(this.user.class         
      ).then((success) => {
        this.myClass.push(this.classes[this.classes.findIndex(i => i.$key == _class.$key)]);
        this.myClass.sort(function(a, b) {
          
          
           var c1 = b['course']
           var c2 = a['course']
           var g1 = a['grade']
           var g2 = b['grade']
           var l1 = a['label']
           var l2 = b['label']
           var n1 = a['name']
           var n2 = b['name']
           var s1 = a['school']
           var s2 = b['school']
          
           if (c1 < c2) return -1;
           if (c1 > c2) return 1;
           if (g1 < g2) return -1;
           if (g1 > g2) return 1;
           if (l1 < l2) return -1;
           if (l1 > l2) return 1;
           if (s1 < s2) return -1;
           if (s1 > s2) return 1;
           if (n1 < n2) return -1;
           if (n1 > n2) return 1;
           return 0;
         });
         
        _class.exist = this.classes.findIndex(i => i.$key == _class.$key);
        this.loadingProvider.hide();
      }).catch((error) => {
        this.loadingProvider.hide();
      });
  
   }
}