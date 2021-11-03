import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  contact: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contact = this._formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  close(){

  }
  sortTable(val:any){

  }
  toggleVideo(){
    this.videoplayer.nativeElement.play();
  }
  contactUs(){

  }
}
