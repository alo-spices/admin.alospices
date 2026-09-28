import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-update-distributor',
  templateUrl: './update-distributor.component.html',
  styleUrls: ['./update-distributor.component.css']
})
export class UpdateDistributorComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  userForm!: FormGroup;


  // ==========================================
  // User ID
  // ==========================================

  userId: string = '';


  // ==========================================
  // Profile Image
  // ==========================================

  selectedFile!: File;

  imagePreview: string | null = null;


  // ==========================================
  // UI
  // ==========================================

  showPassword = false;

  isSubmitted = false;

  isLoading = false;

  isEditMode = false;


  constructor(

    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

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


    // ========================================
    // Get User ID
    // ========================================

    this.userId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    console.log(
      'Distributor ID:',
      this.userId
    );


    // ========================================
    // Validate ID
    // ========================================

    if (!this.userId) {

      this.alertService.error(
        'Distributor ID not found'
      );

      this.goBack();

      return;

    }


    this.isEditMode = true;


    // ========================================
    // Get Distributor
    // ========================================

    this.getDistributorById();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.userForm =
      this.fb.group({

        // ====================================
        // Basic Information
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
        // Contact
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
        // Login
        // ====================================

        password: [

          ''

        ],


        // ====================================
        // Fixed Role
        // ====================================

        role: [

          'Distributor',

          Validators.required

        ],


        // ====================================
        // Distributor Details
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
        // Address
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
        // Profile Image
        // ====================================

        profileImage: [

          null

        ]

      });

  }


  // ==========================================
  // Get Distributor By ID
  // ==========================================

  getDistributorById(): void {

    this.isLoading = true;


    this.userService
      .getUserById(
        this.userId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Distributor Details:',
            response
          );


          const user =
            response?.data;


          if (!user) {

            this.isLoading = false;


            this.alertService.error(
              'Distributor details not found'
            );

            return;

          }


          // ====================================
          // Ensure Distributor
          // ====================================

          if (
            user.role !== 'Distributor'
          ) {

            this.isLoading = false;


            this.alertService.error(
              'Selected user is not a Distributor'
            );

            this.goBack();

            return;

          }


          // ====================================
          // Existing Profile Image
          // ====================================

          this.imagePreview =
            user.profileImage || null;


          // ====================================
          // Patch Form
          // ====================================

          this.userForm.patchValue({

            // ==================================
            // Basic
            // ==================================

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


            // ==================================
            // Contact
            // ==================================

            mobile:
              user.mobile ?? '',

            alternateMobile:
              user.alternateMobile ?? '',

            email:
              user.email ?? '',


            // ==================================
            // Fixed Role
            // ==================================

            role:
              'Distributor',


            // ==================================
            // Distributor
            // ==================================

            distributorName:
              user.distributorName ?? '',

            shopName:
              user.shopName ?? '',

            gstNumber:
              user.gstNumber ?? '',

            panNumber:
              user.panNumber ?? '',


            // ==================================
            // Address
            // ==================================

            addressLine1:
              user.addressLine1 ?? '',

            addressLine2:
              user.addressLine2 ?? '',

            city:
              user.city ?? '',

            state:
              user.state ?? '',

            pincode:
              user.pincode ?? '',


            // ==================================
            // Password
            // ==================================

            password:
              ''

          });


          console.log(
            'Patched Distributor Form:',
            this.userForm.value
          );


          console.log(
            'Existing Profile Image:',
            this.imagePreview
          );


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Distributor Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load distributor details'

          );

        }

      });

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


    if (
      isNaN(
        d.getTime()
      )
    ) {

      return '';

    }


    const year =
      d.getFullYear();


    const month =
      String(
        d.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        d.getDate()
      ).padStart(
        2,
        '0'
      );


    return `${year}-${month}-${day}`;

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
    // Form
    // ========================================

    this.userForm.patchValue({

      profileImage:
        this.selectedFile

    });


    // ========================================
    // Preview
    // ========================================

    const reader =
      new FileReader();


    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

    };


    reader.readAsDataURL(
      this.selectedFile
    );

  }


  // ==========================================
  // Submit / Update
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Validate
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
    // Distributor
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

    // Empty password = keep old password

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
    // Update API
    // ========================================

    this.userService
      .updateUser(

        this.userId,

        formData

      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Distributor Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Distributor updated successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/distributors-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Update Distributor Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update distributor'

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
