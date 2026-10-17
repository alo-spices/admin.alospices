import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Warehouse } from 'src/app/Models/Warehouse';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import { ViewWarehouseComponent } from 'src/app/View-dialog-Controllers/view-warehouse/view-warehouse.component';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

 displayedColumns: string[] = [
  'sno',
  'warehouse',
  'warehouseType',
  'managerName',
  'mobileNumber',
  // 'email',
  'city',
  'status',
  'actions'
];

  dataSource = new MatTableDataSource<Warehouse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private popup: CommomPopupService,
        private dialog: MatDialog
    
  ) { }

  ngOnInit(): void {

    this.getAllWarehouses();

  }

  // ===========================================
  // GET ALL WAREHOUSES
  // ===========================================

  getAllWarehouses(): void {

    this.warehouseService.getAllWarehouses().subscribe({

      next: (res: any) => {

        if (res.success) {

          this.dataSource.data = res.data;

          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;

        }

      },

      error: (err) => {

        this.popup.error(

          err?.error?.message || 'Failed to load warehouses.'

        );

      }

    });

  }

  // ===========================================
  // SEARCH
  // ===========================================

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  // ===========================================
  // VIEW
  // ===========================================


  viewWarehouse(warehouse: Warehouse): void {

 this.dialog.open(

      ViewWarehouseComponent,

      {

       width: '900px',

  maxWidth: '95vw',

  maxHeight: '90vh',

        data: warehouse

      }

    );

}

  // ===========================================
  // EDIT
  // ===========================================

  editWarehouse(element: Warehouse): void {

    this.router.navigate([

      '/admin/update-warehouse',

      element._id

    ]);

  }

  // ===========================================
  // DELETE
  // ===========================================


deleteWarehouse(element: Warehouse): void {

  console.log('Delete clicked:', element);
  console.log('Warehouse ID:', element._id);

  this.popup.confirmDelete().then((result: any) => {

    console.log('Confirmation result:', result);

    const isConfirmed =
      result === true || result?.isConfirmed === true;

    if (!isConfirmed) {
      console.log('Delete cancelled');
      return;
    }

    console.log('Sending delete request...');

    this.warehouseService.deleteWarehouse(element._id!).subscribe({

      next: (res: any) => {

        console.log('Delete response:', res);

        if (res.success) {

          this.popup.success(res.message);
          this.getAllWarehouses();

        } else {

          this.popup.error(
            res.message || 'Unable to delete warehouse.'
          );

        }

      },

      error: (err: any) => {

        console.error('Delete error:', err);
        console.error('Status:', err.status);
        console.error('Response:', err.error);

        this.popup.error(
          err?.error?.message || 'Unable to delete warehouse.'
        );

      }

    });

  }).catch((error: any) => {

    console.error('Confirmation popup error:', error);

  });

}


} 