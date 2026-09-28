import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Category } from '../Models/Category';
import { CategoryService } from '../Services/category.service';
import { ViewCategoryComponent } from '../View-dialog-Controllers/view-category/view-category.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'name', 'image', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  categories: Category[] = [];
  selectedCategory: Category | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService, private router: Router, private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  // Controller method
  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        this.categories = response.data;
        this.dataSource.data = response.data;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  goToCreateCategory() {
    this.router.navigate([
      '/create-category'
    ]);
  }


  viewCategory(
    category: Category
  ): void {

    this.dialog.open(
      ViewCategoryComponent,
      {
        width: '500px',
        data: category
      }
    );
  }


  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
