import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  date1 = new Date();
  userPhotoUrl: any = '';
  userData: any;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() isPartialClose: boolean;
  //isExpanded = false;
  constructor(public dialog: MatDialog,private router: Router, private dataService: InitialDataService) {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userImage;
  }

  ngOnInit(): void {
    this.dataService.isSettingChanged.subscribe( val =>{
      this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
      this.userPhotoUrl = this.userData.userImage;
    })
  }
  toggleSideBar() {
    if (window.innerWidth < 786) {
      this.toggleSideBarForMe.emit();
      //this.isExpanded = !this.isExpanded
    } else {
      this.isPartialClose = !this.isPartialClose;

    }

  }
  openContactUs() {
    
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
