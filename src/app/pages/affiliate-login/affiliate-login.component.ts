import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-affiliate-login',
  templateUrl: './affiliate-login.component.html',
  styleUrls: ['./affiliate-login.component.css']
})
export class AffiliateLoginComponent implements OnInit {
  login: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  hide = true;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.login = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.authService.authState.subscribe((user) => {
      console.log(user);
      let req;
      if(user.provider == 'FACEBOOK'){
        req = {
          loginType: 'facebook',
          socialLoginId: user.id
        }
      }else if(user.provider == 'GOOGLE'){
        req = {
          loginType: 'google',
          socialLoginId: user.id
        }
      }
      console.log(req);
      this.dataService.login(req).subscribe( res =>{
        if (res.responseCode == 0) {
          localStorage.setItem('affiliateId', res.response.affiliateId);
          if(res.response.phoneVerfied == 0){
            this.router.navigateByUrl('/', { state: { affiliateId: res.response.affiliateId } });
          }else{

          }
          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
        }
        else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      })
    });
  }
  submit() {
    if (this.login.valid) {
      this.login.value.loginType = 'local';
      this.dataService.login(this.login.value).subscribe(res => {
        console.log(res);
        if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
          //this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
        } else if (res.responseCode == 0) {
          // if (res.response.status == 'phoneVerificationPending') {
          //   this.router.navigateByUrl('/verify');
          // } else if (res.response.status == 'new' || res.response.status == 'rejected') {
          //   this.router.navigateByUrl('/review', { state: { msg: res.successMsg } });
          // } else if ((res.response.facebookLink == null) && (res.response.instaLink == null) && (res.response.linkedinLink == null)) {
          //   localStorage.setItem('token', res.response.token);
          //   this.router.navigateByUrl('/complete-profile', { state: { data: res.response } });
          // } else if (res.response.firstTimeLogin == 1) {
          //   localStorage.setItem('token', res.response.token);
          //   this.router.navigateByUrl('/dealer-create-password');
          // } else {
          //   localStorage.setItem('token', res.response.token);
          //   localStorage.setItem('userData', JSON.stringify(res.response));

          //   this.router.navigateByUrl('/dashboard');
          // }

        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      })
    }
    //this.router.navigateByUrl('/dealer-forgot-password')
  }
  logInWithFb(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  close() {
    this.alertMsg.message = ''
  }
}
