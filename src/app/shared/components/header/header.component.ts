import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isExpanded: boolean = true;
  isNewNotification: boolean = false;
  userPhotoUrl: any;
  userData:any;
  notificationList = [
    {
      fromUserImage: 'https://picsum.photos/id/1/200',
      message:" Test Message written here uuj ",
      createTs: new Date()
    }
  ]
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog, private router: Router,private dataService: InitialDataService) {
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
  menuOpened(){
  }
  menuClosed(){
    // this.dataService.markDealerNotificationRead().subscribe(res => {
    // });
  }
}

