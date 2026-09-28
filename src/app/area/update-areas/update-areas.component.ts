import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-update-areas',
  templateUrl: './update-areas.component.html',
  styleUrls: ['./update-areas.component.css']
})
export class UpdateAreasComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  areaForm!: FormGroup;


  // ==========================================
  // Area ID
  // ==========================================

  areaId: string = '';


  // ==========================================
  // Edit Mode
  // ==========================================

  isEditMode = true;


  // ==========================================
  // UI
  // ==========================================

  isLoading = false;

  isSubmitted = false;


  constructor(

    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

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


    // ========================================
    // Get ID From URL
    // ========================================

    this.areaId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    console.log(
      'Area ID:',
      this.areaId
    );


    // ========================================
    // Validate ID
    // ========================================

    if (!this.areaId) {

      this.alertService.error(
        'Area ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Get Area Details
    // ========================================

    this.getAreaById();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.areaForm =
      this.fb.group({

        areaName: [

          '',

          Validators.required

        ],


        areaCode: [

          '',

          Validators.required

        ],


        city: [

          '',

          Validators.required

        ],


        district: [

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


        description: [

          ''

        ]

      });

  }


  // ==========================================
  // Get Area By ID
  // ==========================================

  getAreaById(): void {

    this.isLoading = true;


    this.areaService
      .getAreaById(
        this.areaId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Get Area Response:',
            response
          );


          const area =
            response?.data;


          if (!area) {

            this.isLoading = false;

            this.alertService.error(
              'Area details not found'
            );

            return;

          }


          // ====================================
          // Patch Form
          // ====================================

          this.areaForm.patchValue({

            areaName:
              area.areaName || '',

            areaCode:
              area.areaCode || '',

            city:
              area.city || '',

            district:
              area.district || '',

            state:
              area.state || '',

            pincode:
              area.pincode || '',

            description:
              area.description || ''

          });


          // ====================================
          // Debug
          // ====================================

          console.log(
            'Patched Area Form:',
            this.areaForm.value
          );


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Area Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load area details'

          );

        }

      });

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
    // Values
    // ========================================

    const value =
      this.areaForm.value;


    // ========================================
    // Payload
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

    this.isLoading = true;


    // ========================================
    // Update API
    // ========================================

    this.areaService
      .updateArea(
        this.areaId,
        areaData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Area Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Area updated successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/areas-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Update Area Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update area'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/areas-list'

    ]);

  }


}
