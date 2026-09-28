import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Banner } from 'src/app/Models/banner';
import { BannerService } from 'src/app/Services/banner.service';

@Component({
  selector: 'app-list-banner',
  templateUrl: './list-banner.component.html',
  styleUrls: ['./list-banner.component.css']
})
export class ListBannerComponent implements OnInit {

  displayedColumns:
    string[] = [
      'sno',
      'title',
      'image',
      'description',
      'actions'
    ];

  dataSource =
    new MatTableDataSource<Banner>();

  banners:
    Banner[] = [];

  selectedBanner:
    Banner | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private bannerService:
      BannerService,

    private router:
      Router,

    private dialog:
      MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllBanners();
  }

  /*
  GET ALL BANNERS
  */
  getAllBanners(): void {
    this.bannerService
      .getAllBanners()
      .subscribe({
        next: (
          response: any
        ) => {

          console.log(
            response
          );

          this.banners =
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
  EDIT BANNER
  */
  editBanner(
    element: any
  ) {
    this.router.navigate([
      '/admin/update-banner',
      element._id
    ]);
  }

  /*
  VIEW BANNER
  */
  viewBanner(
    banner: Banner
  ): void {
    this.selectedBanner =
      banner;
  }

  /*
  DELETE BANNER
  */
  deleteBanner(
    data: any
  ) {
    const dialogRef =
      this.dialog.open(
        DeleteConfirmationComponent,
        {
          width: '400px'
        }
      );

    dialogRef.afterClosed()
      .subscribe(
        result => {

        if (result) {

          this.bannerService
            .deleteBanner(
              data._id
            )
            .subscribe({

              next: () => {
                alert(
                  "Deleted successfully"
                );

                this.getAllBanners();
              },

              error: () => {
                alert(
                  "Delete failed"
                );
              }

            });
        }
      });
  }

  /*
  SEARCH FILTER
  */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}