import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from '../brand-list/brand-list.component';

@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrls: ['./view-brand.component.css']
})
export class ViewBrandComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Brand
  ) { }

  getWebsiteUrl(website: string): string {
    if (!website) {
      return '';
    }

    const url = website.trim();

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return `https://${url}`;
  }
}
