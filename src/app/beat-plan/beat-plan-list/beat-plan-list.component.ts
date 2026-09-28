import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-beat-plan-list',
  templateUrl: './beat-plan-list.component.html',
  styleUrls: ['./beat-plan-list.component.css']
})
export class BeatPlanListComponent implements OnInit, AfterViewInit {

  /* =========================================================
     TABLE
     ========================================================= */

  displayedColumns: string[] = [
    'sno',
    'beatName',
    'area',
    'route',
    'salesman',
    'day',
    'shops',
    // 'isCompleted',
    'status',
    'createdAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);


  /* =========================================================
     SEARCH
     ========================================================= */

  searchText: string = '';


  /* =========================================================
     VIEW CHILD
     ========================================================= */

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;


  /* =========================================================
     CONSTRUCTOR
     ========================================================= */

  constructor(
    private beatPlanService: BeatPlanService,
    private router: Router,
    private alertService: CommomPopupService
  ) { }


  /* =========================================================
     NG ON INIT
     ========================================================= */

  ngOnInit(): void {

    this.getAllBeatPlans();

    this.setupFilter();

  }

  applyFilter(event: Event): void {

    const filterValue = (
      event.target as HTMLInputElement
    ).value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  /* =========================================================
     AFTER VIEW INIT
     ========================================================= */

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  /* =========================================================
     GET ALL BEAT PLANS
     ========================================================= */

  getAllBeatPlans(): void {

    this.beatPlanService
      .getAllBeatPlans()
      .subscribe({

        next: (response: any) => {

          console.log(
            'GET ALL BEAT PLANS RESPONSE =>',
            response
          );

          if (
            response?.success &&
            Array.isArray(response?.data)
          ) {

            this.dataSource.data =
              response.data;

          } else {

            this.dataSource.data = [];

          }


          // Re-assign after API response
          if (this.paginator) {

            this.dataSource.paginator =
              this.paginator;

          }

          if (this.sort) {

            this.dataSource.sort =
              this.sort;

          }

        },

        error: (error: any) => {

          console.error(
            'GET ALL BEAT PLANS ERROR =>',
            error
          );

          this.dataSource.data = [];

          this.alertService.error(
            error?.error?.message ||
            'Failed to load beat plans'
          );

        }

      });

  }


  /* =========================================================
     SEARCH FILTER
     ========================================================= */

  setupFilter(): void {

    this.dataSource.filterPredicate =
      (data: any, filter: string): boolean => {

        const searchData = [

          data?.beatName,

          data?.description,

          data?.area?.areaName,

          data?.area?.areaCode,

          data?.route?.routeName,

          data?.route?.routeCode,

          data?.salesman?.fullName,

          data?.salesman?.employeeCode,

          data?.day,

          data?.status

        ];

        return searchData
          .join(' ')
          .toLowerCase()
          .includes(filter);

      };

  }


  /* =========================================================
     VIEW BEAT PLAN
     ========================================================= */

  viewBeatPlan(element: any): void {

    if (!element?._id) {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      return;

    }

    this.router.navigate([
      '/admin/beat-plan-update',
      element._id
    ], {
      queryParams: {
        mode: 'view'
      }
    });

  }


  /* =========================================================
     EDIT BEAT PLAN
     ========================================================= */

  editBeatPlan(element: any): void {

    if (!element?._id) {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      return;

    }

    this.router.navigate([
      '/admin/beat-plan-update',
      element._id
    ]);

  }

  /* =========================================================
     DELETE BEAT PLAN
     ========================================================= */
  deleteBeatPlan(element: any): void {

    if (!element?._id) {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      return;
    }

    this.alertService
      .confirmDelete()
      .then((confirmed: boolean) => {

        if (!confirmed) {
          return;
        }

        // DELETE API call ikkada
        console.log(
          'DELETE BEAT PLAN ID =>',
          element._id
        );

      });

  }

  /* =========================================================
     SHOP COUNT
     ========================================================= */

  getShopCount(element: any): number {

    return Array.isArray(element?.shops)
      ? element.shops.length
      : 0;

  }


  /* =========================================================
     SOURCE / DISPLAY HELPERS
     ========================================================= */

  getAreaName(element: any): string {

    return element?.area?.areaName || '-';

  }


  getRouteName(element: any): string {

    return element?.route?.routeName || 'No Route';

  }


  getSalesmanName(element: any): string {

    return element?.salesman?.fullName || '-';

  }


  getSalesmanInitial(element: any): string {

    const name =
      element?.salesman?.fullName || '';

    return name
      ? name.charAt(0).toUpperCase()
      : 'S';

  }

}
