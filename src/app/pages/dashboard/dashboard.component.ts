import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

export interface PeriodicElement {
  duration: string;
  title: string;
  created_by: string;
  image: string;
  action:any
}
const ELEMENT_DATA: PeriodicElement[] = [
  {duration: "23 sep 2021 - 27 sep 2021", title: 'Henson Nation', created_by: 'Brand Auto Dealer', image: 'https://picsum.photos/100', action: ''},
 
];

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
  slides = [
    {image: 'assets/images/banner1.png'},
    {image: 'assets/images/banner1.png'}
  ];
  displayedColumns: string[] = ['duration', 'title', 'created_by', 'image','action'];
  dataSource = ELEMENT_DATA;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
   
    spaceBetween: 30
  };
  config1: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
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
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.alertMsg.message = '';
  }
  sortTable(type:any){

  }
}
