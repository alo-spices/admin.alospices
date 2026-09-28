import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent {
 constructor(

    @Inject(MAT_DIALOG_DATA)
    public supplier: any,

    private dialogRef: MatDialogRef<ViewSupplierComponent>

  ) { }

  close(): void {

    this.dialogRef.close();

  }

}
