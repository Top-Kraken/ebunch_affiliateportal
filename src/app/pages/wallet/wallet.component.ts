import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  date = new Date();
  activeTab:number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  onTabClick(num:number){
    this.activeTab = num;
  }
}
