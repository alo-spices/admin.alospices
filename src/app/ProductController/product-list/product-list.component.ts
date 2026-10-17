import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';
import { ViewProductComponent } from 'src/app/View-dialog-Controllers/view-product/view-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sno',
    'product',
    'brand',
    'category',
    'variants',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Product>();

  products: Product[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(

    private productService: ProductService,

    private router: Router,

    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.getAllProducts();

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.productName || '') +

        ' ' +

        (data.productCode || '') +

        ' ' +

        (data.brand?.brandName || '') +

        ' ' +

        (data.category?.categoryName || '') +

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

  // ===============================
  // Get All Products
  // ===============================

  getAllProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.products = res.data;

          this.dataSource.data = res.data;

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // ===============================
  // Search
  // ===============================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;

    this.dataSource.filter =

      filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }

  // ===============================
  // Create
  // ===============================

  goToCreateProduct(): void {

    this.router.navigate([
      '/admin/create-product'
    ]);

  }

  // ===============================
  // Edit
  // ===============================

  editProduct(product: Product): void {

    this.router.navigate([

      '/admin/update-product',

      product._id

    ]);

  }

  // ===============================
  // View
  // ===============================

  viewProduct(product: Product): void {

    this.dialog.open(

      ViewProductComponent,

      {

        width: '900px',
        

        data: product

      }

    );

  }

  // ===============================
  // Delete (Soft Delete)
  // ===============================

  deleteProduct(product: Product): void {

    const dialogRef = this.dialog.open(

      DeleteConfirmationComponent,

      {

        width: '400px'

      }

    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.productService
        .deleteProduct(product._id!)
        .subscribe({

          next: (res: any) => {

            alert(res.message);

            this.getAllProducts();

          },

          error: (err: any) => {

            console.log(err);

            alert(err.error.message);

          }

        });

    });

  }

}