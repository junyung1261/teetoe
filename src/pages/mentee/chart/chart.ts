import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, Platform } from 'ionic-angular';
import { Chart } from 'chart.js';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading';
import { ChartProvider } from '../../../providers/chart';
import * as firebase from 'firebase';
import * as d3 from 'd3';
import { EventProvider } from '../../../providers/event/event'
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    subWeeks,
    addWeeks,
    startOfMonth,
    isThisWeek,
    lastDayOfMonth,
    isSameWeek,
    getDay
  } from 'date-fns';

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
    
    
    private term_v1:any;
    private term_v2:any;

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
    private t_chartDatas: any[];
    
    private t_chartLabels: any[];
    
   
    private a_meta: any;
    private m_meta: any;
    chartLegend:boolean = false;

    
   public lineChartData: any[];
   public lineChartLabels: any[];

   public testData = [{data:[50], label:'test'}];
   public testLabel = ['test'];

   
   public a_radarChartData: Array<any> ;
   public a_radarChartLabels:Array<any> ;
   
   public m_radarChartData: Array<any> ;
   public m_radarChartLabels:Array<any> ;
   
   private m_title: string;
   private a_title: string;
   private t_title: string;
   
   private mySubjects: any;
   private subject: any;

   public view = 'day';

   private achievement: any;
   private weeksOfMonth: any;
   private monthDatasets: any;
   private numOfWeek: any;

   private _DHT22KnobHumidityOptions: any;
   private _DHT22KnobHumidityValue: number = null;
 

   public lineChartColors:Array<any> = [
    { // red
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor:  'rgba(255,99,132,1)',
      pointBackgroundColor:  'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)',
      //pointRadius: 5,
      pointHoverRadius: 10,
      pointHitRadius: 20, //hover area size
      pointBorderWidth: 2,

    },
    { // dark grey
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor:  'rgba(54, 162, 235, 1)',
        pointBackgroundColor:  'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)',
        
        pointHoverRadius: 10,
        pointHitRadius: 20,
        pointBorderWidth: 2,
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
  
  /////////////////background/////////////////////
        //'rgba(255, 99, 132, 0.2)',    -red
         //'rgba(54, 162, 235, 0.2)',   -blue
        //'rgba(255, 206, 86, 0.2)',    -yellow
        //'rgba(75, 192, 192, 0.2)',    -green
        //'rgba(153, 102, 255, 0.2)',   -pupple
        //'rgba(255, 159, 64, 0.2)'     -orange

    /////////////////border/////////////////////

        //'rgba(255,99,132,1)',
        //'rgba(54, 162, 235, 1)',
        //'rgba(255, 206, 86, 1)',
        //'rgba(75, 192, 192, 1)',
        //'rgba(153, 102, 255, 1)',
        //'rgba(255, 159, 64, 1)'


    //*********** chart color theme   **************//

    barChartColor: any[] = [
        {   //mycolor
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
        },
    ]; 

    barChartColor_SM: any[] = [
        {   //mycolor
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        },
        {   //studyMate color
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },

    ]; 
    
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
                public navParams: NavParams,
                public platform: Platform
              
                ) {

                    
                    this.a_grade = '1st';
                    this.a_semester = '1st';
                    this.a_exam = '0_middle';
                    this.m_grade = '1st';
                    this.m_host = '교육청';
                    this.m_month = '3';
                    this.chartView = 'academic';
                   
                    
            
    /*let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
    });*/
    //loadingPopup.present();     
       

    
  
  this._DHT22KnobHumidityOptions = [
    {
    
    readOnly: true,
    size: platform.width()/2,
    animate: {
      enabled: true,
      duration: 1500,
      ease: d3.easeExpIn
    },
    unit: "%",
    barColor: 'rgba(255, 99, 132, 0.5)',
    trackWidth: 0,
    barWidth: 5,
    barCap: 25,
    textColor:'rgba(255, 99, 132, 0.5)',
    //prevBarColor: 'rgba(0,156,255,.2)',
    trackColor: 'rgba(255, 99, 132, 0.5)',
    fontSize: 'auto',
    subText: {
      enabled: true,
      text: "Total",
      color: 'rgba(255, 99, 132, 0.5)',
      font: "auto"
    },
    step: 1,
    displayPrevious: true,
    min: 0,
    max: 100,
    notifyOnDragEnd: true
  },
  {
    
    readOnly: true,
    size: platform.width()/5.5,
    animate: {
      enabled: true,
      duration: 1000,
      ease: d3.easeExpIn
    },
    unit: "%",
    barColor: 'white',
    trackWidth: 0,
    barWidth: 3,
    barCap: 25,
    textColor:'white',
    //prevBarColor: 'rgba(0,156,255,.2)',
    trackColor: 'rgba(255,255,255,1)',
    fontSize: 'auto',
    subText: {
      enabled: true,
      text: "언어",
      color: 'white',
      font: 13
    },
    step: 1,
    displayPrevious: true,
    min: 0,
    max: 100,
    notifyOnDragEnd: true
  },
  {
    
    readOnly: true,
    size: platform.width()/5.5,
    animate: {
      enabled: true,
      duration: 1000,
      ease: d3.easeExpIn
    },
    unit: "%",
    barColor: 'white',
    trackWidth: 0,
    barWidth: 3,
    barCap: 25,
    textColor:'white',
    //prevBarColor: 'rgba(0,156,255,.2)',
    trackColor: 'rgba(255,255,255,1)',
    fontSize: 'auto',
    subText: {
      enabled: true,
      text: "수학",
      color: 'white',
      font: 13
    },
    step: 1,
    displayPrevious: true,
    min: 0,
    max: 100,
    notifyOnDragEnd: true
  },
  {
    
    readOnly: true,
    size: platform.width()/5.5,
    animate: {
      enabled: true,
      duration: 1000,
      ease: d3.easeExpIn
    },
    unit: "%",
    barColor: 'white',
    trackWidth: 0,
    barWidth: 3,
    barCap: 25,
    textColor:'white',
    //prevBarColor: 'rgba(0,156,255,.2)',
    trackColor: 'rgba(255,255,255,1)',
    fontSize: 'auto',
    subText: {
      enabled: true,
      text: "외국어",
      color: 'white',
      font: 13
    },
    step: 1,
    displayPrevious: true,
    min: 0,
    max: 100,
    notifyOnDragEnd: true
  },
{
    
    readOnly: true,
    size: platform.width()/5.5,
    animate: {
      enabled: true,
      duration: 1000,
      ease: d3.easeExpIn
    },
    unit: "%",
    barColor: 'white',
    trackWidth: 0,
    barWidth: 3,
    barCap: 25,
    textColor:'white',
    //prevBarColor: 'rgba(0,156,255,.2)',
    trackColor: 'rgba(255,255,255,1)',
    fontSize: 'auto',
    subText: {
      enabled: true,
      text: "탐구",
      color: 'white',
      font: 13
    },
    step: 1,
    displayPrevious: true,
    min: 0,
    max: 100,
    notifyOnDragEnd: true
  }];

 }
    ionViewDidLoad(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let date = today.getDate();
        let day = today.getDay();
        this.numOfWeek = this.getSecofWeek(year,month,date)-1;
        console.log(this.numOfWeek);
        this.checkGrade('academic');
        this.checkGrade('mock');
        this.getWeeksOfMonth(year, month, date, day);
        this.loadAchievement(today);
        
        
        console.log(this.weeksOfMonth);
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
        let data = [];
                snapshots.forEach( snapshot => {
                    
                    data.push(parseInt(snapshot.val().score));
                    this.a_chartLabels.push(snapshot.val().name);
                    
                })
                
                this.a_title = this.matchLabel(this.a_grade, this.a_semester, this.a_exam);
                this.a_chartDatas.push({data: data, label: this.a_title});

                this.a_radarChartData =[
                    {data: this.a_chartDatas[0], label: this.a_title}
                ];
                this.a_radarChartLabels = this.a_chartLabels;
              

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
        let data = [];
                snapshots.forEach( snapshot => {

                    data.push(parseInt(snapshot.val().score));
                    this.m_chartLabels.push(snapshot.val().name);
                    
                })

                this.m_title = this.matchLabel(this.m_grade, this.m_host, this.m_month);
                this.m_chartDatas.push({data: data, label: this.m_title});
                
                this.m_radarChartData =[
                    {data: this.m_chartDatas[0], label: this.m_title}
                ];
                this.m_radarChartLabels = this.m_chartLabels;
                
                

                setTimeout(()=>{this.isDataAvailable = true}, 0);
                this.loadingProvider.hide();
            
                
           
            //console.log("==================this.pieChartLabels = "+this.chartData);
            
            //loadingPopup.dismiss()
            
    });
        
        this.m_meta = {m_grade: this.m_grade, m_host: this.m_host, m_month: this.m_month};
    }
    

   
}


termGrade(){
    
    let user = firebase.auth().currentUser.uid; 
    this.isDataAvailable=false;

        
    this.afDB.list('/chart/' + user + '/' + this.term_v1 + '/' + this.term_v2, { preserveSnapshot: true })       
    .subscribe(snapshots => {
        
        this.t_chartDatas = [];
        this.t_chartLabels = [];
        this.mySubjects = [];
            snapshots.forEach( snapshot => {
                
                snapshot.forEach( snap => {
                    
                    snap.forEach( data => {
                       
                        if(this.mySubjects.indexOf(data.val().name) == -1) this.mySubjects.push(data.val().name);
                    });
                    this.t_chartDatas.push({score: snap.val(), legend: this.matchLegend(snapshot.key ,snap.key)});
                    
                });
              
            });
            if(this.term_v1 == 'academic') this.mySubjects.unshift('평균');
            this.subject = this.mySubjects[0];
            this.choiceSubject(this.subject);
            
            setTimeout(()=>{this.isDataAvailable = true}, 0);
            

           
              
    });

    
}

choiceSubject(subject: string){
    this.isDataAvailable=false;
    
        if(subject == '평균'){
            let avgArr = [];
            this.lineChartData = [];
            this.lineChartLabels = [];
                this.t_chartDatas.forEach( data => {
                    
                    let average = 0;
                    data.score.forEach( score => {
                        
                        average += parseInt(score.score);
                    })
                    avgArr.push((average / data.score.length).toFixed(2));
                    this.lineChartLabels.push(data.legend);
                })   
            this.lineChartData.push({data: avgArr, label: '평균'}); 
            setTimeout(()=>{this.isDataAvailable = true}, 0);
      
        
            }
        else {
            let scoreArr = [];
            
            this.lineChartData = [];
            this.lineChartLabels = [];
                this.t_chartDatas.forEach( data => {
                    
                    let index = data.score.findIndex(i => i.name == subject);
                    
                    
                    if(index != -1) {
                        scoreArr.push(data.score[index].score);
                        this.lineChartLabels.push(data.legend);
                    }
                })   
            this.lineChartData.push({data: scoreArr, label: subject},{data:[60, 80,90, 100], label: subject+'-스터디메이트'}); 
            setTimeout(()=>{this.isDataAvailable = true}, 0);
       
       }
       this.t_title = this.term_v2[0]+'학년 ';
       if(this.term_v1 == 'academic') this.t_title += '내신성적 통계';
       else this.t_title += '모의고사 성적 통계';
}

matchLegend(semester: string, exam: string){
    let legend = '';
    

    if(semester =='1st') legend += '1학기 ';
    else if(semester =='2nd') legend += '2학기 ';
    else legend += semester +' ';
    
    if(exam =='0_middle') legend += '중간고사';
    else if(exam =='1_final') legend += '기말고사';
    else if(this.term_v2=='3rd' && exam =='11') legend = '대학수학능력 평가';
    else legend += exam + '월';

    return legend;
}

matchLabel(grade: string, semester: string, exam: string){
    
    let label = '';
    if(grade =='1st') label += '1학년 ';
    else if(grade =='2nd') label += '2학년 ';
    else label += '3학년 ';

    if(semester =='1st') label += '1학기 ';
    else if(semester =='2nd') label += '2학기 ';
    else label += semester +' ';
    
    if(exam =='0_middle') label += '중간고사';
    else if(exam =='1_final') label += '기말고사';
    else if(grade == '3rd' && exam =='11') label = '대학수학능력 평가';
    else label += exam + '월 모의고사';

    return label;

} 


loadAchievement(basicDate){
    let user = firebase.auth().currentUser.uid; 
    let year = basicDate.getFullYear();
    let month = basicDate.getMonth();
    let date = basicDate.getDate();
    let day = basicDate.getDay();
    
    
    //this.isDataAvailable=false;
    this.afDB.list('/chart/' + user + '/schedule/' + year + '/' + (month + 1), { preserveSnapshot: true })       
    .subscribe(snapshots => {
        
        let monthPercent = [];
        let monthLabels = [];
        this.monthDatasets = [];

            snapshots.forEach( snapshot => {

                let eventId = Object.keys(snapshot.val());
                let eventIsDone = Object.keys(snapshot.val()).map(key => snapshot.val()[key]).map(x => x);
                let index = 0;
                let percent = 0;
                let events = [];
                
                let numOfthisWeek;
                let fullDay;
                if(snapshot.val()){
               
                eventId.forEach( event => {
                    
                        events.push({id: eventId[index], isDone: eventIsDone[index]});
                        if(eventIsDone[index++]) percent++;
                    });
                    percent = parseInt((percent / eventIsDone.length * 100).toFixed(0));
                    numOfthisWeek = this.getSecofWeek(year, month, parseInt(snapshot.key));
                    let mm = (month + 1).toString();
                    let dd = snapshot.key;
                    mm = mm.length === 1 ? '0' + mm : mm;
                    dd = dd.length === 1 ? '0' + dd : dd;
                    fullDay = year.toString() + mm + dd;
                    
                    this.weeksOfMonth[numOfthisWeek-1][getDay(fullDay)].schedule = events;
                    this.weeksOfMonth[numOfthisWeek-1][getDay(fullDay)].percent = percent;
                    monthPercent.push(percent);
                    monthLabels.push(snapshot.key + '일');

                    if(date == snapshot.key)this._DHT22KnobHumidityValue = percent;      
                    
                }
                
            
               
                
            });
            
            //setTimeout(()=>{this.isDataAvailable = true}, 0);
            console.log(this.weeksOfMonth);
            this.makeWeekData();
            
            this.monthDatasets.datasets = [{data: monthPercent, label: '달성도'}];
            this.monthDatasets.labels = monthLabels;

        
    });
    

}

leftArrow(view){
    if(view == 'day') this.view  = 'month';
    else if(view == 'week') this.view  = 'day';
    else this.view  = 'week';

    

}

rightArrow(view){
    if(view == 'day') this.view  = 'week';
    else if(view == 'week') this.view  = 'month';
    else this.view  = 'day';
}

makeWeekData(){
    let weekPercent;
    let weekLabels;
    let index = 0;
    
    

    this.weeksOfMonth.forEach( week => {
        weekPercent = [];
        weekLabels = [];
        week.forEach(day => {
           if(day.schedule){
               weekPercent.push(day.percent);
               weekLabels.push(day.month + '/' + day.date);
               
              
           }
        })
        this.weeksOfMonth[index].datasets = [{data: weekPercent, label: '달성도'}];
        this.weeksOfMonth[index++].labels = weekLabels;
    })
   

}

getWeeksOfMonth(year, month, date, day){

    var today = new Date();
    var basicDate = new Date( year, month, date );
    var thisWeek;
    var firstDate = 1;
    var firstDay = startOfMonth(basicDate).getDay();
    this.weeksOfMonth = [];

    //basic month < today month
    if(today.getMonth() > basicDate.getMonth()){
        
        
        do{
            thisWeek = [];
            for(var i=0; i<7; i++) {
            
            var resultDay = new Date(year, month, firstDate + (i - firstDay));
            var yyyy = resultDay.getFullYear();
            var mm = (Number(resultDay.getMonth()) + 1).toString();
            var dd = resultDay.getDate().toString();
            var ddd = dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            dd = dd.length === 1 ? '0' + dd : dd;
            var fullDay = yyyy.toString() + mm + dd;
            if(!isSameMonth(fullDay,basicDate)) {
                this.getLastMonthSchedule(year,month,ddd);
                thisWeek.push({fullDay: fullDay, year: yyyy, month: month, date: ddd});
            }
            else thisWeek.push({fullDay: fullDay, year: yyyy, month: month+1, date: ddd});

        }
         
        
        firstDate = (firstDate + 7) % lastDayOfMonth(month).getDate();
       
        this.weeksOfMonth.push(thisWeek);
    }while(isSameMonth(thisWeek[6].fullDay,basicDate));
    // basic month == today month
    }else{
      

        do{
            thisWeek = [];
            for(var i=0; i<7; i++) {
            
            var resultDay = new Date(year, month, firstDate + (i - firstDay));
            var yyyy = resultDay.getFullYear();
            var mm = (Number(resultDay.getMonth()) + 1).toString();
            var dd = resultDay.getDate().toString();
            var ddd = dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            dd = dd.length === 1 ? '0' + dd : dd;
            var fullDay = yyyy.toString() + mm + dd;
            if(!isSameMonth(fullDay,basicDate)) {
                this.getLastMonthSchedule(year,month,ddd);
                thisWeek.push({fullDay: fullDay, year: yyyy, month: month, date: ddd});
            }
            else thisWeek.push({fullDay: fullDay, year: yyyy, month: month+1, date: ddd});
            }
         
        
            firstDate = (firstDate + 7) % lastDayOfMonth(month).getDate();
       
        this.weeksOfMonth.push(thisWeek);
        }while(!isSameWeek(thisWeek[6].fullDay,basicDate));

    }
    
   //console.log(this.thisWeek);

   
   
}

getSecofWeek(year, month, date){
    
    var fd = new Date( year, month, 1 );
    return Math.ceil((date+fd.getDay())/7);
}

getLastMonthSchedule(year, month, date){
    
    let user = firebase.auth().currentUser.uid; 
    this.afDB.object('/chart/' + user + '/schedule/' + year + '/' + month + '/' + date)       
    .subscribe(snapshot => {
        if(snapshot.$exists()){
        this.achievement = [];
        
        let eventId = Object.keys(snapshot);
        
        let eventIsDone = Object.keys(snapshot).map(key => snapshot[key]).map(x => x);
        
        let index = 0;
        let percent = 0;
        let events = [];
        let fullDay;
        
        
        eventId.forEach( event => {
            
                events.push({id: eventId[index], isDone: eventIsDone[index]});
                if(eventIsDone[index++]) percent++;
            });
            percent = parseInt((percent / eventIsDone.length * 100).toFixed(0));
            
            
            let mm = month.toString();
            let dd = snapshot.$key;
            mm = mm.length === 1 ? '0' + mm : mm;
            dd = dd.length === 1 ? '0' + dd : dd;
            fullDay = year.toString() + mm + dd;
            
            this.weeksOfMonth[0][getDay(fullDay)].schedule = events;
            this.weeksOfMonth[0][getDay(fullDay)].percent = percent;
            //setTimeout(()=>{this.isDataAvailable = true}, 0);
           
    }
    });
   
}


refresh(){
    this.isDataAvailable=false;
    setTimeout(()=>{this.isDataAvailable = true}, 0);
}
changeRange(){
    
    
    
          
  }


}