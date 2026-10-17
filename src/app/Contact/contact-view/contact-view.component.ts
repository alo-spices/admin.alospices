import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/Models/contact';
import { ContctService } from 'src/app/Services/contct.service';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent  implements OnInit {

  contact: Contact | null = null;

  isLoading = false;


  constructor(

      private contactService: ContctService,
  

    private dialogRef:
      MatDialogRef<ContactListComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: { id: string }

  ) {}


  ngOnInit(): void {

    this.getContactDetails();

  }


  getContactDetails(): void {

    if (!this.data?.id) {

      return;

    }


    this.isLoading = true;


    this.contactService
      .getContactById(this.data.id)
      .subscribe({

        next: (response) => {

          this.isLoading = false;


          if (response.success) {

            this.contact =
              response.data;

          }

        },


        error: (error) => {

          this.isLoading = false;

          console.error(
            'Get Contact Details Error:',
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
