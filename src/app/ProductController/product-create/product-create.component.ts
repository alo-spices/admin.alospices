import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/Services/banner.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  brandList: any[] = [];

  categoryList: any[] = [];

  rawMaterialList: any[] = [];


  // ==========================================
  // VARIANT IMAGES
  // ==========================================

  variantImages: (File | null)[] = [];

  variantGallery: File[][] = [];

  variantImagePreview: string[] = [];

  variantGalleryPreview: string[][] = [];


  constructor(

    private fb: FormBuilder,

    private productService: ProductService,

    private brandService: BrandService,

    private categoryService: CategoryService,

    private rawMaterialService: RawMaterialService,
    private alertService: CommomPopupService,

    private router: Router

  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getBrands();

    this.getCategories();

    this.getRawMaterials();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.productForm = this.fb.group({

      productName: [
        '',
        Validators.required
      ],

      productCode: [
        '',
        Validators.required
      ],

      rawMaterial: [
        '',
        Validators.required
      ],

      shortDescription: [
        ''
      ],

      description: [
        ''
      ],

      brand: [
        '',
        Validators.required
      ],

      category: [
        '',
        Validators.required
      ],

      hsnCode: [
        ''
      ],

      gstPercentage: [
        5
      ],

      productType: [
        'Regular'
      ],

      displayOrder: [
        0
      ],

      featuredProduct: [
        false
      ],

      variants: this.fb.array([

        this.createVariant()

      ])

    });


    // Initialize first variant image arrays

    this.variantImages = [
      null
    ];

    this.variantGallery = [
      []
    ];

    this.variantImagePreview = [
      ''
    ];

    this.variantGalleryPreview = [
      []
    ];

  }


  // ==========================================
  // CREATE VARIANT
  // ==========================================

  createVariant(): FormGroup {

    return this.fb.group({

      packSize: [
        '',
        Validators.required
      ],
      stock: [0],
      skuCode: [
        '',
        Validators.required
      ],

     mrp: [null, [Validators.required, Validators.min(0)]],
      weightInGrams: [5],
      gstPercentage: [
        5
      ],

      status: [
        'Active'
      ]

    });

  }


  // ==========================================
  // VARIANT GETTER
  // ==========================================

  get variants(): FormArray {

    return this.productForm.get(
      'variants'
    ) as FormArray;

  }


  // ==========================================
  // GET BRANDS
  // ==========================================

  getBrands(): void {

    this.brandService
      .getAllBrands()
      .subscribe({

        next: (res: any) => {

          this.brandList =
            res?.data || [];

        },

        error: (err) => {

          console.error(
            'Get Brands Error:',
            err
          );

        }

      });

  }


  // ==========================================
  // GET CATEGORIES
  // ==========================================

  getCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          this.categoryList =
            res?.data || [];

        },

        error: (err) => {

          console.error(
            'Get Categories Error:',
            err
          );

        }

      });

  }


  // ==========================================
  // GET RAW MATERIALS
  // ==========================================

  getRawMaterials(): void {

    this.rawMaterialService
      .getAllRawMaterials()
      .subscribe({

        next: (res: any) => {

          if (res?.success) {

            this.rawMaterialList =
              res.data || [];

          }

        },

        error: (err) => {

          console.error(
            'Get Raw Materials Error:',
            err
          );

        }

      });

  }


  // ==========================================
  // ADD VARIANT
  // ==========================================

  addVariant(): void {

    this.variants.push(
      this.createVariant()
    );


    this.variantImages.push(
      null
    );


    this.variantGallery.push(
      []
    );


    this.variantImagePreview.push(
      ''
    );


    this.variantGalleryPreview.push(
      []
    );

  }


  // ==========================================
  // REMOVE VARIANT
  // ==========================================

  removeVariant(index: number): void {

    if (this.variants.length <= 1) {

      return;

    }


    this.variants.removeAt(
      index
    );


    this.variantImages.splice(
      index,
      1
    );


    this.variantGallery.splice(
      index,
      1
    );


    this.variantImagePreview.splice(
      index,
      1
    );


    this.variantGalleryPreview.splice(
      index,
      1
    );

  }


  // ==========================================
  // VARIANT MAIN IMAGE
  // ==========================================

  // ==========================================
  // VARIANT GALLERY
  // ==========================================

  // ==========================================
  // VARIANT MAIN IMAGE
  // ==========================================

  onVariantImage(
    event: any,
    index: number
  ): void {

    const file =
      event?.target?.files?.[0];

    if (!file) {
      return;
    }


    // ========================================
    // IMAGE VALIDATION
    // ========================================

    if (!file.type.startsWith('image/')) {

      this.alertService.error(
        'Please select a valid image file'
      );

      event.target.value = '';

      return;
    }


    // ========================================
    // STORE FILE
    // ========================================

    this.variantImages[index] = file;


    // ========================================
    // PREVIEW
    // ========================================

    const reader = new FileReader();

    reader.onload = () => {

      this.variantImagePreview[index] =
        reader.result as string;

    };

    reader.readAsDataURL(file);

  }


  // ==========================================
  // VARIANT GALLERY
  // ==========================================

  // ==========================================
  // VARIANT GALLERY
  // ==========================================

  onVariantGallery(
    event: any,
    index: number
  ): void {

    const files =
      event?.target?.files;

    if (!files || !files.length) {
      return;
    }


    // ========================================
    // RESET PREVIOUS FILES
    // ========================================

    this.variantGallery[index] = [];

    this.variantGalleryPreview[index] = [];


    // ========================================
    // PROCESS FILES
    // ========================================

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      const file: File = files[i];


      // ======================================
      // IMAGE VALIDATION
      // ======================================

      if (!file.type.startsWith('image/')) {

        this.alertService.error(
          `${file.name} is not a valid image`
        );

        continue;
      }


      // ======================================
      // STORE FILE
      // ======================================

      this.variantGallery[index].push(file);


      // ======================================
      // PREVIEW
      // ======================================

      const reader = new FileReader();


      reader.onload = () => {

        this.variantGalleryPreview[index].push(
          reader.result as string
        );

      };


      reader.readAsDataURL(file);

    }

  }



  // ==========================================
  // CREATE PRODUCT
  // ==========================================

  createProduct(): void {

    // ========================================
    // FORM VALIDATION
    // ========================================

    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      this.alertService.error(
        'Please fill all required fields'
      );

      return;

    }


    // ========================================
    // VARIANT VALIDATION
    // ========================================

    if (!this.variants.length) {

      this.alertService.error(
        'At least one variant is required'
      );

      return;

    }


    // ========================================
    // FORMDATA
    // ========================================

    const formData = new FormData();


    // ========================================
    // PRODUCT DETAILS
    // ========================================

    formData.append(
      'productName',
      this.productForm.value.productName || ''
    );


    formData.append(
      'productCode',
      this.productForm.value.productCode || ''
    );


    formData.append(
      'rawMaterial',
      this.productForm.value.rawMaterial || ''
    );


    formData.append(
      'shortDescription',
      this.productForm.value.shortDescription || ''
    );


    formData.append(
      'description',
      this.productForm.value.description || ''
    );


    formData.append(
      'brand',
      this.productForm.value.brand || ''
    );


    formData.append(
      'category',
      this.productForm.value.category || ''
    );


    formData.append(
      'hsnCode',
      this.productForm.value.hsnCode || ''
    );


    formData.append(
      'gstPercentage',
      String(
        this.productForm.value.gstPercentage ?? 0
      )
    );


    formData.append(
      'productType',
      this.productForm.value.productType || 'Regular'
    );


    formData.append(
      'displayOrder',
      String(
        this.productForm.value.displayOrder ?? 0
      )
    );


    formData.append(
      'featuredProduct',
      String(
        this.productForm.value.featuredProduct ?? false
      )
    );


    // ========================================
    // VARIANTS
    // ========================================

    const variants =
      this.variants.value;


    formData.append(
      'variants',
      JSON.stringify(variants)
    );


    // ========================================
    // MAIN IMAGE
    // ========================================

    // Backend expects: image

    // Since current UI has image inside variant,
    // first variant image is used as product image.

    if (
      this.variantImages.length > 0 &&
      this.variantImages[0]
    ) {

      formData.append(
        'image',
        this.variantImages[0] as File,
        (this.variantImages[0] as File).name
      );

    }


    // ========================================
    // GALLERY
    // ========================================

    // Backend expects: gallery

    // First variant gallery files are appended
    // using the same "gallery" field name.

    if (
      this.variantGallery.length > 0 &&
      this.variantGallery[0]?.length > 0
    ) {

      this.variantGallery[0].forEach(
        (file: File) => {

          formData.append(
            'gallery',
            file,
            file.name
          );

        }
      );

    }


    // ========================================
    // DEBUG
    // ========================================

    console.log(
      '========== PRODUCT FORMDATA =========='
    );


    formData.forEach(
      (value, key) => {

        if (value instanceof File) {

          console.log(
            key,
            'FILE =>',
            value.name,
            value.type,
            value.size
          );

        }
        else {

          console.log(
            key,
            value
          );

        }

      }
    );


    // ========================================
    // API CALL
    // ========================================

    this.productService
      .createProduct(formData)
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (res: any) => {

          console.log(
            'CREATE PRODUCT RESPONSE:',
            res
          );


          this.alertService.success(
            res?.message ||
            'Product Created Successfully'
          );


          // ==================================
          // RESET FORM
          // ==================================

          this.productForm.reset({

            productName: '',

            productCode: '',

            rawMaterial: '',

            shortDescription: '',

            description: '',

            brand: '',

            category: '',

            hsnCode: '',

            gstPercentage: 5,

            productType: 'Regular',

            displayOrder: 0,

            featuredProduct: false

          });


          // ==================================
          // RESET VARIANTS
          // ==================================

          this.variants.clear();


          this.variantImages = [];

          this.variantGallery = [];

          this.variantImagePreview = [];

          this.variantGalleryPreview = [];


          // ==================================
          // ADD FIRST VARIANT
          // ==================================

          this.addVariant();


          // ==================================
          // NAVIGATE
          // ==================================

          this.router.navigate([
            '/admin/product'
          ]);

        },


        // ====================================
        // ERROR
        // ====================================

        error: (err: any) => {

          console.error(
            'CREATE PRODUCT ERROR:',
            err
          );


          this.alertService.error(

            err?.error?.message ||
            'Failed to create product'

          );

        }

      });

  }
}