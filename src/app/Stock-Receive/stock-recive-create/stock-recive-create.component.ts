import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductService } from 'src/app/Services/product.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { StockReceiveService } from 'src/app/Services/stock-receive.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-stock-recive-create',
  templateUrl: './stock-recive-create.component.html',
  styleUrls: ['./stock-recive-create.component.css']
})
export class StockReciveCreateComponent implements OnInit {

  stockReceiveForm!: FormGroup;

  supplierList: any[] = [];

  warehouseList: any[] = [];

  rawMaterialList: any[] = [];

  loading = false;
  constructor(

  private fb: FormBuilder,

  private supplierService: SupplierService,


  private warehouseService: WarehouseService,

  private rawMaterialService: RawMaterialService,

  private stockReceiveService: StockReceiveService,

  private popup: CommomPopupService,

  private router: Router

) { }
ngOnInit(): void {

  this.initializeForm();

  this.getSuppliers();

  this.getWarehouses();

  this.getRawMaterials();

}
initializeForm() {

  this.stockReceiveForm = this.fb.group({

    receiveNo: [

      '',

      Validators.required

    ],

    supplier: [

      '',

      Validators.required

    ],

    warehouse: [

      '',

      Validators.required

    ],

    invoiceNo: [

      '',

      Validators.required

    ],

    invoiceDate: [

      '',

      Validators.required

    ],

    remarks: [''],

    items: this.fb.array([

      this.createItem()

    ])

  });

}
createItem(): FormGroup {

  return this.fb.group({

    rawMaterial: [

      '',

      Validators.required

    ],

    batchNo: [

      '',

      Validators.required

    ],

    noOfBags: [

      1,

      Validators.required

    ],

    bagWeightKg: [

      0,

      Validators.required

    ],

    rate: [

      0,

      Validators.required

    ]

  });

}
get items(): FormArray {

  return this.stockReceiveForm.get(

    'items'

  ) as FormArray;

}
// ==========================================
// GET SUPPLIERS
// ==========================================

getSuppliers() {

  this.supplierService

    .getAllSuppliers()

    .subscribe({

      next: (res: any) => {

        if (res.success) {

          this.supplierList = res.data;

        }

      },

      error: (err: any) => {

        console.log(err);

        this.popup.error(

          err.error?.message ||

          'Failed to load Suppliers.'

        );

      }

    });

}
// ==========================================
// GET WAREHOUSES
// ==========================================

getWarehouses() {

  this.warehouseService

    .getAllWarehouses()

    .subscribe({

      next: (res: any) => {

        if (res.success) {

          this.warehouseList = res.data;

        }

      },

      error: (err: any) => {

        console.log(err);

        this.popup.error(

          err.error?.message ||

          'Failed to load Warehouses.'

        );

      }

    });

}
// ==========================================
// GET RAW MATERIALS
// ==========================================

getRawMaterials() {

  this.rawMaterialService

    .getRawMaterialDropdown()

    .subscribe({

      next: (res: any) => {

        if (res.success) {

          this.rawMaterialList = res.data;

        }

      },

      error: (err: any) => {

        console.log(err);

        this.popup.error(

          err.error?.message ||

          'Failed to load Raw Materials.'

        );

      }

    });

}
// ==========================================
// ADD ITEM
// ==========================================

addItem() {

  this.items.push(

    this.createItem()

  );

}
// ==========================================
// REMOVE ITEM
// ==========================================

removeItem(index: number) {

  if (this.items.length > 1) {

    this.items.removeAt(index);

  } else {

    this.popup.validation(

      'At least one Raw Material is required.'

    );

  }

}
// ==========================================
// RESET FORM
// ==========================================

resetForm() {

  this.stockReceiveForm.reset();

  this.items.clear();

  this.items.push(

    this.createItem()

  );

}
// ==========================================
// CREATE STOCK RECEIVE
// ==========================================

createStockReceive() {

  // -----------------------------
  // Form Validation
  // -----------------------------

  if (this.stockReceiveForm.invalid) {

    this.stockReceiveForm.markAllAsTouched();

    this.popup.validation(

      'Please fill all required fields.'

    );

    return;

  }

  this.loading = true;

  const payload = {

    ...this.stockReceiveForm.value

  };

  this.stockReceiveService

    .createStockReceive(payload)

    .subscribe({

      // ==========================
      // SUCCESS
      // ==========================

      next: (res: any) => {

        this.loading = false;

        if (res.success) {

          this.popup.success(

            res.message

          ).then(() => {

            this.router.navigate([

              '/admin/stockReceive-list'

            ]);

          });

        }

      },
       

      // ==========================
      // ERROR
      // ==========================

      error: (err: any) => {

        this.loading = false;

        console.log(err);

        this.popup.error(

          err.error?.message ||

          'Failed to create Stock Receive.'

        );

      }

    });

}
goBack(): void {

    this.router.navigate([
      '/admin/stockReceive-list'
    ]);

  }
}