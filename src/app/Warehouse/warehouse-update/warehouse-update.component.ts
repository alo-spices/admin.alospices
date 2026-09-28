import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.css']
})
export class WarehouseUpdateComponent implements OnInit {

  warehouseForm!: FormGroup;

  warehouseId!: string;

  isSubmitting = false;

  constructor(

    private fb: FormBuilder,

    private warehouseService: WarehouseService,

    private popup: CommomPopupService,

    private router: Router,

    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.warehouseId =

      this.route.snapshot.paramMap.get('id') || '';

    this.createForm();

    this.getWarehouseById();

  }

  // ===========================================
  // CREATE FORM
  // ===========================================

  createForm(): void {

    this.warehouseForm = this.fb.group({

      warehouseCode: [

        {

          value: '',

          disabled: true

        }

      ],

      warehouseName: [

        '',

        Validators.required

      ],

      warehouseType: [

        'BOTH',

        Validators.required

      ],

      managerName: [

        ''

      ],

      mobileNumber: [

        '',

        [

          Validators.pattern(/^[0-9]{10}$/)

        ]

      ],

      email: [

        '',

        Validators.email

      ],

      address: [

        ''

      ],

      city: [

        ''

      ],

      state: [

        ''

      ],

      pincode: [

        ''

      ],

      isActive: [

        true

      ]

    });

  }

  // ===========================================
  // GET WAREHOUSE BY ID
  // ===========================================

  getWarehouseById(): void {

    this.warehouseService

      .getWarehouseById(this.warehouseId)

      .subscribe({

        next: (res: any) => {

          if (res.success) {

            this.warehouseForm.patchValue({

              warehouseCode: res.data.warehouseCode,

              warehouseName: res.data.warehouseName,

              warehouseType: res.data.warehouseType,

              managerName: res.data.managerName,

              mobileNumber: res.data.mobileNumber,

              email: res.data.email,

              address: res.data.address,

              city: res.data.city,

              state: res.data.state,

              pincode: res.data.pincode,

              isActive: res.data.isActive

            });

          }

        },

        error: (err: any) => {

          console.log(err);

          this.popup.error(

            err?.error?.message ||

            'Failed to load warehouse.'

          );

        }

      });

  }

  // ===========================================
  // UPDATE WAREHOUSE
  // ===========================================

  updateWarehouse(): void {

    if (this.warehouseForm.invalid) {

      this.warehouseForm.markAllAsTouched();

      return;

    }

    this.isSubmitting = true;

    const body = {

      ...this.warehouseForm.getRawValue()

    };

    this.warehouseService

      .updateWarehouse(

        this.warehouseId,

        body

      )

      .subscribe({

        next: (res: any) => {

          this.isSubmitting = false;

          if (res.success) {

            this.popup.success(

              res.message ||

              'Warehouse Updated Successfully.'

            );

            this.router.navigate([

              '/admin/warehouse-list'

            ]);

          }

        },

        error: (err: any) => {

          this.isSubmitting = false;

          console.log(err);

          this.popup.error(

            err?.error?.message ||

            'Failed to update warehouse.'

          );

        }

      });

  }

  // ===========================================
  // BACK
  // ===========================================

  goBack(): void {

    this.router.navigate([

      '/admin/warehouse-list'

    ]);

  }

}
