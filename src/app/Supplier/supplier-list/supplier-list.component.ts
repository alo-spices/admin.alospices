import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/Models/Supplier';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import { ViewSupplierComponent } from 'src/app/View-dialog-Controllers/view-supplier/view-supplier.component';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  displayedColumns: string[] = [
    'sno',
    'supplier',
    'contactPerson',
    'mobile',
    'city',
    'gst',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  supplierList: any[] = [];

  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private alertService: CommomPopupService,
     private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.getAllSuppliers();

  }

  //========================================
  // Get All Suppliers
  //========================================

  getAllSuppliers(): void {

    this.isLoading = true;

    this.supplierService.getAllSuppliers().subscribe({

      next: (response: any) => {

        this.supplierList = response.data || response.suppliers || response;

        this.dataSource.data = this.supplierList;

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

        this.isLoading = false;

      },

      error: (error) => {

        console.log(error);

        this.isLoading = false;

        this.alertService.error(
          'Failed to load suppliers'
        );

      }

    });

  }

  //========================================
  // Search
  //========================================

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  //========================================
  // View
  //========================================

 // =====================================
// VIEW SUPPLIER
// =====================================

viewSupplier(supplier: any): void {

  this.dialog.open(

    ViewSupplierComponent,

    {

      width: '950px',

      maxWidth: '95vw',

      maxHeight: '90vh',

      data: supplier

    }

  );

}

  //========================================
  // Edit
  //========================================

  editSupplier(row: any): void {

    this.router.navigate([
      '/admin/supplier-update',
      row._id
    ]);

  }

  //========================================
  // Delete
  //========================================

  deleteSupplier(row: any): void {

    if (!confirm(`Delete ${row.supplierName}?`)) {

      return;

    }

    this.supplierService.deleteSupplier(row._id).subscribe({

      next: (response: any) => {

        this.alertService.success(

          response.message ||

          'Supplier Deleted Successfully'

        );

        this.getAllSuppliers();

      },

      error: (error) => {

        console.log(error);

        this.alertService.error(

          error.error?.message ||

          'Delete Failed'

        );

      }

    });

  }

}