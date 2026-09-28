import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RoutesService } from 'src/app/Services/routes.service';

@Component({
  selector: 'app-update-routes',
  templateUrl: './update-routes.component.html',
  styleUrls: ['./update-routes.component.css']
})
export class UpdateRoutesComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  routeForm!: FormGroup;


  // ==========================================
  // Route ID
  // ==========================================

  routeId: string = '';


  // ==========================================
  // Area List
  // ==========================================

  areaList: any[] = [];


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

    private routeService:
      RoutesService,

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

    this.getAllAreas();


    // ========================================
    // Get Route ID
    // ========================================

    this.routeId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    console.log(
      'Route ID:',
      this.routeId
    );


    // ========================================
    // Validate ID
    // ========================================

    if (!this.routeId) {

      this.alertService.error(
        'Route ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Get Route Details
    // ========================================

    this.getRouteById();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.routeForm =
      this.fb.group({

        // ====================================
        // Route Name
        // ====================================

        routeName: [

          '',

          Validators.required

        ],


        // ====================================
        // Route Code
        // ====================================

        routeCode: [

          '',

          Validators.required

        ],


        // ====================================
        // Area
        // ====================================

        area: [

          '',

          Validators.required

        ],


        // ====================================
        // Sales Target
        // ====================================

        monthlySalesTarget: [

          0,

          Validators.min(0)

        ],


        // ====================================
        // Collection Target
        // ====================================

        monthlyCollectionTarget: [

          0,

          Validators.min(0)

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
  // Get All Areas
  // ==========================================

  getAllAreas(): void {

    this.areaService
      .getAllAreas()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Areas Response:',
            response
          );


          this.areaList =
            response?.data || [];


          // ====================================
          // No need to manually patch here
          // ====================================

        },


        error: (error: any) => {

          console.log(
            'Get Areas Error:',
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
  // Get Route By ID
  // ==========================================

  getRouteById(): void {

    this.isLoading = true;


    this.routeService
      .getRouteById(
        this.routeId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Get Route Response:',
            response
          );


          const routeData =
            response?.data;


          if (!routeData) {

            this.isLoading = false;

            this.alertService.error(
              'Route details not found'
            );

            return;

          }


          // ====================================
          // Patch Form
          // ====================================

          this.routeForm.patchValue({

            routeName:
              routeData.routeName || '',

            routeCode:
              routeData.routeCode || '',

            area:
              routeData.area?._id ||
              routeData.area ||
              '',

            monthlySalesTarget:
              routeData.monthlySalesTarget ??
              0,

            monthlyCollectionTarget:
              routeData.monthlyCollectionTarget ??
              0,

            description:
              routeData.description || ''

          });


          // ====================================
          // Debug
          // ====================================

          console.log(
            'Patched Route Form:',
            this.routeForm.value
          );


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Route Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load route details'

          );

        }

      });

  }


  // ==========================================
  // Get Selected Area Name
  // ==========================================

  getSelectedAreaName(): string {

    const areaId =
      this.routeForm
        ?.get('area')
        ?.value;


    if (!areaId) {

      return '';

    }


    const selectedArea =
      this.areaList.find(

        area =>
          area._id === areaId

      );


    if (!selectedArea) {

      return '';

    }


    return (

      `${selectedArea.areaName || ''}` +

      (
        selectedArea.areaCode
          ? ` - ${selectedArea.areaCode}`
          : ''
      )

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
      this.routeForm.invalid
    ) {

      this.routeForm
        .markAllAsTouched();


      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }


    // ========================================
    // Form Values
    // ========================================

    const value =
      this.routeForm.value;


    // ========================================
    // Payload
    // ========================================

    const routeData = {

      routeName:
        value.routeName
          ?.trim(),

      routeCode:
        value.routeCode
          ?.trim()
          .toUpperCase(),

      area:
        value.area,

      description:
        value.description
          ?.trim() || '',

      monthlySalesTarget:
        Number(
          value.monthlySalesTarget || 0
        ),

      monthlyCollectionTarget:
        Number(
          value.monthlyCollectionTarget || 0
        )

    };


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // Update API
    // ========================================

    this.routeService
      .updateRoute(

        this.routeId,

        routeData

      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Route Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Route updated successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/routes-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Update Route Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update route'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/routes-list'

    ]);

  }

}
