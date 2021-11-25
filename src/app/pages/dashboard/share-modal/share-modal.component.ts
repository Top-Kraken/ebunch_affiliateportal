import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Meta } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { ShareDialogResponse } from 'ngx-facebook/models/ui-response';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit {
  campaign: any;
  showCopyState: boolean = false;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private clipboard: Clipboard,
    public dialog: MatDialog,
    private dataService: InitialDataService,
    private meta: Meta,
    @Optional() public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    console.log(this.data);
    this.campaign = this.data;
  }

  closeModal() {
    this.dialogRef.close()
  }

  share() {
    FB.ui({
      app_id: "277274391071647",
      method: 'share',
      href: this.campaign.shortUrlLink
    }, (response: ShareDialogResponse) => {
      console.log(response);
      let req = {
        bannerId: null,
        campaignId: this.campaign.campaignId
      }
      this.dataService.sharedOnFb(req).subscribe(res => {
        if (res.responseCode == 0) {
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
  copyLink() {
    this.clipboard.copy(this.campaign.shortUrlLink);
    this.showCopyState = true;
    setTimeout(() => { this.showCopyState = false; }, 1000)
  }
  close() {
    this.alertMsg.message = '';
  }
}
