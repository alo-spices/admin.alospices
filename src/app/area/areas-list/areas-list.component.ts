import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'area',

    'location',

    'pincode',

    'salesManager',

    'salesmen',

    'status',

    'actions'

  ];


  // ==========================================
  // Areas
  // ==========================================

  areas: any[] = [];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // Paginator
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // Sort
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private areaService:
      AreasService,

    private router:
      Router,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllAreas();


    // ========================================
    // Search Filter
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const salesManager =
        data.salesManager?.fullName || '';


      const salesmen =
        (data.salesmen || [])
          .map(
            (salesman: any) =>
              salesman.fullName || ''
          )
          .join(' ');


      const search = (

        (data.areaName || '') +

        ' ' +

        (data.areaCode || '') +

        ' ' +

        (data.city || '') +

        ' ' +

        (data.district || '') +

        ' ' +

        (data.state || '') +

        ' ' +

        (data.pincode || '') +

        ' ' +

        (data.status || '') +

        ' ' +

        salesManager +

        ' ' +

        salesmen

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // ==========================================
  // After View Init
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;


    this.dataSource.sort =
      this.sort;

  }


  // ==========================================
  // Get All Areas
  // ==========================================

  getAllAreas(): void {

    this.areaService
      .getAllAreas()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Areas Response:',
            response
          );


          this.areas =
            response?.data || [];


          this.dataSource.data =
            this.areas;


          // ====================================
          // Reassign paginator
          // ====================================

          this.dataSource.paginator =
            this.paginator;


          // ====================================
          // Reassign sort
          // ====================================

          this.dataSource.sort =
            this.sort;

        },


        error: (error: any) => {

          console.log(
            'Get Areas Error:',
            error
          );


          this.areas = [];

          this.dataSource.data = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load areas'

          );

        }

      });

  }


  // ==========================================
  // Search
  // ==========================================

  applyFilter(
    event: Event
  ): void {

    const filterValue =
      (
        event.target as
        HTMLInputElement
      ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    // ========================================
    // First Page
    // ========================================

    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }

  }


  // ==========================================
  // Get Salesmen Names
  // ==========================================

  getSalesmenNames(
    salesmen: any[]
  ): string {

    if (
      !salesmen ||
      salesmen.length === 0
    ) {

      return '';

    }


    const names =
      salesmen

        .map(
          (salesman: any) =>
            salesman.fullName
        )

        .filter(
          (name: string) =>
            !!name
        );


    if (
      names.length <= 2
    ) {

      return names.join(', ');

    }


    return (

      names
        .slice(0, 2)
        .join(', ') +

      ` +${names.length - 2} more`

    );

  }




  // ==========================================
  // Edit Area
  // ==========================================

  // ==========================================
  // Edit Area
  // ==========================================

  editArea(
    area: any
  ): void {

    console.log(
      'Edit Area:',
      area
    );


    if (!area?._id) {

      this.alertService.error(
        'Area ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/update-area',

      area._id

    ]);

  }

  viewArea(
    area: any
  ): void {

    console.log(
      'View Area:',
      area
    );


    if (!area?._id) {

      this.alertService.error(
        'Area ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/view-area',

      area._id

    ]);

  }

}
