import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-user-status',
  templateUrl: './change-user-status.component.html',
  styleUrls: ['./change-user-status.component.css']
})
export class ChangeUserStatusComponent {

  // ==========================================
  // Status List
  // ==========================================

  statusList: string[] = [

    'Active',

    'Inactive',

    'Blocked'

  ];


  // ==========================================
  // Current Status
  // ==========================================

  currentStatus: string = '';


  // ==========================================
  // Selected Status
  // ==========================================

  selectedStatus: string = '';


  constructor(

    private dialogRef:
      MatDialogRef<ChangeUserStatusComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {

    this.currentStatus =
      data?.status || 'Pending';


    this.selectedStatus =
      this.currentStatus;

  }


  // ==========================================
  // Update
  // ==========================================

  update(): void {

    if (!this.selectedStatus) {

      return;

    }


    if (
      this.selectedStatus ===
      this.currentStatus
    ) {

      return;

    }


    this.dialogRef.close({

      confirmed: true,

      status:
        this.selectedStatus

    });

  }


  // ==========================================
  // Cancel
  // ==========================================

  cancel(): void {

    this.dialogRef.close({

      confirmed: false

    });

  }


  // ==========================================
  // Status Class
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Active':

        return 'active';


      case 'Inactive':

        return 'inactive';


      case 'Blocked':

        return 'blocked';


      case 'Pending':

        return 'pending';


      default:

        return 'inactive';

    }

  }
}
