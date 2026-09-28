import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BeatPlanService } from '../Services/beat-plan.service';
import { CommomPopupService } from '../Services/commom-popup.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-boy-beat-plan-list',
  templateUrl: './delivery-boy-beat-plan-list.component.html',
  styleUrls: ['./delivery-boy-beat-plan-list.component.css']
})
export class DeliveryBoyBeatPlanListComponent implements OnInit {

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'name',

    'salesman',

    'deliveryBoy',

    'area',

    'route',

    'day',

    'shops',

    'status',

    'actions'

  ];


  // ==========================================
  // DATA SOURCE
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // BEAT PLANS
  // ==========================================

  beatPlans: any[] = [];


  // ==========================================
  // PAGINATOR
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // SORT
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private beatPlanService: BeatPlanService,

    private router: Router,

    private dialog: MatDialog,

    private alertService: CommomPopupService

  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.getDeliveryBoyBeatPlans();


    // ========================================
    // SEARCH FILTER
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.beatName || '') +

        ' ' +

        (data.day || '') +

        ' ' +

        (data.area?.areaName || '') +

        ' ' +

        (data.area?.areaCode || '') +

        ' ' +

        (data.route?.routeName || '') +

        ' ' +

        (data.route?.routeCode || '') +

        ' ' +

        (data.salesman?.fullName || '') +

        ' ' +

        (data.salesman?.employeeCode || '') +

        ' ' +

        (data.deliveryBoy?.fullName || '') +

        ' ' +

        (data.deliveryBoy?.employeeCode || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // ==========================================
  // AFTER VIEW INIT
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==========================================
  // GET DELIVERY BOY BEAT PLANS
  // ==========================================

  getDeliveryBoyBeatPlans(): void {

    this.beatPlanService
      .getDeliveryBoyBeatPlans()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Delivery Boy Beat Plans:',
            res
          );


          this.beatPlans =
            res?.data || [];


          /*
           * Extra safety:
           *
           * deliveryBoy null unna records
           * frontend lo kuda show cheyyakudadhu.
           */

          this.beatPlans =
            this.beatPlans.filter(
              (item: any) =>
                item?.deliveryBoy
            );


          this.dataSource.data =
            this.beatPlans;

        },


        error: (err: any) => {

          console.log(
            'Get Delivery Boy Beat Plans Error:',
            err
          );


          this.beatPlans = [];

          this.dataSource.data = [];


          this.alertService.error(

            err?.error?.message ||

            'Failed to load Delivery Boy Beat Plans'

          );

        }

      });

  }


  // ==========================================
  // SEARCH
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;


    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource
        .paginator
        .firstPage();

    }

  }


  // ==========================================
  // SHOP COUNT
  // ==========================================

  getShopCount(beatPlan: any): number {

    return beatPlan?.shops?.length || 0;

  }


  // ==========================================
  // VIEW
  // ==========================================

  viewBeatPlan(beatPlan: any): void {

    console.log(
      'View Beat Plan:',
      beatPlan
    );

    // Later dialog/navigation
    // this.dialog.open(...);

  }


  // ==========================================
  // EDIT
  // ==========================================

  editBeatPlan(data: any): void {
    console.log(data);
    if (!data) {
      return;
    }

    this.router.navigate(
      ['/admin/delivery-boy-beat-plan-update', data._id]
    );
  }
}
