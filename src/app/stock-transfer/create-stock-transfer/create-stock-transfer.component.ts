import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PartiesService } from 'src/app/Services/parties.service';
import { ProductService } from 'src/app/Services/product.service';
import { StockTransferService } from 'src/app/Services/stock-transfer.service';
import { UserService } from 'src/app/Services/user.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-create-stock-transfer',
  templateUrl: './create-stock-transfer.component.html',
  styleUrls: ['./create-stock-transfer.component.css']
})
export class CreateStockTransferComponent implements OnInit {

  isLoading: boolean = false;
  transferForm!: FormGroup;
  destinationList: any[] = [];
  warehouseList: any[] = [];
  distributorList: any[] = [];
  retailerList: any[] = [];
  wholesalerList: any[] = [];

  productList: any[] = [];

  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stockTransferService: StockTransferService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private userService: UserService,
    private partiesService: PartiesService
  ) { }

  ngOnInit(): void {

    this.initializeForm();
    this.getNextTransferNumber();
    this.getWarehouses();

    this.getProducts();
  }

  // =========================================================
  // FORM INITIALIZATION
  // =========================================================

  initializeForm(): void {

    this.transferForm = this.fb.group({

      transferNo: ['', Validators.required],

      transferDate: [
        new Date().toISOString().substring(0, 10),
        Validators.required
      ],

      sourceWarehouse: ['', Validators.required],

      destinationType: ['', Validators.required],

      destination: ['', Validators.required],

      remarks: [''],

      items: this.fb.array([
        this.createItem()
      ])

    });

  }


  getNextTransferNumber(): void {

    this.stockTransferService.getNextTransferNumber()
      .subscribe({

        next: (response: any) => {

          if (response?.success) {

            this.transferForm.patchValue({
              transferNo: response.data.transferNo
            });

          }

        },

        error: (error) => {

          console.error(
            'Next transfer number error:',
            error
          );

        }

      });

  }
  // =========================================================
  // CREATE ITEM
  // =========================================================

  createItem(): FormGroup {

    return this.fb.group({

      product: ['', Validators.required],

      variantId: ['', Validators.required],

      skuCode: [''],

      batchNo: ['', Validators.required],

      quantity: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      packSize: [''],

      weightInGrams: [0]

    });

  }

  // =========================================================
  // ITEMS FORM ARRAY
  // =========================================================

  get items(): FormArray {

    return this.transferForm.get('items') as FormArray;

  }

  // =========================================================
  // ADD ITEM
  // =========================================================

  addItem(): void {

    this.items.push(
      this.createItem()
    );

  }

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  removeItem(index: number): void {

    if (this.items.length === 1) {
      return;
    }

    this.items.removeAt(index);

  }

  // =========================================================
  // GET WAREHOUSES
  // =========================================================

  getWarehouses(): void {

    this.warehouseService.getAllWarehouses().subscribe({

      next: (response: any) => {

        if (response?.success) {

          this.warehouseList =
            response.data || [];

        }

      },

      error: (error) => {

        console.error(
          'Warehouse list error:',
          error
        );

      }

    });

  }

  // =========================================================
  // GET PRODUCTS
  // =========================================================

  getProducts(): void {

    this.productService.getAllProducts().subscribe({

      next: (response: any) => {

        if (response?.success) {

          this.productList =
            response.data || [];

        }

      },

      error: (error) => {

        console.error(
          'Product list error:',
          error
        );

      }

    });

  }

  // =========================================================
  // DESTINATION TYPE CHANGE
  // =========================================================

  onDestinationTypeChange(): void {

    const type =
      this.transferForm.get('destinationType')?.value;

    // Clear selected destination
    this.transferForm
      .get('destination')
      ?.setValue('');

    // Clear previous destination list
    this.destinationList = [];

    this.distributorList = [];
    this.retailerList = [];
    this.wholesalerList = [];

    if (!type) {
      return;
    }

    if (type === 'Distributor') {

      this.getDistributors();

    }
    else if (type === 'Retailer') {

      this.getRetailers();

    }
    else if (type === 'Wholesaler') {

      this.getWholesalers();

    }

  }
  getSelectedVariant(index: number): any {

    const item =
      this.items.at(index) as FormGroup;

    const productId =
      item.get('product')?.value;

    const variantId =
      item.get('variantId')?.value;

    if (!productId || !variantId) {
      return null;
    }

    const product =
      this.productList.find(
        x => x._id === productId
      );

    if (!product) {
      return null;
    }

    return (
      product.variants || []
    ).find(
      (variant: any) =>
        variant._id === variantId
    ) || null;

  }

  getDestinationName(destination: any): string {

    if (!destination) {
      return '';
    }

    const type =
      this.transferForm.get('destinationType')?.value;

    if (type === 'Distributor') {

      return (
        destination.fullName ||
        `${destination.firstName || ''} ${destination.lastName || ''}`.trim() ||
        destination.name ||
        destination.mobile ||
        'Distributor'
      );

    }

    return (
      destination.partyName ||
      destination.name ||
      destination.companyName ||
      destination.fullName ||
      destination.mobile ||
      'Party'
    );

  }
  // =========================================================
  // GET DISTRIBUTORS
  // =========================================================

  getDistributors(): void {

    this.userService
      .getAllUsers('Distributor')
      .subscribe({

        next: (response: any) => {

          console.log(
            'Distributor Response:',
            response
          );

          if (response?.success) {

            this.distributorList =
              response.data || [];

            this.destinationList =
              this.distributorList;

          } else {

            this.distributorList = [];
            this.destinationList = [];

          }

        },

        error: (error) => {

          console.error(
            'Distributor list error:',
            error
          );

          this.distributorList = [];
          this.destinationList = [];

        }

      });

  }

  // =========================================================
  // GET RETAILERS
  // =========================================================

  getRetailers(): void {

    this.partiesService
      .getAllParties()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Parties Response:',
            response
          );

          const parties =
            response?.data || [];

          this.retailerList =
            parties.filter(
              (party: any) =>
                party.partyType === 'Retailer'
            );

          this.destinationList =
            this.retailerList;

        },

        error: (error) => {

          console.error(
            'Retailer list error:',
            error
          );

          this.retailerList = [];
          this.destinationList = [];

        }

      });

  }
  // =========================================================
  // GET WHOLESALERS
  // =========================================================

  getWholesalers(): void {

    this.partiesService
      .getAllParties()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Parties Response:',
            response
          );

          const parties =
            response?.data || [];

          this.wholesalerList =
            parties.filter(
              (party: any) =>
                party.partyType === 'Wholesaler'
            );

          this.destinationList =
            this.wholesalerList;

        },

        error: (error) => {

          console.error(
            'Wholesaler list error:',
            error
          );

          this.wholesalerList = [];
          this.destinationList = [];

        }

      });

  }
  // =========================================================
  // PRODUCT CHANGE
  // =========================================================

  onProductChange(index: number): void {

    const item =
      this.items.at(index) as FormGroup;

    const productId =
      item.get('product')?.value;

    // Clear previous variant details

    item.patchValue({

      variantId: '',
      skuCode: '',
      packSize: '',
      weightInGrams: 0

    });

    if (!productId) {
      return;
    }

    const product =
      this.productList.find(
        x => x._id === productId
      );

    if (!product) {
      return;
    }

    // Store variants temporarily
    // on the form group itself

    item.patchValue({

      variantId: ''

    });

    (item as any).variantList =
      product.variants || [];

  }

  // =========================================================
  // GET VARIANTS FOR ITEM
  // =========================================================

  getVariants(index: number): any[] {

    const item =
      this.items.at(index) as any;

    return item.variantList || [];

  }

  // =========================================================
  // VARIANT CHANGE
  // =========================================================

  onVariantChange(index: number): void {

    const item =
      this.items.at(index) as FormGroup;

    const productId =
      item.get('product')?.value;

    const variantId =
      item.get('variantId')?.value;

    if (!productId || !variantId) {
      return;
    }

    const product =
      this.productList.find(
        x => x._id === productId
      );

    if (!product) {
      return;
    }

    const variant =
      (product.variants || []).find(
        (x: any) => x._id === variantId
      );

    if (!variant) {
      return;
    }

    item.patchValue({

      skuCode:
        variant.skuCode || '',

      packSize:
        variant.packSize || '',

      weightInGrams:
        Number(variant.weightInGrams || 0)

    });

  }

  // =========================================================
  // CREATE STOCK TRANSFER
  // =========================================================

  createStockTransfer(): void {

    this.submitted = true;

    if (this.transferForm.invalid) {

      this.transferForm.markAllAsTouched();

      return;

    }

    const formValue =
      this.transferForm.value;

    // =======================================================
    // PREPARE ITEMS
    // =======================================================

    const items = formValue.items.map(
      (item: any) => ({

        product: item.product,

        variantId: item.variantId,

        skuCode: item.skuCode,

        batchNo: item.batchNo,

        quantity: Number(item.quantity)

      })
    );

    // =======================================================
    // BACKEND PAYLOAD
    // =======================================================

    const payload = {

      transferNo:
        formValue.transferNo,

      transferDate:
        formValue.transferDate,

      sourceWarehouse:
        formValue.sourceWarehouse,

      destinationType:
        formValue.destinationType,

      destination:
        formValue.destination,

      items: items,

      remarks:
        formValue.remarks || ''

    };

    console.log(
      'Stock Transfer Payload:',
      payload
    );

    this.loading = true;

    this.stockTransferService
      .createStockTransfer(payload)
      .subscribe({

        next: (response: any) => {

          this.loading = false;

          if (response?.success) {

            console.log(
              'Stock transfer created:',
              response
            );

            this.router.navigate([
              '/admin/all-stock-transfer'
            ]);

          }

        },

        error: (error) => {

          this.loading = false;

          console.error(
            'Create stock transfer error:',
            error
          );

        }

      });

  }

  // =========================================================
  // CANCEL
  // =========================================================

  cancel(): void {

    this.router.navigate([
      '/admin/stock-transfers'
    ]);

  }

}
