import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwiperComponent } from 'ngx-useful-swiper';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { SwiperOptions } from 'swiper';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { FacebookService, InitParams } from 'ngx-facebook';
export interface PeriodicElement {
  duration: string;
  title: string;
  created_by: string;
  image: string;
  action: any
}
const ELEMENT_DATA: PeriodicElement[] = [
  { duration: "23 sep 2021 - 27 sep 2021", title: 'Henson Nation', created_by: 'Brand Auto Dealer', image: 'https://picsum.photos/100', action: '' },

];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p: number;
  p1: number;
  alertMsg: any = {
    type: '',
    message: ''
  };
  slides = [
    { image: 'assets/images/banner1.png' },
    { image: 'assets/images/banner1.png' }
  ];
  displayedColumns: string[] = ['duration', 'title', 'created_by', 'image', 'action'];
  dataSource = ELEMENT_DATA;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination1', clickable: true },

    observer: true,
    observeParents: true,
    parallax: true,
    spaceBetween: 30
  };
  config1: SwiperOptions = {
    pagination: { el: '.swiper-pagination2', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: true
    // },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      400: {
        slidesPerView: 1
      },
      300: {
        slidesPerView: 1
      }
    },

  };
  apiData: any;
  //@ViewChild('usefulSwiper1',{static: false}) usefulSwiper1: any;
  constructor(
    private dataService: InitialDataService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    let req = {
      bannerPage: 0,
      bannerSize: 10,
      campaignPage: 0,
      campaignSize: 10,
      bannerSortBy: "owner",
      campaignSortBy: "owner"
    }
    this.dataService.getDashboardData(req).subscribe(res => {
      console.log(res);
      this.apiData = res.response;
    })
  }
  close() {
    this.alertMsg.message = '';
  }
  sortTable(type: any) {
    let req = {
      bannerPage: 0,
      bannerSize: 10,
      campaignPage: 0,
      campaignSize: 10,
      bannerSortBy: type,
      campaignSortBy: type
    }
    this.dataService.getDashboardData(req).subscribe(res => {
      console.log(res);
      this.apiData = res.response;
    })
  }
  getPage(page: any) {

  }
  openCampaignShareModal(campaign: any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['595px', '400px'];
    } else {
      size = ['350px', '600px'];
    }
    const dialogRef1 = this.dialog.open(ShareModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: campaign,
      disableClose: false
    });
  }
  shareToFb(ele: any) {
    FB.ui({
      app_id:"400832421733820",
      method: 'share',
      href: ele.bannerUrlLink
    }, function (response) {
      console.log(response);
    });
  }

}