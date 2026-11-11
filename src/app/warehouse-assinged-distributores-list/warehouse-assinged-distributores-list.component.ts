import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../Services/user.service';

interface Distributor {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  employeeCode: string;
  mobile: string;
  email: string;
  distributorName: string;
  shopName: string;
  status: string;
  assignmentType: string;
  warehouse: {
    _id: string;
    warehouseCode: string;
    warehouseName: string;
  } | null;
}

@Component({
  selector: 'app-warehouse-assinged-distributores-list',
  templateUrl: './warehouse-assinged-distributores-list.component.html',
  styleUrls: ['./warehouse-assinged-distributores-list.component.css']
})
export class WarehouseAssingedDistributoresListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sno',
    'distributorName',
    'shopName',
    'mobile',
    'email',
    'warehouse',
    'status'
  ];

  dataSource = new MatTableDataSource<Distributor>();

  distributors: Distributor[] = [];

  isLoading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.getDistributorsByWarehouse();

    // Search Filter
    this.dataSource.filterPredicate = (
      data: Distributor,
      filter: string
    ) => {

      const search = (
        (data.distributorName || '') + ' ' +
        (data.fullName || '') + ' ' +
        (data.shopName || '') + ' ' +
        (data.employeeCode || '') + ' ' +
        (data.mobile || '') + ' ' +
        (data.email || '') + ' ' +
        (data.status || '') + ' ' +
        (data.warehouse?.warehouseName || '') + ' ' +
        (data.warehouse?.warehouseCode || '')
      ).toLowerCase();

      return search.includes(filter);

    };

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

  }

  // ==================================
  // Get Warehouse Distributors
  // ==================================

  getDistributorsByWarehouse(): void {

    this.isLoading = true;

    this.userService
      .getDistributorsByWarehouse()
      .subscribe({

        next: (res: any) => {

          console.log('Warehouse Distributors:', res);

          this.distributors = res.data || [];

          this.dataSource.data = this.distributors;

          this.isLoading = false;

        },

        error: (err: any) => {

          console.error(
            'Get Warehouse Distributors Error:',
            err
          );

          this.distributors = [];

          this.dataSource.data = [];

          this.isLoading = false;

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
      filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


}
