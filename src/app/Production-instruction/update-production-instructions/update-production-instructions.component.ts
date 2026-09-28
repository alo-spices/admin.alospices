import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { ProductionInstructionService } from 'src/app/Services/production-instruction.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-update-production-instructions',
  templateUrl: './update-production-instructions.component.html',
  styleUrls: ['./update-production-instructions.component.css']
})
export class UpdateProductionInstructionsComponent implements OnInit {
  // ==========================================
  // Form
  // ==========================================

  productionInstructionForm!: FormGroup;


  // ==========================================
  // Lists
  // ==========================================

  warehouseList: any[] = [];

  rawMaterialList: any[] = [];

  productList: any[] = [];

  // Product selected variants
  selectedVariants: any[][] = [];

  stockReceiveLists: any[][] = [];

  batchLists: any[][] = [];


  // ==========================================
  // Submit
  // ==========================================

  isSubmitted = false;

  instructionId: string = '';


  // ==========================================
  // Constructor
  // ==========================================

  constructor(

    private fb: FormBuilder,

    private router: Router,

    private rawMaterialService:
      RawMaterialService,

    private productionInstructionService:
      ProductionInstructionService,

    private warehouseService:
      WarehouseService,

    private productService:
      ProductService,

    private alertService:
      CommomPopupService,

    private route:
      ActivatedRoute

  ) { }


  // ==========================================
  // Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllWarehouses();

    this.getAllRawMaterials();

    // ==========================================
    // GET ALL PRODUCTS
    // ==========================================

    this.getAllProducts();


    // ==========================================
    // Add first item by default
    // ==========================================

    this.addItem();


    this.instructionId =
      this.route.snapshot.paramMap.get('id') || '';


    if (this.instructionId) {

      this.getProductionInstructionById(
        this.instructionId
      );

    }

  }


  // ==========================================
  // GET ALL PRODUCTS
  // ==========================================

  getAllProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (response: any) => {

          console.log(
            'All Products:',
            response
          );

          this.productList =
            response?.data || [];

        },

        error: (error: any) => {

          console.log(
            'Product Error:',
            error
          );

          this.productList = [];

          this.alertService.error(
            error?.error?.message ||
            'Failed to load products'
          );

        }

      });

  }


  // ==========================================
  // GET PRODUCT VARIANTS
  // ==========================================

  getProductVariants(
    index: number
  ): any[] {

    return this.selectedVariants[index]
      || [];

  }


  // ==========================================
  // PRODUCT CHANGE
  // ==========================================

  onProductChange(
    index: number,
    event: any
  ): void {

    const productId =
      event.target.value;

    const item =
      this.items.at(index);


    // ==========================================
    // Find selected product
    // ==========================================

    const product =
      this.productList.find(
        (p: any) =>
          String(p._id) ===
          String(productId)
      );


    console.log(
      'Selected Product:',
      product
    );


    // ==========================================
    // Store variants for this item
    // ==========================================

    this.selectedVariants[index] =
      product?.variants || [];


    console.log(
      'Selected Product Variants:',
      this.selectedVariants[index]
    );


    // ==========================================
    // Clear previous variant details
    // ==========================================

    item.patchValue({

      variantId: '',

      variantName: '',

      skuCode: '',

      packSize: '',

      weightInGrams: '',

      targetPacks: ''

    });


    // ==========================================
    // Recalculate
    // ==========================================

    this.calculateTargetWeight(index);

  }


  // ==========================================
  // VARIANT CHANGE
  // ==========================================

  onVariantChange(
    index: number,
    event: any
  ): void {

    const variantId =
      event.target.value;

    const item =
      this.items.at(index);


    // ==========================================
    // Find selected variant
    // ==========================================

    const variant =
      (this.selectedVariants[index] || [])
        .find(
          (v: any) =>
            String(v._id) ===
            String(variantId)
        );


    console.log(
      'Selected Variant:',
      variant
    );


    if (!variant) {

      item.patchValue({

        variantName: '',

        skuCode: '',

        packSize: '',

        weightInGrams: ''

      });

      this.calculateTargetWeight(index);

      return;

    }


    // ==========================================
    // PATCH PRODUCT VARIANT DETAILS
    // ==========================================

    item.patchValue({

      variantId:
        variant._id,

      variantName:
        variant.packSize || '',

      skuCode:
        variant.skuCode || '',

      packSize:
        variant.packSize || '',

      weightInGrams:
        Number(
          variant.weightInGrams || 0
        )

    });


    // ==========================================
    // Calculate Weight
    // ==========================================

    this.calculateTargetWeight(index);

  }


  // ==========================================
  // GET PRODUCTION INSTRUCTION BY ID
  // ==========================================

  getProductionInstructionById(
    id: string
  ): void {

    this.productionInstructionService
      .getProductionInstructionById(id)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Production Instruction:',
            res
          );


          if (
            res?.success &&
            res?.data
          ) {

            const data =
              res.data;


            // ==================================
            // PATCH MAIN FORM
            // ==================================

            this.productionInstructionForm.patchValue({

              instructionNo:
                data.instructionNo,

              instructionDate:
                this.formatDateForInput(
                  data.instructionDate
                ),

              warehouse:
                data.warehouse?._id ||
                data.warehouse,

              remarks:
                data.remarks || ''

            });


            // ==================================
            // CLEAR EXISTING ITEMS
            // ==================================

            this.items.clear();

            this.stockReceiveLists = [];

            this.batchLists = [];

            this.selectedVariants = [];


            // ==================================
            // PATCH ITEMS
            // ==================================

            if (
              data.items &&
              data.items.length > 0
            ) {

              data.items.forEach(
                (item: any, index: number) => {

                  const itemForm =
                    this.createItem();


                  // ==========================================
                  // PRODUCT ID
                  // ==========================================

                  const productId =
                    item.product?._id ||
                    item.product ||
                    '';


                  // ==========================================
                  // VARIANT ID
                  // ==========================================

                  const variantId =
                    item.variantId?._id ||
                    item.variantId ||
                    '';


                  // ==========================================
                  // PATCH PRODUCT DATA
                  // ==========================================

                  itemForm.patchValue({

                    product:
                      productId,

                    variantId:
                      variantId,

                    rawMaterial:
                      item.rawMaterial?._id ||
                      item.rawMaterial,

                    variantName:
                      item.variantName || '',

                    skuCode:
                      item.skuCode || '',

                    packSize:
                      item.packSize || '',

                    weightInGrams:
                      item.weightInGrams || 0,

                    targetPacks:
                      item.targetPacks || 0,

                    targetWeightKg:
                      item.targetWeightKg || 0,

                    batchNo:
                      ''

                  });


                  // ==========================================
                  // ADD FORM
                  // ==========================================

                  this.items.push(
                    itemForm
                  );


                  // ==========================================
                  // INITIALIZE LISTS
                  // ==========================================

                  this.stockReceiveLists[index] =
                    [];

                  this.batchLists[index] =
                    [];

                  this.selectedVariants[index] =
                    [];


                  // ==========================================
                  // SET PRODUCT VARIANTS
                  // ==========================================

                  if (productId) {

                    const product =
                      this.productList.find(
                        (p: any) =>
                          String(p._id) ===
                          String(productId)
                      );


                    if (product) {

                      this.selectedVariants[index] =
                        product.variants || [];

                    }

                  }


                  // ==========================================
                  // LOAD STOCK RECEIVE + BATCH
                  // ==========================================

                  const rawMaterialId =
                    item.rawMaterial?._id ||
                    item.rawMaterial;


                  const stockReceiveId =
                    item.stockReceive?._id ||
                    item.stockReceive;


                  const batchNo =
                    item.batchNo || '';


                  this.loadStockForEdit(
                    index,
                    rawMaterialId,
                    stockReceiveId,
                    batchNo
                  );

                }
              );

            }
            else {

              this.items.push(
                this.createItem()
              );

              this.stockReceiveLists.push([]);

              this.batchLists.push([]);

              this.selectedVariants.push([]);

            }

          }
          else {

            this.alertService.error(
              res?.message ||
              'Unable to load Production Instruction.'
            );

          }

        },

        error: (error: any) => {

          console.log(
            'Get Production Instruction Error:',
            error
          );

          this.alertService.error(

            error?.error?.message ||
            'Unable to load Production Instruction.'

          );

        }

      });

  }


  // ==========================================
  // LOAD STOCK FOR EDIT
  // ==========================================

  loadStockForEdit(
    index: number,
    rawMaterialId: string,
    stockReceiveId: string,
    batchNo: string
  ): void {

    const warehouseId =
      this.productionInstructionForm
        .get('warehouse')
        ?.value;


    if (
      !warehouseId ||
      !rawMaterialId
    ) {

      return;

    }


    this.rawMaterialService
      .getRawMaterialStock(warehouseId)
      .subscribe({

        next: (response: any) => {

          const stockList =
            response?.data || [];


          // ==========================================
          // FILTER RAW MATERIAL
          // ==========================================

          const filteredStock =
            stockList.filter(
              (stock: any) =>

                String(
                  stock.rawMaterialId
                ) ===
                String(rawMaterialId) &&

                Number(
                  stock.availableWeightKg || 0
                ) > 0
            );


          // ==========================================
          // SET STOCK RECEIVE LIST
          // ==========================================

          this.stockReceiveLists[index] =
            filteredStock;


          // ==========================================
          // FIND SELECTED STOCK RECEIVE
          // ==========================================

          const selectedStock =
            filteredStock.find(
              (stock: any) =>

                String(
                  stock.stockReceiveId
                ) ===
                String(stockReceiveId)
            );


          if (selectedStock) {

            // ==========================================
            // SET BATCH LIST
            // ==========================================

            this.batchLists[index] = [
              selectedStock
            ];


            // ==========================================
            // PATCH STOCK RECEIVE + BATCH
            // ==========================================

            this.items
              .at(index)
              .patchValue({

                stockReceive:
                  selectedStock.stockReceiveId,

                batchNo:
                  selectedStock.batchNo ||
                  batchNo

              });

          }
          else {

            // ==========================================
            // FALLBACK
            // ==========================================

            this.items
              .at(index)
              .patchValue({

                stockReceive:
                  stockReceiveId || '',

                batchNo:
                  batchNo || ''

              });

          }

        },

        error: (error: any) => {

          console.log(
            'Edit Stock Load Error:',
            error
          );

          this.stockReceiveLists[index] = [];

          this.batchLists[index] = [];

        }

      });

  }


  // ==========================================
  // FORMAT DATE FOR HTML DATE INPUT
  // ==========================================

  formatDateForInput(
    date: string
  ): string {

    if (!date) {

      return '';

    }

    return new Date(date)
      .toISOString()
      .split('T')[0];

  }


  // ==========================================
  // UPDATE PRODUCTION INSTRUCTION
  // ==========================================

  onSubmit(): void {

    if (
      this.productionInstructionForm.invalid
    ) {

      this.productionInstructionForm
        .markAllAsTouched();

      this.alertService.warning(
        'Please fill all required fields.'
      );

      return;

    }


    const form =
      this.productionInstructionForm
        .getRawValue();


    // ==========================================
    // VALIDATE ITEMS
    // ==========================================

    if (
      !form.items ||
      form.items.length === 0
    ) {

      this.alertService.warning(
        'Please add at least one production item.'
      );

      return;

    }


    // ==========================================
    // PREPARE ITEMS
    // ==========================================

    const items =
      form.items.map(
        (item: any) => {

          const weightInGrams =
            Number(
              item.weightInGrams || 0
            );


          const targetPacks =
            Number(
              item.targetPacks || 0
            );


          const targetWeightKg =
            Number(
              (
                weightInGrams *
                targetPacks /
                1000
              ).toFixed(3)
            );


          return {

            // ==================================
            // PRODUCT
            // ==================================

            product:
              item.product,

            // ==================================
            // VARIANT
            // ==================================

            variantId:
              item.variantId,

            // ==================================
            // RAW MATERIAL
            // ==================================

            rawMaterial:
              item.rawMaterial,

            stockReceive:
              item.stockReceive,

            batchNo:
              String(
                item.batchNo || ''
              )
                .trim(),

            variantName:
              String(
                item.variantName || ''
              )
                .trim(),

            skuCode:
              String(
                item.skuCode || ''
              )
                .trim()
                .toUpperCase(),

            packSize:
              String(
                item.packSize || ''
              )
                .trim(),

            weightInGrams:
              weightInGrams,

            targetPacks:
              targetPacks,

            targetWeightKg:
              targetWeightKg

          };

        }
      );


    // ==========================================
    // TOTAL TARGET WEIGHT
    // ==========================================

    const totalTargetWeightKg =
      Number(

        items
          .reduce(
            (
              total: number,
              item: any
            ) =>

              total +
              Number(
                item.targetWeightKg || 0
              ),

            0
          )

          .toFixed(3)

      );


    // ==========================================
    // FINAL PAYLOAD
    // ==========================================

    const payload = {

      instructionNo:
        form.instructionNo,

      instructionDate:
        form.instructionDate,

      warehouse:
        form.warehouse,

      items:
        items,

      totalTargetWeightKg:
        totalTargetWeightKg,

      remarks:
        form.remarks || ''

    };


    console.log(
      'UPDATE PRODUCTION INSTRUCTION PAYLOAD:',
      payload
    );


    // ==========================================
    // API CALL
    // ==========================================

    this.productionInstructionService
      .updateProductionInstruction(
        this.instructionId,
        payload
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Update Response:',
            res
          );


          if (res?.success) {

            this.alertService.success(
              res.message ||
              'Production Instruction Updated Successfully.'
            );


            setTimeout(() => {

              this.router.navigate([
                '/admin/production-instructions'
              ]);

            }, 500);

          }
          else {

            this.alertService.error(
              res?.message ||
              'Production Instruction update failed.'
            );

          }

        },

        error: (error: any) => {

          console.log(
            'Update Production Instruction Error:',
            error
          );

          this.alertService.error(

            error?.error?.message ||
            'Unable to update Production Instruction.'

          );

        }

      });

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

        items:
          this.fb.array([])

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
  // Create Item Form
  // ==========================================

  createItem(): FormGroup {

    return this.fb.group({

      // ==========================================
      // PRODUCT
      // ==========================================

      product: [
        '',
        Validators.required
      ],

      // ==========================================
      // PRODUCT VARIANT
      // ==========================================

      variantId: [
        '',
        Validators.required
      ],

      // ==========================================
      // RAW MATERIAL
      // ==========================================

      rawMaterial: [
        '',
        Validators.required
      ],

      // ==========================================
      // STOCK RECEIVE
      // ==========================================

      stockReceive: [
        '',
        Validators.required
      ],

      // ==========================================
      // BATCH
      // ==========================================

      batchNo: [
        '',
        Validators.required
      ],

      // ==========================================
      // VARIANT NAME
      // ==========================================

      variantName: [
        '',
        Validators.required
      ],

      // ==========================================
      // SKU
      // ==========================================

      skuCode: [
        '',
        Validators.required
      ],

      // ==========================================
      // PACK SIZE
      // ==========================================

      packSize: [
        '',
        Validators.required
      ],

      // ==========================================
      // WEIGHT
      // ==========================================

      weightInGrams: [
        '',
        [
          Validators.required,
          Validators.min(0.001)
        ]
      ],

      // ==========================================
      // TARGET PACKS
      // ==========================================

      targetPacks: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      // ==========================================
      // TARGET WEIGHT
      // ==========================================

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

    this.selectedVariants.push([]);

  }


  // ==========================================
  // Remove Item
  // ==========================================

  removeItem(
    index: number
  ): void {

    if (
      this.items.length <= 1
    ) {

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


    this.selectedVariants.splice(
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


  // ==========================================
  // Warehouse Change
  // ==========================================

  onWarehouseChange(
    event: any
  ): void {

    const warehouseId =
      event.target.value;


    if (!warehouseId) {

      return;

    }


    // ==========================================
    // Clear stock data for all items
    // ==========================================

    this.stockReceiveLists =
      this.items.controls.map(
        () => []
      );


    this.batchLists =
      this.items.controls.map(
        () => []
      );


    // ==========================================
    // Reset stock receive and batch
    // ==========================================

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


    // ==========================================
    // Get Warehouse Raw Material Stock
    // ==========================================

    this.rawMaterialService
      .getRawMaterialStock(
        warehouseId
      )
      .subscribe({

        next: (response: any) => {

          const stockList =
            response?.data || [];


          // ==========================================
          // Filter selected raw material
          // ==========================================

          this.stockReceiveLists[index] =
            stockList.filter(
              (stock: any) =>

                String(
                  stock.rawMaterialId
                ) ===
                String(rawMaterialId) &&

                Number(
                  stock.availableWeightKg || 0
                ) > 0
            );


          this.batchLists[index] =
            [];


          // ==========================================
          // Reset stock receive & batch
          // ==========================================

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

            String(
              stock.stockReceiveId
            ) ===
            String(stockReceiveId)
        );


    if (!selectedStock) {

      this.batchLists[index] = [];

      return;

    }


    // ==========================================
    // Batch already available
    // ==========================================

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

          String(item._id) ===
          String(rawMaterialId)
      );


    return material
      ?.rawMaterialName || '';

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


