import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  userForm!: FormGroup;


  // ==========================================
  // Selected Profile Image
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


  constructor(

    private fb: FormBuilder,

    private router: Router,

    private userService: EmployeeService,

    private alertService: CommomPopupService

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

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
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
        ''
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
  // File Change
  // ==========================================

  onFileChange(event: any): void {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      this.selectedFile =
        event.target.files[0];


      // ==========================================
      // Patch Form
      // ==========================================

      this.userForm.patchValue({

        profileImage:
          this.selectedFile

      });


      this.userForm
        .get('profileImage')
        ?.updateValueAndValidity();


      // ==========================================
      // Image Preview
      // ==========================================

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
  // Submit
  // ==========================================

  onSubmit(): void {
    

    this.isSubmitted = true;


    // ==========================================
    // Validate Form
    // ==========================================

   if (this.userForm.invalid) {

  // ==========================================
  // First Name
  // ==========================================

  if (
    this.userForm.get('firstName')?.hasError('required')
  ) {

    this.alertService.validation(
      'Please enter first name.'
    );

    return;

  }


  // ==========================================
  // Mobile
  // ==========================================

  if (
    this.userForm.get('mobile')?.hasError('required')
  ) {

    this.alertService.validation(
      'Please enter mobile number.'
    );

    return;

  }

  if (
    this.userForm.get('mobile')?.hasError('pattern')
  ) {

    this.alertService.validation(
      'Mobile number must contain exactly 10 digits.'
    );

    return;

  }


  // ==========================================
  // Email
  // ==========================================

  if (
    this.userForm.get('email')?.hasError('email')
  ) {

    this.alertService.validation(
      'Please enter a valid email address.'
    );

    return;

  }


  // ==========================================
  // Password
  // ==========================================

  if (
    this.userForm.get('password')?.hasError('required')
  ) {

    this.alertService.validation(
      'Please enter password.'
    );

    return;

  }

  if (
    this.userForm.get('password')?.hasError('minlength')
  ) {

    this.alertService.validation(
      'Password must contain at least 6 characters.'
    );

    return;

  }


  // ==========================================
  // Role
  // ==========================================

  if (
    this.userForm.get('role')?.hasError('required')
  ) {

    this.alertService.validation(
      'Please select employee role.'
    );

    return;

  }


  // ==========================================
  // Pincode
  // ==========================================

  if (
    this.userForm.get('pincode')?.hasError('pattern')
  ) {

    this.alertService.validation(
      'Pincode must contain exactly 6 digits.'
    );

    return;

  }


  // ==========================================
  // Common Validation
  // ==========================================

  this.alertService.validation(
    'Please check the entered details.'
  );

  return;

}


    // ==========================================
    // Form Data
    // ==========================================

    const formData =
      new FormData();


    // ==========================================
    // Basic Details
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


    formData.append(
      'password',
      this.userForm.value.password
    );


    // ==========================================
    // Role
    // ==========================================

    formData.append(
      'role',
      this.userForm.value.role
    );


    // ==========================================
    // Personal Details
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
    // Address
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
    // Profile Image
    // ==========================================

    if (this.selectedFile) {

      formData.append(
        'profileImage',
        this.selectedFile
      );

    }


    // ==========================================
    // Register User API
    // ==========================================

    this.userService
      .registerUser(formData)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Register Response:',
            response
          );


          this.alertService.success(

            response.message ||
            'Employee Created Successfully'

          );


          // ==========================================
          // Navigate To Employee List
          // ==========================================

          this.router.navigate([
            '/admin/employees-list'
          ]);

        },


        error: (error: any) => {

          console.log(
            'Register Error:',
            error
          );


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
      '/admin/employees-list'
    ]);

  }


}
