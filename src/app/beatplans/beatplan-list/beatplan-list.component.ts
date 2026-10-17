import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BeatPlan } from 'src/app/Models/BeatPlan';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ViewBeatplansDetailsComponent } from '../view-beatplans-details/view-beatplans-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-beatplan-list',
  templateUrl: './beatplan-list.component.html',
  styleUrls: ['./beatplan-list.component.css']
})
export class BeatplanListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'beatName',

    'area',

    'salesman',

    // 'employeeCode',

    'day',

    'shops',

    'status',

  

    'actions'

  ];


  // ==========================================
  // Beat Plans
  // ==========================================

  beatPlans: BeatPlan[] = [];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<BeatPlan>();


  // ==========================================
  // Loading
  // ==========================================

  loading = false;


  // ==========================================
  // Error Message
  // ==========================================

  errorMessage = '';


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


  // ==========================================
  // Constructor
  // ==========================================

  constructor(

    private beatPlanService:
      BeatPlanService,

    private alertService:
      CommomPopupService,

    private router:
      Router,

    private dialog:
      MatDialog

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getBeatPlans();


    // ========================================
    // Search Filter
    // ========================================

    this.dataSource.filterPredicate = (

      data: BeatPlan,

      filter: string

    ) => {


      // ======================================
      // Area
      // ======================================

      const areaName =
        (data as any).area?.areaName || '';

      const areaCode =
        (data as any).area?.areaCode || '';


      // ======================================
      // Salesman
      // ======================================

      const salesman =
        (data as any).salesman?.fullName || '';

      const employeeCode =
        (data as any).salesman?.employeeCode || '';


      // ======================================
      // Shops
      // ======================================

      const shops =
        ((data as any).shops || [])

          .map((shop: any) =>
            shop.shopName ||
            shop.partyName ||
            ''
          )

          .join(' ');


      // ======================================
      // Search Text
      // ======================================

      const search = (

        (data as any).beatName || ''

        + ' ' +

        (data as any).description || ''

        + ' ' +

        areaName

        + ' ' +

        areaCode

        + ' ' +

        salesman

        + ' ' +

        employeeCode

        + ' ' +

        (data as any).day || ''

        + ' ' +

        (data as any).status || ''

        + ' ' +

        shops

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
// Get Shop Names
// ==========================================

getShopNames(shops: any[]): string {

  if (
    !shops ||
    shops.length === 0
  ) {

    return '';

  }


  const names =
    shops

      .map(
        (shop: any) =>
          shop.shopName ||
          shop.partyName ||
          ''
      )

      .filter(
        (name: string) =>
          !!name
      );


  // ========================================
  // Up to 2 Shop Names
  // ========================================

  if (
    names.length <= 2
  ) {

    return names.join(', ');

  }


  // ========================================
  // More Than 2
  // ========================================

  return (

    names
      .slice(0, 2)
      .join(', ') +

    ` +${names.length - 2} more`

  );

}

  // ==========================================
  // Get All Beat Plans
  // ==========================================

  getBeatPlans(): void {

    this.loading = true;

    this.errorMessage = '';


    this.beatPlanService

      .getBeatPlans()

      .subscribe({

        next: (response: any) => {

          console.log(
            'Beat Plan Response:',
            response
          );


          // ====================================
          // Success
          // ====================================

          if (response?.success) {

            this.beatPlans =
              response.data || [];

            this.dataSource.data =
              this.beatPlans;

          }


          // ====================================
          // Failed Response
          // ====================================

          else {

            this.beatPlans = [];

            this.dataSource.data = [];

            this.errorMessage =
              response?.message ||
              'Failed to load beat plans';

          }


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


          this.loading = false;

        },


        // ======================================
        // API Error
        // ======================================

        error: (error: any) => {

          console.error(
            'Beat Plan API Error:',
            error
          );


          this.loading = false;

          this.beatPlans = [];

          this.dataSource.data = [];


          this.errorMessage =
            error?.error?.message ||
            'Something went wrong while loading beat plans';


          this.alertService.error(
            this.errorMessage
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

    const filterValue = (

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
  // View Beat Plan
  // ==========================================

  viewBeatPlan(
    element: any
  ): void {

    console.log(
      'View Beat Plan:',
      element
    );


    const id =
      element?._id;


    if (!id) {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      return;

    }


    this.dialog.open(
      ViewBeatplansDetailsComponent,
      {

        width: '850px',

        maxWidth: '95vw',

        maxHeight: '90vh',

        data: {

          id: id

        }

      }

    );

  }


  // ==========================================
  // Edit Beat Plan
  // ==========================================

  editBeatPlan(
    element: any
  ): void {

    console.log(
      'Edit Beat Plan:',
      element
    );


    const id =
      element?._id;


    if (!id) {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/update-beatplans',

      id

    ]);

  }


  // ==========================================
  // Delete Beat Plan
  // ==========================================

  deleteBeatPlan(
    element: any
  ): void {

    console.log(
      'Delete Beat Plan:',
      element
    );


    const id =
      element?._id;


    if (!id) {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      return;

    }


    // ========================================
    // Confirm Delete
    // ========================================

    this.alertService

      .confirmDelete()

      .then((confirmed: any) => {


        if (!confirmed) {

          return;

        }


        this.loading = true;


        // ====================================
        // Delete API
        // ====================================

        this.beatPlanService

          .deleteBeatPlan(id)

          .subscribe({

            next: (response: any) => {

              this.loading = false;


              // ==============================
              // Success
              // ==============================

              if (response?.success) {

                this.alertService

                  .success(

                    response.message ||

                    'Beat Plan deleted successfully'

                  )

                  .then(() => {

                    // ==========================
                    // Refresh List
                    // ==========================

                    this.getBeatPlans();

                  });

              }


              // ==============================
              // Failed Response
              // ==============================

              else {

                this.alertService.error(

                  response?.message ||

                  'Failed to delete Beat Plan'

                );

              }

            },


            // ==================================
            // Delete API Error
            // ==================================

            error: (error: any) => {

              this.loading = false;


              console.error(

                'Delete Beat Plan Error:',

                error

              );


              this.alertService.error(

                error?.error?.message ||

                'Failed to delete Beat Plan'

              );

            }

          });

      });

  }

}