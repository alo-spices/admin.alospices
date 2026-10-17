import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  isSaving: boolean = false;

  categoryForm!: FormGroup;

  brandList: any[] = [];

  selectedFile!: File;

  imagePreview: any = null;

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private alertService: CommomPopupService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.getAllBrands();

  }

  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.categoryForm = this.fb.group({

      categoryName: [
        '',
        Validators.required
      ],

      categoryCode: [
        '',
        Validators.required
      ],

      description: [
        ''
      ],

      brand: [
        '',
        Validators.required
      ],

      displayOrder: [
        0
      ],

      status: [
        'Active'
      ],

      image: [
        null
      ]

    });

  }

  // ==========================================
  // Get All Brands
  // ==========================================

  getAllBrands(): void {

    this.brandService.getAllBrands().subscribe({

      next: (response: any) => {

        this.brandList = response.data || response.brands || [];

      },

      error: (error) => {

        console.log(error);

        this.alertService.error(
          'Failed to load brands'
        );

      }

    });

  }

  // ==========================================
  // File Change
  // ==========================================

  onFileChange(event: any): void {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      this.categoryForm.patchValue({

        image: this.selectedFile

      });

      this.categoryForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();

      reader.onload = () => {

        this.imagePreview = reader.result;

      };

      reader.readAsDataURL(this.selectedFile);

    }

  }

  // ==========================================
  // Submit
  // ==========================================

 
onSubmit(): void {

  this.isSubmitted = true;
  this.categoryForm.markAllAsTouched();

  if (this.categoryForm.invalid) {
    this.isSaving = false;

    this.alertService.validation(
      'Please fill all required fields'
    );

    return;
  }

  // Prevent duplicate submissions
  if (this.isSaving) {
    return;
  }

  this.isSaving = true;

  const formData = new FormData();

  formData.append(
    'categoryName',
    this.categoryForm.value.categoryName
  );

  formData.append(
    'categoryCode',
    this.categoryForm.value.categoryCode
  );

  formData.append(
    'description',
    this.categoryForm.value.description
  );

  formData.append(
    'brand',
    this.categoryForm.value.brand
  );

  formData.append(
    'displayOrder',
    this.categoryForm.value.displayOrder
  );

  formData.append(
    'status',
    this.categoryForm.value.status
  );

  if (this.selectedFile) {
    formData.append(
      'image',
      this.selectedFile
    );
  }

  this.categoryService.createCategory(formData).subscribe({

    next: (response: any) => {

      this.isSaving = false;

      this.alertService.success(
        response.message || 'Category Created Successfully'
      );

      this.router.navigate([
        '/admin/category'
      ]);

    },

    error: (error) => {

      this.isSaving = false;

      console.log(error);

      this.alertService.error(
        error.error?.message || 'Something went wrong'
      );

    }

  });

}


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/category'
    ]);

  }
}