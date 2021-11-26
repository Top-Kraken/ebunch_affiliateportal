import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  date = new Date();
  activeTab:number = 0;
  startDate:any;
  endDate:any;
  days:number = 7;
  apiData:any;
  constructor(
    private dataService: InitialDataService,
  ) { }

  ngOnInit(): void {
    this.getAffiliateWalletData('days');
  }

  getAffiliateWalletData(prop:string) {
    let req;
    if (prop == 'range') {
      req = {
        filter: "range",
        rangeFrom: this.startDate,
        rangeTo: this.endDate
      }
    } else if (prop == 'days') {
      req = {
        filter: 'days',
        totalDays: 7,
      }
    } else if (prop == 'month') {
      req = {
        filter: 'month',
      }
    } else if (prop == 'year') {
      req = {
        filter: 'year',
      }
    }
    
    this.dataService.affililateWallet(req).subscribe( res =>{
      console.log(res);
      this.apiData = res.response;
    })
  }
  onTabClick(num:number){
    this.activeTab = num;
  }
}
