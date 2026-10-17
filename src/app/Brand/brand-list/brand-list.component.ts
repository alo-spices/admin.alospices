import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { BrandService } from 'src/app/Services/brand.service';
import { ViewBrandComponent } from '../view-brand/view-brand.component';
import { CommomPopupComponent } from 'src/app/commom-popup/commom-popup.component';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

// You can create a Brand interface/model similar to Category
export interface Brand {
  _id?: string;
  brandName: string;
  brandCode: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  logo?: string;
  bannerImage?: string;
  status?: string;
  isDeleted?: boolean;
}
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sno',
    'name',
    'logo',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<Brand>();

  brands: Brand[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private brandService: BrandService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: CommomPopupService
  ) { }

  ngOnInit(): void {
    this.getAllBrands();

    // Filter predicate for search (brandName, brandCode, status)
    this.dataSource.filterPredicate = (
      data: any,
      filter: string
    ) => {
      const search = (
        (data.brandName || '') +
        ' ' +
        (data.brandCode || '') +
        ' ' +
        (data.status || '')
      ).toLowerCase();
      return search.includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ==================================
  // Get All Brands
  // ==================================
  getAllBrands(): void {
    this.brandService
      .getAllBrands()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          // Adjust based on your actual response structure
          this.brands = res.data || res.brands || [];
          this.dataSource.data = this.brands;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  // ==================================
  // Search
  // ==================================
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ==================================
  // Create
  // ==================================
  goToCreateBrand(): void {
    this.router.navigate(['/admin/create-brand']);
  }

  // ==================================
  // Edit
  // ==================================
  // ==================================
  // Edit
  // ==================================
  editBrand(brand: Brand): void {
    if (!brand._id) {
      this.alertService?.error('Invalid Brand ID'); // if you have alertService here
      return;
    }

    this.router.navigate(['/admin/update-brand', brand._id]);
  }


  // ==================================
  // View
  // ==================================
  viewBrand(brand: Brand): void {
    console.log(brand);
    this.dialog.open(ViewBrandComponent, {
      width: '600px',
      data: brand
    });
  }



  // ==================================
  // Delete (Soft Delete)
  // ==================================
  deleteBrand(brand: Brand): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if (!brand._id) {
        alert('Invalid brand ID');
        return;
      }

      this.brandService
        .deleteBrand(brand._id)
        .subscribe({
          next: (res: any) => {
            alert(res.message || 'Brand deleted successfully');
            this.getAllBrands();
          },
          error: (err: any) => {
            console.log(err);
            alert(err.error?.message || 'Something went wrong');
          }
        });
    });
  }

}
