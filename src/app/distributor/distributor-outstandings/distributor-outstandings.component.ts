import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OutstandingViewComponent } from 'src/app/outstanding-view/outstanding-view.component';
import { CollectionsService } from 'src/app/Services/collections.service';

@Component({
  selector: 'app-distributor-outstandings',
  templateUrl: './distributor-outstandings.component.html',
  styleUrls: ['./distributor-outstandings.component.css']
})
export class DistributorOutstandingsComponent implements OnInit, AfterViewInit {

  // ==========================================
  // TABLE COLUMNS
  // ==========================================
  displayedColumns: string[] = [
    'sno',
    'party',
    'partyType',
    'totalOrders',
    'totalOrderAmount',
    'totalCollectedAmount',
    'totalOutstanding',
    'actions'
  ];


  // ==========================================
  // TABLE DATASOURCE
  // ==========================================
  dataSource = new MatTableDataSource<any>([]);


  // ==========================================
  // PAGINATION
  // ==========================================
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ==========================================
  // SORT
  // ==========================================
  @ViewChild(MatSort) sort!: MatSort;


  // ==========================================
  // LOADING
  // ==========================================
  isLoading = false;


  // ==========================================
  // TOTAL OUTSTANDING
  // ==========================================
  totalOutstanding = 0;

  totalParties = 0;


  constructor(
    private collectionsService: CollectionsService, private dialog: MatDialog
  ) { }


  // ==========================================
  // ON INIT
  // ==========================================
  ngOnInit(): void {

    this.getOutstanding();

  }


  // ==========================================
  // GET OUTSTANDING
  // ==========================================
  getOutstanding(): void {

    this.isLoading = true;

    this.collectionsService.getOutstanding().subscribe({

      next: (response: any) => {

        console.log('Outstanding Response:', response);


        if (response?.success) {

          // ==========================================
          // TOTALS
          // ==========================================
          this.totalOutstanding =
            Number(response.totalOutstanding || 0);

          this.totalParties =
            Number(response.totalParties || 0);


          // ==========================================
          // TABLE DATA
          // ==========================================
          this.dataSource.data =
            response.data || [];


          // ==========================================
          // FILTER
          // ==========================================
          this.dataSource.filterPredicate =
            (data: any, filter: string) => {

              const searchText = filter.toLowerCase().trim();

              const party = data.party || {};

              const partyName =
                party.shopName || '';

              const ownerName =
                party.ownerName || '';

              const mobile =
                party.mobile || '';

              const partyType =
                data.partyType || '';

              const totalOrders =
                data.totalOrders || '';

              const ordersText =
                (data.orders || [])
                  .map((order: any) =>
                    `${order.orderNumber || ''}
                     ${order.employee?.fullName || ''}
                     ${order.employee?.employeeCode || ''}`
                  )
                  .join(' ');


              const combinedText = `
                ${partyName}
                ${ownerName}
                ${mobile}
                ${partyType}
                ${totalOrders}
                ${ordersText}
              `.toLowerCase();


              return combinedText.includes(searchText);

            };


        } else {

          this.dataSource.data = [];

          this.totalOutstanding = 0;

          this.totalParties = 0;

        }


        this.isLoading = false;

      },

      error: (error) => {

        console.error(
          'Get Outstanding Error:',
          error
        );

        this.dataSource.data = [];

        this.totalOutstanding = 0;

        this.totalParties = 0;

        this.isLoading = false;

      }

    });

  }


  // ==========================================
  // AFTER VIEW INIT
  // ==========================================
  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;


    // ==========================================
    // CUSTOM SORTING
    // ==========================================
    this.dataSource.sortingDataAccessor =
      (item: any, property: string) => {

        switch (property) {

          case 'party':
            return item.party?.shopName || '';

          case 'partyType':
            return item.partyType || '';

          case 'totalOrders':
            return Number(item.totalOrders || 0);

          case 'totalOrderAmount':
            return Number(item.totalOrderAmount || 0);

          case 'totalCollectedAmount':
            return Number(item.totalCollectedAmount || 0);

          case 'totalOutstanding':
            return Number(item.totalOutstanding || 0);

          default:
            return item[property];

        }

      };

  }


  // ==========================================
  // SEARCH
  // ==========================================
  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // VIEW PARTY OUTSTANDING DETAILS
  // ==========================================
  viewOutstanding(element: any): void {

    const partyId = element?.party?._id;

    if (!partyId) {
      console.error('Party ID NOT FOUND');
      return;
    }


    this.dialog.open(OutstandingViewComponent, {

      width: '1100px',

      maxWidth: '95vw',

      maxHeight: '92vh',

      panelClass: 'outstanding-details-dialog',

      data: {
        partyId: partyId
      }

    });

  }

  // ==========================================
  // TRACK BY
  // ==========================================
  trackByParty(
    index: number,
    item: any
  ): string {

    return item.party?._id || index.toString();

  }

}
