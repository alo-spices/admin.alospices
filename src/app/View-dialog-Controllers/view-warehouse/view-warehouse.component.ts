import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Warehouse } from 'src/app/Models/Warehouse';

@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrls: ['./view-warehouse.component.css']
})
export class ViewWarehouseComponent {
 constructor(

    @Inject(MAT_DIALOG_DATA)

    public warehouse: Warehouse,

    private dialogRef: MatDialogRef<ViewWarehouseComponent>

  ) { }

  // ============================
  // CLOSE
  // ============================

  goBack(): void {

    this.dialogRef.close();

  }
 


}
