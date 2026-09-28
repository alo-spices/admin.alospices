import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/Services/banner.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productForm!: FormGroup;

  productId!: string;

  brandList: any[] = [];

  categoryList: any[] = [];

  // ==========================
  // Variant Images
  // ==========================

  variantImages: File[] = [];

  variantGallery: File[][] = [];

  variantImagePreview: string[] = [];

  variantGalleryPreview: string[][] = [];

  constructor(

    private fb: FormBuilder,

    private productService: ProductService,

    private brandService: BrandService,

    private categoryService: CategoryService,

    private router: Router,

    private route: ActivatedRoute,
    private alertService: CommomPopupService

  ) { }

  ngOnInit(): void {

    this.productId =
      this.route.snapshot.paramMap.get('id')!;

    this.initializeForm();

    this.getBrands();

    this.getCategories();

    this.getProductById();

  }

  // ==========================
  // Initialize Form
  // ==========================

  initializeForm(): void {

    this.productForm = this.fb.group({

      productName: ['', Validators.required],

      productCode: ['', Validators.required],

      shortDescription: [''],

      description: [''],

      brand: ['', Validators.required],

      category: ['', Validators.required],

      hsnCode: [''],

      gstPercentage: [5],

      productType: ['Regular'],

      displayOrder: [0],

      featuredProduct: [false],

      variants: this.fb.array([])

    });

  }

  // ==========================
  // Variant Form
  // ==========================

  createVariant(): FormGroup {

    return this.fb.group({

      _id: [''],

      packSize: ['', Validators.required],

      skuCode: ['', Validators.required],

      stock: [0],

      mrp: [0],

      gstPercentage: [5],

      weightInGrams: [0],

      status: ['Active']

    });

  }

  // ==========================
  // Variant Getter
  // ==========================

  get variants(): FormArray {

    return this.productForm.get(

      'variants'

    ) as FormArray;

  }

  // ==========================
  // Get Brands
  // ==========================

  getBrands(): void {

    this.brandService
      .getAllBrands()
      .subscribe({

        next: (res: any) => {

          this.brandList = res.data;

        }

      });

  }

  // ==========================
  // Get Categories
  // ==========================

  getCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          this.categoryList = res.data;

        }

      });

  }
  // ==========================
// Get Product By Id
// ==========================

getProductById(): void {

  this.productService
    .getProductById(this.productId)
    .subscribe({

      next: (res: any) => {

        const product = res.data;

        console.log(product);

        // ==========================
        // Patch Product Details
        // ==========================

        this.productForm.patchValue({

          productName: product.productName,

          productCode: product.productCode,

          shortDescription: product.shortDescription,

          description: product.description,

          brand: product.brand?._id,

          category: product.category?._id,

          hsnCode: product.hsnCode,

          gstPercentage: product.gstPercentage,

          productType: product.productType,

          displayOrder: product.displayOrder,

          featuredProduct: product.featuredProduct

        });

        // ==========================
        // Clear Existing Variants
        // ==========================

        this.variants.clear();

        this.variantImages = [];

        this.variantGallery = [];

        this.variantImagePreview = [];

        this.variantGalleryPreview = [];

        // ==========================
        // Load Variants
        // ==========================

        product.variants.forEach((variant: any) => {

          this.variants.push(

            this.fb.group({

              _id: [variant._id],

              packSize: [variant.packSize, Validators.required],

              skuCode: [variant.skuCode, Validators.required],

              stock: [variant.stock],

              mrp: [variant.mrp],

              gstPercentage: [variant.gstPercentage],

              weightInGrams: [variant.weightInGrams],

              status: [variant.status]

            })

          );

          // Existing Image

          this.variantImages.push(null as any);

          this.variantImagePreview.push(

            variant.image || ''

          );

          // Existing Gallery

          this.variantGallery.push([]);

          this.variantGalleryPreview.push(

            variant.gallery || []

          );

        });

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}
// ==========================
// Add Variant
// ==========================

addVariant(): void {

  this.variants.push(

    this.createVariant()

  );

  this.variantImages.push(null as any);

  this.variantGallery.push([]);

  this.variantImagePreview.push('');

  this.variantGalleryPreview.push([]);

}

// ==========================
// Remove Variant
// ==========================

removeVariant(index: number): void {

  this.variants.removeAt(index);

  this.variantImages.splice(index, 1);

  this.variantGallery.splice(index, 1);

  this.variantImagePreview.splice(index, 1);

  this.variantGalleryPreview.splice(index, 1);

}

// ==========================
// Variant Image
// ==========================

onVariantImage(event: any, index: number): void {

  const file = event.target.files[0];

  if (!file) {

    return;

  }

  this.variantImages[index] = file;

  const reader = new FileReader();

  reader.onload = () => {

    this.variantImagePreview[index] =

      reader.result as string;

  };

  reader.readAsDataURL(file);

}

// ==========================
// Variant Gallery
// ==========================

onVariantGallery(event: any, index: number): void {

  const files = event.target.files;

  if (!files.length) {

    return;

  }

  this.variantGallery[index] = [];

  this.variantGalleryPreview[index] = [];

  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    this.variantGallery[index].push(file);

    const reader = new FileReader();

    reader.onload = () => {

      this.variantGalleryPreview[index].push(

        reader.result as string

      );

    };

    reader.readAsDataURL(file);

  }

}
// ==========================
// Update Product
// ==========================

updateProduct(): void {
  // ==========================
  // Form Validation
  // ==========================

  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();

    this.alertService.validation(
      'Please fill all required fields.'
    );

    return;
  }

  const formData = new FormData();

  // ==========================
  // Product Details
  // ==========================

  formData.append(
    'productName',
    this.productForm.value.productName || ''
  );

  formData.append(
    'productCode',
    this.productForm.value.productCode || ''
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
    String(this.productForm.value.gstPercentage ?? 0)
  );

  formData.append(
    'productType',
    this.productForm.value.productType || ''
  );

  formData.append(
    'displayOrder',
    String(this.productForm.value.displayOrder ?? 0)
  );

  formData.append(
    'featuredProduct',
    String(
      this.productForm.value.featuredProduct ?? false
    )
  );

  // ==========================
  // Variants JSON
  // ==========================

  const variants = this.variants.value.map(
    (variant: any) => {
      const data = { ...variant };

      // Remove _id for newly added variants
      if (!data._id || data._id === '') {
        delete data._id;
      }

      return data;
    }
  );

  formData.append(
    'variants',
    JSON.stringify(variants)
  );

  // ==========================
  // Variant Images
  // ==========================

  this.variantImages.forEach(
    (file: File | null, index: number) => {
      if (file) {
        formData.append(
          `variantImage${index}`,
          file
        );
      }
    }
  );

  // ==========================
  // Variant Gallery
  // ==========================

  this.variantGallery.forEach(
    (gallery: File[], index: number) => {
      if (gallery && gallery.length > 0) {
        gallery.forEach((file: File) => {
          formData.append(
            `variantGallery${index}`,
            file
          );
        });
      }
    }
  );

  // ==========================
  // Update API
  // ==========================

  this.productService
    .updateProduct(
      this.productId,
      formData
    )
    .subscribe({
      next: (res: any) => {
        this.alertService
          .success(
            res?.message ||
            'Product Updated Successfully'
          )
          .then(() => {
            this.router.navigate([
              '/admin/product'
            ]);
          });
      },

      error: (err: any) => {
        console.log(err);

        this.alertService.error(
          err?.error?.message ||
          'Failed to update product.'
        );
      }
    });
}
}