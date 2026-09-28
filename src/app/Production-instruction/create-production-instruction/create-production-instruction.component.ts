import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { ProductionInstructionService } from 'src/app/Services/production-instruction.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-create-production-instruction',
  templateUrl: './create-production-instruction.component.html',
  styleUrls: ['./create-production-instruction.component.css']
})
export class CreateProductionInstructionComponent implements OnInit {
  productList: any[] = [];
  selectedVariants: any[][] = [];
  // ==========================================
  // Form
  // ==========================================

  productionInstructionForm!: FormGroup;


  // ==========================================
  // Lists
  // ==========================================

  warehouseList: any[] = [];

  rawMaterialList: any[] = [];

  stockReceiveLists: any[][] = [];

  batchLists: any[][] = [];


  // ==========================================
  // Submit
  // ==========================================

  isSubmitted = false;


  constructor(

    private fb: FormBuilder,

    private router: Router,
    private rawMaterialService: RawMaterialService,
    private productionInstructionService:
      ProductionInstructionService,
    private warehouseService: WarehouseService,
    private alertService:
      CommomPopupService,
    private productService: ProductService,

  ) { }


  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllWarehouses();

    this.getAllRawMaterials();
    this.getAllProducts();
    // Add first item by default

    this.addItem();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.productionInstructionForm =
      this.fb.group({

        instructionNo: [
          '',
          Validators.required
        ],

        instructionDate: [
          this.getTodayDate(),
          Validators.required
        ],

        warehouse: [
          '',
          Validators.required
        ],

        remarks: [
          ''
        ],

        items: this.fb.array([])

      });

  }


  // ==========================================
  // Get Items FormArray
  // ==========================================

  get items(): FormArray {

    return this.productionInstructionForm
      .get('items') as FormArray;

  }

  // ==========================================
  // Get All Products
  // ==========================================

  getAllProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (response: any) => {

          this.productList =
            response?.data || [];

        },

        error: (error: any) => {

          console.log(
            'Product Error:',
            error
          );

          this.alertService.error(
            error?.error?.message ||
            'Failed to load products'
          );

        }

      });

  }
  // ==========================================
  // Create Item Form
  // ==========================================

  createItem(): FormGroup {

    return this.fb.group({
      product: ['', Validators.required],
      variantId: [
        '',
        Validators.required
      ],
      rawMaterial: [
        '',
        Validators.required
      ],

      stockReceive: [
        '',
        Validators.required
      ],

      batchNo: [
        '',
        Validators.required
      ],

      variantName: [
        '',
        Validators.required
      ],

      skuCode: [
        '',
        Validators.required
      ],

      packSize: [
        '',
        Validators.required
      ],

      weightInGrams: [
        '',
        [
          Validators.required,
          Validators.min(0.001)
        ]
      ],

      targetPacks: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      targetWeightKg: [
        {
          value: 0,
          disabled: true
        }
      ]

    });

  }


  // ==========================================
  // Add Item
  // ==========================================

  addItem(): void {

    this.items.push(
      this.createItem()
    );

    this.stockReceiveLists.push([]);

    this.batchLists.push([]);

  }


  // ==========================================
  // Remove Item
  // ==========================================

  removeItem(index: number): void {

    if (this.items.length <= 1) {

      this.alertService.warning(
        'At least one production item is required'
      );

      return;

    }

    this.items.removeAt(index);

    this.stockReceiveLists.splice(
      index,
      1
    );

    this.batchLists.splice(
      index,
      1
    );

  }


  // ==========================================
  // Get All Warehouses
  // ==========================================

  getAllWarehouses(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (response: any) => {

          this.warehouseList =
            response?.data || [];

        },

        error: (error: any) => {

          console.log(
            'Warehouse Error:',
            error
          );

          this.alertService.error(
            error?.error?.message ||
            'Failed to load warehouses'
          );

        }

      });

  }


  // ==========================================
  // Get All Raw Materials
  // ==========================================

  getAllRawMaterials(): void {

    this.rawMaterialService
      .getAllRawMaterials()
      .subscribe({

        next: (response: any) => {

          this.rawMaterialList =
            response?.data || [];

        },

        error: (error: any) => {

          console.log(
            'Raw Material Error:',
            error
          );

          this.alertService.error(
            error?.error?.message ||
            'Failed to load raw materials'
          );

        }

      });

  }
  onProductChange(index: number, event: any): void {

    const productId = event.target.value;

    const item = this.items.at(index);

    const product = this.productList.find(
      (p: any) => p._id === productId
    );

    console.log('PRODUCT ID:', productId);
    console.log('SELECTED PRODUCT:', product);
    console.log('PRODUCT VARIANTS:', product?.variants);

    // Product select ayyaka variants store cheyyi
    this.selectedVariants[index] =
      product?.variants || [];

    // Previous variant details clear
    item.patchValue({
      variantId: '',
      variantName: '',
      skuCode: '',
      packSize: '',
      weightInGrams: ''
    });

  }
  onVariantChange(index: number, event: any): void {

    const variantId = event.target.value;

    const item = this.items.at(index);

    const variant =
      (this.selectedVariants[index] || []).find(
        (v: any) => v._id === variantId
      );

    console.log('SELECTED VARIANT:', variant);

    if (!variant) {
      return;
    }

    item.patchValue({

      variantId: variant._id,

      variantName: variant.packSize,

      skuCode: variant.skuCode,

      packSize: variant.packSize,

      weightInGrams:
        Number(variant.weightInGrams) || 0

    });

    this.calculateTargetWeight(index);

  }
  getProductVariants(index: number): any[] {

    const productId =
      this.items.at(index).get('product')?.value;

    if (!productId) {
      return [];
    }

    const product =
      this.productList.find(
        (p: any) => p._id === productId
      );

    return product?.variants || [];
  }

  // ==========================================
  // Warehouse Change
  // ==========================================

  onWarehouseChange(event: any): void {

    const warehouseId =
      event.target.value;

    if (!warehouseId) {

      return;

    }

    // Clear stock data for all items

    this.stockReceiveLists =
      this.items.controls.map(
        () => []
      );

    this.batchLists =
      this.items.controls.map(
        () => []
      );

    // Reset stock receive and batch

    this.items.controls.forEach(
      (item: any) => {

        item.patchValue({

          stockReceive: '',

          batchNo: ''

        });

      }
    );

  }


  // ==========================================
  // Raw Material Change
  // ==========================================

  onRawMaterialChange(
    index: number,
    event: any
  ): void {

    const rawMaterialId =
      event.target.value;

    const warehouseId =
      this.productionInstructionForm
        .get('warehouse')
        ?.value;


    if (!rawMaterialId) {

      this.stockReceiveLists[index] = [];

      this.batchLists[index] = [];

      return;

    }


    if (!warehouseId) {

      this.alertService.warning(
        'Please select warehouse first'
      );

      this.items
        .at(index)
        .patchValue({

          rawMaterial: ''

        });

      return;

    }


    /*
      Stock API:

      GET
      /raw-material-stock/:warehouseId
    */

    this.rawMaterialService
      .getRawMaterialStock(warehouseId)
      .subscribe({

        next: (response: any) => {

          const stockList =
            response?.data || [];


          // Filter selected raw material

          this.stockReceiveLists[index] =
            stockList.filter(
              (stock: any) =>
                stock.rawMaterialId ===
                rawMaterialId &&
                Number(
                  stock.availableWeightKg || 0
                ) > 0
            );


          this.batchLists[index] =
            [];


          // Reset stock receive & batch

          this.items
            .at(index)
            .patchValue({

              stockReceive: '',

              batchNo: ''

            });

        },

        error: (error: any) => {

          console.log(
            'Stock Error:',
            error
          );

          this.stockReceiveLists[index] =
            [];

          this.batchLists[index] =
            [];

          this.alertService.error(
            error?.error?.message ||
            'Failed to load raw material stock'
          );

        }

      });

  }


  // ==========================================
  // Stock Receive Change
  // ==========================================

  onStockReceiveChange(
    index: number,
    event: any
  ): void {

    const stockReceiveId =
      event.target.value;


    if (!stockReceiveId) {

      this.batchLists[index] = [];

      return;

    }


    const selectedStock =
      this.stockReceiveLists[index]
        ?.find(
          (stock: any) =>
            stock.stockReceiveId ===
            stockReceiveId
        );


    if (!selectedStock) {

      this.batchLists[index] = [];

      return;

    }


    /*
      Batch is already available
      in raw-material-stock response.
    */

    this.batchLists[index] = [

      selectedStock

    ];


    this.items
      .at(index)
      .patchValue({

        batchNo:
          selectedStock.batchNo || ''

      });

  }


  // ==========================================
  // Get Stock Receive List
  // ==========================================

  getStockReceiveList(
    index: number
  ): any[] {

    return this.stockReceiveLists[index]
      || [];

  }


  // ==========================================
  // Get Batch List
  // ==========================================

  getBatchList(
    index: number
  ): any[] {

    return this.batchLists[index]
      || [];

  }


  // ==========================================
  // Calculate Target Weight
  // ==========================================

  calculateTargetWeight(
    index: number
  ): void {

    const item =
      this.items.at(index);


    const weightInGrams =
      Number(
        item.get('weightInGrams')?.value
      ) || 0;


    const targetPacks =
      Number(
        item.get('targetPacks')?.value
      ) || 0;


    const targetWeightKg =
      (
        weightInGrams *
        targetPacks
      ) / 1000;


    item.get('targetWeightKg')
      ?.setValue(
        targetWeightKg
      );


  }


  // ==========================================
  // Get Target Weight
  // ==========================================

  getTargetWeight(
    index: number
  ): number {

    const item =
      this.items.at(index);


    const weightInGrams =
      Number(
        item.get('weightInGrams')?.value
      ) || 0;


    const targetPacks =
      Number(
        item.get('targetPacks')?.value
      ) || 0;


    return (
      weightInGrams *
      targetPacks
    ) / 1000;

  }


  // ==========================================
  // Get Total Target Weight
  // ==========================================

  getTotalTargetWeight(): number {

    let total = 0;


    this.items.controls.forEach(
      (item: any) => {

        const weightInGrams =
          Number(
            item.get('weightInGrams')?.value
          ) || 0;


        const targetPacks =
          Number(
            item.get('targetPacks')?.value
          ) || 0;


        total +=
          (
            weightInGrams *
            targetPacks
          ) / 1000;

      }
    );


    return total;

  }


  // ==========================================
  // Get Raw Material Name
  // ==========================================

  getRawMaterialName(
    index: number
  ): string {

    const rawMaterialId =
      this.items
        .at(index)
        .get('rawMaterial')
        ?.value;


    if (!rawMaterialId) {

      return '';

    }


    const material =
      this.rawMaterialList.find(
        (item: any) =>
          item._id === rawMaterialId
      );


    return material
      ?.rawMaterialName || '';

  }


  // ==========================================
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // Calculate all weights first

    this.items.controls.forEach(
      (_item: any, index: number) => {

        this.calculateTargetWeight(
          index
        );

      }
    );


    // Form validation

    if (
      this.productionInstructionForm
        .invalid
    ) {

      this.productionInstructionForm
        .markAllAsTouched();


      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }


    if (this.items.length === 0) {

      this.alertService.validation(
        'Please add at least one production item'
      );

      return;

    }


    // ========================================
    // Prepare Request
    // ========================================

    const formValue =
      this.productionInstructionForm
        .getRawValue();


    const payload = {

      instructionNo:
        formValue.instructionNo,

      instructionDate:
        formValue.instructionDate,

      warehouse:
        formValue.warehouse,

      remarks:
        formValue.remarks || '',

      items:
        formValue.items.map(
          (item: any) => ({

            rawMaterial:
              item.rawMaterial,

            stockReceive:
              item.stockReceive,

            batchNo:
              item.batchNo,

            variantName:
              item.variantName,

            skuCode:
              item.skuCode,

            packSize:
              item.packSize,

            weightInGrams:
              Number(
                item.weightInGrams
              ),

            targetPacks:
              Number(
                item.targetPacks
              )

          })
        )

    };


    console.log(
      'Production Instruction Payload:',
      payload
    );


    // ========================================
    // API
    // ========================================

    this.productionInstructionService
      .createProductionInstruction(
        payload
      )
      .subscribe({

        next: (response: any) => {

          this.alertService
            .success(
              response?.message ||
              'Production Instruction Created Successfully'
            )
            .then(() => {

              this.router.navigate([
                '/admin/production-instructions'
              ]);

            });

        },

        error: (error: any) => {

          console.log(
            'Create Production Instruction Error:',
            error
          );


          this.alertService.error(
            error?.error?.message ||
            'Something went wrong'
          );

        }

      });

  }


  // ==========================================
  // Today Date
  // ==========================================

  getTodayDate(): string {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        today.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/production-instructions'
    ]);

  }

}
