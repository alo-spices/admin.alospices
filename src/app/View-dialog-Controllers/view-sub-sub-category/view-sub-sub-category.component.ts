import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-sub-sub-category',
  templateUrl: './view-sub-sub-category.component.html',
  styleUrls: ['./view-sub-sub-category.component.css']
})
export class ViewSubSubCategoryComponent {
constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
}
