import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DistributorInquiry } from 'src/app/Models/DistributorInquiry';
import { DistributorInquiryService } from 'src/app/Services/distributor-inquiry.service';
import { DistributorInquiryDetailsComponent } from 'src/app/View-dialog-Controllers/distributor-inquiry-details/distributor-inquiry-details.component';

@Component({
  selector: 'app-distributor-inquiry-list',
  templateUrl: './distributor-inquiry-list.component.html',
  styleUrls: ['./distributor-inquiry-list.component.css']
})
export class DistributorInquiryListComponent  implements OnInit, AfterViewInit {


  // ================= TABLE COLUMNS =================

  displayedColumns: string[] = [

    'sno',
    'fullName',
    'phoneNumber',
    'location',
    'message',
    'status',
    'createdAt',
    'actions'

  ];


  // ================= DATA SOURCE =================

  dataSource =
    new MatTableDataSource<DistributorInquiry>([]);


  // ================= LOADING =================

  isLoading = false;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private distributorInquiryService:
      DistributorInquiryService,
       private dialog: MatDialog
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.getAllInquiries();

  }


  // =====================================================
  // AFTER VIEW INIT
  // =====================================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;


    // Custom sorting/filtering

    this.dataSource.filterPredicate =
      (data: DistributorInquiry, filter: string) => {

        const searchText =
          filter.toLowerCase();


        return (

          data.fullName
            ?.toLowerCase()
            .includes(searchText)

          ||

          data.phoneNumber
            ?.toLowerCase()
            .includes(searchText)

          ||

          data.location
            ?.toLowerCase()
            .includes(searchText)

          ||

          data.message
            ?.toLowerCase()
            .includes(searchText)

          ||

          data.status
            ?.toLowerCase()
            .includes(searchText)

        );

      };

  }


  // =====================================================
  // GET ALL INQUIRIES
  // =====================================================

  getAllInquiries(): void {

    this.isLoading = true;


    this.distributorInquiryService
      .getAllInquiries()
      .subscribe({

        next: (response) => {

          this.isLoading = false;


          if (response.success) {

            this.dataSource.data =
              response.data || [];

          }

          else {

            this.dataSource.data = [];

            console.error(
              response.message
            );

          }

        },


        error: (error) => {

          this.isLoading = false;

          this.dataSource.data = [];

          console.error(
            'Get inquiries error:',
            error
          );

        }

      });

  }


  // =====================================================
  // SEARCH
  // =====================================================

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


  // =====================================================
  // S.NO
  // =====================================================

  getSerialNumber(index: number): number {

    if (!this.paginator) {

      return index + 1;

    }


    return (

      this.paginator.pageIndex *
      this.paginator.pageSize
    ) + index + 1;

  }


  // =====================================================
  // STATUS CLASS
  // =====================================================

  getStatusClass(status: string): string {

    switch (status) {

      case 'New':
        return 'status-new';

      case 'Contacted':
        return 'status-contacted';

      case 'Closed':
        return 'status-closed';

      default:
        return '';

    }

  }


  // =====================================================
  // VIEW INQUIRY
  // =====================================================

 viewInquiry(element: any): void {

  console.log(
    'View Distributor Inquiry:',
    element
  );

  const id = element?._id;

  if (!id) {

    console.error(
      'Distributor Inquiry ID not found'
    );

    return;
  }

  this.dialog.open(
    DistributorInquiryDetailsComponent,
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


  // =====================================================
  // REFRESH
  // =====================================================

  refresh(): void {

    this.getAllInquiries();

  }
}