import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  // ==========================================
  // Form
  // ==========================================

  userForm!: FormGroup;


  // ==========================================
  // User ID
  // ==========================================

  userId!: string;


  // ==========================================
  // Selected Image
  // ==========================================

  selectedFile!: File;


  // ==========================================
  // Image Preview
  // ==========================================

  imagePreview: any = null;


  // ==========================================
  // Submit Status
  // ==========================================

  isSubmitted = false;


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(
    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private employeeService: EmployeeService,

    private alertService: CommomPopupService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.userId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.userId) {

      this.alertService.error(
        'User ID not found.'
      );

      this.goBack();

      return;

    }

    this.getUser();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.userForm = this.fb.group({

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        ''
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      email: [
        '',
        Validators.email
      ],

      // Password is OPTIONAL during update
      password: [
        '',
        Validators.minLength(6)
      ],

      role: [
        '',
        Validators.required
      ],

      gender: [
        'Male'
      ],

      dateOfBirth: [
        ''
      ],

      alternateMobile: [
        '',
        Validators.pattern(/^[0-9]{10}$/)
      ],

      addressLine1: [
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
        Validators.pattern(/^[0-9]{6}$/)
      ],

      profileImage: [
        null
      ]

    });

  }


  // ==========================================
  // GET USER
  // ==========================================

  getUser(): void {

    this.isLoading = true;

    this.employeeService
      .getUserById(this.userId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Get User Response:',
            response
          );

          if (
            response &&
            response.success &&
            response.data
          ) {

            const user =
              response.data;

            // ==================================
            // Patch Form
            // ==================================

            this.userForm.patchValue({

              firstName:
                user.firstName || '',

              lastName:
                user.lastName || '',

              mobile:
                user.mobile || '',

              email:
                user.email || '',

              // Don't patch password
              password:
                '',

              role:
                user.role || '',

              gender:
                user.gender || 'Male',

              dateOfBirth:
                this.formatDate(user.dateOfBirth),

              alternateMobile:
                user.alternateMobile || '',

              addressLine1:
                user.addressLine1 || '',

              city:
                user.city || '',

              state:
                user.state || '',

              pincode:
                user.pincode || ''

            });


            // ==================================
            // Existing Profile Image
            // ==================================

            if (user.profileImage) {

              this.imagePreview =
                user.profileImage;

            }

          }

          else {

            this.alertService.error(
              response?.message ||
              'User not found.'
            );

            this.goBack();

          }

          this.isLoading = false;

        },

        error: (error: any) => {

          console.error(
            'Get User Error:',
            error
          );

          this.isLoading = false;

          this.alertService.error(

            error?.error?.message ||
            'Failed to load employee details.'

          );

        }

      });

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  formatDate(date: any): string {

    if (!date) {

      return '';

    }

    const d =
      new Date(date);

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
  // FILE CHANGE
  // ==========================================

  onFileChange(event: any): void {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      this.selectedFile =
        event.target.files[0];


      // ======================================
      // Patch Form
      // ======================================

      this.userForm.patchValue({

        profileImage:
          this.selectedFile

      });


      this.userForm
        .get('profileImage')
        ?.updateValueAndValidity();


      // ======================================
      // Image Preview
      // ======================================

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

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (this.userForm.invalid) {

      // First Name
      if (
        this.userForm
          .get('firstName')
          ?.hasError('required')
      ) {

        this.alertService.validation(
          'Please enter first name.'
        );

        return;

      }


      // Mobile
      if (
        this.userForm
          .get('mobile')
          ?.hasError('required')
      ) {

        this.alertService.validation(
          'Please enter mobile number.'
        );

        return;

      }


      if (
        this.userForm
          .get('mobile')
          ?.hasError('pattern')
      ) {

        this.alertService.validation(
          'Mobile number must contain exactly 10 digits.'
        );

        return;

      }


      // Email
      if (
        this.userForm
          .get('email')
          ?.hasError('email')
      ) {

        this.alertService.validation(
          'Please enter a valid email address.'
        );

        return;

      }


      // Password
      if (
        this.userForm
          .get('password')
          ?.hasError('minlength')
      ) {

        this.alertService.validation(
          'Password must contain at least 6 characters.'
        );

        return;

      }


      // Role
      if (
        this.userForm
          .get('role')
          ?.hasError('required')
      ) {

        this.alertService.validation(
          'Please select employee role.'
        );

        return;

      }


      // Alternate Mobile
      if (
        this.userForm
          .get('alternateMobile')
          ?.hasError('pattern')
      ) {

        this.alertService.validation(
          'Alternate mobile number must contain exactly 10 digits.'
        );

        return;

      }


      // Pincode
      if (
        this.userForm
          .get('pincode')
          ?.hasError('pattern')
      ) {

        this.alertService.validation(
          'Pincode must contain exactly 6 digits.'
        );

        return;

      }


      this.alertService.validation(
        'Please check the entered details.'
      );

      return;

    }


    // ==========================================
    // FORM DATA
    // ==========================================

    const formData =
      new FormData();


    // ==========================================
    // BASIC DETAILS
    // ==========================================

    formData.append(
      'firstName',
      this.userForm.value.firstName
    );

    formData.append(
      'lastName',
      this.userForm.value.lastName || ''
    );

    formData.append(
      'mobile',
      this.userForm.value.mobile
    );

    formData.append(
      'email',
      this.userForm.value.email || ''
    );


    // ==========================================
    // PASSWORD
    // ==========================================

    // Only send password if user entered it

    if (
      this.userForm.value.password &&
      this.userForm.value.password.trim() !== ''
    ) {

      formData.append(
        'password',
        this.userForm.value.password
      );

    }


    // ==========================================
    // ROLE
    // ==========================================

    formData.append(
      'role',
      this.userForm.value.role
    );


    // ==========================================
    // PERSONAL DETAILS
    // ==========================================

    formData.append(
      'gender',
      this.userForm.value.gender || 'Male'
    );


    if (
      this.userForm.value.dateOfBirth
    ) {

      formData.append(
        'dateOfBirth',
        this.userForm.value.dateOfBirth
      );

    }


    formData.append(
      'alternateMobile',
      this.userForm.value.alternateMobile || ''
    );


    // ==========================================
    // ADDRESS
    // ==========================================

    formData.append(
      'addressLine1',
      this.userForm.value.addressLine1 || ''
    );

    formData.append(
      'city',
      this.userForm.value.city || ''
    );

    formData.append(
      'state',
      this.userForm.value.state || ''
    );

    formData.append(
      'pincode',
      this.userForm.value.pincode || ''
    );


    // ==========================================
    // PROFILE IMAGE
    // ==========================================

    if (this.selectedFile) {

      formData.append(
        'profileImage',
        this.selectedFile
      );

    }


    // ==========================================
    // UPDATE API
    // ==========================================

    this.isLoading = true;

    this.employeeService
      .updateUser(
        this.userId,
        formData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update User Response:',
            response
          );

          this.isLoading = false;


          this.alertService.success(

            response?.message ||
            'Employee updated successfully.'

          );


          // ======================================
          // Navigate List
          // ======================================

          this.router.navigate([
            '/admin/employees-list'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Update User Error:',
            error
          );

          this.isLoading = false;

          this.alertService.error(

            error?.error?.message ||
            'Failed to update employee.'

          );

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/employees-list'
    ]);

  }

}