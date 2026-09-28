import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { RoutesService } from 'src/app/Services/routes.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  // ==========================================
  // Form
  // ==========================================
  areasList: any[] = [];

  routesList: any[] = [];
  filteredRoutesList: any[] = [];
  userForm!: FormGroup;


  // ==========================================
  // Warehouse List
  // ==========================================

  warehouseList: any[] = [];


  // ==========================================
  // Selected Warehouse
  // ==========================================

  selectedWarehouse: any = null;


  // ==========================================
  // Profile Image
  // ==========================================

  selectedFile!: File;

  imagePreview: any = null;


  // ==========================================
  // Role Flags
  // ==========================================

  isWarehouseRole = false;

  isDistributorRole = false;

  isFieldRole = false;


  // ==========================================
  // UI
  // ==========================================

  showPassword = false;

  isSubmitted = false;

  isLoading = false;


  constructor(

    private fb:
      FormBuilder,

    private router:
      Router,

    private userService:
      EmployeeService,

    private warehouseService:
      WarehouseService,

    private alertService:
      CommomPopupService,
    private route: ActivatedRoute,
    private areaService: AreasService,
    private routeService: RoutesService

  ) { }

  isEditMode = false;

  userId: string = '';
  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllWarehouses();
    this.getAllAreas();

    this.getAllRoutes();
    // ========================================
    // Check Edit Mode
    // ========================================

    this.userId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    if (this.userId) {

      this.isEditMode = true;

      this.getUserById();

    }

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.userForm = this.fb.group({

      // ========================================
      // Basic Information
      // ========================================

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        ''
      ],

      gender: [
        'Male'
      ],

      dateOfBirth: [
        ''
      ],


      // ========================================
      // Contact
      // ========================================

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9]{10}$/
          )
        ]
      ],

      alternateMobile: [
        '',
        Validators.pattern(
          /^[0-9]{10}$/
        )
      ],

      email: [
        '',
        Validators.email
      ],


      // ========================================
      // Login
      // ========================================

      // password: [
      //   '',
      //   [
      //     Validators.minLength(6)
      //   ]
      // ],


      // ========================================
      // Role
      // ========================================

      role: [
        '',
        Validators.required
      ],


      // ========================================
      // Assignment
      // ========================================

      warehouse: [
        ''
      ],

      area: [
        ''
      ],

      route: [
        ''
      ],

      // reportingManager: [
      //   ''
      // ],


      // ========================================
      // Distributor
      // ========================================

      distributorName: [
        ''
      ],

      shopName: [
        ''
      ],

      gstNumber: [
        ''
      ],

      panNumber: [
        ''
      ],


      // ========================================
      // Address
      // ========================================

      addressLine1: [
        ''
      ],

      addressLine2: [
        ''
      ],

      city: [
        ''
      ],

      state: [
        ''
      ],

      pincode: [
        '',
        Validators.pattern(
          /^[0-9]{6}$/
        )
      ],


      // ========================================
      // Profile Image
      // ========================================

      profileImage: [
        null
      ]

    });

  }
  // ==========================================
  // Get User By ID
  // ==========================================

  // ==========================================
  // Get User By ID
  // ==========================================

  getUserById(): void {

    if (!this.userId) {
      return;
    }

    this.isLoading = true;

    this.userService
      .getUserById(this.userId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Get User By ID Response:',
            response
          );

          const user = response?.data;

          if (!user) {

            this.isLoading = false;

            this.alertService.error(
              'User details not found'
            );

            return;
          }


          // ======================================
          // ROLE FLAGS
          // ======================================

          this.isWarehouseRole =
            user.role === 'WarehouseManager';

          this.isDistributorRole =
            user.role === 'Distributor';

          this.isFieldRole =
            [
              'SalesManager',
              'Salesman',
              'DeliveryBoy'
            ].includes(user.role);


          // ======================================
          // PROFILE IMAGE
          // ======================================

          this.imagePreview =
            user.profileImage || null;


          // ======================================
          // GET IDS
          // ======================================

          const areaId =
            user.area?._id ??
            user.area ??
            '';

          const routeId =
            user.route?._id ??
            user.route ??
            '';

          const warehouseId =
            user.warehouse?._id ??
            user.warehouse ??
            '';

          const reportingManagerId =
            user.reportingManager?._id ??
            user.reportingManager ??
            '';


          console.log(
            'AREA ID:',
            areaId
          );

          console.log(
            'ROUTE ID:',
            routeId
          );


          // ======================================
          // PATCH FORM
          // ======================================

          this.userForm.patchValue({

            // Basic
            firstName:
              user.firstName ?? '',

            lastName:
              user.lastName ?? '',

            gender:
              user.gender || 'Male',

            dateOfBirth:
              this.formatDateForInput(
                user.dateOfBirth
              ),


            // Contact
            mobile:
              user.mobile ?? '',

            alternateMobile:
              user.alternateMobile ?? '',

            email:
              user.email ?? '',


            // Role
            role:
              user.role ?? '',


            // Warehouse
            warehouse:
              warehouseId,


            // Area
            area:
              areaId,


            // Route
            route:
              routeId,


            // Reporting Manager
            reportingManager:
              reportingManagerId,


            // Distributor
            distributorName:
              user.distributorName ?? '',

            shopName:
              user.shopName ?? '',

            gstNumber:
              user.gstNumber ?? '',

            panNumber:
              user.panNumber ?? '',


            // Address
            addressLine1:
              user.addressLine1 ?? '',

            addressLine2:
              user.addressLine2 ?? '',

            city:
              user.city ?? '',

            state:
              user.state ?? '',

            pincode:
              user.pincode ?? ''

          });


          // ======================================
          // ROUTE CONTROL
          // ======================================

          const routeControl =
            this.userForm.get('route');


          if (areaId) {

            routeControl?.enable();

          }
          else {

            routeControl?.disable();

          }


          // ======================================
          // FILTER ROUTES
          // ======================================

          if (
            areaId &&
            this.routesList &&
            this.routesList.length > 0
          ) {

            this.filteredRoutesList =
              this.routesList.filter(
                (route: any) => {

                  const routeAreaId =
                    route.area?._id ??
                    route.area ??
                    '';

                  return routeAreaId === areaId;

                }
              );

          }
          else {

            this.filteredRoutesList = [];

          }


          // ======================================
          // PATCH ROUTE AFTER FILTER
          // ======================================

          if (routeId) {

            routeControl?.setValue(
              routeId,
              {
                emitEvent: false
              }
            );

          }
          else {

            routeControl?.setValue(
              '',
              {
                emitEvent: false
              }
            );

          }


          // ======================================
          // SELECTED WAREHOUSE
          // ======================================

          if (this.isWarehouseRole) {

            this.selectedWarehouse =
              this.warehouseList.find(
                (warehouse: any) =>
                  warehouse._id === warehouseId
              ) || null;


            if (
              !this.selectedWarehouse &&
              user.warehouse
            ) {

              this.selectedWarehouse = {
                ...user.warehouse
              };

            }

          }
          else {

            this.selectedWarehouse = null;

          }


          // ======================================
          // APPLY ROLE VALIDATION
          // ======================================

          this.applyRoleValidation();


          // ======================================
          // DEBUG
          // ======================================

          console.log(
            'FINAL FORM:',
            this.userForm.getRawValue()
          );

          console.log(
            'AREA:',
            this.userForm.get('area')?.value
          );

          console.log(
            'ROUTE:',
            this.userForm.get('route')?.value
          );

          console.log(
            'FILTERED ROUTES:',
            this.filteredRoutesList
          );


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get User Error:',
            error
          );

          this.isLoading = false;

          this.alertService.error(

            error?.error?.message ||
            'Failed to load user details'

          );

        }

      });

  }
  getAllAreas(): void {

    this.areaService.getAllAreas().subscribe({

      next: (response: any) => {

        console.log(
          'Areas Response:',
          response
        );

        if (response?.success) {

          this.areasList =
            response.data || [];

        } else {

          this.areasList = [];

        }

      },

      error: (error: any) => {

        console.error(
          'Get Areas Error:',
          error
        );

        this.areasList = [];

      }

    });

  }
  getAllRoutes(): void {

    this.routeService
      .getAllRoutes()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Routes Response:',
            response
          );

          if (response?.success) {

            this.routesList =
              response.data || [];

          }
          else {

            this.routesList = [];

          }


          // ======================================
          // EDIT MODE
          // FILTER USING SELECTED AREA
          // ======================================

          const areaId =
            this.userForm
              .get('area')
              ?.value;


          const routeId =
            this.userForm
              .get('route')
              ?.value;


          console.log(
            'Area after routes loaded:',
            areaId
          );

          console.log(
            'Route after routes loaded:',
            routeId
          );


          // ======================================
          // FILTER ROUTES
          // ======================================

          if (areaId) {

            this.filteredRoutesList =
              this.routesList.filter(
                (route: any) => {

                  const routeAreaId =
                    route.area?._id ??
                    route.area ??
                    '';

                  return routeAreaId === areaId;

                }
              );

          }
          else {

            this.filteredRoutesList = [];

          }


          // ======================================
          // PATCH ROUTE AGAIN
          // ======================================

          if (routeId) {

            this.userForm
              .get('route')
              ?.setValue(
                routeId,
                {
                  emitEvent: false
                }
              );

          }


          console.log(
            'Filtered Routes After API:',
            this.filteredRoutesList
          );

        },


        error: (error: any) => {

          console.error(
            'Get Routes Error:',
            error
          );

          this.routesList = [];

          this.filteredRoutesList = [];

        }

      });

  }
  onAreaChange(areaId: string): void {

    console.log('Selected Area ID:', areaId);

    const routeControl = this.userForm.get('route');

    // Clear previous route
    routeControl?.setValue('');

    // No area selected
    if (!areaId) {
      this.filteredRoutesList = [];
      routeControl?.disable();
      return;
    }

    // Filter routes based on selected area
    this.filteredRoutesList = this.routesList.filter((route: any) => {

      const routeAreaId =
        typeof route.area === 'object'
          ? route.area?._id
          : route.area;

      return routeAreaId === areaId;
    });

    console.log('Filtered Routes:', this.filteredRoutesList);

    // Enable route after area selection
    routeControl?.enable();
  }
  // ==========================================
  // Apply Role Validation
  // ==========================================

  applyRoleValidation(): void {

    const role =
      this.userForm.get('role')?.value;


    this.isWarehouseRole =
      role === 'WarehouseManager';


    this.isDistributorRole =
      role === 'Distributor';


    this.isFieldRole =
      [
        'SalesManager',
        'Salesman',
        'DeliveryBoy'
      ].includes(role);


    const warehouseControl =
      this.userForm.get('warehouse');

    const areaControl =
      this.userForm.get('area');

    const distributorNameControl =
      this.userForm.get('distributorName');

    const shopNameControl =
      this.userForm.get('shopName');


    // ========================================
    // Clear
    // ========================================

    warehouseControl?.clearValidators();

    areaControl?.clearValidators();

    distributorNameControl
      ?.clearValidators();

    shopNameControl
      ?.clearValidators();


    // ========================================
    // Warehouse Manager
    // ========================================

    if (this.isWarehouseRole) {

      warehouseControl?.setValidators([
        Validators.required
      ]);

    }


    // ========================================
    // Distributor
    // ========================================

    if (this.isDistributorRole) {

      distributorNameControl?.setValidators([
        Validators.required
      ]);

      shopNameControl?.setValidators([
        Validators.required
      ]);

    }


    warehouseControl
      ?.updateValueAndValidity();

    areaControl
      ?.updateValueAndValidity();

    distributorNameControl
      ?.updateValueAndValidity();

    shopNameControl
      ?.updateValueAndValidity();

  }
  // ==========================================
  // Date Format
  // ==========================================

  formatDateForInput(
    date: any
  ): string {

    if (!date) {

      return '';

    }


    const d =
      new Date(date);


    if (isNaN(
      d.getTime()
    )) {

      return '';

    }


    const year =
      d.getFullYear();


    const month =
      String(
        d.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        d.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }
  // ==========================================
  // Get All Warehouses
  // ==========================================

  getAllWarehouses(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Warehouse Response:',
            response
          );

          this.warehouseList =
            response?.data || [];

        },

        error: (error: any) => {

          console.log(
            'Warehouse Error:',
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
  // Role Change
  // ==========================================

  onRoleChange(): void {

    const role =
      this.userForm
        .get('role')
        ?.value;


    // ========================================
    // Set Role Flags
    // ========================================

    this.isWarehouseRole =
      role === 'WarehouseManager';


    this.isDistributorRole =
      role === 'Distributor';


    this.isFieldRole =
      [
        'SalesManager',
        'Salesman',
        'DeliveryBoy'
      ].includes(role);


    // ========================================
    // Clear Previously Selected Data
    // ========================================

    this.selectedWarehouse = null;


    // ========================================
    // Clear Dynamic Fields
    // ========================================

    this.userForm.patchValue({

      warehouse: '',
      area: '',
      route: '',
      reportingManager: '',

      distributorName: '',
      shopName: '',
      gstNumber: '',
      panNumber: ''

    });


    // ========================================
    // Clear Validators
    // ========================================

    this.userForm
      .get('warehouse')
      ?.clearValidators();

    this.userForm
      .get('area')
      ?.clearValidators();

    this.userForm
      .get('distributorName')
      ?.clearValidators();

    this.userForm
      .get('shopName')
      ?.clearValidators();


    // ========================================
    // Warehouse Manager
    // ========================================

    if (this.isWarehouseRole) {

      this.userForm
        .get('warehouse')
        ?.setValidators([
          Validators.required
        ]);

    }


    // ========================================
    // Distributor
    // ========================================

    if (this.isDistributorRole) {

      this.userForm
        .get('distributorName')
        ?.setValidators([
          Validators.required
        ]);

      this.userForm
        .get('shopName')
        ?.setValidators([
          Validators.required
        ]);

    }


    // ========================================
    // Update Validation
    // ========================================

    this.userForm
      .get('warehouse')
      ?.updateValueAndValidity();

    this.userForm
      .get('area')
      ?.updateValueAndValidity();

    this.userForm
      .get('distributorName')
      ?.updateValueAndValidity();

    this.userForm
      .get('shopName')
      ?.updateValueAndValidity();

  }


  // ==========================================
  // Warehouse Change
  // ==========================================

  onWarehouseChange(
    event: Event
  ): void {

    const select =
      event.target as HTMLSelectElement;


    const warehouseId =
      select.value;


    // ========================================
    // No Warehouse
    // ========================================

    if (!warehouseId) {

      this.selectedWarehouse =
        null;

      return;

    }


    // ========================================
    // Find Warehouse
    // ========================================

    this.selectedWarehouse =
      this.warehouseList.find(

        warehouse =>
          warehouse._id ===
          warehouseId

      ) || null;


    console.log(
      'Selected Warehouse:',
      this.selectedWarehouse
    );


    // ========================================
    // Keep Only ID In Form
    // ========================================

    this.userForm.patchValue({

      warehouse:
        warehouseId

    });

  }


  // ==========================================
  // Toggle Password
  // ==========================================

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }


  // ==========================================
  // File Change
  // ==========================================

  onFileChange(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    this.selectedFile =
      input.files[0];


    // ========================================
    // Patch Form
    // ========================================

    this.userForm.patchValue({

      profileImage:
        this.selectedFile

    });


    this.userForm
      .get('profileImage')
      ?.updateValueAndValidity();


    // ========================================
    // Image Preview
    // ========================================

    const reader =
      new FileReader();


    reader.onload = () => {

      this.imagePreview =
        reader.result;

    };


    reader.readAsDataURL(
      this.selectedFile
    );

  }


  // ==========================================
  // Role Label
  // ==========================================

  getRoleLabel(
    role: string
  ): string {

    const labels: {
      [key: string]: string
    } = {

      Admin:
        'Admin',

      SubAdmin:
        'Sub Admin',

      WarehouseManager:
        'Warehouse Manager',

      SalesManager:
        'Sales Manager',

      Salesman:
        'Salesman',

      Accountant:
        'Accountant',

      DeliveryBoy:
        'Delivery Boy',

      Distributor:
        'Distributor'

    };


    return (
      labels[role] ||
      role
    );

  }




  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/users-list'
    ]);

  }
  // ==========================================
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    this.applyRoleValidation();


    if (
      this.userForm.invalid
    ) {

      this.userForm.markAllAsTouched();

      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }


    const value =
      this.userForm.value;


    // ========================================
    // Form Data
    // ========================================

    const formData =
      new FormData();


    // ========================================
    // Common Fields
    // ========================================

    formData.append(
      'firstName',
      value.firstName
    );

    formData.append(
      'lastName',
      value.lastName || ''
    );

    formData.append(
      'gender',
      value.gender || 'Male'
    );


    if (value.dateOfBirth) {

      formData.append(
        'dateOfBirth',
        value.dateOfBirth
      );

    }


    formData.append(
      'mobile',
      value.mobile
    );

    formData.append(
      'alternateMobile',
      value.alternateMobile || ''
    );

    formData.append(
      'email',
      value.email || ''
    );


    formData.append(
      'role',
      value.role
    );


    // ========================================
    // Password
    // ========================================

    // Edit mode:
    // empty password = old password preserved

    if (
      value.password &&
      value.password.trim()
    ) {

      formData.append(
        'password',
        value.password
      );

    }


    // ========================================
    // Warehouse
    // ========================================

    if (
      value.role ===
      'WarehouseManager' &&
      value.warehouse
    ) {

      formData.append(
        'warehouse',
        value.warehouse
      );

    }


    // ========================================
    // Field Assignment
    // ========================================

    if (
      [
        'SalesManager',
        'Salesman',
        'DeliveryBoy'
      ].includes(value.role)
    ) {

      formData.append(
        'area',
        value.area || ''
      );

      formData.append(
        'route',
        value.route || ''
      );

      formData.append(
        'reportingManager',
        value.reportingManager || ''
      );

    }


    // ========================================
    // Distributor
    // ========================================

    if (
      value.role ===
      'Distributor'
    ) {

      formData.append(
        'distributorName',
        value.distributorName || ''
      );

      formData.append(
        'shopName',
        value.shopName || ''
      );

      formData.append(
        'gstNumber',
        value.gstNumber || ''
      );

      formData.append(
        'panNumber',
        value.panNumber || ''
      );

    }


    // ========================================
    // Address
    // ========================================

    formData.append(
      'addressLine1',
      value.addressLine1 || ''
    );

    formData.append(
      'addressLine2',
      value.addressLine2 || ''
    );

    formData.append(
      'city',
      value.city || ''
    );

    formData.append(
      'state',
      value.state || ''
    );

    formData.append(
      'pincode',
      value.pincode || ''
    );


    // ========================================
    // Profile Image
    // ========================================

    if (
      this.selectedFile
    ) {

      formData.append(
        'profileImage',
        this.selectedFile
      );

    }


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // UPDATE
    // ========================================

    if (
      this.isEditMode &&
      this.userId
    ) {

      this.userService
        .updateUser(
          this.userId,
          formData
        )
        .subscribe({

          next: (response: any) => {

            this.isLoading = false;


            this.alertService
              .success(

                response?.message ||

                'User Updated Successfully'

              )
              .then(() => {

                this.router.navigate([
                  '/admin/users-list'
                ]);

              });

          },


          error: (error: any) => {

            this.isLoading = false;


            console.log(
              'Update User Error:',
              error
            );


            this.alertService.error(

              error?.error?.message ||

              'Failed to update user'

            );

          }

        });

      return;

    }


    // ========================================
    // CREATE
    // ========================================

    this.userService
      .registerUser(
        formData
      )
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'User Created Successfully'

            )
            .then(() => {

              this.router.navigate([
                '/admin/employees-list'
              ]);

            });

        },


        error: (error: any) => {

          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Something went wrong'

          );

        }

      });

  }
}
