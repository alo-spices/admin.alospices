import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RoutesService } from 'src/app/Services/routes.service';

@Component({
  selector: 'app-create-routes',
  templateUrl: './create-routes.component.html',
  styleUrls: ['./create-routes.component.css']
})
export class CreateRoutesComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  routeForm!: FormGroup;


  // ==========================================
  // Area List
  // ==========================================

  areaList: any[] = [];


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

        // monthlySalesTarget: [

        //   0,

        //   [
        //     Validators.min(0)
        //   ]

        // ],


        // ====================================
        // Collection Target
        // ====================================

        // monthlyCollectionTarget: [

        //   0,

        //   [
        //     Validators.min(0)
        //   ]

        // ],


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
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Validate Form
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
    // Form Value
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

      // monthlySalesTarget:
      //   Number(
      //     value.monthlySalesTarget || 0
      //   ),

      // monthlyCollectionTarget:
      //   Number(
      //     value.monthlyCollectionTarget || 0
      //   )

    };


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // Create Route API
    // ========================================

    this.routeService
      .createRoute(
        routeData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Route Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Route created successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/routes-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Create Route Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create route'

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
