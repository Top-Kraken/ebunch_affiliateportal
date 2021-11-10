import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';


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
  emails:any;
  referalReward:any;
  referalCode:any;
  constructor(private dataService: InitialDataService,) { }

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
      if(res.resposeCode == 0){
        this.alertMsg.type = 'success';
          this.alertMsg.message = res.respose.successMsg;
      }
    });
  }
}
