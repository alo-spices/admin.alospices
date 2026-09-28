import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-create-distributor',
  templateUrl: './create-distributor.component.html',
  styleUrls: ['./create-distributor.component.css']
})
export class CreateDistributorComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  userForm!: FormGroup;


  // ==========================================
  // Profile Image
  // ==========================================

  selectedFile!: File;

  imagePreview: any = null;


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

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.userForm =
      this.fb.group({

        // ====================================
        // BASIC INFORMATION
        // ====================================

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


        // ====================================
        // CONTACT INFORMATION
        // ====================================

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


        // ====================================
        // LOGIN
        // ====================================

        password: [

          '',

          [

            Validators.required,

            Validators.minLength(6)

          ]

        ],


        // ====================================
        // FIXED ROLE
        // ====================================

        role: [

          'Distributor',

          Validators.required

        ],


        // ====================================
        // DISTRIBUTOR DETAILS
        // ====================================

        distributorName: [

          '',

          Validators.required

        ],

        shopName: [

          '',

          Validators.required

        ],

        gstNumber: [

          ''

        ],

        panNumber: [

          ''

        ],


        // ====================================
        // ADDRESS
        // ====================================

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


        // ====================================
        // PROFILE IMAGE
        // ====================================

        profileImage: [

          null

        ]

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
    // Preview
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

    return role === 'Distributor'
      ? 'Distributor'
      : role || 'Distributor';

  }


  // ==========================================
  // Submit
  // ==========================================

  onSubmit(): void {

    // ========================================
    // Validate
    // ========================================

    this.isSubmitted = true;

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      // Find invalid controls
      const invalidFields: string[] = [];

      Object.keys(this.userForm.controls).forEach(field => {

        const control = this.userForm.get(field);

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

      console.log('❌ Invalid Fields:', invalidFields);
      console.log('📋 Form Value:', this.userForm.value);
      console.log('📋 Form Status:', this.userForm.status);

      this.alertService.validation(
        `Please fill required fields: ${invalidFields.join(', ')}`
      );

      return;
    }


    // ========================================
    // Form Values
    // ========================================

    const value =
      this.userForm.value;


    // ========================================
    // Extra Distributor Validation
    // ========================================

    const distributorName =
      value.distributorName
        ?.trim();

    const shopName =
      value.shopName
        ?.trim();


    if (!distributorName) {

      this.alertService.validation(

        'Distributor Name is required'

      );

      return;

    }


    if (!shopName) {

      this.alertService.validation(

        'Shop Name is required'

      );

      return;

    }


    // ========================================
    // FormData
    // ========================================

    const formData =
      new FormData();


    // ========================================
    // Basic Information
    // ========================================

    formData.append(

      'firstName',

      value.firstName
        ?.trim() || ''

    );


    formData.append(

      'lastName',

      value.lastName
        ?.trim() || ''

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


    // ========================================
    // Contact
    // ========================================

    formData.append(

      'mobile',

      value.mobile || ''

    );


    formData.append(

      'alternateMobile',

      value.alternateMobile
        ?.trim() || ''

    );


    formData.append(

      'email',

      value.email
        ?.trim() || ''

    );


    // ========================================
    // Fixed Role
    // ========================================

    formData.append(

      'role',

      'Distributor'

    );


    // ========================================
    // Distributor Details
    // ========================================

    formData.append(

      'distributorName',

      distributorName

    );


    formData.append(

      'shopName',

      shopName

    );


    formData.append(

      'gstNumber',

      value.gstNumber
        ?.trim() || ''

    );


    formData.append(

      'panNumber',

      value.panNumber
        ?.trim()
        .toUpperCase() || ''

    );


    // ========================================
    // Address
    // ========================================

    formData.append(

      'addressLine1',

      value.addressLine1
        ?.trim() || ''

    );


    formData.append(

      'addressLine2',

      value.addressLine2
        ?.trim() || ''

    );


    formData.append(

      'city',

      value.city
        ?.trim() || ''

    );


    formData.append(

      'state',

      value.state
        ?.trim() || ''

    );


    formData.append(

      'pincode',

      value.pincode
        ?.trim() || ''

    );


    // ========================================
    // Password
    // ========================================

    formData.append(

      'password',

      value.password

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
    // Debug
    // ========================================

    console.log(
      'Distributor Form:',
      value
    );


    console.log(
      'Distributor Payload:',
      {
        firstName:
          value.firstName,

        lastName:
          value.lastName,

        mobile:
          value.mobile,

        email:
          value.email,

        role:
          'Distributor',

        distributorName:
          distributorName,

        shopName:
          shopName,

        gstNumber:
          value.gstNumber,

        panNumber:
          value.panNumber
      }
    );


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // Register Distributor
    // ========================================

    this.userService
      .registerUser(
        formData
      )
      .subscribe({

        next: (response: any) => {

          console.log(

            'Distributor Register Response:',

            response

          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Distributor created successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/distributors-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(

            'Distributor Register Error:',

            error

          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create distributor'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/distributors-list'

    ]);

  }
}
