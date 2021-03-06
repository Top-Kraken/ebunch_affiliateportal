import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-affiliate-registration',
  templateUrl: './affiliate-registration.component.html',
  styleUrls: ['./affiliate-registration.component.css']
})
export class AffiliateRegistrationComponent implements OnInit, AfterViewInit {
  regForm1: FormGroup;
  regForm3: FormGroup;
  regForm2: FormGroup;
  isCompleted1:boolean = true;
  isCompleted2:boolean = false;
  isCompleted3:boolean = true;
  isEditable = true;
  companies = [];
  interests = [];
  isLinear = true;
  currentStepperImage= 'assets/images/form1.png';
  stepperImages = [
    {
      url: 'assets/images/form1.png'
    },
    {
      url: 'assets/images/form2.png'
    },
    {
      url: 'assets/images/form3.png'
    }
  ];
  showPasswordInput:boolean = true;
  alertMsg: any = {
    type: '',
    message: ''
  };
  usernameValid = 0;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    this.dataService.getCompanyList().subscribe(data => {
      this.companies = data.response.companyList;
    });
    this.dataService.getIntrestArea().subscribe(data => {
      this.interests = data.response.intrestList;
    });
    this.regForm1 = this._formBuilder.group({
      userName: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: [null, Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      phone: ['', Validators.required],
      referalCode: [''],
    });
    this.regForm2 = this._formBuilder.group({
      companyList: [''],
      intrestAreaList: [''],
      platformjoinReason: ['']
    });
    this.regForm3 = this._formBuilder.group({
      otpNumber: [1111, Validators.required]
    });
    // if (history.state.affiliateId) {
    //   this.isLinear = false;
    //   setTimeout(() => {
    //     this.stepper.selectedIndex = 2;
    //   }, 1);
    // }
    if (history.state.affiliateId) {
      this.showPasswordInput = false;
      this.regForm1.controls.password.setValidators(null);
      this.regForm1.controls.password.updateValueAndValidity();
    }

    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
  get f1() {
    return this.regForm1.controls;
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'none';

  }
  onUsernameEnter(eve:any){
    let username = eve.target.value;
    this.dataService.checkUsernameExist(username).subscribe( res =>{
      if(res.responseCode == 0){
        this.usernameValid = 1;
      }else if(res.responseCode == -1){
        this.usernameValid = 2;
      }else{
        this.usernameValid = 0;
      }
    });
  }
  public onStepChange(event: any): void {
    this.currentStepperImage= this.stepperImages[event.selectedIndex].url;
  }

  close() {
    this.alertMsg.message = ''
  }
  submit(){
    let formObj = {...this.regForm1.value,...this.regForm2.value};
    if (this.regForm2.valid && this.regForm1.valid) {
      if(history.state.affiliateId){
        formObj.affiliateId = history.state.affiliateId
      }
      this.dataService.register(formObj).subscribe(res => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          // this.alertMsg.message = res.successMsg;
          this.stepper.next();
          localStorage.setItem('affiliateId', res.response.affiliateId);
        }
        else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      });
    }
  }
  verifyOtp(){
    if (this.regForm3.valid) {
      this.regForm3.value.affiliateId = localStorage.getItem('affiliateId');
      this.dataService.validateOtp(this.regForm3.value).subscribe(res => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
          localStorage.setItem('token', res.response.token);
          localStorage.setItem('referalCode', res.response.referalCode);
          localStorage.setItem('referalReward', res.response.referalReward);
          localStorage.setItem('userData', JSON.stringify(res.response));
          this.router.navigateByUrl('/dashboard');
        }
        else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      });
    }
  }
}
