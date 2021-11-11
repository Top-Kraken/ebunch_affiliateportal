import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isExpanded: boolean = true;
  userPhotoUrl: any;
  userData:any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userPhotoUrl;
    console.log(this.userData);
  }
  selected: any = '0';
  ngOnInit(): void {
  }
  
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
    this.isExpanded = !this.isExpanded
  }
  openContactUs(){
    
  }
  goToTraining(){
    this.router.navigateByUrl('/training')
  }
}

