import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-productions',
  templateUrl: './view-productions.component.html',
  styleUrls: ['./view-productions.component.css']
})
export class ViewProductionsComponent {
//  constructor(

//     @Inject(MAT_DIALOG_DATA)

//     public production: any,

//     private dialogRef: MatDialogRef<ViewProductionsComponent>

//   ) { }

//   close(): void {

//     this.dialogRef.close();

//   }
 constructor(

    public dialogRef: MatDialogRef<ViewProductionsComponent>,

    @Inject(MAT_DIALOG_DATA)

    public production: any

  ) { }

  close(): void {

    this.dialogRef.close();

  }

}