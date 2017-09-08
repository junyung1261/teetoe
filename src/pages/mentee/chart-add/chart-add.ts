import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading';

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
                {name: '1학기', children:[{name:'중간고사', value:{grade: '1st', semester:'1st', name:'middle'}},{name:'기말고사', value:{grade: '1st', semester:'1st', name:'final'}}]}, 
                {name:'2학기', children:[{name:'중간고사', value:{grade: '1st', semester:'2nd', name:'middle'}},{name:'기말고사', value:{grade: '1st', semester:'2nd', name:'final'}}]}]}, 
            {name: '2학년',children: [
                {name: '1학기', children:[{name:'중간고사', value:{grade: '2nd', semester:'1st', name:'middle'}},{name:'기말고사', value:{grade: '2nd', semester:'1st', name:'final'}}]}, 
                {name:'2학기', children:[{name:'중간고사', value:{grade: '2nd', semester:'2nd', name:'middle'}},{name:'기말고사', value:{grade: '2nd', semester:'2nd', name:'final'}}]}]},  
            {name: '3학년', children: [
                {name: '1학기', children:[{name:'중간고사', value:{grade: '3rd', semester:'1st', name:'middle'}},{name:'기말고사', value:{grade: '3rd', semester:'1st', name:'final'}}]}, 
                {name:'2학기', children:[{name:'중간고사', value:{grade: '3rd', semester:'2nd', name:'middle'}},{name:'기말고사', value:{grade: '3rd', semester:'2nd', name:'final'}}]}]}];

    private mock: any[] = [
            {name: '1학년', children: [
                {name:'교육청', children: [{name:'3월', information:'서울특별시 교육청 모의고사'}, {name:'6월', information:'부산광역시 교육청 모의고사'}, {name:'9월', information:'인천광역시 교육청 모의고사'}, {name:'11월', information:'경기도 교육청 모의고사'}]}, 
                {name:'사설모의고사', children:[]}]}, 
            {name: '2학년', children: [
                {name:'교육청', children: [{name:'3월', information:'서울특별시 교육청 모의고사'}, {name:'6월', information:'부산광역시 교육청 모의고사'}, {name:'9월', information:'인천광역시 교육청 모의고사'}, {name:'11월', information:'경기도 교육청 모의고사'}]}, 
                {name:'사설모의고사', children:[]}]},
            {name: '3학년', children: [
                {name: '평가원', children: [{name:'6월', information:'평가원 모의고사'}, {name:'9월', information:'평가원 모의고사'}, {name:'수능', information:'대학수학능력시험'}]}, 
                {name:'교육청', children: [{name:'3월', information:'서울특별시 교육청 모의고사'}, {name:'4월', information:'경기도 교육청 모의고사'}, {name:'7월', information:'인천광역시 교육청 모의고사'}, {name:'10월', information:'서울특별시 교육청 모의고사'}]}, 
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

    toggleSection(i){
        this.data[i].open = !this.data[i].open;
        if(!this.data[i].open){
            for(var j=0; j<this.data[i].children.length; j++){
                if(this.data[i].children[j].open) this.data[i].children[j].open = !this.data[i].children[j].open;
            }
        }
    }

    toggleItem(i,j){
        this.data[i].children[j].open = !this.data[i].children[j].open;
    }
    
    openInputPage(item){
       
        this.navCtrl.push('ChartInputPage',{data: item});
        
    }


  

}