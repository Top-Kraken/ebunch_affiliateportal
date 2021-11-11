import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css']
})
export class ReferComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  showCopyState = false;
  emails:any;
  referalReward:any;
  referalCode:any;
  constructor(private dataService: InitialDataService,private clipboard: Clipboard,) { }

  ngOnInit(): void {
    this.referalCode = localStorage.getItem('referalCode');
  }
  close(){
    this.alertMsg.message = '';
  }
  sendInvitation(){
    let req = {
      emailId: this.emails.split(',')
    }
    this.dataService.referFriends(req).subscribe(res =>{
      if(res.responseCode == 0){
        
        this.alertMsg.type = 'success';
        this.alertMsg.message = res.successMsg;
      }
    });
  }
  copyCode(){
    this.clipboard.copy(this.referalCode.shortUrlLink);
    this.showCopyState = true;
    setTimeout(()=>{this.showCopyState = false;},1000)
  }
}
