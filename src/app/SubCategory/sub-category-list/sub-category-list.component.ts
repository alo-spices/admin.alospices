import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { ViewSubCategoryComponent } from 'src/app/View-dialog-Controllers/view-sub-category/view-sub-category.component';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  displayedColumns: string[] = [
    'sno',
    'name',
    'category',
    'image',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 
 

  constructor(private Subcategoryservice: SubcategoryService,private router: Router,private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllSubCategories();
  }

  getAllSubCategories() {
    this.Subcategoryservice.getAllSubCategories()
      .subscribe((res: any) => {

        this.dataSource.data = res.data;

        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewSubCategory(
  subCategory: any
): void {

  this.dialog.open(
    ViewSubCategoryComponent,
    {
      width: '500px',
      data: subCategory
    }
  );
}

 
editSubCategory(element: any) {
  this.router.navigate([
    '/admin/update-subcategory',
    element._id
  ]);
}

deleteSubCategory(data: any) {

  const dialogRef =
    this.dialog.open(
DeleteConfirmationComponent,      {
        width: '400px'
      }
    );

  dialogRef.afterClosed()
    .subscribe((result: any) => {

      if (result) {

        this.Subcategoryservice
          .deleteSubCategory(data._id)
          .subscribe({

            next: () => {
              alert("Deleted successfully");
              this.getAllSubCategories();
            },

            error: () => {
              alert("Delete failed");
            }

          });
      }

    });
}
}
