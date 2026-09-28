import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { ProductionService } from 'src/app/Services/production.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { StockReceiveService } from 'src/app/Services/stock-receive.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import { Production, ProductionItem } from 'src/app/Models/Production';

@Component({
  selector: 'app-update-production',
  templateUrl: './update-production.component.html',
  styleUrls: ['./update-production.component.css']
})
export class UpdateProductionComponent implements OnInit {


  // =====================================================
  // FORM
  // =====================================================

  productionForm!: FormGroup;


  // =====================================================
  // PRODUCTION ID
  // =====================================================

  productionId: string = '';


  // =====================================================
  // DROPDOWNS
  // =====================================================

  warehouseList: any[] = [];

  rawMaterialList: any[] = [];

  stockReceiveList: any[] = [];


  // =====================================================
  // SELECTED STOCK
  // =====================================================

  selectedStockReceive: any = null;


  // =====================================================
  // PRODUCTION ITEMS
  // =====================================================

  productionItems: ProductionItem[] = [];


  // =====================================================
  // SUMMARY
  // =====================================================

  summary = {

    rawWeight: 0,

    producedWeight: 0,

    waste: 0,

    remaining: 0

  };


  // =====================================================
  // ORIGINAL IDS
  // =====================================================

  originalRawMaterialId: string = '';

  originalStockReceiveId: string = '';

  originalWarehouseId: string = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(

    private fb: FormBuilder,

    private warehouseService: WarehouseService,

    private productionService: ProductionService,

    private popup: CommomPopupService,

    private router: Router,

    private route: ActivatedRoute

  ) { }


  // =====================================================
  // NG ON INIT
  // =====================================================

  ngOnInit(): void {

    this.initializeForm();

    this.productionId =
      this.route.snapshot.paramMap.get('id') || '';

    console.log(
      'Production ID:',
      this.productionId
    );


    if (!this.productionId) {

      this.popup.error(
        'Production ID not found.'
      );

      this.router.navigate([
        '/admin/production'
      ]);

      return;

    }


    this.getWarehouses();

  }


  // =====================================================
  // INITIALIZE FORM
  // =====================================================

  initializeForm(): void {

    this.productionForm = this.fb.group({

      productionNo: [
        '',
        Validators.required
      ],

      productionDate: [
        '',
        Validators.required
      ],

      warehouse: [
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

      supplierName: [
        ''
      ],

      invoiceNo: [
        ''
      ],

      batchNo: [
        ''
      ],

      availableWeightKg: [
        0
      ],

      rawWeightUsedKg: [
        0,
        [
          Validators.required,
          Validators.min(0.001)
        ]
      ],

      variantName: [
        ''
      ],

      skuCode: [
        ''
      ],
      finishedGoodsBatchNo: [
        '',
        Validators.required
      ],
      packSize: [
        ''
      ],

      weightInGrams: [
        0
      ],

      packsProduced: [
        0
      ],

      rejectedPacks: [
        0
      ],

      totalProducedWeightKg: [
        0
      ],

      wasteKg: [
        0
      ],

      remarks: [
        ''
      ],

      status: [
        'Completed'
      ]

    });

  }


  // =====================================================
  // GET WAREHOUSES
  // =====================================================

  getWarehouses(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Warehouse Response:',
            res
          );


          if (res?.success) {

            this.warehouseList =
              res.data || [];

          }

          else if (Array.isArray(res)) {

            this.warehouseList =
              res;

          }

          else {

            this.warehouseList =
              res?.data || [];

          }


          // =================================================
          // AFTER WAREHOUSE LIST LOAD
          // GET PRODUCTION
          // =================================================

          this.getProductionById();

        },


        error: (error) => {

          console.log(
            'Warehouse Error:',
            error
          );

          this.warehouseList = [];

          this.popup.error(
            'Unable to load Warehouses.'
          );

        }

      });

  }


  // =====================================================
  // GET PRODUCTION BY ID
  // =====================================================

  getProductionById(): void {

    console.log(
      'Getting Production:',
      this.productionId
    );


    this.productionService
      .getProductionById(
        this.productionId
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Production By ID Response:',
            res
          );


          if (!res?.success) {

            this.popup.error(
              res?.message ||
              'Unable to load Production.'
            );

            return;

          }


          const production =
            res.data;


          console.log(
            'Production Data:',
            production
          );


          if (!production) {

            this.popup.error(
              'Production data not found.'
            );

            return;

          }


          // =================================================
          // WAREHOUSE ID
          // =================================================

          const warehouseId =
            production.warehouse?._id ||
            production.warehouse ||
            '';


          this.originalWarehouseId =
            warehouseId;


          console.log(
            'Warehouse ID:',
            warehouseId
          );


          // =================================================
          // RAW MATERIAL ID
          // =================================================

          const rawMaterialData =
            production
              .rawMaterials?.[0]
              ?.rawMaterial;


          const rawMaterialId =
            rawMaterialData?._id ||
            rawMaterialData ||
            '';


          this.originalRawMaterialId =
            rawMaterialId;


          console.log(
            'Raw Material Object:',
            rawMaterialData
          );


          console.log(
            'Raw Material ID:',
            rawMaterialId
          );


          // =================================================
          // STOCK RECEIVE ID
          // =================================================

          const stockReceiveData =
            production
              .rawMaterials?.[0]
              ?.stockReceive;


          const stockReceiveId =
            stockReceiveData?._id ||
            stockReceiveData ||
            '';


          this.originalStockReceiveId =
            stockReceiveId;


          console.log(
            'Stock Receive Object:',
            stockReceiveData
          );


          console.log(
            'Stock Receive ID:',
            stockReceiveId
          );


          // =================================================
          // RAW MATERIAL OBJECT
          // =================================================

          const rawMaterialItem =
            production.rawMaterials?.[0];


          // =================================================
          // PATCH BASIC PRODUCTION DATA
          // =================================================

          this.productionForm.patchValue({

            productionNo:
              production.productionNo || '',

            productionDate:
              production.productionDate
                ? new Date(
                  production.productionDate
                )
                  .toISOString()
                  .substring(0, 10)
                : '',

            warehouse:
              warehouseId,

            supplierName:
              this.getSupplierName(
                stockReceiveData
              ),

            invoiceNo:
              stockReceiveData?.invoiceNo ||
              '',

            batchNo:
              rawMaterialItem?.batchNo ||
              '',

            availableWeightKg:
              Number(
                rawMaterialItem
                  ?.availableWeightKg || 0
              ),

            rawWeightUsedKg:
              Number(
                production.rawWeightUsedKg || 0
              ),

            totalProducedWeightKg:
              Number(
                production
                  .totalProducedWeightKg || 0
              ),

            wasteKg:
              Number(
                production.wasteKg || 0
              ),

            remarks:
              production.remarks || '',

            status:
              production.status ||
              'Completed'

          });


          // =================================================
          // PATCH PRODUCTION ITEMS
          // =================================================

          this.productionItems =
            (production.productionItems || [])
              .map(
                (item: any) => ({

                  _id:
                    item._id,

                  variantId:
                    item.variantId,

                  variantName:
                    item.variantName || '',

                  skuCode:
                    item.skuCode || '',

                  packSize:
                    item.packSize || '',

                  weightInGrams:
                    Number(
                      item.weightInGrams || 0
                    ),

                  packsProduced:
                    Number(
                      item.packsProduced || 0
                    ),

                  rejectedPacks:
                    Number(
                      item.rejectedPacks || 0
                    ),

                  totalWeightUsedKg:
                    Number(
                      item.totalWeightUsedKg || 0
                    )

                })
              );


          console.log(
            'Production Items:',
            this.productionItems
          );


          // =================================================
          // UPDATE SUMMARY
          // =================================================

          this.updateSummary();


          // =================================================
          // IMPORTANT
          //
          // WAREHOUSE SELECTED
          // LOAD RAW MATERIALS
          // =================================================

          if (warehouseId) {

            this.loadRawMaterialsForUpdate(

              warehouseId,

              rawMaterialId,

              stockReceiveId

            );

          }

          else {

            console.log(
              'Warehouse ID not available.'
            );

          }


          console.log(
            'Updated Form:',
            this.productionForm.getRawValue()
          );

        },


        error: (error) => {

          console.log(
            'Get Production Error:',
            error
          );


          this.popup.error(

            error?.error?.message ||

            'Unable to load Production.'

          );

        }

      });

  }


  // =====================================================
  // GET SUPPLIER NAME
  // =====================================================

  getSupplierName(
    stockReceive: any
  ): string {

    if (!stockReceive) {

      return '';

    }


    const supplier =
      stockReceive.supplier;


    if (!supplier) {

      return '';

    }


    if (
      typeof supplier === 'object'
    ) {

      return (

        supplier.supplierName ||

        supplier.name ||

        supplier._id ||

        ''

      );

    }


    return supplier;

  }


  // =====================================================
  // LOAD RAW MATERIALS FOR UPDATE
  // =====================================================

  loadRawMaterialsForUpdate(

    warehouseId: string,

    rawMaterialId: string,

    stockReceiveId: string

  ): void {

    console.log(
      'Loading Raw Materials:',
      {
        warehouseId,
        rawMaterialId,
        stockReceiveId
      }
    );


    this.productionService
      .getWarehouseRawMaterials(
        warehouseId
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Warehouse Raw Materials:',
            res
          );


          if (res?.success) {

            this.rawMaterialList =
              res.data || [];

          }

          else if (Array.isArray(res)) {

            this.rawMaterialList =
              res;

          }

          else {

            this.rawMaterialList =
              res?.data || [];

          }


          console.log(
            'Raw Material List:',
            this.rawMaterialList
          );


          // =================================================
          // FIND EXISTING RAW MATERIAL
          // =================================================

          const matchedRawMaterial =
            this.rawMaterialList.find(
              (item: any) =>
                item._id === rawMaterialId
            );


          console.log(
            'Matched Raw Material:',
            matchedRawMaterial
          );


          if (matchedRawMaterial) {

            this.productionForm.patchValue({

              rawMaterial:
                matchedRawMaterial._id

            });

          }

          else if (rawMaterialId) {

            // =================================================
            // EVEN IF NOT FOUND IN LIST
            // PATCH ORIGINAL ID
            // =================================================

            this.productionForm.patchValue({

              rawMaterial:
                rawMaterialId

            });

          }


          console.log(
            'Raw Material patched:',
            this.productionForm
              .get('rawMaterial')
              ?.value
          );


          // =================================================
          // LOAD AVAILABLE STOCK
          // =================================================

          if (
            rawMaterialId
          ) {

            this.loadAvailableStockForUpdate(

              warehouseId,

              rawMaterialId,

              stockReceiveId

            );

          }

        },


        error: (error) => {

          console.log(
            'Warehouse Raw Material Error:',
            error
          );


          this.rawMaterialList = [];


          this.popup.error(

            error?.error?.message ||

            'Unable to load Raw Materials.'

          );

        }

      });

  }


  // =====================================================
  // LOAD AVAILABLE STOCK
  // =====================================================

  loadAvailableStockForUpdate(

    warehouseId: string,

    rawMaterialId: string,

    stockReceiveId: string

  ): void {

    console.log(
      'Loading Available Stock:',
      {
        warehouseId,
        rawMaterialId,
        stockReceiveId
      }
    );


    this.productionService
      .getAvailableStock(

        warehouseId,

        rawMaterialId

      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Available Stock Response:',
            res
          );


          if (res?.success) {

            this.stockReceiveList =
              res.data || [];

          }

          else if (Array.isArray(res)) {

            this.stockReceiveList =
              res;

          }

          else {

            this.stockReceiveList =
              res?.data || [];

          }


          console.log(
            'Stock Receive List:',
            this.stockReceiveList
          );


          // =================================================
          // FIND EXISTING STOCK RECEIVE
          // =================================================

          const matchedStock =
            this.stockReceiveList.find(
              (item: any) =>

                (
                  item.stockReceiveId ||
                  item._id
                ) === stockReceiveId

            );


          console.log(
            'Matched Stock Receive:',
            matchedStock
          );


          if (matchedStock) {

            this.selectedStockReceive =
              matchedStock;


            this.patchStockReceiveData(
              matchedStock
            );

          }

          else {

            // =================================================
            // IF AVAILABLE STOCK API DOES NOT RETURN
            // THE EXISTING STOCK RECEIVE
            //
            // KEEP THE ORIGINAL STOCK RECEIVE ID
            // =================================================

            this.productionForm.patchValue({

              stockReceive:
                stockReceiveId

            });


            console.log(
              'Stock Receive ID patched directly:',
              stockReceiveId
            );

          }


          console.log(
            'Final Form:',
            this.productionForm.getRawValue()
          );

        },


        error: (error) => {

          console.log(
            'Available Stock Error:',
            error
          );


          this.stockReceiveList = [];


          // =================================================
          // STILL PATCH EXISTING STOCK RECEIVE ID
          // =================================================

          if (stockReceiveId) {

            this.productionForm.patchValue({

              stockReceive:
                stockReceiveId

            });

          }

        }

      });

  }


  // =====================================================
  // PATCH STOCK RECEIVE DATA
  // =====================================================

  patchStockReceiveData(
    stock: any
  ): void {

    if (!stock) {

      return;

    }


    const stockReceiveId =
      stock.stockReceiveId ||
      stock._id ||
      '';


    let supplierName = '';


    if (stock.supplier) {

      if (
        typeof stock.supplier === 'object'
      ) {

        supplierName =
          stock.supplier.supplierName ||
          stock.supplier.name ||
          stock.supplier._id ||
          '';

      }

      else {

        supplierName =
          stock.supplier;

      }

    }


    this.productionForm.patchValue({

      stockReceive:
        stockReceiveId,

      supplierName:
        supplierName,

      invoiceNo:
        stock.invoiceNo || '',

      batchNo:
        stock.batchNo || '',

      availableWeightKg:
        Number(
          stock.availableWeightKg || 0
        )

    });


    this.selectedStockReceive =
      stock;


    console.log(
      'Stock Receive patched:',
      this.productionForm
        .get('stockReceive')
        ?.value
    );

  }


  // =====================================================
  // WAREHOUSE CHANGE
  // =====================================================

  onWarehouseChange(
    warehouseId: string
  ): void {

    console.log(
      'Warehouse Changed:',
      warehouseId
    );


    this.rawMaterialList = [];

    this.stockReceiveList = [];

    this.selectedStockReceive = null;


    this.productionForm.patchValue({

      rawMaterial: '',

      stockReceive: '',

      supplierName: '',

      invoiceNo: '',

      batchNo: '',

      availableWeightKg: 0,

      rawWeightUsedKg: 0

    });


    if (!warehouseId) {

      return;

    }


    this.productionService
      .getWarehouseRawMaterials(
        warehouseId
      )
      .subscribe({

        next: (res: any) => {

          if (res?.success) {

            this.rawMaterialList =
              res.data || [];

          }

          else if (Array.isArray(res)) {

            this.rawMaterialList =
              res;

          }

        },


        error: (error) => {

          console.log(
            'Warehouse Raw Material Error:',
            error
          );

          this.rawMaterialList = [];

        }

      });

  }


  // =====================================================
  // RAW MATERIAL CHANGE
  // =====================================================

  onRawMaterialChange(
    rawMaterialId: string
  ): void {

    console.log(
      'Raw Material Changed:',
      rawMaterialId
    );


    this.stockReceiveList = [];

    this.selectedStockReceive = null;


    this.productionForm.patchValue({

      stockReceive: '',

      supplierName: '',

      invoiceNo: '',

      batchNo: '',

      availableWeightKg: 0

    });


    if (!rawMaterialId) {

      return;

    }


    const warehouseId =
      this.productionForm
        .get('warehouse')
        ?.value;


    if (!warehouseId) {

      this.popup.warning(
        'Please select Warehouse first.'
      );

      return;

    }


    this.productionService
      .getAvailableStock(

        warehouseId,

        rawMaterialId

      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Available Stock:',
            res
          );


          if (res?.success) {

            this.stockReceiveList =
              res.data || [];

          }

          else if (Array.isArray(res)) {

            this.stockReceiveList =
              res;

          }

        },


        error: (error) => {

          console.log(
            'Available Stock Error:',
            error
          );

          this.stockReceiveList = [];

        }

      });

  }


  // =====================================================
  // STOCK RECEIVE CHANGE
  // =====================================================

  onStockReceiveChange(
    stockReceiveId: string
  ): void {

    console.log(
      'Stock Receive Changed:',
      stockReceiveId
    );


    this.selectedStockReceive =
      this.stockReceiveList.find(
        (item: any) =>
          (
            item.stockReceiveId ||
            item._id
          ) === stockReceiveId
      );


    if (
      !this.selectedStockReceive
    ) {

      return;

    }


    this.patchStockReceiveData(
      this.selectedStockReceive
    );

  }


  // =====================================================
  // RAW WEIGHT CHANGE
  // =====================================================

  onWeightUsedChange(): void {

    const availableWeight =
      Number(
        this.productionForm
          .get('availableWeightKg')
          ?.value || 0
      );


    const usedWeight =
      Number(
        this.productionForm
          .get('rawWeightUsedKg')
          ?.value || 0
      );


    const control =
      this.productionForm
        .get('rawWeightUsedKg');


    if (
      usedWeight >
      availableWeight
    ) {

      control?.setErrors({

        maxStock: true

      });

    }

    else if (
      usedWeight <= 0
    ) {

      control?.setErrors({

        min: true

      });

    }

    else {

      control?.setErrors(null);

    }


    this.updateSummary();

  }


  // =====================================================
  // CALCULATE CURRENT VARIANT
  // =====================================================

  calculateCurrentVariantWeight(): number {

    const weightInGrams =
      Number(
        this.productionForm
          .get('weightInGrams')
          ?.value || 0
      );


    const packsProduced =
      Number(
        this.productionForm
          .get('packsProduced')
          ?.value || 0
      );


    return Number(
      (
        weightInGrams *
        packsProduced /
        1000
      ).toFixed(3)
    );

  }


  // =====================================================
  // PACKS CHANGE
  // =====================================================

  onPacksProducedChange(): void {

    this.calculateCurrentVariantWeight();

  }


  // =====================================================
  // ADD VARIANT
  // =====================================================

  addVariant(): void {


    // ================================================
    // CHECK STOCK RECEIVE
    // ================================================

    const stockReceiveId =

      this.productionForm
        .get('stockReceive')
        ?.value;


    if (!stockReceiveId) {

      this.popup.warning(
        'Please select Stock Receive first.'
      );

      return;

    }


    // ================================================
    // RAW MATERIAL USED
    // ================================================

    const rawWeightUsedKg =

      Number(

        this.productionForm
          .get('rawWeightUsedKg')
          ?.value || 0

      );


    if (
      rawWeightUsedKg <= 0
    ) {

      this.popup.warning(
        'Please enter Raw Material Used Weight.'
      );

      return;

    }


    // ================================================
    // VARIANT NAME
    // ================================================

    const variantName =

      String(

        this.productionForm
          .get('variantName')
          ?.value || ''

      ).trim();


    // ================================================
    // SKU
    // ================================================

    const skuCode =

      String(

        this.productionForm
          .get('skuCode')
          ?.value || ''

      ).trim();


    // ================================================
    // PACK SIZE
    // ================================================

    const packSize =

      String(

        this.productionForm
          .get('packSize')
          ?.value || ''

      ).trim();


    // ================================================
    // WEIGHT
    // ================================================

    const weightInGrams =

      Number(

        this.productionForm
          .get('weightInGrams')
          ?.value || 0

      );


    // ================================================
    // PACKS
    // ================================================

    const packsProduced =

      Number(

        this.productionForm
          .get('packsProduced')
          ?.value || 0

      );


    // ================================================
    // REJECTED PACKS
    // ================================================

    const rejectedPacks =

      Number(

        this.productionForm
          .get('rejectedPacks')
          ?.value || 0

      );


    // ================================================
    // VALIDATIONS
    // ================================================

    if (!variantName) {

      this.popup.warning(
        'Please enter Variant Name.'
      );

      return;

    }


    if (!skuCode) {

      this.popup.warning(
        'Please enter SKU Code.'
      );

      return;

    }
    // ================================================
    // FINISHED GOODS BATCH
    // ================================================

    const finishedGoodsBatchNo =
      String(
        this.productionForm
          .get('finishedGoodsBatchNo')
          ?.value || ''
      ).trim();

    if (!finishedGoodsBatchNo) {

      this.popup.warning(
        'Please enter Finished Goods Batch Number.'
      );

      return;

    }

    if (!packSize) {

      this.popup.warning(
        'Please enter Pack Size.'
      );

      return;

    }


    if (
      weightInGrams <= 0
    ) {

      this.popup.warning(
        'Weight / Pack must be greater than 0.'
      );

      return;

    }


    if (
      packsProduced <= 0
    ) {

      this.popup.warning(
        'Packs Produced must be greater than 0.'
      );

      return;

    }


    if (
      rejectedPacks < 0
    ) {

      this.popup.warning(
        'Rejected Packs cannot be negative.'
      );

      return;

    }


    if (
      rejectedPacks >
      packsProduced
    ) {

      this.popup.warning(
        'Rejected Packs cannot be greater than Produced Packs.'
      );

      return;

    }


    // ================================================
    // DUPLICATE SKU
    // ================================================

    const duplicateSku =

      this.productionItems.some(

        (item: ProductionItem) =>

          item.skuCode
            .toLowerCase() ===

          skuCode
            .toLowerCase()

      );


    if (duplicateSku) {

      this.popup.warning(

        `SKU ${skuCode} already added.`

      );

      return;

    }


    // ================================================
    // CALCULATE VARIANT WEIGHT
    //
    // Example:
    // 10g × 2000 = 20 KG
    // ================================================

    const totalWeightUsedKg =

      (
        weightInGrams *
        packsProduced
      ) / 1000;


    // ================================================
    // EXISTING PRODUCED WEIGHT
    // ================================================

    const existingProducedWeight =

      this.getTotalProducedWeight();


    // ================================================
    // NEW TOTAL
    // ================================================

    const newTotalProducedWeight =

      existingProducedWeight +
      totalWeightUsedKg;


    // ================================================
    // OUTPUT CANNOT EXCEED RAW MATERIAL USED
    // ================================================

    if (
      newTotalProducedWeight >
      rawWeightUsedKg
    ) {

      this.popup.warning(

        `Production output cannot exceed Raw Material Used. ` +

        `Raw Used: ${rawWeightUsedKg.toFixed(3)} KG, ` +

        `Already Produced: ${existingProducedWeight.toFixed(3)} KG, ` +

        `Current Variant: ${totalWeightUsedKg.toFixed(3)} KG`

      );

      return;

    }


    // ================================================
    // CREATE VARIANT OBJECT
    // ================================================

    const newVariant: ProductionItem = {

      variantName:
        variantName,

      skuCode:
        skuCode.toUpperCase(),
      batchNo:
        finishedGoodsBatchNo,
      packSize:
        packSize,

      weightInGrams:
        weightInGrams,

      packsProduced:
        packsProduced,

      totalWeightUsedKg:

        Number(
          totalWeightUsedKg.toFixed(3)
        ),

      rejectedPacks:
        rejectedPacks

    };


    // ================================================
    // ADD TO TABLE
    // ================================================

    this.productionItems.push(
      newVariant
    );


    console.log(
      'Production Variants:',
      this.productionItems
    );


    // ================================================
    // RESET ONLY VARIANT INPUTS
    // ================================================

    this.resetVariantFields();


    // ================================================
    // UPDATE SUMMARY
    // ================================================

    this.updateSummary();

  }


  // =====================================================
  // RESET VARIANT
  // =====================================================

  resetVariantFields(): void {

    this.productionForm.patchValue({

      variantName: '',

      skuCode: '',
      finishedGoodsBatchNo: '',

      packSize: '',

      weightInGrams: 0,

      packsProduced: 0,

      rejectedPacks: 0

    });

  }


  // =====================================================
  // REMOVE VARIANT
  // =====================================================

  removeVariant(
    index: number
  ): void {

    if (
      index < 0 ||
      index >= this.productionItems.length
    ) {

      return;

    }


    this.productionItems.splice(
      index,
      1
    );


    this.updateSummary();

  }


  // =====================================================
  // TOTAL PRODUCED WEIGHT
  // =====================================================

  getTotalProducedWeight(): number {

    return this.productionItems.reduce(

      (
        total: number,
        item: ProductionItem
      ) => {

        return (

          total +

          Number(
            item.totalWeightUsedKg || 0
          )

        );

      },

      0

    );

  }


  // =====================================================
  // TOTAL REJECTED WEIGHT
  // =====================================================

  getTotalRejectedWeight(): number {

    return this.productionItems.reduce(

      (
        total: number,
        item: ProductionItem
      ) => {

        const rejectedWeight =
          (
            Number(
              item.weightInGrams || 0
            ) *
            Number(
              item.rejectedPacks || 0
            )
          ) / 1000;


        return (
          total +
          rejectedWeight
        );

      },

      0

    );

  }


  // =====================================================
  // UPDATE SUMMARY
  // =====================================================

  updateSummary(): void {

    const rawWeight =
      Number(
        this.productionForm
          .get('rawWeightUsedKg')
          ?.value || 0
      );


    const producedWeight =
      this.getTotalProducedWeight();


    let waste =
      rawWeight -
      producedWeight;


    if (waste < 0) {

      waste = 0;

    }


    this.summary = {

      rawWeight:
        Number(
          rawWeight.toFixed(3)
        ),

      producedWeight:
        Number(
          producedWeight.toFixed(3)
        ),

      waste:
        Number(
          waste.toFixed(3)
        ),

      remaining:
        Number(
          Math.max(
            0,
            rawWeight -
            producedWeight
          ).toFixed(3)
        )

    };


    this.productionForm.patchValue({

      totalProducedWeightKg:
        Number(
          producedWeight.toFixed(3)
        ),

      wasteKg:
        Number(
          waste.toFixed(3)
        )

    }, {

      emitEvent: false

    });

  }


  // =====================================================
  // REMAINING STOCK
  // =====================================================

  getRemainingWeight(): number {

    const availableWeight =
      Number(
        this.productionForm
          .get('availableWeightKg')
          ?.value || 0
      );


    const usedWeight =
      Number(
        this.productionForm
          .get('rawWeightUsedKg')
          ?.value || 0
      );


    return Number(

      Math.max(
        0,
        availableWeight -
        usedWeight
      ).toFixed(3)

    );

  }


  // =====================================================
  // UPDATE PRODUCTION
  // =====================================================

  updateProduction(): void {

    console.log(
      '======================================'
    );

    console.log(
      'UPDATE PRODUCTION CLICK'
    );

    console.log(
      '======================================'
    );


    const form =
      this.productionForm
        .getRawValue();


    console.log(
      'FORM:',
      form
    );


    // =====================================================
    // VALIDATIONS
    // =====================================================

    if (!form.productionNo) {

      this.popup.warning(
        'Production Number is required.'
      );

      return;

    }


    if (!form.productionDate) {

      this.popup.warning(
        'Production Date is required.'
      );

      return;

    }


    if (!form.warehouse) {

      this.popup.warning(
        'Please select Warehouse.'
      );

      return;

    }


    if (!form.rawMaterial) {

      this.popup.warning(
        'Please select Raw Material.'
      );

      return;

    }


    if (!form.stockReceive) {

      this.popup.warning(
        'Please select Stock Receive.'
      );

      return;

    }


    if (!form.batchNo) {

      this.popup.warning(
        'Batch Number is required.'
      );

      return;

    }


    const availableWeightKg =
      Number(
        form.availableWeightKg || 0
      );


    const rawWeightUsedKg =
      Number(
        form.rawWeightUsedKg || 0
      );


    if (
      rawWeightUsedKg <= 0
    ) {

      this.popup.warning(
        'Please enter Raw Material Used Weight.'
      );

      return;

    }


    if (
      rawWeightUsedKg >
      availableWeightKg
    ) {

      this.popup.warning(
        `Only ${availableWeightKg} KG is available.`
      );

      return;

    }


    if (
      !this.productionItems ||
      this.productionItems.length === 0
    ) {

      this.popup.warning(
        'Please add at least one Production Variant.'
      );

      return;

    }


    const totalProducedWeightKg =
      Number(
        this.getTotalProducedWeight()
          .toFixed(3)
      );


    if (
      totalProducedWeightKg >
      rawWeightUsedKg
    ) {

      this.popup.warning(
        'Produced Weight cannot exceed Raw Material Used.'
      );

      return;

    }


    const wasteKg =
      Number(
        (
          rawWeightUsedKg -
          totalProducedWeightKg
        ).toFixed(3)
      );


    // =====================================================
    // RAW MATERIAL ITEM
    // =====================================================

    const rawMaterialItem = {

      stockReceive:
        form.stockReceive,

      rawMaterial:
        form.rawMaterial,

      batchNo:
        form.batchNo,

      availableWeightKg:
        Number(
          availableWeightKg.toFixed(3)
        ),

      weightUsedKg:
        Number(
          rawWeightUsedKg.toFixed(3)
        )

    };


    // =====================================================
    // PRODUCTION ITEMS
    // =====================================================

    const productionItems =
      this.productionItems.map(
        (item: ProductionItem) => {

          const weightInGrams =
            Number(
              item.weightInGrams || 0
            );


          const packsProduced =
            Number(
              item.packsProduced || 0
            );


          const totalWeightUsedKg =
            Number(
              (
                weightInGrams *
                packsProduced /
                1000
              ).toFixed(3)
            );


          return {

            // Keep existing _id if present
            ...(item as any)._id
              ? {
                _id:
                  (item as any)._id
              }
              : {},

            variantName:
              String(
                item.variantName || ''
              ).trim(),

            skuCode:
              String(
                item.skuCode || ''
              )
                .trim()
                .toUpperCase(),

            packSize:
              String(
                item.packSize || ''
              ).trim(),

            weightInGrams:
              weightInGrams,

            packsProduced:
              packsProduced,

            rejectedPacks:
              Number(
                item.rejectedPacks || 0
              ),

            totalWeightUsedKg:
              totalWeightUsedKg

          };

        }
      );


    // =====================================================
    // FINAL PAYLOAD
    // =====================================================

    const payload: any = {

      productionNo:
        form.productionNo,

      productionDate:
        form.productionDate,

      warehouse:
        form.warehouse,

      rawMaterials: [

        rawMaterialItem

      ],

      rawWeightUsedKg:
        Number(
          rawWeightUsedKg.toFixed(3)
        ),

      productionItems:
        productionItems,

      totalProducedWeightKg:
        Number(
          totalProducedWeightKg.toFixed(3)
        ),

      wasteKg:
        Number(
          wasteKg.toFixed(3)
        ),

      remarks:
        form.remarks || '',

      status:
        form.status ||
        'Completed'

    };


    console.log(
      '======================================'
    );

    console.log(
      'UPDATE PRODUCTION PAYLOAD'
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    console.log(
      '======================================'
    );


    // =====================================================
    // UPDATE API
    // =====================================================

    this.productionService
      .updateProduction(
        this.productionId,
        payload
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'UPDATE PRODUCTION RESPONSE:',
            res
          );


          if (res?.success) {

            this.popup.success(
              'Production Updated Successfully.'
            );


            setTimeout(() => {

              this.router.navigate([
                '/admin/production'
              ]);

            }, 500);

          }

          else {

            this.popup.error(

              res?.message ||

              'Production update failed.'

            );

          }

        },


        error: (error) => {

          console.log(
            'UPDATE PRODUCTION ERROR:',
            error
          );


          console.log(
            'BACKEND ERROR:',
            error?.error
          );


          this.popup.error(

            error?.error?.message ||

            'Unable to update Production.'

          );

        }

      });

  }


  // =====================================================
  // RESET FORM
  // =====================================================

  resetForm(): void {

    this.productionItems = [];

    this.rawMaterialList = [];

    this.stockReceiveList = [];

    this.selectedStockReceive = null;


    this.summary = {

      rawWeight: 0,

      producedWeight: 0,

      waste: 0,

      remaining: 0

    };


    this.productionForm.reset({

      productionNo: '',

      productionDate:
        new Date()
          .toISOString()
          .substring(0, 10),

      warehouse: '',

      rawMaterial: '',

      stockReceive: '',

      supplierName: '',

      invoiceNo: '',

      batchNo: '',

      availableWeightKg: 0,

      rawWeightUsedKg: 0,

      variantName: '',

      skuCode: '',

      packSize: '',

      weightInGrams: 0,

      packsProduced: 0,

      rejectedPacks: 0,

      totalProducedWeightKg: 0,

      wasteKg: 0,

      remarks: '',

      status: 'Completed'

    });

  }


  // =====================================================
  // VALIDATION HELPER
  // =====================================================

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.productionForm
        .get(controlName);


    return !!(

      control &&

      control.invalid &&

      (
        control.touched ||
        control.dirty
      )

    );

  }


  // =====================================================
  // TRACK BY
  // =====================================================

  trackById(
    index: number,
    item: ProductionItem
  ): any {

    return (

      (item as any)?._id ||

      (item as any)?.skuCode ||

      index

    );

  }

}