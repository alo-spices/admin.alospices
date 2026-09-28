import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RoutesService } from 'src/app/Services/routes.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'route',

    'area',

    'salesManager',

    'salesmen',

    'distributor',

    'monthlySalesTarget',

    'monthlyCollectionTarget',

    'status',

    'actions'

  ];


  // ==========================================
  // Route List
  // ==========================================

  routeList: any[] = [];


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

    private routeService:
      RoutesService,

    private router:
      Router,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllRoutes();


    // ========================================
    // Search
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const salesManager =
        data.salesManager?.fullName || '';


      const distributor =
        data.distributor?.fullName || '';


      const salesmen =
        (data.salesmen || [])

          .map(
            (salesman: any) =>
              salesman.fullName || ''
          )

          .join(' ');


      const areaName =
        data.area?.areaName || '';


      const areaCode =
        data.area?.areaCode || '';


      const search = (

        (data.routeName || '') +

        ' ' +

        (data.routeCode || '') +

        ' ' +

        (data.description || '') +

        ' ' +

        areaName +

        ' ' +

        areaCode +

        ' ' +

        salesManager +

        ' ' +

        distributor +

        ' ' +

        salesmen +

        ' ' +

        (data.monthlySalesTarget || '') +

        ' ' +

        (data.monthlyCollectionTarget || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();


      return search.includes(
        filter
      );

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
  // Get All Routes
  // ==========================================

  getAllRoutes(): void {

    this.routeService
      .getAllRoutes()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Routes Response:',
            response
          );


          this.routeList =
            response?.data || [];


          this.dataSource.data =
            this.routeList;


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
            'Get Routes Error:',
            error
          );


          this.routeList = [];

          this.dataSource.data = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load routes'

          );

        }

      });

  }


  // ==========================================
  // Search Filter
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
    // Reset Page
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
  // View Route
  // ==========================================

  // ==========================================
  // View Route
  // ==========================================

  viewRoute(
    routeData: any
  ): void {

    console.log(
      'View Route:',
      routeData
    );


    if (!routeData?._id) {

      this.alertService.error(
        'Route ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/view-routes',

      routeData._id

    ]);

  }


  // ==========================================
  // Edit Route
  // ==========================================

  editRoute(
    routeData: any
  ): void {

    console.log(
      'Edit Route:',
      routeData
    );


    if (!routeData?._id) {

      this.alertService.error(
        'Route ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/update-route',

      routeData._id

    ]);

  }

}
