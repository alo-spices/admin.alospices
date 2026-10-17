import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributorInquiry } from 'src/app/Models/DistributorInquiry';
import { DistributorInquiryService } from 'src/app/Services/distributor-inquiry.service';

@Component({
  selector: 'app-distributor-inquiry-details',
  templateUrl: './distributor-inquiry-details.component.html',
  styleUrls: ['./distributor-inquiry-details.component.css']
})
export class DistributorInquiryDetailsComponent  implements OnInit {

  inquiry: DistributorInquiry | null = null;

  isLoading = false;


  constructor(

    private distributorInquiryService:
      DistributorInquiryService,

    private dialogRef:
      MatDialogRef<DistributorInquiryDetailsComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: { id: string }

  ) {}


  ngOnInit(): void {

    this.getInquiryDetails();

  }


  getInquiryDetails(): void {

    if (!this.data?.id) {

      return;

    }

    this.isLoading = true;


    this.distributorInquiryService
      .getInquiryById(this.data.id)
      .subscribe({

        next: (response) => {

          this.isLoading = false;


          if (response.success) {

            this.inquiry =
              response.data;

          }

        },


        error: (error) => {

          this.isLoading = false;

          console.error(
            'Get Distributor Inquiry Details Error:',
            error
          );

        }

      });

  }


  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'New':
        return 'status-new';

      case 'Contacted':
        return 'status-contacted';

      case 'Closed':
        return 'status-closed';

      default:
        return '';

    }

  }


  close(): void {

    this.dialogRef.close();

  }

}