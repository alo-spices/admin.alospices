import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Models/Category';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { ViewCategoryComponent } from 'src/app/View-dialog-Controllers/view-category/view-category.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sno',
    'name',
    'image',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<Category>();

  categories: Category[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(

    private categoryService: CategoryService,

    private router: Router,

    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.getAllCategories();

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.categoryName || '') +

        ' ' +

        (data.categoryCode || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();

      return search.includes(filter);

    };

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

  }

  // ==================================
  // Get All Categories
  // ==================================

  getAllCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.categories = res.data;

          this.dataSource.data = res.data;

        },

        error: (err: any) => {

          console.log(err);

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

  // ==================================
  // Create
  // ==================================

  goToCreateCategory(): void {

    this.router.navigate([
      '/admin/create-category'
    ]);

  }

  // ==================================
  // Edit
  // ==================================

  editCategory(category: Category): void {

    this.router.navigate([

      '/admin/update-category',

      category._id

    ]);

  }

  // ==================================
  // View
  // ==================================

  viewCategory(category: Category): void {

    this.dialog.open(

      ViewCategoryComponent,

      {

        width: '600px',

        data: category

      }

    );

  }

  // ==================================
  // Delete (Soft Delete)
  // ==================================

  deleteCategory(category: Category): void {

    const dialogRef = this.dialog.open(

      DeleteConfirmationComponent,

      {

        width: '400px'

      }

    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.categoryService
        .deleteCategory(category._id!)
        .subscribe({

          next: (res: any) => {

            alert(res.message);

            this.getAllCategories();

          },

          error: (err: any) => {

            console.log(err);

            alert(err.error.message);

          }

        });

    });

  }

}