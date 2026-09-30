import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { PartiesService } from 'src/app/Services/parties.service';
import { PartiesViewDetailsComponent } from '../parties-view-details/parties-view-details.component';

@Component({
  selector: 'app-parties-list',
  templateUrl: './parties-list.component.html',
  styleUrls: ['./parties-list.component.css']
})
export class PartiesListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'party',

    // 'shopName',

    'partyType',

    'mobile',

    // 'area',

    // 'route',

    'assignedSalesman',

    'city',

    'status',

    'createdAt',

    'actions'

  ];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>([]);


  // ==========================================
  // View Child
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  // ==========================================
  // Constructor
  // ==========================================

  constructor(

    private partyService:
      PartiesService,

    private router:
      Router,

    private alertService:
      CommomPopupService,
    private dialog: MatDialog

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllParties();

    this.setupFilter();

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
  // Get All Parties
  // ==========================================

  getAllParties(): void {

    this.partyService
      .getAllParties()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Parties Response:',
            response
          );


          this.dataSource.data =
            response?.data || [];


          // ====================================
          // Assign Paginator
          // ====================================

          if (this.paginator) {

            this.dataSource.paginator =
              this.paginator;

          }


          // ====================================
          // Assign Sort
          // ====================================

          if (this.sort) {

            this.dataSource.sort =
              this.sort;

          }

        },


        error: (error: any) => {

          console.log(
            'Get Parties Error:',
            error
          );


          this.dataSource.data = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load parties'

          );

        }

      });

  }


  // ==========================================
  // Search Filter
  // ==========================================

  setupFilter(): void {

    this.dataSource.filterPredicate =
      (data: any, filter: string): boolean => {

        const searchData = [

          // Party
          data?.partyName,

          data?.partyCode,

          data?.shopName,

          data?.ownerName,

          data?.partyType,

          data?.mobile,

          data?.alternateMobile,

          data?.whatsappNumber,

          data?.email,

          data?.gstNumber,

          data?.panNumber,

          data?.licenseNumber,

          // Area
          data?.area?.areaName,

          // Route
          data?.route?.routeName,

          // Salesman
          data?.assignedSalesman?.fullName,

          // Location
          data?.address,

          data?.city,

          data?.district,

          data?.state,

          data?.pincode,

          // Status
          data?.status

        ];


        return searchData
          .filter(value =>
            value !== null &&
            value !== undefined
          )
          .join(' ')
          .toLowerCase()
          .includes(filter);

      };

  }


  // ==========================================
  // Apply Filter
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue =
      (
        event.target as HTMLInputElement).value
        .trim()
        .toLowerCase();


    this.dataSource.filter =
      filterValue;


    // ========================================
    // Reset Pagination
    // ========================================

    if (this.dataSource.paginator) {

      this.dataSource.paginator
        .firstPage();

    }

  }


  // ==========================================
  // View Party
  // ==========================================

  viewParty(party: any): void {

    if (!party?._id) {
      console.error('Party ID not found');
      return;
    }

    this.partyService.getPartyById(party._id).subscribe({
      next: (response) => {

        console.log('Party Details:', response);

        if (response?.success && response?.data) {

          this.dialog.open(
            PartiesViewDetailsComponent,
            {
              width: '900px',
              maxWidth: '95vw',
              maxHeight: '90vh',
              panelClass: 'party-details-dialog',
              data: response.data
            }
          );

        } else {

          console.error('Party details not found');

        }
      },

      error: (error) => {

        console.error(
          'Get Party Details Error:',
          error
        );

      }
    });
  }

  // ==========================================
  // Edit Party
  // ==========================================

  editParty(element: any): void {

    if (!element?._id) {

      this.alertService.error(
        'Party ID not found'
      );

      return;

    }


    console.log(
      'Edit Party ID:',
      element._id
    );


    this.router.navigate([

      '/admin/update-parties',

      element._id

    ]);

  }


  // ==========================================
  // Delete Party
  // ==========================================

  deleteParty(element: any): void {

    if (!element?._id) {

      this.alertService.error(
        'Party ID not found'
      );

      return;

    }


    console.log(
      'Delete Party ID:',
      element._id
    );


    this.alertService
      .confirmDelete()
      .then((confirmed: boolean) => {


        // ====================================
        // Cancel
        // ====================================

        if (!confirmed) {

          return;

        }


        /*
         * Delete API route/service
         * ippudu manaki provide cheyyaledu.
         *
         * Delete API ichina tarvatha:
         *
         * this.partyService
         *   .deleteParty(element._id)
         *   .subscribe({
         *
         *     next: (response: any) => {
         *
         *       this.alertService
         *         .success(
         *           response?.message ||
         *           'Party deleted successfully'
         *         )
         *         .then(() => {
         *           this.getAllParties();
         *         });
         *
         *     },
         *
         *     error: (error: any) => {
         *
         *       this.alertService.error(
         *         error?.error?.message ||
         *         'Failed to delete party'
         *       );
         *
         *     }
         *
         *   });
         */


        console.log(
          'DELETE CONFIRMED:',
          element._id
        );

      });

  }


  // ==========================================
  // Get Party Type Class
  // ==========================================

  getPartyTypeClass(
    partyType: string
  ): string {

    if (
      partyType === 'Retailer'
    ) {

      return 'retailer-badge';

    }


    if (
      partyType === 'Wholesaler'
    ) {

      return 'wholesaler-badge';

    }


    return '';

  }


  // ==========================================
  // Get Status Class
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    if (
      status === 'Active'
    ) {

      return 'status-active';

    }


    return 'status-inactive';

  }


  // ==========================================
  // Area Name
  // ==========================================

  getAreaName(
    element: any
  ): string {

    return (
      element?.area?.areaName ||
      'No Area'
    );

  }


  // ==========================================
  // Route Name
  // ==========================================

  getRouteName(
    element: any
  ): string {

    return (
      element?.route?.routeName ||
      'No Route'
    );

  }


  // ==========================================
  // Salesman Name
  // ==========================================

  getSalesmanName(
    element: any
  ): string {

    return (
      element
        ?.assignedSalesman
        ?.fullName ||
      'Not Assigned'
    );

  }

}
