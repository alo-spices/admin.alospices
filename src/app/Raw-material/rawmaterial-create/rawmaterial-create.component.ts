import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';

@Component({
  selector: 'app-rawmaterial-create',
  templateUrl: './rawmaterial-create.component.html',
  styleUrls: ['./rawmaterial-create.component.css']
})
export class RawmaterialCreateComponent implements OnInit {

  // ==========================================
  // Form
  // ==========================================

  rawMaterialForm!: FormGroup;

  // ==========================================
  // Dropdown Lists
  // ==========================================

  brandList: any[] = [];

  categoryList: any[] = [];

  loading = false;

  constructor(

    private fb: FormBuilder,

    private brandService: BrandService,

    private categoryService: CategoryService,

    private rawMaterialService: RawMaterialService,

    private popup: CommomPopupService,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.getBrands();

    this.getCategories();

  }

  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm() {

    this.rawMaterialForm = this.fb.group({

      rawMaterialName: [

        '',

        Validators.required

      ],

      rawMaterialCode: [

        '',

        Validators.required

      ],

      brand: [

        '',

        Validators.required

      ],

      category: [

        '',

        Validators.required

      ],

      hsnCode: [''],

      gstPercentage: [

        5

      ],

      unit: [

        'KG',

        Validators.required

      ],

      description: [''],

      status: [

        'Active'

      ]

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

  // ==========================================
  // RESET FORM
  // ==========================================


  resetForm(): void {

    this.router.navigate([
      '/admin/rawmaterial-list'
    ]);

  }
  // ==========================================
  // CREATE RAW MATERIAL
  // ==========================================

  createRawMaterial(): void {

    if (this.rawMaterialForm.invalid) {

      this.rawMaterialForm.markAllAsTouched();

      this.popup.validation(
        "Please fill all required fields."
      );

      return;
    }

    this.loading = true;

    this.rawMaterialService
      .createRawMaterial(this.rawMaterialForm.value)
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          if (res.success) {

            this.popup.success(res.message).then(() => {

              this.router.navigate(['/admin/rawmaterial-list']);

            });

          }

        },

        error: (err: any) => {

          this.loading = false;

          this.popup.error(
            err.error?.message || "Failed to create Raw Material."
          );

        }

      });

  }
  goBack(): void {

    this.router.navigate([
      '/admin/rawmaterial-list'
    ]);

  }
}
