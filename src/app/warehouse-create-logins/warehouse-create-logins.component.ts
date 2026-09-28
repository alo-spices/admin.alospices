import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CommomPopupService } from '../Services/commom-popup.service';
import { EmployeeService } from '../Services/employee.service';
import { WarehouseService } from '../Services/warehouse.service';
import { AreasService } from '../Services/areas.service';

@Component({
  selector: 'app-warehouse-create-logins',
  templateUrl: './warehouse-create-logins.component.html',
  styleUrls: ['./warehouse-create-logins.component.css']
})
export class WarehouseCreateLoginsComponent implements OnInit {
  // ==========================================
  // FORM
  // ==========================================

  userForm!: FormGroup;


  // ==========================================
  // WAREHOUSE
  // ==========================================

  warehouseList: any[] = [];

  selectedWarehouse: any = null;


  // ==========================================
  // AREA
  // ==========================================

  areaList: any[] = [];

  selectedArea: any = null;


  // ==========================================
  // UI
  // ==========================================

  showPassword: boolean = false;

  isLoading: boolean = false;

  isSubmitted: boolean = false;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private fb: FormBuilder,

    private userService: EmployeeService,

    private warehouseService: WarehouseService,

    private alertService: CommomPopupService,
    private areaService: AreasService,

    private router: Router
  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.createForm();

    this.getWarehouseList();

    this.getAreaList();

  }


  // ==========================================
  // CREATE FORM
  // ==========================================

  createForm(): void {

    this.userForm = this.fb.group({

      // ----------------------------------------
      // WAREHOUSE
      // ----------------------------------------

      warehouse: [
        '',
        Validators.required
      ],


      // ----------------------------------------
      // AREA
      // ----------------------------------------

      area: [
        '',
        Validators.required
      ],


      // ----------------------------------------
      // PASSWORD
      // ----------------------------------------

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }


  // ==========================================
  // GET ALL WAREHOUSES
  // ==========================================

  getWarehouseList(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (response: any) => {

          console.log(
            '🏭 Warehouse List Response:',
            response
          );


          if (response?.success) {

            this.warehouseList =
              response?.data || [];

          }
          else {

            this.warehouseList = [];

          }

        },


        error: (error: any) => {

          console.error(
            '❌ Warehouse List Error:',
            error
          );


          this.warehouseList = [];


          this.alertService.error(
            error?.error?.message ||
            'Failed to load warehouses'
          );

        }

      });

  }


  // ==========================================
  // GET ALL AREAS
  // ==========================================

  getAreaList(): void {

    this.areaService.getAllAreas()
      .subscribe({

        next: (response: any) => {

          console.log(
            '📍 Area List Response:',
            response
          );


          if (response?.success) {

            this.areaList =
              response?.data || [];

          }
          else {

            this.areaList = [];

          }

        },


        error: (error: any) => {

          console.error(
            '❌ Area List Error:',
            error
          );


          this.areaList = [];


          this.alertService.error(
            error?.error?.message ||
            'Failed to load areas'
          );

        }

      });

  }


  // ==========================================
  // WAREHOUSE CHANGE
  // ==========================================

  onWarehouseChange(event: any): void {

    const warehouseId =
      event?.target?.value;


    if (!warehouseId) {

      this.selectedWarehouse = null;

      this.userForm.patchValue({
        warehouse: ''
      });

      return;

    }


    const warehouse =
      this.warehouseList.find(
        (item: any) =>
          item?._id === warehouseId
      );


    if (warehouse) {

      this.selectedWarehouse =
        warehouse;


      console.log(
        '✅ Selected Warehouse:',
        this.selectedWarehouse
      );

    }
    else {

      this.selectedWarehouse = null;

    }

  }


  // ==========================================
  // AREA CHANGE
  // ==========================================

  onAreaChange(event: any): void {

    const areaId =
      event?.target?.value;


    if (!areaId) {

      this.selectedArea = null;

      this.userForm.patchValue({
        area: ''
      });

      return;

    }


    const area =
      this.areaList.find(
        (item: any) =>
          item?._id === areaId
      );


    if (area) {

      this.selectedArea =
        area;


      console.log(
        '✅ Selected Area:',
        this.selectedArea
      );

    }
    else {

      this.selectedArea = null;

    }

  }


  // ==========================================
  // PASSWORD TOGGLE
  // ==========================================

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // FORM VALIDATION
    // ========================================

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();


      const invalidFields: string[] = [];


      Object.keys(
        this.userForm.controls
      ).forEach(field => {

        const control =
          this.userForm.get(field);


        if (control?.invalid) {

          invalidFields.push(field);


          console.log(
            `❌ Invalid Field: ${field}`,
            {
              value: control.value,
              errors: control.errors
            }
          );

        }

      });


      console.log(
        '❌ Invalid Fields:',
        invalidFields
      );


      this.alertService.validation(
        `Please fill required fields: ${invalidFields.join(', ')}`
      );


      return;

    }


    // ========================================
    // FORM VALUE
    // ========================================

    const value =
      this.userForm.value;


    // ========================================
    // WAREHOUSE VALIDATION
    // ========================================

    if (!value.warehouse) {

      this.alertService.validation(
        'Please select a warehouse'
      );

      return;

    }


    if (!this.selectedWarehouse) {

      this.alertService.validation(
        'Selected warehouse details not found'
      );

      return;

    }


    // ========================================
    // AREA VALIDATION
    // ========================================

    if (!value.area) {

      this.alertService.validation(
        'Please select an area'
      );

      return;

    }


    if (!this.selectedArea) {

      this.alertService.validation(
        'Selected area details not found'
      );

      return;

    }


    // ========================================
    // WAREHOUSE ACTIVE CHECK
    // ========================================

    if (
      this.selectedWarehouse.isActive === false
    ) {

      this.alertService.validation(
        'Selected warehouse is inactive'
      );

      return;

    }


    // ========================================
    // WAREHOUSE MOBILE
    // ========================================

    const warehouseMobile =
      this.selectedWarehouse.mobileNumber?.trim();


    if (!warehouseMobile) {

      this.alertService.validation(
        'Selected warehouse does not have a mobile number'
      );

      return;

    }


    // ========================================
    // FORM DATA
    // ========================================

    const formData =
      new FormData();


    // ========================================
    // FIRST NAME
    // ========================================

    formData.append(
      'firstName',
      this.selectedWarehouse.managerName?.trim() ||
      this.selectedWarehouse.warehouseName?.trim() ||
      'Warehouse Manager'
    );


    // ========================================
    // ROLE
    // ========================================

    formData.append(
      'role',
      'WarehouseManager'
    );


    // ========================================
    // WAREHOUSE
    // ========================================

    formData.append(
      'warehouse',
      this.selectedWarehouse._id
    );


    // ========================================
    // AREA
    // ========================================

    formData.append(
      'area',
      this.selectedArea._id
    );


    // ========================================
    // MOBILE
    // ========================================

    formData.append(
      'mobile',
      warehouseMobile
    );


    // ========================================
    // EMAIL
    // ========================================

    formData.append(
      'email',
      this.selectedWarehouse.email?.trim() || ''
    );


    // ========================================
    // PASSWORD
    // ========================================

    formData.append(
      'password',
      value.password
    );


    // ========================================
    // DEBUG
    // ========================================

    console.log(
      '🏭 Selected Warehouse:',
      this.selectedWarehouse
    );

    console.log(
      '📍 Selected Area:',
      this.selectedArea
    );

    console.log(
      '🔐 Warehouse Login Payload:',
      {
        firstName:
          this.selectedWarehouse.managerName ||
          this.selectedWarehouse.warehouseName,

        mobile:
          warehouseMobile,

        email:
          this.selectedWarehouse.email || '',

        role:
          'WarehouseManager',

        warehouse:
          this.selectedWarehouse._id,

        area:
          this.selectedArea._id,

        password:
          '******'
      }
    );


    // ========================================
    // LOADING
    // ========================================

    this.isLoading = true;


    // ========================================
    // REGISTER USER
    // ========================================

    this.userService
      .registerUser(formData)
      .subscribe({

        next: (response: any) => {

          console.log(
            '✅ Warehouse Account Created:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(
              response?.message ||
              'Warehouse account created successfully'
            )
            .then(() => {

              this.router.navigate([
                '/admin/warehouse-logins-list'
              ]);

            });

        },


        error: (error: any) => {

          console.error(
            '❌ Warehouse Account Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(
            error?.error?.message ||
            'Failed to create warehouse account'
          );

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/warehouse-logins-list'
    ]);

  }
}
