import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../../providers/data'
import { LoadingProvider } from '../../../providers/loading';

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
    
    private user: any;
    chartData: number[] =  [];
   
    chartLabels: string[] = [];
    chartLegend:boolean = false;

    //*********** chart color theme   **************//
    chartColor1: any[] = [{backgroundColor:['#d53e4f','#f46d43','#fdae61','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2']}]; 
    
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
        legend: {position: 'bottom'}
    };
    halfDonutOption: any = {
            responsive: true,
            maintainAspectRatio: false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI
    };
    radarOption: any = {
            
            scale: {
                ticks: {
                    
                    beginAtZero: true,
                    max: 100
                }
            }
    };


    chartView: string = "academic";
    isDataAvailable: boolean = false;  
    chartList: FirebaseListObservable<any[]>;

    constructor(public afDB: AngularFireDatabase,
                public loadingProvider: LoadingProvider,
                public dataProvider: DataProvider ) {

    /*let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
    });*/
    //loadingPopup.present();      
        this.chartList = afDB.list('/chart/average', { preserveSnapshot: true });;
        this.chartList
        .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.chartLabels.push(snapshot.val().chartLabels);
                console.log("this.chartLabels.push= "+snapshot.val().chartLabels);
                this.chartData.push(parseInt(snapshot.val().chartData));
                console.log("this.chartData.push= "+parseInt(snapshot.val().chartData));
            });
                console.log("==================this.chartLabels = "+this.chartLabels);
                console.log("==================this.pieChartLabels = "+this.chartData);
                this.isDataAvailable = true;
                //loadingPopup.dismiss()
        })
    }



    



    
   public lineChartData: Array<any> = [
   {data: this.chartData, label: 'Series A'},
   {data: [70, 48, 40, 90, 86], label: 'Series B'},
   {data: [40, 48, 77, 60, 100], label: 'Series C'}
 ];
 public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
 
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
    
}