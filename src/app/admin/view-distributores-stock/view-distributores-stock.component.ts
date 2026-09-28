import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-distributores-stock',
  templateUrl: './view-distributores-stock.component.html',
  styleUrls: ['./view-distributores-stock.component.css']
})
export class ViewDistributoresStockComponent {

  constructor(

    private dialogRef:
      MatDialogRef<
        ViewDistributoresStockComponent
      >,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }


  // ==========================================
  // CLOSE
  // ==========================================

  close(): void {

    this.dialogRef.close();

  }


  // ==========================================
  // TOTAL QUANTITY
  // ==========================================

  getTotalQuantity(): number {

    if (
      !this.data?.items ||
      !Array.isArray(this.data.items)
    ) {

      return 0;

    }


    return this.data.items.reduce(
      (
        total: number,
        item: any
      ) => {

        return total +
          Number(item?.quantity || 0);

      },

      0
    );

  }

}
