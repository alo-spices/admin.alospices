import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  brandList: any[] = [];

  imagePreview: string | ArrayBuffer | null = null;

  selectedFile: File | null = null;

  categoryId!: string;


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private alertService: CommomPopupService
  ) { }


  ngOnInit(): void {

    this.categoryId =
      this.route.snapshot.paramMap.get('id') || '';


    this.categoryForm = this.fb.group({

      categoryName: ['', Validators.required],

      categoryCode: ['', Validators.required],

      brand: [''],

      description: [''],

      // displayOrder: [''],

      status: ['Active', Validators.required]

    });


    this.getCategoryById();

    this.getAllBrands();

  }


  // ==========================================
  // Get Category By Id
  // ==========================================

  getCategoryById(): void {

    this.categoryService
      .getCategoryById(this.categoryId)
      .subscribe({

        next: (res: any) => {

          const data = res.data || res;


          this.categoryForm.patchValue({

            categoryName: data.categoryName,

            categoryCode: data.categoryCode,

            brand:
              data.brand?._id ||
              data.brand ||
              '',

            description: data.description,

            // displayOrder: data.displayOrder,

            status: data.status

          });


          if (data.image) {

            this.imagePreview = data.image;

          }

        },


        error: (err: any) => {

          console.log(err);

          this.alertService.error(

            err?.error?.message ||

            'Failed to load category.'

          );

        }

      });

  }


  // ==========================================
  // File Change
  // ==========================================

  onFileChange(event: any): void {

    const file =
      event.target.files[0];


    if (file) {

      this.selectedFile = file;


      const reader =
        new FileReader();


      reader.onload = () => {

        this.imagePreview =
          reader.result;

      };


      reader.readAsDataURL(file);

    }

  }


  // ==========================================
  // Get All Brands
  // ==========================================

  getAllBrands(): void {

    this.brandService
      .getAllBrands()
      .subscribe({

        next: (response: any) => {

          this.brandList =
            response.data ||
            response.brands ||
            [];

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
  // Update Category
  // ==========================================

  onUpdate(): void {

    if (this.categoryForm.invalid) {

      this.categoryForm.markAllAsTouched();


      this.alertService.validation(

        'Please fill all required fields.'

      );

      return;

    }


    const formData =
      new FormData();


    formData.append(

      'categoryName',

      this.categoryForm.value.categoryName

    );


    formData.append(

      'categoryCode',

      this.categoryForm.value.categoryCode

    );


    formData.append(

      'brand',

      this.categoryForm.value.brand || ''

    );


    formData.append(

      'description',

      this.categoryForm.value.description || ''

    );


    // formData.append(

    //   'displayOrder',

    //   this.categoryForm.value.displayOrder || ''

    // );


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


    this.categoryService
      .updateCategory(
        this.categoryId,
        formData
      )
      .subscribe({

        next: (res: any) => {

          this.alertService

            .success(

              res.message ||

              'Category Updated Successfully'

            )

            .then(() => {

              this.router.navigate([

                '/admin/category'

              ]);

            });

        },


        error: (err: any) => {

          console.log(err);

          this.alertService.error(

            err?.error?.message ||

            'Failed to update category.'

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