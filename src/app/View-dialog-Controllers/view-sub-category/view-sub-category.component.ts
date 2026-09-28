import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-sub-category',
  templateUrl: './view-sub-category.component.html',
  styleUrls: ['./view-sub-category.component.css']
})
export class ViewSubCategoryComponent {
 constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
}
