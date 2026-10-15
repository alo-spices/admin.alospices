import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';

@Component({
  selector: 'app-rawmaterial-update',
  templateUrl: './rawmaterial-update.component.html',
  styleUrls: ['./rawmaterial-update.component.css']
})
export class RawmaterialUpdateComponent implements OnInit {

  rawMaterialForm!: FormGroup;
  brandList: any[] = [];

  categoryList: any[] = [];
  rawMaterialId = '';

  loading = false;
  submitting = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rawMaterialService: RawMaterialService,
    private popup: CommomPopupService,
    private brandService: BrandService,

    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getBrands();

    this.getCategories();
    this.rawMaterialId =
      this.route.snapshot.paramMap.get('id') || '';

    if (this.rawMaterialId) {
      this.getRawMaterialById();
    } else {
      this.errorMessage = 'Raw Material ID not found.';
    }
  }

  // Initialize Reactive Form
  initializeForm(): void {
    this.rawMaterialForm = this.fb.group({
      rawMaterialName: ['', Validators.required],
      rawMaterialCode: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      hsnCode: [''],
      gstPercentage: [0],
      unit: ['KG', Validators.required],
      description: [''],
      status: ['Active', Validators.required]
    });
  }


  // ==========================================
  // GET BRANDS
  // ==========================================

  getBrands() {

    this.brandService
      .getAllBrands()
      .subscribe({

        next: (res: any) => {

          if (res.success) {

            this.brandList = res.data;

          }

        },

        error: (err: any) => {

          console.log(err);

          this.popup.error(

            err.error?.message ||

            "Failed to load Brands."

          );

        }

      });

  }

  // ==========================================
  // GET CATEGORIES
  // ==========================================

  getCategories() {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          if (res.success) {

            this.categoryList = res.data;

          }

        },

        error: (err: any) => {

          console.log(err);

          this.popup.error(

            err.error?.message ||

            "Failed to load Categories."

          );

        }

      });

  }


  // Get Raw Material By ID
  getRawMaterialById(): void {
    this.loading = true;
    this.errorMessage = '';

    this.rawMaterialService
      .getRawMaterialById(this.rawMaterialId)
      .subscribe({
        next: (response: any) => {
          this.loading = false;

          if (response?.success && response?.data) {
            const data = response.data;

            this.rawMaterialForm.patchValue({
              rawMaterialName: data.rawMaterialName || '',
              rawMaterialCode: data.rawMaterialCode || '',

              // API returns populated objects
              brand: data.brand?._id || data.brand || '',
              category: data.category?._id || data.category || '',

              hsnCode: data.hsnCode || '',
              gstPercentage: data.gstPercentage ?? 0,
              unit: data.unit || 'KG',
              description: data.description || '',
              status: data.status || 'Active'
            });
          } else {
            this.errorMessage =
              response?.message || 'Raw Material not found.';
          }
        },

        error: (error: any) => {
          this.loading = false;

          console.error('Get Raw Material Error:', error);

          this.errorMessage =
            error?.error?.message ||
            'Failed to load Raw Material.';
        }
      });
  }

  // Update Raw Material
  updateRawMaterial(): void {

    if (this.rawMaterialForm.invalid) {
      this.rawMaterialForm.markAllAsTouched();
      return;
    }

    if (!this.rawMaterialId) {
      this.errorMessage = 'Raw Material ID not found.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.rawMaterialForm.getRawValue();

    const payload = {
      rawMaterialName: formValue.rawMaterialName.trim(),
      rawMaterialCode: formValue.rawMaterialCode.trim().toUpperCase(),
      brand: formValue.brand,
      category: formValue.category,
      hsnCode: formValue.hsnCode,
      gstPercentage: formValue.gstPercentage,
      unit: formValue.unit,
      description: formValue.description,
      status: formValue.status
    };

    this.rawMaterialService
      .updateRawMaterial(this.rawMaterialId, payload)
      .subscribe({
        next: (response: any) => {
          this.submitting = false;

          if (response?.success) {

            this.popup.success(response.message).then(() => {

              this.router.navigate(['/admin/rawmaterial-list']);

            });
          } else {
            this.errorMessage =
              response?.message ||
              'Failed to update Raw Material.';
          }
        },

        error: (error: any) => {
          this.submitting = false;

          console.error('Update Raw Material Error:', error);

          this.errorMessage =
            error?.error?.message ||
            'Failed to update Raw Material.';
        }
      });
  }

  // Cancel / Back
  goBack(): void {
    this.router.navigate(['/admin/rawmaterial-list']);
  }

  resetForm(): void {

    this.router.navigate([
      '/admin/rawmaterial-list'
    ]);

  }


}
