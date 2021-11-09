import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.alertMsg.message = '';
  }
}
