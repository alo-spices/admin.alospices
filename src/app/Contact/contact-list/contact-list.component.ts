import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from 'src/app/Models/contact';
import { ContctService } from 'src/app/Services/contct.service';
import { ContactViewComponent } from '../contact-view/contact-view.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent  implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sno',
    'fullName',
    'phoneNumber',
    'email',
    'subject',
    'message',
    'status',
    'createdAt',
    'actions'
  ];


  dataSource =
    new MatTableDataSource<Contact>([]);


  isLoading = false;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private contactService: ContctService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {

    this.getAllContacts();

  }


  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;


    this.dataSource.filterPredicate =
      (data: Contact, filter: string) => {

        const searchText =
          filter.toLowerCase();

        return (
          data.fullName
            ?.toLowerCase()
            .includes(searchText) ||

          data.phoneNumber
            ?.toLowerCase()
            .includes(searchText) ||

          data.email
            ?.toLowerCase()
            .includes(searchText) ||

          data.subject
            ?.toLowerCase()
            .includes(searchText) ||

          data.message
            ?.toLowerCase()
            .includes(searchText) ||

          data.status
            ?.toLowerCase()
            .includes(searchText)
        );

      };

  }


  /* =====================================================
     GET ALL CONTACTS
     ===================================================== */

  getAllContacts(): void {

    this.isLoading = true;


    this.contactService
      .getAllContacts()
      .subscribe({

        next: (response) => {

          this.isLoading = false;


          if (response.success) {

            this.dataSource.data =
              response.data || [];

          } else {

            this.dataSource.data = [];

          }

        },


        error: (error) => {

          this.isLoading = false;

          this.dataSource.data = [];

          console.error(
            'Get contacts error:',
            error
          );

        }

      });

  }


  /* =====================================================
     SEARCH
     ===================================================== */

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


  /* =====================================================
     SERIAL NUMBER
     ===================================================== */

  getSerialNumber(index: number): number {

    if (!this.paginator) {

      return index + 1;

    }


    return (
      this.paginator.pageIndex *
      this.paginator.pageSize +
      index +
      1
    );

  }


  /* =====================================================
     STATUS CLASS
     ===================================================== */

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


  /* =====================================================
     VIEW CONTACT
     ===================================================== */

  viewContact(element: any): void {

    console.log(
      'View Contact:',
      element
    );


    const id =
      element?._id;


    if (!id) {

      console.error(
        'Contact ID not found'
      );

      return;

    }


    this.dialog.open(
      ContactViewComponent,
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


  /* =====================================================
     REFRESH
     ===================================================== */

  refresh(): void {

    this.getAllContacts();

  }

}
