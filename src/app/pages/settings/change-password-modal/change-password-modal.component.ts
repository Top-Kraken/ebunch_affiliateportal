import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  passwordForm: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private dataService: InitialDataService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.passwordForm = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  submit(){
    if(this.passwordForm.valid){
      this.dataService.updateDealerPassword(this.passwordForm.value).subscribe( res =>{
        if(res.responseCode == 0){
          this.alertMsg.type = 'succsess';
          this.alertMsg.message = res.successMsg
        }else if(res.responseCode == -1){
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        }else{
          this.alertMsg.type = 'danger';
          this.alertMsg.message = "Server error"
        }
      })
    }
  }
}

