import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductionInstructionService } from 'src/app/Services/production-instruction.service';
import { ProductionService } from 'src/app/Services/production.service';

@Component({
  selector: 'app-warehouse-production-entry',
  templateUrl: './warehouse-production-entry.component.html',
  styleUrls: ['./warehouse-production-entry.component.css']
})
export class WarehouseProductionEntryComponent implements OnInit {
  warehouseName: string = '';

  // ==========================================
  // Production Instruction
  // ==========================================

  instruction: any = null;


  // ==========================================
  // Form
  // ==========================================

  productionForm!: FormGroup;


  // ==========================================
  // Instruction ID
  // ==========================================

  instructionId: string = '';


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;

  isSubmitting = false;


  // ==========================================
  // Submit
  // ==========================================

  isSubmitted = false;


  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private productionInstructionService:
      ProductionInstructionService,

    private productionService:
      ProductionService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();


    this.instructionId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    if (!this.instructionId) {

      this.alertService.error(
        'Production Instruction ID not found'
      );

      this.goBack();

      return;

    }


    this.getProductionInstruction();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.productionForm =
      this.fb.group({

        items: this.fb.array([]),

        remarks: [
          ''
        ]

      });

  }


  // ==========================================
  // Items FormArray
  // ==========================================

  get items(): FormArray {

    return this.productionForm
      .get('items') as FormArray;

  }


  // ==========================================
  // Get Instruction By ID
  // ==========================================

  getProductionInstruction(): void {

    this.isLoading = true;


    this.productionInstructionService
      .getProductionInstructionById(
        this.instructionId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Production Instruction:',
            response
          );


          this.instruction =
            response?.data || null;


          if (!this.instruction) {

            this.isLoading = false;

            this.alertService.error(
              'Production Instruction not found'
            );

            return;

          }


          // ======================================
          // Only Accepted Instruction
          // ======================================

          if (
            this.instruction.status !==
            'Accepted'
          ) {

            this.isLoading = false;

            this.alertService.warning(
              'Only accepted production instructions can be used for production entry.'
            );

            return;

          }


          this.patchProductionInstruction();


          this.isLoading = false;

        },

        error: (error: any) => {

          console.log(
            'Get Production Instruction Error:',
            error
          );


          this.isLoading = false;

          this.instruction = null;


          this.alertService.error(

            error?.error?.message ||
            'Failed to load production instruction'

          );

        }

      });

  }


  // ==========================================
  // Patch Instruction
  // ==========================================

  patchProductionInstruction(): void {

    this.items.clear();


    if (
      Array.isArray(
        this.instruction?.items
      )
    ) {

      this.instruction.items.forEach(
        (item: any) => {

          this.items.push(

            this.createProductionItem(
              item
            )

          );

        }
      );

    }


    this.productionForm.patchValue({

      remarks:
        this.instruction?.remarks || ''

    });

  }


  // ==========================================
  // Create Production Item
  // ==========================================

  createProductionItem(
    item: any
  ): FormGroup {

    return this.fb.group({

      // ======================================
      // Instruction References
      // ======================================

      rawMaterial: [

        item?.rawMaterial?._id ||
        item?.rawMaterial ||
        ''

      ],

      stockReceive: [

        item?.stockReceive?._id ||
        item?.stockReceive ||
        ''

      ],

      batchNo: [

        item?.batchNo || ''

      ],
      finishedGoodsBatchNo: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      variantName: [

        item?.variantName || ''

      ],

      skuCode: [

        item?.skuCode || ''

      ],

      packSize: [

        item?.packSize || ''

      ],

      weightInGrams: [

        item?.weightInGrams || 0

      ],

      targetPacks: [

        item?.targetPacks || 0

      ],

      targetWeightKg: [

        item?.targetWeightKg || 0

      ],


      // ======================================
      // Actual Production
      // ======================================

      packsProduced: [

        0,

        [

          Validators.required,

          Validators.min(1)

        ]

      ],

      rejectedPacks: [

        0,

        [

          Validators.required,

          Validators.min(0)

        ]

      ],

      totalWeightUsedKg: [

        0

      ]

    });

  }


  // ==========================================
  // Warehouse Display
  // ==========================================

  getWarehouseDisplay(): string {

    if (!this.instruction?.warehouse) {

      return '';

    }


    const warehouseName =
      this.instruction.warehouse
        .warehouseName || '';


    const warehouseCode =
      this.instruction.warehouse
        .warehouseCode || '';


    if (
      warehouseName &&
      warehouseCode
    ) {

      return `${warehouseName} - ${warehouseCode}`;

    }


    return warehouseName || warehouseCode;

  }


  // ==========================================
  // Raw Material Name
  // ==========================================

  getRawMaterialName(
    index: number
  ): string {

    return (

      this.instruction
        ?.items?.[index]
        ?.rawMaterial
        ?.rawMaterialName ||

      ''

    );

  }


  // ==========================================
  // Stock Receive Number
  // ==========================================

  getStockReceiveNumber(
    index: number
  ): string {

    return (

      this.instruction
        ?.items?.[index]
        ?.stockReceive
        ?.receiveNo ||

      ''

    );

  }


  // ==========================================
  // Calculate Production Weight
  // ==========================================

  calculateProductionWeight(
    index: number
  ): void {

    const item =
      this.items.at(index);


    const weightInGrams =
      Number(
        item.get('weightInGrams')?.value
      ) || 0;


    const packsProduced =
      Number(
        item.get('packsProduced')?.value
      ) || 0;


    const actualWeightKg =
      (
        weightInGrams *
        packsProduced
      ) / 1000;


    item.patchValue({

      totalWeightUsedKg:
        Number(
          actualWeightKg.toFixed(3)
        )

    });

  }


  // ==========================================
  // Get Actual Weight
  // ==========================================

  getActualWeight(index: number): number {

    const item =
      this.items.at(index);

    const weightInGrams =
      Number(
        item.get('weightInGrams')?.value
      ) || 0;

    const packsProduced =
      Number(
        item.get('packsProduced')?.value
      ) || 0;

    return Number(
      (
        weightInGrams *
        packsProduced /
        1000
      ).toFixed(3)
    );

  }

  // ==========================================
  // Get Total Actual Weight
  // ==========================================

  getTotalActualWeight(): number {

    let total = 0;


    this.items.controls.forEach(

      (item: any) => {

        const weightInGrams =
          Number(
            item.get('weightInGrams')?.value
          ) || 0;


        const packsProduced =
          Number(
            item.get('packsProduced')?.value
          ) || 0;


        total +=
          (
            weightInGrams *
            packsProduced
          ) / 1000;

      }

    );


    return Number(
      total.toFixed(3)
    );

  }


  // ==========================================
  // Get Total Rejected Weight
  // ==========================================

  getTotalRejectedWeight(): number {

    let total = 0;


    this.items.controls.forEach(

      (item: any) => {

        const weightInGrams =
          Number(
            item.get('weightInGrams')?.value
          ) || 0;


        const rejectedPacks =
          Number(
            item.get('rejectedPacks')?.value
          ) || 0;


        total +=
          (
            weightInGrams *
            rejectedPacks
          ) / 1000;

      }

    );


    return Number(
      total.toFixed(3)
    );

  }


  // ==========================================
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    if (!this.instruction) {

      this.alertService.error(
        'Production instruction not loaded'
      );

      return;

    }


    if (
      this.instruction.status !==
      'Accepted'
    ) {

      this.alertService.warning(
        'Production Instruction must be Accepted before production entry.'
      );

      return;

    }


    if (
      this.productionForm.invalid
    ) {

      this.productionForm
        .markAllAsTouched();


      this.alertService.validation(
        'Please enter production details'
      );

      return;

    }


    // ======================================
    // Calculate All Weights
    // ======================================

    this.items.controls.forEach(

      (_item: any, index: number) => {

        this.calculateProductionWeight(
          index
        );

      }

    );


    const formValue =
      this.productionForm
        .getRawValue();


    // ======================================
    // Generate Production Number
    // ======================================

    const productionNo =
      this.generateProductionNumber();


    // ======================================
    // Raw Materials
    // ======================================
    //
    // IMPORTANT:
    // Backend expects rawMaterials[].weightUsedKg
    // We are using actual target/raw instruction
    // weight for each item.
    //
    // ======================================

    const rawMaterials =
      formValue.items.map(

        (item: any) => ({

          stockReceive:
            item.stockReceive,

          rawMaterial:
            item.rawMaterial,

          batchNo:
            item.batchNo,

          availableWeightKg:
            this.getAvailableWeight(
              item
            ),

          weightUsedKg:
            Number(
              item.targetWeightKg || 0
            )

        })

      );


    // ======================================
    // Production Items
    // ======================================

    const productionItems =
      formValue.items.map(

        (item: any) => ({

          variantName:
            item.variantName,

          skuCode:
            item.skuCode,
          batchNo:
            String(
              item.batchNo || ''
            ).trim(),
          finishedGoodsBatchNo:
            String(
              item.finishedGoodsBatchNo || ''
            ).trim(),
          packSize:
            item.packSize,

          weightInGrams:
            Number(
              item.weightInGrams
            ),

          packsProduced:
            Number(
              item.packsProduced
            ),

          rejectedPacks:
            Number(
              item.rejectedPacks || 0
            ),

          totalWeightUsedKg:
            this.getItemProducedWeight(
              item
            )

        })

      );


    // ======================================
    // Final Payload
    // ======================================

    const payload = {

      productionNo:

        productionNo,


      productionDate:

        new Date(),


      warehouse:

        this.instruction
          .warehouse
          ?._id,


      rawMaterials:

        rawMaterials,


      productionItems:

        productionItems,


      remarks:

        formValue.remarks || ''

    };


    console.log(
      'Create Production Payload:',
      payload
    );


    // ======================================
    // Submit API
    // ======================================

    this.isSubmitting = true;


    this.productionService
      .createProduction(
        payload
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Production Created:',
            response
          );


          this.isSubmitting = false;


          this.alertService
            .success(

              response?.message ||
              'Production Created Successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/production'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Create Production Error:',
            error
          );


          this.isSubmitting = false;


          this.alertService.error(

            error?.error?.message ||
            'Failed to create production'

          );

        }

      });

  }


  // ==========================================
  // Get Item Produced Weight
  // ==========================================

  getItemProducedWeight(item: any): number {

    const weightInGrams =
      Number(item.weightInGrams) || 0;

    const packsProduced =
      Number(item.packsProduced) || 0;

    return Number(
      (
        weightInGrams *
        packsProduced /
        1000
      ).toFixed(3)
    );

  }

  // ==========================================
  // Get Available Weight
  // ==========================================

  getAvailableWeight(
    item: any
  ): number {

    const instructionItem =
      this.instruction
        ?.items
        ?.find(

          (x: any) =>

            (
              x.rawMaterial?._id ||
              x.rawMaterial
            ) ===
            item.rawMaterial

            &&

            (
              x.stockReceive?._id ||
              x.stockReceive
            ) ===
            item.stockReceive

            &&

            x.batchNo ===
            item.batchNo

        );


    // Instruction doesn't contain
    // availableWeightKg.
    //
    // So 0 is sent.
    // Backend itself validates actual stock.

    return Number(
      instructionItem
        ?.availableWeightKg || 0
    );

  }


  // ==========================================
  // Generate Production Number
  // ==========================================

  generateProductionNumber(): string {

    const random =
      Math.floor(
        100000 +
        Math.random() * 900000
      );


    return `PROD-${random}`;

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/warehouse-production-assigned'


    ]);

  }


}
