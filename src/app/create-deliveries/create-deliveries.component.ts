import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { DeliveryService } from '../Services/delivery.service';
import { OrdersService } from '../Services/orders.service';
import { PartiesService } from '../Services/parties.service';
import { WarehouseService } from '../Services/warehouse.service';
import { DistributorsService } from '../Services/distributors.service';

@Component({
  selector: 'app-create-deliveries',
  templateUrl: './create-deliveries.component.html',
  styleUrls: ['./create-deliveries.component.css']
})
export class CreateDeliveriesComponent implements OnInit {


  // ==========================================
  // FORM
  // ==========================================

  deliveryForm!: FormGroup;


  // ==========================================
  // LISTS
  // ==========================================

  orderList: any[] = [];

  partyList: any[] = [];

  warehouseList: any[] = [];

  distributorList: any[] = [];


  // ==========================================
  // SELECTED DATA
  // ==========================================

  selectedOrder: any = null;

  selectedParty: any = null;

  selectedWarehouse: any = null;

  selectedDistributor: any = null;


  // ==========================================
  // FLAGS
  // ==========================================

  isSubmitted = false;

  isLoading = false;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private fb: FormBuilder,

    private router: Router,

    private deliveryService: DeliveryService,
    private orderSerivices: OrdersService,
    private partyService: PartiesService,
    private warehouseServices: WarehouseService,
    private distributorService: DistributorsService,

    private alertService: CommomPopupService,

  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllOrders();

    this.getAllParties();

    this.getAllWarehouses();

    this.getAllDistributors();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.deliveryForm = this.fb.group({

      order: [

        '',

        Validators.required

      ],

      party: [

        '',

        Validators.required

      ],

      sourceType: [

        '',

        Validators.required

      ],

      sourceWarehouse: [

        ''

      ],

      sourceDistributor: [

        ''

      ]

    });

  }


  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  getAllOrders(): void {

    this.orderSerivices
      .getAllOrders()
      .subscribe({

        next: (response: any) => {

          this.orderList =
            response?.data ||
            response?.orders ||
            [];

        },

        error: (error: any) => {

          console.log(error);

          this.orderList = [];

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Orders'

          );

        }

      });

  }


  // ==========================================
  // GET ALL PARTIES
  // ==========================================

  getAllParties(): void {

    this.partyService
      .getAllParties()
      .subscribe({

        next: (response: any) => {

          this.partyList =
            response?.data ||
            response?.parties ||
            [];

        },

        error: (error: any) => {

          console.log(error);

          this.partyList = [];

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Parties'

          );

        }

      });

  }


  // ==========================================
  // GET ALL WAREHOUSES
  // ==========================================

  getAllWarehouses(): void {

    this.warehouseServices
      .getAllWarehouses()
      .subscribe({

        next: (response: any) => {

          this.warehouseList =
            response?.data ||
            response?.warehouses ||
            [];

        },

        error: (error: any) => {

          console.log(error);

          this.warehouseList = [];

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Warehouses'

          );

        }

      });

  }


  // ==========================================
  // GET ALL DISTRIBUTORS
  // ==========================================

  getAllDistributors(): void {

    this.distributorService
      .getAllDistributors()
      .subscribe({

        next: (response: any) => {

          this.distributorList =
            response?.data ||
            response?.users ||
            [];

        },

        error: (error: any) => {

          console.log(error);

          this.distributorList = [];

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Distributors'

          );

        }

      });

  }


  // ==========================================
  // ORDER CHANGE
  // ==========================================

  onOrderChange(): void {

    const orderId =
      this.deliveryForm
        .get('order')
        ?.value;


    this.selectedOrder =
      this.orderList.find(
        (item: any) =>
          item._id === orderId
      ) || null;


    /*
     * If order contains party,
     * automatically select that party.
     */

    if (this.selectedOrder?.party) {

      const partyId =
        typeof this.selectedOrder.party === 'object'

          ? this.selectedOrder.party._id

          : this.selectedOrder.party;


      if (partyId) {

        this.deliveryForm.patchValue({

          party: partyId

        });


        this.selectedParty =
          this.partyList.find(
            (item: any) =>
              item._id === partyId
          ) || null;

      }

    }

  }


  // ==========================================
  // SOURCE TYPE CHANGE
  // ==========================================

  onSourceTypeChange(): void {

    const sourceType =
      this.deliveryForm
        .get('sourceType')
        ?.value;


    // ========================================
    // WAREHOUSE
    // ========================================

    if (sourceType === 'WAREHOUSE') {

      this.deliveryForm.patchValue({

        sourceDistributor: ''

      });

      this.selectedDistributor = null;

    }


    // ========================================
    // DISTRIBUTOR
    // ========================================

    else if (sourceType === 'DISTRIBUTOR') {

      this.deliveryForm.patchValue({

        sourceWarehouse: ''

      });

      this.selectedWarehouse = null;

    }


    // ========================================
    // EMPTY
    // ========================================

    else {

      this.deliveryForm.patchValue({

        sourceWarehouse: '',

        sourceDistributor: ''

      });

      this.selectedWarehouse = null;

      this.selectedDistributor = null;

    }

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (this.deliveryForm.invalid) {

      this.alertService.validation(

        'Please fill all required fields'

      );

      return;

    }


    const formValue =
      this.deliveryForm.value;


    // ==========================================
    // SOURCE VALIDATION
    // ==========================================

    if (
      formValue.sourceType === 'WAREHOUSE' &&
      !formValue.sourceWarehouse
    ) {

      this.alertService.validation(

        'Please select Source Warehouse'

      );

      return;

    }


    if (
      formValue.sourceType === 'DISTRIBUTOR' &&
      !formValue.sourceDistributor
    ) {

      this.alertService.validation(

        'Please select Source Distributor'

      );

      return;

    }


    // ==========================================
    // CREATE REQUEST
    // ==========================================

    const data: any = {

      order: formValue.order,

      party: formValue.party,

      sourceType: formValue.sourceType,

      sourceWarehouse:
        formValue.sourceType === 'WAREHOUSE'
          ? formValue.sourceWarehouse
          : null,

      sourceDistributor:
        formValue.sourceType === 'DISTRIBUTOR'
          ? formValue.sourceDistributor
          : null

    };


    // ==========================================
    // LOADING
    // ==========================================

    this.isLoading = true;


    // ==========================================
    // CREATE DELIVERY
    // ==========================================

    this.deliveryService
      .createDelivery(data)
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Delivery Created Successfully'

          );


          // ======================================
          // RESET
          // ======================================

          this.deliveryForm.reset();

          this.selectedOrder = null;

          this.selectedParty = null;

          this.selectedWarehouse = null;

          this.selectedDistributor = null;

          this.isSubmitted = false;


          // ======================================
          // NAVIGATE
          // ======================================

          this.router.navigate([

            '/admin/delivery-list'

          ]);

        },


        error: (error: any) => {

          this.isLoading = false;

          console.log(
            'Create Delivery Error:',
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
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/delivery-list'

    ]);

  }

}
