import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductionService } from 'src/app/Services/production.service';
import { Production } from '../../Models/Production';
import { ViewProductionsComponent } from 'src/app/View-dialog-Controllers/view-productions/view-productions.component';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-poduction-list',
  templateUrl: './poduction-list.component.html',
  styleUrls: ['./poduction-list.component.css']
})
export class PoductionListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [

    'sno',

    'productionNo',

    'warehouse',

    'rawMaterial',

    'finishedProduct',

    // 'rawWeight',

    'producedWeight',

    // 'waste',

    'status',

    'actions'

  ];

  dataSource = new MatTableDataSource<Production>();

  productionList: Production[] = [];

  @ViewChild(MatPaginator)

  paginator!: MatPaginator;

  @ViewChild(MatSort)

  sort!: MatSort;

  constructor(

    private productionService: ProductionService,

    private router: Router,

    private dialog: MatDialog,

    private popup: CommomPopupService,


  ) { }

  ngOnInit(): void {

    this.getAllProductions();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

  }

  // ======================================
  // GET ALL
  // ======================================

  getAllProductions() {

    this.productionService

      .getAllProductions()

      .subscribe({

        next: (res: any) => {

          if (res.success) {

            this.productionList = res.data;

            this.dataSource.data = this.productionList;

          }

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ======================================
  // SEARCH
  // ======================================

  applyFilter(event: Event) {

    const filterValue =

      (event.target as HTMLInputElement)

        .value;

    this.dataSource.filter =

      filterValue

        .trim()

        .toLowerCase();

  }

  // ======================================
  // VIEW
  // ======================================

  viewProduction(production: Production): void {

    this.dialog.open(

      ViewProductionsComponent,

      {

        width: '850px',

        data: production

      }

    );

  }

  // ======================================
  // EDIT
  // ======================================

  editProduction(production: Production) {

    this.router.navigate(

      [

        '/admin/update-production',

        production._id

      ]

    );

  }

  

// ==================================
// Delete (Soft Delete)
// ==================================

deleteProduction(production: Production): void {

  const dialogRef = this.dialog.open(

    DeleteConfirmationComponent,

    {
      width: '400px'
    }

  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    this.productionService

      .deleteProduction(production._id!)

      .subscribe({

        next: (res: any) => {

          alert(res.message);

          this.getAllProductions();

        },

        error: (err: any) => {

          console.log(err);

          alert(
            err.error?.message ||
            'Failed to delete production.'
          );

        }

      });

  });

}

}