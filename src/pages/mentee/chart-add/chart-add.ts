import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-chart-add',
  templateUrl: 'chart-add.html'
})
export class ChartAddPage {
    private title: any;
    private pageView: any;
    private user: any;
    private data: any[];
    private academic: any[] = [
            {name: '1학년', children: [
                {name: '1학기', children:[{name:'중간고사', value:{grade: '1st', semester:'1st', name:'middle', class: 'academic'}},{name:'기말고사', value:{grade: '1st', semester:'1st', name:'final', class: 'academic'}}]}, 
                {name:'2학기', children:[{name:'중간고사', value:{grade: '1st', semester:'2nd', name:'middle', class: 'academic'}},{name:'기말고사', value:{grade: '1st', semester:'2nd', name:'final', class: 'academic'}}]}]}, 
            {name: '2학년',children: [
                {name: '1학기', children:[{name:'중간고사', value:{grade: '2nd', semester:'1st', name:'middle', class: 'academic'}},{name:'기말고사', value:{grade: '2nd', semester:'1st', name:'final', class: 'academic'}}]}, 
                {name:'2학기', children:[{name:'중간고사', value:{grade: '2nd', semester:'2nd', name:'middle', class: 'academic'}},{name:'기말고사', value:{grade: '2nd', semester:'2nd', name:'final', class: 'academic'}}]}]},  
            {name: '3학년', children: [
                {name: '1학기', children:[{name:'중간고사', value:{grade: '3rd', semester:'1st', name:'middle', class: 'academic'}},{name:'기말고사', value:{grade: '3rd', semester:'1st', name:'final', class: 'academic'}}]}, 
                {name:'2학기', children:[{name:'중간고사', value:{grade: '3rd', semester:'2nd', name:'middle', class: 'academic'}},{name:'기말고사', value:{grade: '3rd', semester:'2nd', name:'final', class: 'academic'}}]}]}];

    private mock: any[] = [
            {name: '1학년', children: [
                {name:'교육청', children: [{name:'3월', information:'서울특별시 교육청 모의고사', value:{grade: '1st', semester:'3', name:'교육청', class: 'mock'}}, {name:'6월', information:'부산광역시 교육청 모의고사', value:{grade: '1st', semester:'6', name:'교육청', class: 'mock'}}, {name:'9월', information:'인천광역시 교육청 모의고사', value:{grade: '1st', semester:'9', name:'교육청', class: 'mock'}}, {name:'11월', information:'경기도 교육청 모의고사', value:{grade: '1st', semester:'11', name:'교육청', class: 'mock'}}]}, 
                {name:'사설모의고사', children:[]}]}, 
            {name: '2학년', children: [
                {name:'교육청', children: [{name:'3월', information:'서울특별시 교육청 모의고사', value:{grade: '2nd', semester:'3', name:'교육청', class: 'mock'}}, {name:'6월', information:'부산광역시 교육청 모의고사', value:{grade: '2nd', semester:'6', name:'교육청', class: 'mock'}}, {name:'9월', information:'인천광역시 교육청 모의고사', value:{grade: '2nd', semester:'9', name:'교육청', class: 'mock'}}, {name:'11월', information:'경기도 교육청 모의고사', value:{grade: '2nd', semester:'11', name:'교육청', class: 'mock'}}]}, 
                {name:'사설모의고사', children:[]}]},
            {name: '3학년', children: [
                {name:'교육청', children: [{name:'3월', information:'서울특별시 교육청 모의고사', value:{grade: '3rd', semester:'3', name:'교육청', class: 'mock'}}, {name:'4월', information:'경기도 교육청 모의고사', value:{grade: '3rd', semester:'4', name:'교육청', class: 'mock'}}, {name:'7월', information:'인천광역시 교육청 모의고사', value:{grade: '3rd', semester:'7', name:'교육청', class: 'mock'}}, {name:'10월', information:'서울특별시 교육청 모의고사', value:{grade: '3rd', semester:'10', name:'교육청', class: 'mock'}}]}, 
                {name: '평가원', children: [{name:'6월', information:'평가원 모의고사', value:{grade: '3rd', semester:'6', name:'평가원', class: 'mock'}}, {name:'9월', information:'평가원 모의고사', value:{grade: '3rd', semester:'9', name:'평가원', class: 'mock'}}, {name:'수능', information:'대학수학능력시험',  value:{grade: '3rd', semester:'11', name:'평가원', class: 'mock'}}]}, 
                {name:'사설모의고사', children:[]}]}];


    constructor(public afDB: AngularFireDatabase,
                public loadingProvider: LoadingProvider,
                public dataProvider: DataProvider,
                public navParams: NavParams,
                public navCtrl: NavController) {
        
                this.pageView = navParams.get('view');
                if(this.pageView =='academic') {this.data = this.academic; this.title = '내신 성적 입력'}
                else {this.data = this.mock; this.title = '모의고사 성적 입력' }
                     
            
        }


    ionViewDidLoad(){
        this.loadingProvider.show();
        let user = firebase.auth().currentUser.uid; 
        
        if(this.pageView =='academic'){
        this.afDB.object('/chart/' + user + '/academic/', { preserveSnapshot: true })       
        .subscribe(snapshots => {
            
            
            
                    snapshots.forEach( snapshot => {
                        let grade = 0;
                        if(snapshot.key == '2nd') grade = 1;
                        else if(snapshot.key == '3rd') grade = 2;
                        
                        snapshot.forEach( snap => {
                            let semester = 0;
                            if(snap.key == '2nd') semester = 1;
                            snap.forEach( test => {
                                let name = 0;
                                if(test.key == 'final') name = 1;
                                
                                this.academic[grade].children[semester].children[name].score= test.val();
                                
                            })
                            
                        })
                        //this.chartDatas.push(parseInt(snapshot.val().score));
                        //this.chartLabels.push(snapshot.val().name);
                        
                        
                    })
                   
                    this.loadingProvider.hide();
                    
                    
               
                //console.log("==================this.pieChartLabels = "+this.chartData);
                
                //loadingPopup.dismiss()
                
        });
        }
        else {
            this.afDB.object('/chart/' + user + '/mock/', { preserveSnapshot: true })       
            .subscribe(snapshots => {
                
                
                
                        snapshots.forEach( snapshot => {
                            let grade = 0;
                            if(snapshot.key == '2nd') grade = 1;
                            else if(snapshot.key == '3rd') grade = 2;
                            
                            snapshot.forEach( snap => {
                                let name = 0;
                                if(snap.key == '평가원') name = 1;
                                snap.forEach( test => {
                                    let semester = 0;
                                    if(snap.key == '교육청' && snapshot.key != '3rd') {
                                        let arr = [3,6,9,11];
                                        semester = arr.indexOf(parseInt(test.key));
                                        
                                    }
                                    else if(snap.key == '교육청' && snapshot.key == '3rd') {
                                        let arr = [3,4,7,10];
                                        semester = arr.indexOf(parseInt(test.key));
                                        
                                    }
                                    else {
                                        let arr = [6,9,11];
                                        semester = arr.indexOf(parseInt(test.key));
                                        
                                    }
                                    
                                    this.mock[grade].children[name].children[semester].score= test.val();
                                    
                                })
                                
                            })
                            //this.chartDatas.push(parseInt(snapshot.val().score));
                            //this.chartLabels.push(snapshot.val().name);
                            
                            
                        })
                       
                        this.loadingProvider.hide();
                        
                   
                    //console.log("==================this.pieChartLabels = "+this.chartData);
                    
                    //loadingPopup.dismiss()
                    
            });
        }
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
    
    openInputPage(item){
       
        this.navCtrl.push('ChartInputPage',{data: item});
        
    }

   
  

}