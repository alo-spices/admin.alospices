import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CollectionViewComponent } from 'src/app/collection-view/collection-view.component';
import { CollectionsService } from 'src/app/Services/collections.service';

@Component({
  selector: 'app-distributor-collections',
  templateUrl: './distributor-collections.component.html',
  styleUrls: ['./distributor-collections.component.css']
})
export class DistributorCollectionsComponent implements OnInit, AfterViewInit {


  // ==================================
  // Displayed Columns
  // ==================================

  displayedColumns: string[] = [

    'sno',

    'collection',

    'party',

    'salesman',

    'amount',

    'paymentMode',

    'outstanding',

    // 'status',

    'collectionDate',

    'actions'

  ];


  // ==================================
  // Data Source
  // ==================================

  dataSource =
    new MatTableDataSource<any>();


  collections: any[] = [];


  // ==================================
  // Paginator
  // ==================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==================================
  // Sort
  // ==================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // ==================================
  // Constructor
  // ==================================

  constructor(

    private collectionService:
      CollectionsService,
    private dialog: MatDialog

  ) { }


  // ==================================
  // On Init
  // ==================================

  ngOnInit(): void {

    this.getAllCollections();


    // ==================================
    // Search Filter
    // ==================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.collectionNumber || '') +

        ' ' +

        (data.party?.partyName || '') +

        ' ' +

        (data.party?.shopName || '') +

        ' ' +

        (data.party?.partyCode || '') +

        ' ' +

        (data.party?.mobile || '') +

        ' ' +

        (data.partyType || '') +

        ' ' +

        (data.employee?.fullName || '') +

        ' ' +

        (data.employee?.employeeCode || '') +

        ' ' +

        (data.paidAgainst || '') +

        ' ' +

        (data.paymentMode || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // ==================================
  // After View Init
  // ==================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==================================
  // Get All Collections
  // ==================================

  getAllCollections(): void {

    this.collectionService
      .getAllCollections()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Collections:',
            res
          );


          this.collections =
            res.data || [];


          this.dataSource.data =
            this.collections;

        },


        error: (err: any) => {

          console.log(
            'Get Collections Error:',
            err
          );

        }

      });

  }


  // ==================================
  // Search
  // ==================================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator
        .firstPage();

    }

  }


  // ==================================
  // View Collection
  // ==================================

  viewCollection(
    collection: any
  ): void {

    if (!collection?._id) {

      return;

    }


    this.collectionService
      .getCollectionById(collection._id)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Collection Details:',
            res
          );


          if (
            res?.success &&
            res?.data
          ) {

            this.dialog.open(
              CollectionViewComponent,
              {

                width: '950px',

                maxWidth: '95vw',

                maxHeight: '90vh',

                data: res.data,

                panelClass:
                  'view-collection-dialog'

              }

            );

          }

        },


        error: (err: any) => {

          console.log(
            'Get Collection By ID Error:',
            err
          );

        }

      });

  }

}


