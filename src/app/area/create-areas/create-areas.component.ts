import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-create-areas',
  templateUrl: './create-areas.component.html',
  styleUrls: ['./create-areas.component.css']
})
export class CreateAreasComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  areaForm!: FormGroup;


  // ==========================================
  // UI
  // ==========================================

  isSubmitted = false;

  isLoading = false;


  constructor(

    private fb:
      FormBuilder,

    private router:
      Router,

    private areaService:
      AreasService,

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

    this.areaForm =
      this.fb.group({

        // ====================================
        // Area Name
        // ====================================

        areaName: [

          '',

          Validators.required

        ],


        // ====================================
        // Area Code
        // ====================================

        areaCode: [

          '',

          Validators.required

        ],


        // ====================================
        // City
        // ====================================

        city: [

          '',

          Validators.required

        ],


        // ====================================
        // District
        // ====================================

        district: [

          ''

        ],


        // ====================================
        // State
        // ====================================

        state: [

          ''

        ],


        // ====================================
        // Pincode
        // ====================================

        pincode: [

          '',

          Validators.pattern(
            /^[0-9]{6}$/
          )

        ],


        // ====================================
        // Description
        // ====================================

        description: [

          ''

        ]

      });

  }


  // ==========================================
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Validate Form
    // ========================================

    if (
      this.areaForm.invalid
    ) {

      this.areaForm
        .markAllAsTouched();


      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }


    // ========================================
    // Form Value
    // ========================================

    const value =
      this.areaForm.value;


    // ========================================
    // Request Payload
    // ========================================

    const areaData = {

      areaName:
        value.areaName
          ?.trim(),

      areaCode:
        value.areaCode
          ?.trim()
          .toUpperCase(),

      city:
        value.city
          ?.trim(),

      district:
        value.district
          ?.trim() || '',

      state:
        value.state
          ?.trim() || '',

      pincode:
        value.pincode
          ?.trim() || '',

      description:
        value.description
          ?.trim() || ''

    };


    // ========================================
    // Loading
    // ========================================

    this.isLoading =
      true;


    // ========================================
    // Create Area API
    // ========================================

    this.areaService
      .createArea(
        areaData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Area Response:',
            response
          );


          this.isLoading =
            false;


          this.alertService
            .success(

              response?.message ||

              'Area created successfully'

            )
            .then(() => {

              // ==================================
              // Navigate List
              // ==================================

              this.router.navigate([

                '/admin/areas-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Create Area Error:',
            error
          );


          this.isLoading =
            false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create area'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/area-list'

    ]);

  }

}
