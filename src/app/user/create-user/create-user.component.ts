import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { RoutesService } from 'src/app/Services/routes.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  // ==========================================
  // Form
  // ==========================================

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
  areasList: any[] = [];

  routesList: any[] = [];
  filteredRoutesList: any[] = [];
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
    private areaService: AreasService,
    private routeService: RoutesService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllWarehouses();
    this.getAllAreas();

    this.getAllRoutes();

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

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],


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


    // Apply initial role state

    this.onRoleChange();

  }
  // initializeForm(): void {

  //   this.userForm = this.fb.group({

  //     // ========================================
  //     // Basic Information
  //     // ========================================

  //     firstName: [
  //       '',
  //       Validators.required
  //     ],

  //     lastName: [
  //       ''
  //     ],

  //     gender: [
  //       'Male'
  //     ],

  //     dateOfBirth: [
  //       ''
  //     ],


  //     // ========================================
  //     // Contact
  //     // ========================================

  //     mobile: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern(
  //           /^[0-9]{10}$/
  //         )
  //       ]
  //     ],

  //     alternateMobile: [
  //       '',
  //       Validators.pattern(
  //         /^[0-9]{10}$/
  //       )
  //     ],

  //     email: [
  //       '',
  //       Validators.email
  //     ],


  //     // ========================================
  //     // Login
  //     // ========================================

  //     password: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(6)
  //       ]
  //     ],


  //     // ========================================
  //     // Role
  //     // ========================================

  //     role: [
  //       '',
  //       Validators.required
  //     ],


  //     // ========================================
  //     // Assignment
  //     // ========================================

  //     warehouse: [
  //       ''
  //     ],

  //     area: [
  //       ''
  //     ],

  //     route: [
  //       ''
  //     ],

  //     reportingManager: [
  //       ''
  //     ],


  //     // ========================================
  //     // Distributor
  //     // ========================================

  //     distributorName: [
  //       ''
  //     ],

  //     shopName: [
  //       ''
  //     ],

  //     gstNumber: [
  //       ''
  //     ],

  //     panNumber: [
  //       ''
  //     ],


  //     // ========================================
  //     // Address
  //     // ========================================

  //     addressLine1: [
  //       ''
  //     ],

  //     addressLine2: [
  //       ''
  //     ],

  //     city: [
  //       ''
  //     ],

  //     state: [
  //       ''
  //     ],

  //     pincode: [
  //       '',
  //       Validators.pattern(
  //         /^[0-9]{6}$/
  //       )
  //     ],


  //     // ========================================
  //     // Profile Image
  //     // ========================================

  //     profileImage: [
  //       null
  //     ]

  //   });

  // }


  // ==========================================
  // Get All Warehouses
  // ==========================================
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

    this.routeService.getAllRoutes().subscribe({

      next: (response: any) => {

        console.log(
          'Routes Response:',
          response
        );

        if (response?.success) {

          this.routesList =
            response.data || [];

        } else {

          this.routesList = [];

        }

      },

      error: (error: any) => {

        console.error(
          'Get Routes Error:',
          error
        );

        this.routesList = [];

      }

    });

  }
  onAreaChange(areaId: string): void {

    this.userForm.patchValue({
      route: ''
    });

    if (!areaId) {

      this.filteredRoutesList = [];

      return;

    }

    this.filteredRoutesList =
      this.routesList.filter((route: any) => {

        const routeAreaId =
          typeof route.area === 'object'
            ? route.area?._id
            : route.area;

        return routeAreaId === areaId;

      });

  }
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


    // ==========================================
    // Controls
    // ==========================================

    const warehouseControl =
      this.userForm.get('warehouse');

    const areaControl =
      this.userForm.get('area');

    const routeControl =
      this.userForm.get('route');

    const reportingManagerControl =
      this.userForm.get('reportingManager');

    const distributorNameControl =
      this.userForm.get('distributorName');

    const shopNameControl =
      this.userForm.get('shopName');


    // ==========================================
    // Reset All Role Specific Validators
    // ==========================================

    warehouseControl?.clearValidators();

    areaControl?.clearValidators();

    routeControl?.clearValidators();

    reportingManagerControl?.clearValidators();

    distributorNameControl?.clearValidators();

    shopNameControl?.clearValidators();


    // ==========================================
    // Clear Role Specific Values
    // ==========================================

    if (role !== 'WarehouseManager') {

      warehouseControl?.setValue('');

      this.selectedWarehouse =
        null;

    }


    if (
      ![
        'SalesManager',
        'Salesman',
        'DeliveryBoy'
      ].includes(role)
    ) {

      areaControl?.setValue('');

      routeControl?.setValue('');

      reportingManagerControl?.setValue('');

    }


    if (role !== 'Distributor') {

      distributorNameControl?.setValue('');

      shopNameControl?.setValue('');

      this.userForm
        .get('gstNumber')
        ?.setValue('');

      this.userForm
        .get('panNumber')
        ?.setValue('');

    }


    // ==========================================
    // Warehouse Manager
    // ==========================================

    if (
      role === 'WarehouseManager'
    ) {

      warehouseControl?.setValidators(
        [
          Validators.required
        ]
      );

    }


    // ==========================================
    // Field Roles
    // ==========================================

    if (
      [
        'SalesManager',
        'Salesman',
        'DeliveryBoy'
      ].includes(role)
    ) {

      // Area / Route / Reporting Manager
      // optional ga unchachu

    }


    // ==========================================
    // Distributor
    // ==========================================

    if (
      role === 'Distributor'
    ) {

      distributorNameControl?.setValidators(
        [
          Validators.required
        ]
      );

      shopNameControl?.setValidators(
        [
          Validators.required
        ]
      );

    }


    // ==========================================
    // Update Validity
    // ==========================================

    warehouseControl?.updateValueAndValidity();

    areaControl?.updateValueAndValidity();

    routeControl?.updateValueAndValidity();

    reportingManagerControl
      ?.updateValueAndValidity();

    distributorNameControl
      ?.updateValueAndValidity();

    shopNameControl
      ?.updateValueAndValidity();


    // ==========================================
    // Role Flags
    // ==========================================

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

  }
  // onRoleChange(): void {

  //   const role =
  //     this.userForm
  //       .get('role')
  //       ?.value;


  //   // ========================================
  //   // Set Role Flags
  //   // ========================================

  //   this.isWarehouseRole =
  //     role === 'WarehouseManager';


  //   this.isDistributorRole =
  //     role === 'Distributor';


  //   this.isFieldRole =
  //     [
  //       'SalesManager',
  //       'Salesman',
  //       'DeliveryBoy'
  //     ].includes(role);


  //   // ========================================
  //   // Clear Previously Selected Data
  //   // ========================================

  //   this.selectedWarehouse = null;


  //   // ========================================
  //   // Clear Dynamic Fields
  //   // ========================================

  //   this.userForm.patchValue({

  //     warehouse: '',
  //     area: '',
  //     route: '',
  //     reportingManager: '',

  //     distributorName: '',
  //     shopName: '',
  //     gstNumber: '',
  //     panNumber: ''

  //   });


  //   // ========================================
  //   // Clear Validators
  //   // ========================================

  //   this.userForm
  //     .get('warehouse')
  //     ?.clearValidators();

  //   this.userForm
  //     .get('area')
  //     ?.clearValidators();

  //   this.userForm
  //     .get('distributorName')
  //     ?.clearValidators();

  //   this.userForm
  //     .get('shopName')
  //     ?.clearValidators();


  //   // ========================================
  //   // Warehouse Manager
  //   // ========================================

  //   if (this.isWarehouseRole) {

  //     this.userForm
  //       .get('warehouse')
  //       ?.setValidators([
  //         Validators.required
  //       ]);

  //   }


  //   // ========================================
  //   // Distributor
  //   // ========================================

  //   if (this.isDistributorRole) {

  //     this.userForm
  //       .get('distributorName')
  //       ?.setValidators([
  //         Validators.required
  //       ]);

  //     this.userForm
  //       .get('shopName')
  //       ?.setValidators([
  //         Validators.required
  //       ]);

  //   }


  //   // ========================================
  //   // Update Validation
  //   // ========================================

  //   this.userForm
  //     .get('warehouse')
  //     ?.updateValueAndValidity();

  //   this.userForm
  //     .get('area')
  //     ?.updateValueAndValidity();

  //   this.userForm
  //     .get('distributorName')
  //     ?.updateValueAndValidity();

  //   this.userForm
  //     .get('shopName')
  //     ?.updateValueAndValidity();

  // }


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
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Apply Role Logic
    // ========================================

    this.onRoleChange();

    console.log(this.userForm.value, 'user form values')
    // ========================================
    // Validate Form
    // ========================================

    if (
      this.userForm.invalid
    ) {

      this.userForm
        .markAllAsTouched();


      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }


    const value =
      this.userForm.value;


    // ========================================
    // Warehouse Manager Validation
    // ========================================

    if (
      this.isWarehouseRole &&
      !this.selectedWarehouse
    ) {

      this.alertService.validation(
        'Please select a warehouse'
      );

      return;

    }


    // ========================================
    // Form Data
    // ========================================

    const formData =
      new FormData();


    // ========================================
    // WAREHOUSE MANAGER
    // ========================================

    if (this.isWarehouseRole) {

      formData.append(
        'firstName',
        this.selectedWarehouse
          ?.managerName || 'Warehouse Manager'
      );


      formData.append(
        'lastName',
        ''
      );


      formData.append(
        'mobile',
        this.selectedWarehouse
          ?.mobileNumber || ''
      );


      formData.append(
        'email',
        this.selectedWarehouse
          ?.email || ''
      );


      formData.append(
        'password',
        value.password
      );


      formData.append(
        'role',
        'WarehouseManager'
      );


      formData.append(
        'warehouse',
        this.selectedWarehouse._id
      );


      // Do NOT send
      // gender
      // dateOfBirth
      // area
      // route
      // reportingManager
      // distributor data
      // address

    }


    // ========================================
    // OTHER ROLES
    // ========================================

    else {

      // ======================================
      // Basic Information
      // ======================================

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


      if (
        value.dateOfBirth
      ) {

        formData.append(
          'dateOfBirth',
          value.dateOfBirth
        );

      }


      // ======================================
      // Contact
      // ======================================

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


      // ======================================
      // Role
      // ======================================

      formData.append(
        'role',
        value.role
      );


      // ======================================
      // Field Roles
      // ======================================

      if (this.isFieldRole) {

        if (value.area) {

          formData.append(
            'area',
            value.area
          );

        }


        if (value.route) {

          formData.append(
            'route',
            value.route
          );

        }


        if (
          value.reportingManager
        ) {

          formData.append(
            'reportingManager',
            value.reportingManager
          );

        }

      }


      // ======================================
      // Distributor
      // ======================================

      if (this.isDistributorRole) {

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


      // ======================================
      // Address
      // ======================================

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


      // ======================================
      // Password
      // ======================================

      formData.append(
        'password',
        value.password
      );

    }


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
    // Debug
    // ========================================

    console.log(
      'Selected Role:',
      value.role
    );

    console.log(
      'Selected Warehouse:',
      this.selectedWarehouse
    );


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // API
    // ========================================

    this.userService
      .registerUser(
        formData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Register Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'User Created Successfully'

            )
            .then(() => {

              this.router.navigate([
                '/admin/users-list'
              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Register Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Something went wrong'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/users-list'
    ]);

  }
}
