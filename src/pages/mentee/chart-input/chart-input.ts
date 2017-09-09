import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading';
import { ChartProvider } from '../../../providers/chart'

@IonicPage()
@Component({
  selector: 'page-chart-input',
  templateUrl: 'chart-input.html'
})
export class ChartInputPage {
    private title: any;
    private pageView: any;
    private user: any;
    private data: any;
    private grade: any;



    constructor(public afDB: AngularFireDatabase,
                public loadingProvider: LoadingProvider,
                public dataProvider: DataProvider,
                public NavParams: NavParams,
                public chartProvider: ChartProvider ) {
                this.grade =[];
                this.data = NavParams.get('data');
                console.log(this.data);
                this.grade.push({name:'korean', score:70}, {name:'math', score:70}, {name:'english', score:70});
                this.matchTitle(this.data);      
                    
        }

    matchTitle(data){
        this.title = '';
        if(data.value.grade =='1st') this.title += '1학년 ';
        else if(data.value.grade =='2nd') this.title += '2학년 ';
        else this.title += '3학년 ';

        if(data.value.semester =='1st') this.title += '1학기 ';
        else if(data.value.semester =='2nd')this.title += '2학기 ';
        else this.title += this.data.value.semester + '월 '
        
        if(data.value.name =='middle') this.title += '중간고사';
        else if(data.value.name =='final') this.title += '기말고사';
        else this.title += '모의고사'

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
        
    }

    onChangeTime(value, subject){
        console.log(value); 
        if(value < 0) subject.score = 0;
        if(value > 100) subject.score = 100;
    }

    pushSubject(event){
        if(this.grade.length < 6){
        let check = 1;
        this.grade.forEach(subject => {
            if(subject.name == event) check = 0
        })          
        if(check)this.grade.push({name:event});
        }
    }

    deleteSubject(subject){
        this.grade.splice(this.grade.indexOf(subject),1);
    }

    saveScore(){
       this.grade.meta= this.data.value;
       console.log(this.grade);
       this.chartProvider.updateScore(this.grade);
    }



}