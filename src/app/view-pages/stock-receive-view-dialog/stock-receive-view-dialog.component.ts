import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-receive-view-dialog',
  templateUrl: './stock-receive-view-dialog.component.html',
  styleUrls: ['./stock-receive-view-dialog.component.css']
})
export class StockReceiveViewDialogComponent implements OnInit {

  stock: any;

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialogRef: MatDialogRef<StockReceiveViewDialogComponent>

  ) { }

  ngOnInit(): void {

    this.stock = this.data;

  }

  close(): void {

    this.dialogRef.close();

  }

}