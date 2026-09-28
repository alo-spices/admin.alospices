import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { DeliveryService } from '../Services/delivery.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDeliveriesComponent } from '../view-deliveries/view-deliveries.component';

@Component({
  selector: 'app-deliveris-list',
  templateUrl: './deliveris-list.component.html',
  styleUrls: ['./deliveris-list.component.css']
})
export class DeliverisListComponent implements OnInit {


  // ==========================================
  // TABLE
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'deliveryNumber',

    'order',

    'party',

    'deliveryBoy',

    'sourceType',

    'deliveryStatus',

    'createdAt',

    'actions'

  ];


  dataSource =
    new MatTableDataSource<any>([]);


  // ==========================================
  // LOADING
  // ==========================================

  isLoading = false;


  // ==========================================
  // PAGINATION
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private deliveryService: DeliveryService,

    private alertService: CommomPopupService,

    private router: Router,
    private dialog: MatDialog

  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.setFilterPredicate();

    this.getAllDeliveries();


  }


  // ==========================================
  // GET ALL DELIVERIES
  // ==========================================

  getAllDeliveries(): void {

    this.isLoading = true;


    this.deliveryService
      .getAllDeliveries()
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;


          if (response?.success) {

            this.dataSource.data =
              response?.data || [];

          } else {

            this.dataSource.data = [];

          }


          /*
           * Pagination and sorting
           */

          setTimeout(() => {

            this.dataSource.paginator =
              this.paginator;

            this.dataSource.sort =
              this.sort;

          });

        },


        error: (error: any) => {

          this.isLoading = false;

          console.log(
            'Get Deliveries Error:',
            error
          );


          this.dataSource.data = [];


          this.alertService.error(

            error?.error?.message ||
            'Failed to load deliveries'

          );

        }

      });

  }


  // ==========================================
  // SEARCH / FILTER
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement)
        .value
        .trim()
        .toLowerCase();


    this.dataSource.filter =
      filterValue;


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // CUSTOM FILTER
  // ==========================================

  setFilterPredicate(): void {

    this.dataSource.filterPredicate =
      (data: any, filter: string): boolean => {

        const searchText = (

          data?.deliveryNumber ||

          data?.deliveryNo ||

          ''

        ) + ' ' + (

            data?.order?.orderNumber ||

            ''

          ) + ' ' + (

            data?.party?.partyName ||

            data?.party?.shopName ||

            data?.party?.fullName ||

            ''

          ) + ' ' + (

            data?.deliveryBoy?.fullName ||

            ''

          ) + ' ' + (

            data?.deliveryBoy?.employeeCode ||

            ''

          ) + ' ' + (

            data?.status ||

            ''

          ) + ' ' + (

            data?.sourceType ||

            ''

          ) + ' ' + (

            data?.sourceWarehouse?.warehouseName ||

            data?.sourceDistributor?.fullName ||

            data?.sourceDistributor?.shopName ||

            ''

          );


        return searchText
          .toLowerCase()
          .includes(filter);

      };

  }


  // ==========================================
  // VIEW DELIVERY
  // ==========================================

  viewDelivery(delivery: any): void {

    if (!delivery?._id) {
      return;
    }

    this.deliveryService
      .getDeliveryById(delivery._id)
      .subscribe({

        next: (response: any) => {

          if (response?.success && response?.data) {

            this.dialog.open(ViewDeliveriesComponent, {

              width: '950px',
              maxWidth: '95vw',
              maxHeight: '90vh',

              data: response.data,

              panelClass: 'view-delivery-dialog'

            });

          }

        },

        error: (error) => {

          console.error(
            'Get Delivery By ID Error:',
            error
          );

        }

      });

  }

  // ==========================================
  // GET DELIVERY BOY NAME
  // ==========================================

  getDeliveryBoyName(delivery: any): string {

    if (!delivery?.deliveryBoy) {

      return '-';

    }


    return (

      delivery.deliveryBoy.fullName ||

      `${delivery.deliveryBoy.firstName || ''} ${delivery.deliveryBoy.lastName || ''
        }`.trim() ||

      '-'

    );

  }


  // ==========================================
  // GET PARTY NAME
  // ==========================================

  getPartyName(delivery: any): string {

    if (!delivery?.party) {

      return '-';

    }


    return (

      delivery.party.partyName ||

      delivery.party.shopName ||

      delivery.party.fullName ||

      '-'

    );

  }


  // ==========================================
  // GET SOURCE NAME
  // ==========================================

  getSourceName(delivery: any): string {

    if (
      delivery?.sourceType === 'DISTRIBUTOR'
    ) {

      return (

        delivery?.sourceDistributor?.fullName ||

        delivery?.sourceDistributor?.shopName ||

        '-'

      );

    }


    return (

      delivery?.sourceWarehouse?.warehouseName ||

      '-'

    );

  }


  // ==========================================
  // STATUS CLASS
  // ==========================================

  getStatusClass(status: string): string {

    switch (status) {

      case 'Pending':
        return 'status-pending';

      case 'Assigned':
        return 'status-assigned';

      case 'InTransit':
        return 'status-in-transit';

      case 'Delivered':
        return 'status-delivered';

      case 'Cancelled':
        return 'status-cancelled';

      default:
        return 'status-default';

    }

  }


  // ==========================================
  // DATE FORMAT
  // ==========================================

  formatDate(date: any): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleDateString('en-IN');

  }

}
