import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RawMaterialService } from 'src/app/Services/raw-material.service';

@Component({
  selector: 'app-raw-meterial',
  templateUrl: './raw-meterial.component.html',
  styleUrls: ['./raw-meterial.component.css']
})
export class RawMeterialComponent {
constructor(

public dialogRef: MatDialogRef<RawMeterialComponent>,

@Inject(MAT_DIALOG_DATA)

public data:any

){}

close(){

this.dialogRef.close();

}

}