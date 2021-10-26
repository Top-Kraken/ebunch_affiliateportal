import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.alertMsg.message = '';
  }
}
