import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from '../Services/address.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from '../Models/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  
displayedColumns: string[] = [
  'sno',
  'fullName',
  'phone',
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'pincode',
  'country',
  'isDefault',
  'createdAt'
];

  dataSource =
    new MatTableDataSource<Address>();

  addresses:
    Address[] = [];

  selectedAddress:
    Address | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private addressService:
      AddressService
  ) {}

  ngOnInit(): void {
    this.getAllAddresses();
  }

  /*
  GET ALL ADDRESSES
  */
  getAllAddresses(): void {
    this.addressService
      .getAllAddresses()
      .subscribe({
        next: (
          response: any
        ) => {

          console.log(
            response
          );

          this.addresses =
            response.data;

          this.dataSource.data =
            response.data;

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;
        },

        error: (
          error
        ) => {
          console.error(
            error
          );
        }
      });
  }

  /*
  VIEW ADDRESS
  */
  viewAddress(
    address: Address
  ): void {
    this.selectedAddress =
      address;
  }

  /*
  SEARCH FILTER
  */
  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}