import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-distributor-employees-details-view',
  templateUrl: './distributor-employees-details-view.component.html',
  styleUrls: ['./distributor-employees-details-view.component.css']
})
export class DistributorEmployeesDetailsViewComponent {
  constructor(

    private dialogRef:
      MatDialogRef<DistributorEmployeesDetailsViewComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }


  close(): void {

    this.dialogRef.close();

  }
}
