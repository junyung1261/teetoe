import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController } from 'ionic-angular';
import { SuperTabsController} from 'ionic2-super-tabs';



@IonicPage({
  segment: 'home/:type'
})

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
 
})


export class TabsPage {

  page1: any = 'HomePage';
  page2: any = 'CalendarPage';
  page3: any = 'ChecklistPage';
  page4: any = 'ChartPage';
  page5: any = 'CommunityPage';

 
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private superTabsCtrl: SuperTabsController, private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    //this.superTabsCtrl.enableTabSwipe('page2', false);
    this.superTabsCtrl.enableTabsSwipe(true);
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

  openPeoplePage(){
    this.navCtrl.push('PeoplePage');

  }

  
}