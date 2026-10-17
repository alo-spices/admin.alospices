import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns:
    string[] = [
      'sno',
      'name',
      'phone',
      'email',
      'isVerified',
      'createdAt'
    ];

  dataSource =
    new MatTableDataSource<User>();

  users:
    User[] = [];

  totalUsers:
    number = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private userService:
      UserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getUsersCount();
  }

  /*
  GET ALL USERS
  */
  getAllUsers(): void {
    this.userService
      .getAllUsers()
      .subscribe({
        next: (
          response: any
        ) => {

          this.users =
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
  GET USERS COUNT
  */
  getUsersCount(): void {
    this.userService
      .getUsersCount()
      .subscribe({
        next: (
          response: any
        ) => {
          this.totalUsers =
            response.totalUsers;
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

   // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}