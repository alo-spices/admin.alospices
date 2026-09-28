import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import { ProductionItem, ProductionRawMaterial, Production } from 'src/app/Models/Production';
import {
  Production,
  ProductionItem,
  ProductionRawMaterial,
  ProductionStock,
  ProductionSummary
} from '../../Models/Production';
import { RawMaterial } from 'src/app/Models/RawMaterial';
import { Warehouse } from 'src/app/Models/Warehouse';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { ProductionService } from 'src/app/Services/production.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { StockReceiveService } from 'src/app/Services/stock-receive.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';


@Component({
  selector: 'app-production-create',
  templateUrl: './production-create.component.html',
  styleUrls: ['./production-create.component.css']
})
export class ProductionCreateComponent implements OnInit {



  // =====================================================
  // FORM
  // =====================================================

  productionForm!: FormGroup;


  // =====================================================
  // DROPDOWN LISTS
  // =====================================================

  warehouseList: any[] = [];

  rawMaterialList: any[] = [];

  stockReceiveList: any[] = [];


  // =====================================================
  // SELECTED STOCK RECEIVE
  // =====================================================

  selectedStockReceive: any = null;


  // =====================================================
  // PRODUCTION VARIANTS
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
  // CONSTRUCTOR
  // =====================================================

  constructor(

    private fb: FormBuilder,

    private warehouseService: WarehouseService,

    private productionService: ProductionService,

    private popup: CommomPopupService,

    private router: Router,
    private rawmaterial: RawMaterialService


  ) { }


  // =====================================================
  // NG ON INIT
  // =====================================================

  ngOnInit(): void {

    this.initializeForm();

    this.loadCurrentDate();

    this.generateProductionNo();

    this.getWarehouses();

  }


  // =====================================================
  // INITIALIZE FORM
  // =====================================================

  initializeForm(): void {

    this.productionForm = this.fb.group({


      // ================================================
      // PRODUCTION INFORMATION
      // ================================================

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


      // ================================================
      // RAW MATERIAL
      // ================================================

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


      // ================================================
      // NEW VARIANT
      // ================================================

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


      // ================================================
      // SUMMARY
      // ================================================

      totalProducedWeightKg: [
        0
      ],

      wasteKg: [
        0
      ],


      // ================================================
      // REMARKS
      // ================================================

      remarks: [
        ''
      ]

    });

  }


  // =====================================================
  // CURRENT DATE
  // =====================================================

  loadCurrentDate(): void {

    const today = new Date()
      .toISOString()
      .substring(0, 10);


    this.productionForm.patchValue({

      productionDate: today

    });

  }


  // =====================================================
  // GENERATE PRODUCTION NUMBER
  // =====================================================

  generateProductionNo(): void {

    const productionNo =
      'PROD-' +
      Date.now()
        .toString()
        .slice(-6);

    this.productionForm.patchValue({
      productionNo: productionNo
    });

    console.log(
      'Generated Production No:',
      productionNo
    );
  }


  // =====================================================
  // FALLBACK PRODUCTION NUMBER
  // =====================================================

  private generateFallbackProductionNo(): void {

    const productionNo =

      'PROD-' +

      Date.now()
        .toString()
        .slice(-6);


    this.productionForm.patchValue({

      productionNo:
        productionNo

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


          if (
            res?.success
          ) {

            this.warehouseList =
              res.data || [];

          }

          else if (
            Array.isArray(res)
          ) {

            this.warehouseList =
              res;

          }

          else {

            this.warehouseList =
              res?.data || [];

          }

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
  // WAREHOUSE CHANGE
  // =====================================================

  onWarehouseChange(
    warehouseId: string
  ): void {


    // ================================================
    // RESET CHILD DATA
    // ================================================

    this.rawMaterialList = [];

    this.stockReceiveList = [];

    this.selectedStockReceive = null;

    this.productionItems = [];


    this.productionForm.patchValue({

      rawMaterial: '',

      stockReceive: '',

      supplierName: '',

      invoiceNo: '',

      batchNo: '',

      availableWeightKg: 0,

      rawWeightUsedKg: 0

    });


    this.resetVariantFields();

    this.updateSummary();


    if (!warehouseId) {

      return;

    }


    // ================================================
    // GET RAW MATERIALS AVAILABLE IN WAREHOUSE
    // ================================================

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


          if (
            res?.success
          ) {

            this.rawMaterialList =
              res.data || [];

          }

          else if (
            Array.isArray(res)
          ) {

            this.rawMaterialList =
              res;

          }

          else {

            this.rawMaterialList =
              res?.data || [];

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
  // RAW MATERIAL CHANGE
  // =====================================================

  onRawMaterialChange(
    rawMaterialId: string
  ): void {


    this.stockReceiveList = [];

    this.selectedStockReceive = null;

    this.productionItems = [];


    this.productionForm.patchValue({

      stockReceive: '',

      supplierName: '',

      invoiceNo: '',

      batchNo: '',

      availableWeightKg: 0,

      rawWeightUsedKg: 0

    });


    this.resetVariantFields();

    this.updateSummary();


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


    // ================================================
    // GET AVAILABLE STOCK
    // ================================================

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


          if (
            res?.success
          ) {

            this.stockReceiveList =
              res.data || [];

          }

          else if (
            Array.isArray(res)
          ) {

            this.stockReceiveList =
              res;

          }

          else {

            this.stockReceiveList =
              res?.data || [];

          }

        },


        error: (error) => {

          console.log(
            'Available Stock Error:',
            error
          );


          this.stockReceiveList = [];


          this.popup.error(

            error?.error?.message ||

            'Unable to load Available Stock.'

          );

        }

      });

  }


  // =====================================================
  // STOCK RECEIVE CHANGE
  // =====================================================

  onStockReceiveChange(
    stockReceiveId: string
  ): void {


    this.selectedStockReceive =
      this.stockReceiveList.find(
        (item: any) =>
          (
            item.stockReceiveId ||
            item._id
          ) === stockReceiveId
      );


    console.log(
      'Selected Stock Receive:',
      this.selectedStockReceive
    );


    if (
      !this.selectedStockReceive
    ) {

      this.productionForm.patchValue({

        supplierName: '',

        invoiceNo: '',

        batchNo: '',

        availableWeightKg: 0,

        rawWeightUsedKg: 0

      });


      this.updateSummary();


      return;

    }


    // ================================================
    // SUPPLIER NAME
    // ================================================

    let supplierName = '';


    if (
      this.selectedStockReceive.supplier
    ) {

      if (
        typeof this.selectedStockReceive.supplier
        === 'object'
      ) {

        supplierName =

          this.selectedStockReceive
            .supplier
            ?.supplierName || '';

      }

      else {

        supplierName =

          this.selectedStockReceive
            .supplier || '';

      }

    }


    // ================================================
    // STOCK DETAILS
    // ================================================

    const invoiceNo =

      this.selectedStockReceive
        .invoiceNo || '';


    const batchNo =

      this.selectedStockReceive
        .batchNo || '';


    const availableWeightKg =

      Number(

        this.selectedStockReceive
          .availableWeightKg || 0

      );


    // ================================================
    // PATCH FORM
    // ================================================

    this.productionForm.patchValue({

      supplierName:
        supplierName,

      invoiceNo:
        invoiceNo,

      batchNo:
        batchNo,

      availableWeightKg:
        availableWeightKg,

      rawWeightUsedKg:
        0

    });


    this.productionItems = [];


    this.resetVariantFields();

    this.updateSummary();

  }


  // =====================================================
  // RAW WEIGHT USED CHANGE
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


    // ================================================
    // GREATER THAN AVAILABLE STOCK
    // ================================================

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


    // ================================================
    // IF USER CHANGES RAW WEIGHT AFTER VARIANTS
    // ================================================

    const alreadyProducedWeight =

      this.getTotalProducedWeight();


    if (
      alreadyProducedWeight >
      usedWeight
    ) {

      this.popup.warning(

        `Already added variants use ` +
        `${alreadyProducedWeight.toFixed(3)} KG. ` +
        `Raw Material Used cannot be less than this.`

      );

    }


    this.updateSummary();

  }


  // =====================================================
  // CALCULATE CURRENT VARIANT WEIGHT
  // =====================================================

  calculateCurrentVariantWeight(): void {


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


    const producedWeightKg =

      (
        weightInGrams *
        packsProduced
      ) / 1000;


    console.log(
      'Current Variant Weight:',
      producedWeightKg
    );

  }


  // =====================================================
  // PACKS PRODUCED CHANGE
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
  // RESET VARIANT FIELDS
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
  // GET TOTAL PRODUCED WEIGHT
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
  // GET TOTAL REJECTED WEIGHT
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


    // ================================================
    // RAW MATERIAL USED
    // ================================================

    const rawWeight =

      Number(

        this.productionForm
          .get('rawWeightUsedKg')
          ?.value || 0

      );


    // ================================================
    // PRODUCED WEIGHT
    // ================================================

    const producedWeight =

      this.getTotalProducedWeight();


    // ================================================
    // WASTE
    //
    // For current flow:
    //
    // Raw Used = Produced + Waste
    //
    // Example:
    // 100 KG raw
    // 98 KG output
    // 2 KG waste
    // ================================================

    let waste =

      rawWeight -
      producedWeight;


    if (
      waste < 0
    ) {

      waste = 0;

    }


    // ================================================
    // REMAINING PRODUCTION QUANTITY
    //
    // This means how much selected raw quantity
    // still needs to be converted into variants.
    // ================================================

    let remaining =

      rawWeight -
      producedWeight;


    if (
      remaining < 0
    ) {

      remaining = 0;

    }


    // ================================================
    // SUMMARY OBJECT
    // ================================================

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
          remaining.toFixed(3)
        )

    };


    // ================================================
    // PATCH BACKEND FIELDS
    // ================================================

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
  // GET STOCK REMAINING AFTER PRODUCTION
  //
  // Example:
  // Stock Receive Available = 350 KG
  // Production Uses = 100 KG
  // Remaining Stock = 250 KG
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


    const remaining =

      availableWeight -
      usedWeight;


    return Number(

      Math.max(
        0,
        remaining
      ).toFixed(3)

    );

  }


  // =====================================================
  // CREATE PRODUCTION
  // =====================================================

  // =====================================================
  // CREATE PRODUCTION
  // =====================================================

  createProduction(): void {

    console.log('======================================');
    console.log('CREATE PRODUCTION CLICK');
    console.log('======================================');

    // =====================================================
    // FORM
    // =====================================================

    const form = this.productionForm.getRawValue();

    console.log('FORM VALUE:', form);
    console.log('PRODUCTION ITEMS:', this.productionItems);
    console.log('SELECTED STOCK:', this.selectedStockReceive);


    // =====================================================
    // BASIC VALIDATION
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
    if (
      !form.finishedGoodsBatchNo
    ) {

      this.popup.warning(
        'Finished Goods Batch Number is required.'
      );

      return;
    }

    // =====================================================
    // AVAILABLE STOCK
    // =====================================================

    const availableWeightKg =
      Number(
        form.availableWeightKg || 0
      );


    // =====================================================
    // RAW MATERIAL USED
    // =====================================================

    const rawWeightUsedKg =
      Number(
        form.rawWeightUsedKg || 0
      );


    if (rawWeightUsedKg <= 0) {

      this.popup.warning(
        'Please enter Raw Material Used Weight.'
      );

      return;
    }


    // =====================================================
    // STOCK VALIDATION
    // =====================================================

    if (
      rawWeightUsedKg >
      availableWeightKg
    ) {

      this.popup.warning(
        `Only ${availableWeightKg} KG is available.`
      );

      return;
    }


    // =====================================================
    // PRODUCTION VARIANTS
    // =====================================================

    if (
      !this.productionItems ||
      this.productionItems.length === 0
    ) {

      this.popup.warning(
        'Please add at least one Production Variant.'
      );

      return;
    }


    // =====================================================
    // TOTAL PRODUCED WEIGHT
    // =====================================================

    const totalProducedWeightKg =
      Number(
        this.getTotalProducedWeight()
          .toFixed(3)
      );


    // =====================================================
    // OUTPUT VALIDATION
    // =====================================================

    if (
      totalProducedWeightKg >
      rawWeightUsedKg
    ) {

      this.popup.warning(
        'Produced Weight cannot exceed Raw Material Used.'
      );

      return;
    }


    // =====================================================
    // WASTE
    // =====================================================

    const wasteKg =
      Number(
        (
          rawWeightUsedKg -
          totalProducedWeightKg
        ).toFixed(3)
      );


    // =====================================================
    // RAW MATERIAL OBJECT
    // =====================================================

    const rawMaterialItem = {

      stockReceive:
        form.stockReceive,

      rawMaterial:
        form.rawMaterial,

      batchNo:
        form.batchNo,

      // IMPORTANT
      // Backend schema requires this field
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

            variantName:
              String(
                item.variantName || ''
              ).trim(),

            skuCode:
              String(
                item.skuCode || ''
              ).trim()
                .toUpperCase(),
            batchNo:
              String(
                item.batchNo || ''
              ).trim(),
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


      // ===================================================
      // VERY IMPORTANT
      // ===================================================

      rawMaterials: [

        rawMaterialItem

      ],


      rawWeightUsedKg:
        Number(
          rawWeightUsedKg.toFixed(3)
        ),


      // ===================================================
      // PRODUCTION VARIANTS
      // ===================================================

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


    // =====================================================
    // FINAL PAYLOAD CONSOLE
    // =====================================================

    console.log(
      '======================================'
    );

    console.log(
      'FINAL PRODUCTION PAYLOAD'
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
    // API CALL
    // =====================================================

    this.productionService
      .createProduction(
        payload
      )
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (res: any) => {

          console.log(
            'CREATE PRODUCTION RESPONSE:',
            res
          );


          if (
            res?.success
          ) {

            this.popup.success(
              'Production Created Successfully.'
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
              'Production creation failed.'
            );

          }

        },


        // =================================================
        // ERROR
        // =================================================

        error: (error) => {

          console.log(
            'CREATE PRODUCTION ERROR:',
            error
          );


          console.log(
            'BACKEND ERROR:',
            error?.error
          );


          this.popup.error(

            error?.error?.message ||

            'Unable to create Production.'

          );

        }

      });

  }


  // =====================================================
  // RESET COMPLETE FORM
  // =====================================================

  resetForm(): void {


    // ================================================
    // CLEAR ARRAYS
    // ================================================

    this.productionItems = [];

    this.rawMaterialList = [];

    this.stockReceiveList = [];

    this.selectedStockReceive = null;


    // ================================================
    // RESET SUMMARY
    // ================================================

    this.summary = {

      rawWeight: 0,

      producedWeight: 0,

      waste: 0,

      remaining: 0

    };


    // ================================================
    // RESET FORM
    // ================================================

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

      remarks: ''

    });


    // ================================================
    // NEW PRODUCTION NUMBER
    // ================================================

    this.generateProductionNo();

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

      item?._id ||

      item?.skuCode ||

      index


    );

  }

}

