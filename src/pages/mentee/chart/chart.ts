import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';
import { Chart } from 'chart.js';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading';
import { ChartProvider } from '../../../providers/chart';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
    
    


   
    private academic: any[] = [];
    private a_grade: any;
    private a_semester: any;
    private a_exam: any;
    private m_grade: any;
    private m_host: any;
    private m_month: any;
    private a_chartDatas: any[];
    private a_chartLabels: any[];
    private m_chartDatas: any[];
    private m_chartLabels: any[];
    private events: any[];
    private fromChild: any;
    private a_meta: any;
    private m_meta: any;
    chartLegend:boolean = false;

    
   public lineChartData: Array<any> ;
   public lineChartLabels:Array<any> ;
   
   public a_radarChartData: Array<any> ;
   public a_radarChartLabels:Array<any> ;
   
   public m_radarChartData: Array<any> ;
   public m_radarChartLabels:Array<any> ;
   
   private m_title: string;
   private a_title: string;
   
   
  
    //*********** chart color theme   **************//
    chartColor1: any[] = [{backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1}]; 
    
    chartColor2: any[] = [{backgroundColor:['rgba(127,0,0, 0.2)','rgba(215,48,39,0.2)','rgba(244,109,67,0.2)','rgba(253,174,97,0.2)','rgba(254,224,139,0.2)','rgba(255,255,191,0.2)','rgba(217,239,139,0.2)','rgba(166,217,106,0.2)','rgba(102,189,99,0.2)','rgba(26,152,80,0.2)','rgba(0,104,55,0.2)']}]; 
    
    chartColor3: any[] =  [{backgroundColor:['rgba(127,0,0, 0.8)','rgba(179,0,0, 0.7)','rgba(215,48,31, 0.4)','rgba(239,101,72, 0.4)','rgba(252,141,89, 0.4)','rgba(253,187,132, 0.4)']}]; 
    
    chartColor4: any[] = [{backgroundColor:['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a','#01665e','#003c30']}];
    
    chartColor5: any[] =  [{ backgroundColor:['#8c510a','#bf812d','#dfc27d','#f6e8c3','#c7eae5','#80cdc1','#35978f','#01665e','#003c30']}]; 
    
    chartColorForLine: any[] = [{ backgroundColor:'rgba(127,0,0, 0.8)'  }];  
    //**********************************************//


    

    lineChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowVerticalLines: false,
        legend: {position: 'bottom'},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    halfDonutOption: any = {
            responsive: true,
            maintainAspectRatio: false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI
    };
    radarOption: any = {
        responsive: true,
        maintainAspectRatio: false,
            scale: {
                ticks: {
                    
                    beginAtZero: true,
                    max: 100
                }
            }
    };


    chartView: string;
    public isDataAvailable: boolean = false;  
    

    constructor(public afDB: AngularFireDatabase,
                public loadingProvider: LoadingProvider,
                public dataProvider: DataProvider,
                public navCtrl: NavController,
                public chartProvider: ChartProvider,
                public navParams: NavParams
              
                ) {

                    
                    this.a_grade = '1st';
                    this.a_semester = '1st';
                    this.a_exam = 'middle';
                    this.m_grade = '1st';
                    this.m_host = '교육청';
                    this.m_month = '3';
                    this.chartView = 'academic';
                   
                    
            
    /*let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
    });*/
    //loadingPopup.present();     
       
    
  
    }
    ionViewDidLoad(){
        this.checkGrade('academic');
        this.checkGrade('mock');
    }

    ionViewDidEnter(){
        
        let val = this.navCtrl.last().id;
        if(val == 'ChartAddPage'){
            console.log('tttt');
            this.isDataAvailable=false;
            setTimeout(()=>{this.isDataAvailable = true}, 0);
        }

        
            this.a_grade = this.a_meta.grade;
            this.a_semester =  this.a_meta.semester;
            this.a_exam = this.a_meta.exam;
            this.m_grade = this.m_meta.m_grade;
            this.m_host =  this.m_meta.m_host;
            this.m_month = this.m_meta.m_month;
        

       /*this.barChart = new Chart(this.barCanvas.nativeElement, {
        
                   type: 'bar',
                   data: {
                       labels: this.chartLabels,
                       datasets: [{
                           label: '# of Votes',
                           data: this.chartDatas,
                           backgroundColor: [
                               'rgba(255, 99, 132, 0.2)',
                               'rgba(54, 162, 235, 0.2)',
                               'rgba(255, 206, 86, 0.2)',
                               'rgba(75, 192, 192, 0.2)',
                               'rgba(153, 102, 255, 0.2)',
                               'rgba(255, 159, 64, 0.2)'
                           ],
                           borderColor: [
                               'rgba(255,99,132,1)',
                               'rgba(54, 162, 235, 1)',
                               'rgba(255, 206, 86, 1)',
                               'rgba(75, 192, 192, 1)',
                               'rgba(153, 102, 255, 1)',
                               'rgba(255, 159, 64, 1)'
                           ],
                           borderWidth: 1
                       }]
                   },
                   options: {
                       scales: {
                           yAxes: [{
                               ticks: {
                                   beginAtZero:true
                               }
                           }]
                       }, 
                       responsive: true,
                       maintainAspectRatio: false,
                   }
        
               });

               this.barChart.update();*/
          
    }

    


       
       
                

 public lineChartColors:Array<any> = [
   { // grey
     backgroundColor: 'rgba(148,159,177,0.2)',
     borderColor: 'rgba(148,159,177,1)',
     pointBackgroundColor: 'rgba(148,159,177,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
   },
   { // dark grey
     backgroundColor: 'rgba(77,83,96,0.2)',
     borderColor: 'rgba(77,83,96,1)',
     pointBackgroundColor: 'rgba(77,83,96,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(77,83,96,1)'
   },
   { // grey
     backgroundColor: 'rgba(148,159,177,0.2)',
     borderColor: 'rgba(148,159,177,1)',
     pointBackgroundColor: 'rgba(148,159,177,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
   }
 ];


 openChartAddPage(fab: FabContainer, pageName){
   
        this.navCtrl.push('ChartAddPage', {view: pageName});
        fab.close();
    
        
 }


checkGrade(view){
  
    this.loadingProvider.show();
    let user = firebase.auth().currentUser.uid; 
    this.isDataAvailable=false;


    if(view == 'academic'){
        
    this.afDB.object('/chart/' + user + '/academic/' + this.a_grade + '/' + this.a_semester + '/' + this.a_exam, { preserveSnapshot: true })       
    .subscribe(snapshots => {
        
        this.a_chartDatas = [];
        this.a_chartLabels = [];
        
                snapshots.forEach( snapshot => {
                    
                    this.a_chartDatas.push(parseInt(snapshot.val().score));
                    this.a_chartLabels.push(snapshot.val().name);
                    
                })
                this.a_title = this.matchLabel(this.a_grade, this.a_semester, this.a_exam);

                this.a_radarChartData =[
                    {data: this.a_chartDatas, label: this.a_title}
                ];
                this.a_radarChartLabels = this.a_chartLabels;
                
                this.lineChartData = [
                    {data: this.a_chartDatas, label: this.a_title},
                    {data: [70, 48, 40, 90, 86], label: 'Series B'},
                    {data: [40, 48, 77, 60, 100], label: 'Series C'}
                  ];
                  this.lineChartLabels = this.a_chartLabels;

                setTimeout(()=>{this.isDataAvailable = true}, 0);
                this.loadingProvider.hide();
            
                
           
            //console.log("==================this.pieChartLabels = "+this.chartData);
            
            //loadingPopup.dismiss()
            
    });
    this.a_meta = {grade: this.a_grade, semester: this.a_semester, exam: this.a_exam};

    }else {
        
    this.afDB.object('/chart/' + user + '/mock/' + this.m_grade + '/' + this.m_host + '/' + this.m_month, { preserveSnapshot: true })       
    .subscribe(snapshots => {
        
        this.m_chartDatas = [];
        this.m_chartLabels = [];
        
                snapshots.forEach( snapshot => {
                    
                    this.m_chartDatas.push(parseInt(snapshot.val().score));
                    this.m_chartLabels.push(snapshot.val().name);
                    
                })

                this.m_title = this.matchLabel(this.m_grade, this.m_host, this.m_month);
                this.m_radarChartData =[
                    {data: this.m_chartDatas, label: this.m_title}
                ];
                this.m_radarChartLabels = this.m_chartLabels;
                
                this.lineChartData = [
                    {data: this.m_chartDatas, label: this.m_title},
                    {data: [70, 48, 40, 90, 86], label: 'Series B'},
                    {data: [40, 48, 77, 60, 100], label: 'Series C'}
                  ];
                  this.lineChartLabels = this.m_chartLabels;

                setTimeout(()=>{this.isDataAvailable = true}, 0);
                this.loadingProvider.hide();
            
                
           
            //console.log("==================this.pieChartLabels = "+this.chartData);
            
            //loadingPopup.dismiss()
            
    });
        
        this.m_meta = {m_grade: this.m_grade, m_host: this.m_host, m_month: this.m_month};
    }
    

   
}

matchLabel(grade: string, semester: string, exam: string){
    console.log(grade + ' ' + semester + ' ' + exam);
    let label = '';
    if(grade =='1st') label += '1학년 ';
    else if(grade =='2nd') label += '2학년 ';
    else label += '3학년 ';

    if(semester =='1st') label += '1학기 ';
    else if(semester =='2nd') label += '2학기 ';
    else label += semester +' ';
    
    if(exam =='middle') label += '중간고사';
    else if(exam =='final') label += '기말고사';
    else label += exam + '월 모의고사'

    return label;

} 

}