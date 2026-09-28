import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { DeliveryService } from 'src/app/Services/delivery.service';
import { ViewDeliveriesComponent } from 'src/app/view-deliveries/view-deliveries.component';

@Component({
  selector: 'app-distributor-deliveries-list',
  templateUrl: './distributor-deliveries-list.component.html',
  styleUrls: ['./distributor-deliveries-list.component.css']
})
export class DistributorDeliveriesListComponent implements OnInit {

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'deliveryNumber',

    'order',

    'party',

    'deliveryBoy',

    'sourceType',

    'status',

    'createdAt',

    'actions'

  ];


  // ==========================================
  // DATA SOURCE
  // ==========================================

  dataSource =
    new MatTableDataSource<any>([]);


  // ==========================================
  // LOADING
  // ==========================================

  isLoading = false;


  // ==========================================
  // PAGINATION / SORT
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

    this.getAllDeliveries();

  }


  // ==========================================
  // GET DISTRIBUTOR DELIVERIES
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


          // ====================================
          // PAGINATION / SORT
          // ====================================

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
            'Get Distributor Deliveries Error:',
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
  // FILTER
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
  // ORDER NUMBER
  // ==========================================

  getOrderNumber(element: any): string {

    return element?.order?.orderNumber || '-';

  }


  // ==========================================
  // PARTY NAME
  // ==========================================

  getPartyName(element: any): string {

    return (

      element?.party?.shopName ||

      element?.party?.partyName ||

      '-'

    );

  }


  // ==========================================
  // DELIVERY BOY
  // ==========================================

  getDeliveryBoyName(element: any): string {

    return (

      element?.deliveryBoy?.fullName ||

      '-'

    );

  }


  // ==========================================
  // SOURCE TYPE
  // ==========================================

  getSourceName(element: any): string {

    if (!element?.sourceType) {

      return '-';

    }


    switch (element.sourceType) {

      case 'DISTRIBUTOR':

        return (
          element?.sourceDistributor?.distributorName ||
          element?.sourceDistributor?.fullName ||
          'Distributor'
        );


      case 'WAREHOUSE':

        return (
          element?.sourceWarehouse?.warehouseName ||
          'Warehouse'
        );


      default:

        return element.sourceType;

    }

  }


  // ==========================================
  // STATUS
  // ==========================================

  getStatus(element: any): string {

    return (
      element?.deliveryStatus ||
      '-'
    );

  }


  // ==========================================
  // ORDER STATUS
  // ==========================================

  getOrderStatus(element: any): string {

    return (
      element?.order?.orderStatus ||
      '-'
    );

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


}
