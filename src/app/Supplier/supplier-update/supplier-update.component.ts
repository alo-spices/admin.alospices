import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { SupplierService } from 'src/app/Services/supplier.service';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css']
})
export class SupplierUpdateComponent implements OnInit {

  supplierForm!: FormGroup;

  supplierId!: string;

  isSubmitting = false;

  constructor(

    private fb: FormBuilder,

    private supplierService: SupplierService,

    private popup: CommomPopupService,

    private router: Router,

    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.supplierId =

      this.route.snapshot.paramMap.get('id') || '';

    this.createForm();

    this.getSupplierById();

  }

  // ==========================================
  // CREATE FORM
  // ==========================================

  createForm(): void {

    this.supplierForm = this.fb.group({

      supplierCode: [

        {

          value: '',

          disabled: true

        }

      ],

      supplierName: [

        '',

        Validators.required

      ],

      contactPerson: [

        ''

      ],

      mobileNumber: [

        '',

        [

          Validators.required,

          Validators.pattern(/^[0-9]{10}$/)

        ]

      ],

      alternateMobileNumber: [

        ''

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

      district: [

        ''

      ],

      state: [

        ''

      ],

      country: [

        'India'

      ],

      pincode: [

        ''

      ],

      gstNumber: [

        ''

      ],

      panNumber: [

        ''

      ],

      paymentTerms: [

        ''

      ],

      openingBalance: [

        0

      ],

      accountHolderName: [

        ''

      ],

      bankName: [

        ''

      ],

      accountNumber: [

        ''

      ],

      ifscCode: [

        ''

      ],

      status: [

        'Active'

      ]

    });

  }

  // ==========================================
  // GET SUPPLIER
  // ==========================================

  getSupplierById(): void {

    this.supplierService

      .getSupplierById(this.supplierId)

      .subscribe({

        next: (res: any) => {

          console.log(res);

          if (res.success) {

            this.supplierForm.patchValue({

              supplierCode: res.data.supplierCode,

              supplierName: res.data.supplierName,

              contactPerson: res.data.contactPerson,

              mobileNumber: res.data.mobileNumber,

              alternateMobileNumber: res.data.alternateMobileNumber,

              email: res.data.email,

              address: res.data.address,

              city: res.data.city,

              district: res.data.district,

              state: res.data.state,

              country: res.data.country,

              pincode: res.data.pincode,

              gstNumber: res.data.gstNumber,

              panNumber: res.data.panNumber,

              paymentTerms: res.data.paymentTerms,

              openingBalance: res.data.openingBalance,

              accountHolderName: res.data.accountHolderName,

              bankName: res.data.bankName,

              accountNumber: res.data.accountNumber,

              ifscCode: res.data.ifscCode,

              status: res.data.status

            });

          }

        },

        error: (err: any) => {

          console.log(err);

          this.popup.error(

            err?.error?.message ||

            'Failed to load supplier.'

          );

        }

      });

  }

  // ==========================================
  // UPDATE SUPPLIER
  // ==========================================

  updateSupplier(): void {

    if (this.supplierForm.invalid) {

      this.supplierForm.markAllAsTouched();

      return;

    }

    this.isSubmitting = true;

    const body = {

      ...this.supplierForm.getRawValue()

    };

    this.supplierService

      .updateSupplier(

        this.supplierId,

        body

      )

      .subscribe({

        next: (res: any) => {

          this.isSubmitting = false;

          console.log(res);

          if (res.success) {

            this.popup.success(

              res.message ||

              'Supplier Updated Successfully.'

            );

            this.router.navigate([

              '/admin/supplier-list'

            ]);

          }

        },

        error: (err: any) => {

          this.isSubmitting = false;

          console.log(err);

          this.popup.error(

            err?.error?.message ||

            'Failed to update supplier.'

          );

        }

      });

  }

  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/supplier-list'

    ]);

  }

}