import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css']
})
export class CreateSubcategoryComponent implements OnInit {

  subCategoryForm!: FormGroup;

  categories: any[] = [];

  selectedFile: File | null = null;

  imagePreview: any = null;

  constructor(
    private fb: FormBuilder,
    private subService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.subCategoryForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      isActive: [true]
    });

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories()
      .subscribe((res: any) => {
        this.categories = res.data;
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {

    if (this.subCategoryForm.invalid) return;

    const formData = new FormData();

    formData.append('name', this.subCategoryForm.value.name);
    formData.append('category', this.subCategoryForm.value.category);
    formData.append('isActive', this.subCategoryForm.value.isActive);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.subService.createSubCategory(formData)
      .subscribe({
        next: () => {
          alert("SubCategory created successfully");

          this.router.navigate(['/admin/subcategory']);
        },
        error: () => {
          alert("Failed to create");
        }
      });
  }

  goBack() {
    this.router.navigate(['/admin/subcategory']);
  }
}
