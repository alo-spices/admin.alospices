import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { CommomPopupComponent } from '../commom-popup/commom-popup.component';
import { PopupData } from '../Models/common-popup';

@Injectable({
  providedIn: 'root'
})
export class CommomPopupService {


  constructor(
    private dialog: MatDialog
  ) { }


  // ==========================================
  // Success
  // ==========================================

  success(message: string) {

    return this.openPopup({

      type: 'success',

      title: 'Success',

      message: message,

      okText: 'OK'

    });

  }


  // ==========================================
  // Error
  // ==========================================

  error(message: string) {

    return this.openPopup({

      type: 'error',

      title: 'Error',

      message: message,

      okText: 'OK'

    });

  }


  // ==========================================
  // Warning
  // ==========================================

  warning(message: string) {

    return this.openPopup({

      type: 'warning',

      title: 'Warning',

      message: message,

      okText: 'OK'

    });

  }


  // ==========================================
  // Info
  // ==========================================

  info(message: string) {

    return this.openPopup({

      type: 'info',

      title: 'Information',

      message: message,

      okText: 'OK'

    });

  }


  // ==========================================
  // Validation
  // ==========================================

  validation(message: string) {

    return this.openPopup({

      type: 'warning',

      title: 'Validation',

      message: message,

      okText: 'OK'

    });

  }


  // ==========================================
  // Delete Confirmation
  // ==========================================

  confirmDelete() {

    return this.openPopup({

      type: 'confirm',

      title: 'Are you sure?',

      message:
        'You will not be able to recover this record!',

      okText: 'Yes, Delete',

      cancelText: 'Cancel'

    });

  }


  // ==========================================
  // Common Popup
  // ==========================================

  private openPopup(data: PopupData) {

    const dialogRef = this.dialog.open(
      CommomPopupComponent,
      {
        width: '360px',

        maxWidth: '92vw',

        panelClass: 'common-popup-dialog',

        disableClose: true,

        data: data

      }
    );


    return firstValueFrom(
      dialogRef.afterClosed()
    );

  }

  // ==========================================
  // Approval Confirmation
  // ==========================================

  confirmApproval(employeeName?: string) {

    return this.openPopup({

      type: 'confirm',

      title: 'Approve Employee?',

      message:
        employeeName
          ? `Are you sure you want to approve ${employeeName}?`
          : 'Are you sure you want to approve this employee?',

      okText: 'Yes, Approve',

      cancelText: 'Cancel'

    });

  }


  // ==========================================
  // Reject Confirmation
  // ==========================================

  confirmReject(employeeName?: string) {

    return this.openPopup({

      type: 'confirm',

      title: 'Reject Employee?',

      message:
        employeeName
          ? `Are you sure you want to reject ${employeeName}?`
          : 'Are you sure you want to reject this employee?',

      okText: 'Yes, Reject',

      cancelText: 'Cancel'

    });

  }
}
