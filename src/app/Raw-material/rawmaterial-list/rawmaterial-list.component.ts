import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { RawMeterialComponent } from 'src/app/View-dialog-Controllers/raw-meterial/raw-meterial.component';

@Component({
  selector: 'app-rawmaterial-list',
  templateUrl: './rawmaterial-list.component.html',
  styleUrls: ['./rawmaterial-list.component.css']
})
export class RawmaterialListComponent implements OnInit {

  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'rawMaterial',

    'brand',

    'category',

    'unit',

    'gst',

    'status',

    'actions'

  ];

  // ==========================================
  // Data Source
  // ==========================================

  dataSource = new MatTableDataSource<any>();

  rawMaterialList: any[] = [];

  loading = false;

  // ==========================================
  // Paginator & Sort
  // ==========================================

  @ViewChild(MatPaginator)

  paginator!: MatPaginator;

  @ViewChild(MatSort)

  sort!: MatSort;

  constructor(

    private rawMaterialService: RawMaterialService,

    private popup: CommomPopupService,

    private router: Router,

    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.getAllRawMaterials();

  }
  // ==========================================
  // GET ALL RAW MATERIALS
  // ==========================================

  getAllRawMaterials() {

    this.loading = true;

    this.rawMaterialService
      .getAllRawMaterials()
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          if (res.success) {

            this.rawMaterialList = res.data;

            this.dataSource.data = this.rawMaterialList;

            this.dataSource.paginator = this.paginator;

            this.dataSource.sort = this.sort;

          }

        },

        error: (err: any) => {

          this.loading = false;

          console.log(err);

          this.popup.error(

            err.error?.message ||

            "Failed to load Raw Materials."

          );

        }

      });

  }

  // ==========================================
  // SEARCH FILTER
  // ==========================================

  applyFilter(event: Event) {

    const filterValue =

      (event.target as HTMLInputElement).value;

    this.dataSource.filter =

      filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }
  // ==========================================
  // VIEW RAW MATERIAL
  // ==========================================

  viewRawMaterial(rawMaterial: any): void {

    this.dialog.open(

      RawMeterialComponent,

      {

        width: '750px',

        disableClose: true,

        data: rawMaterial

      }

    );

  }

  // ==========================================
  // EDIT RAW MATERIAL
  // ==========================================

  editRawMaterial(rawMaterial: any) {

    this.router.navigate(

      ['/admin/rawmaterial-update', rawMaterial._id]

    );

  }

  // ==========================================
  // DELETE RAW MATERIAL
  // ==========================================
// ==========================================
// DELETE RAW MATERIAL
// ==========================================

deleteRawMaterial(rawMaterial: any): void {

  this.popup.confirmDelete().then((result: any) => {

    const isConfirmed =
      result === true || result?.isConfirmed === true;

    if (!isConfirmed) {
      return;
    }

    this.rawMaterialService
      .deleteRawMaterial(rawMaterial._id)
      .subscribe({

        next: (res: any) => {

          if (res.success) {

            this.popup.success(res.message);

            this.getAllRawMaterials();

          } else {

            this.popup.error(
              res.message || "Failed to delete Raw Material."
            );

          }

        },

        error: (err: any) => {

          console.log(err);

          this.popup.error(
            err.error?.message ||
            "Failed to delete Raw Material."
          );

        }

      });

  }).catch((err: any) => {

    console.log('Delete confirmation error:', err);

  });

}
}
