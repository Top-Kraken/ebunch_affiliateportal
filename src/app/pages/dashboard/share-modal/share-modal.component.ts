import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Meta } from '@angular/platform-browser';  

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit {
  campaign:any;
  constructor(
    public dialog: MatDialog,
    private dataService: InitialDataService,
    private meta: Meta,
    @Optional() public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 

  ngOnInit(): void {
    console.log(this.data);
    this.campaign = this.data;
    this.meta.addTag({ name: 'description', content: 'Article Description' });
    this.meta.updateTag({ name: 'og:title', content: 'This is an article about Angular Meta service' });
    this.meta.updateTag({ name: 'description', content: 'This is an article about Angular Meta service' });
    this.meta.updateTag({ name: 'og:image', content: "assets/images/fb.png" })
  }

  closeModal() {
    this.dialogRef.close()
  }

  share() {
    this.meta.updateTag({ name: 'og:title', content: 'This is an article about Angular Meta service' });
    this.meta.updateTag({ name: 'description', content: 'This is an article about Angular Meta service' });
    this.meta.updateTag({ name: 'og:image', content: "assets/images/fb.png" })
    FB.ui({
      method: 'share',
      href: this.campaign.shortUrlLink,
      hashtag: "Read"
    }, function (response) { });
  }
}
