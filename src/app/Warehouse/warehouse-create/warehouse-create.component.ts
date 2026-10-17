import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  warehouseForm!: FormGroup;

  submitted = false;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private popup: CommomPopupService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.initializeForm();

  }

  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.warehouseForm = this.fb.group({

      warehouseCode: ['', Validators.required],

      warehouseName: ['', Validators.required],

      warehouseType: ['BOTH', Validators.required],

      managerName: [''],

      mobileNumber: [''],

      email: ['', Validators.email],

      address: [''],

      city: [''],

      state: [''],

      pincode: [''],

      isActive: [true]

    });

  }

  // ==========================================
  // GET FORM CONTROLS
  // ==========================================

  get f() {

    return this.warehouseForm.controls;

  }

  // ==========================================
  // CREATE WAREHOUSE
  // ==========================================

 
createWarehouse(): void {

  this.submitted = true;
  this.warehouseForm.markAllAsTouched();

  if (this.warehouseForm.invalid) {

    this.isSubmitting = false;

    this.popup.validation("Please fill all required fields.");

    return;

  }

  // Prevent duplicate submissions
  if (this.isSubmitting) {
    return;
  }

  this.isSubmitting = true;

  this.warehouseService.createWarehouse(this.warehouseForm.value)

    .subscribe({

      next: (res: any) => {

        this.isSubmitting = false;

        if (res.success) {

          this.popup.success(res.message).then(() => {

            this.warehouseForm.reset({

              warehouseType: 'BOTH',

              isActive: true

            });

            this.submitted = false;

            this.router.navigate(['/admin/warehouse-list']);

          });

        }

      },

      error: (err) => {

        this.isSubmitting = false;

        this.popup.error(

          err?.error?.message ||

          'Failed to create warehouse.'

        );

      }

    });

}


  // ==========================================
  // RESET FORM
  // ==========================================

  resetForm(): void {

    this.submitted = false;

    this.warehouseForm.reset({

      warehouseType: 'BOTH',

      isActive: true

    });

  }

}