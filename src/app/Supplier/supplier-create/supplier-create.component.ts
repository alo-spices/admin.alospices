import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { SupplierService } from 'src/app/Services/supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  supplierForm!: FormGroup;

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supplierService: SupplierService,
    private alertService: CommomPopupService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

  }

  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.supplierForm = this.fb.group({

      supplierName: [
        '',
        Validators.required
      ],

      supplierCode: [
        '',
        Validators.required
      ],

      contactPerson: [
        ''
      ],

      mobileNumber: [
        '',
        Validators.required
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
  // Create Supplier
  // ==========================================

  createSupplier(): void {

    this.isSubmitted = true;

    if (this.supplierForm.invalid) {

      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }

    this.supplierService.createSupplier(
      this.supplierForm.value
    ).subscribe({

      next: (response: any) => {

        this.alertService.success(

          response.message ||

          'Supplier Created Successfully'

        );

        this.router.navigate([
          '/admin/supplier-list'
        ]);

      },

      error: (error) => {

        console.log(error);

        this.alertService.error(

          error.error?.message ||

          'Something went wrong'

        );

      }

    });

  }

  // ==========================================
  // Reset Form
  // ==========================================

  resetForm(): void {

    this.supplierForm.reset({

      country: 'India',

      openingBalance: 0,

      status: 'Active'

    });

    this.isSubmitted = false;

  }

  // ==========================================
  // Go Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/supplier'
    ]);

  }

}