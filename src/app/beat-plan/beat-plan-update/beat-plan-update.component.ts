import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RoutesService } from 'src/app/Services/routes.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-beat-plan-update',
  templateUrl: './beat-plan-update.component.html',
  styleUrls: ['./beat-plan-update.component.css']
})
export class BeatPlanUpdateComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  beatPlanForm!: FormGroup;


  // ==========================================
  // ID
  // ==========================================

  beatPlanId: string = '';


  // ==========================================
  // Mode
  // ==========================================

  isViewMode = false;

  isEditMode = false;


  // ==========================================
  // Lists
  // ==========================================

  areaList: any[] = [];

  routeList: any[] = [];

  salesmanList: any[] = [];


  // ==========================================
  // UI
  // ==========================================

  isSubmitted = false;

  isLoading = false;

  isFetching = false;


  constructor(

    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private beatPlanService:
      BeatPlanService,

    private areaService:
      AreasService,

    private routeService:
      RoutesService,

    private userService:
      UserService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // NG ON INIT
  // ==========================================

  ngOnInit(): void {
    this.initializeForm();

    this.beatPlanId =
      this.route.snapshot.paramMap.get('id') || '';

    const mode =
      this.route.snapshot.queryParamMap.get('mode');

    this.isViewMode =
      mode === 'view';

    this.isEditMode =
      !this.isViewMode;

    console.log('BEAT PLAN ID =>', this.beatPlanId);
    console.log('MODE =>', mode);
    console.log('IS VIEW MODE =>', this.isViewMode);

    this.getAllAreas();
    this.getAllRoutes();
    this.getAllSalesmen();

    if (this.beatPlanId) {

      this.getBeatPlanById();

    } else {

      this.alertService.error(
        'Beat Plan ID not found'
      );

      this.goBack();

    }

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.beatPlanForm =
      this.fb.group({

        // ====================================
        // Beat Name
        // ====================================

        beatName: [

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
        // Route
        // ====================================

        route: [

          '',

          Validators.required

        ],


        // ====================================
        // Salesman
        // ====================================

        salesman: [

          '',

          Validators.required

        ],


        // ====================================
        // Day
        // ====================================

        day: [

          '',

          Validators.required

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
  // Get Beat Plan By ID
  // ==========================================

  getBeatPlanById(): void {

    this.isFetching = true;

    this.beatPlanService
      .getBeatPlanById(this.beatPlanId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Beat Plan By ID Response:',
            response
          );

          this.isFetching = false;

          const data = response?.data;

          if (!data) {

            this.alertService.error(
              'Beat Plan details not found'
            );

            this.goBack();

            return;

          }


          // ==================================
          // Patch Form
          // ==================================

          this.beatPlanForm.patchValue({

            beatName:
              data.beatName || '',

            area:
              data.area?._id || '',

            route:
              data.route?._id || '',

            salesman:
              data.salesman?._id || '',

            day:
              data.day || '',

            description:
              data.description || ''

          });


          // ==================================
          // FORCE VIEW MODE
          // ==================================

          if (this.isViewMode === true) {

            this.beatPlanForm.disable({
              emitEvent: false
            });

            console.log(
              'VIEW MODE ENABLED - FORM DISABLED'
            );

          }


          console.log(
            'FORM STATUS =>',
            this.beatPlanForm.status
          );

        },


        error: (error: any) => {

          console.log(
            'Get Beat Plan Error:',
            error
          );

          this.isFetching = false;

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Beat Plan details'

          );

        }

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
  // Get All Routes
  // ==========================================

  getAllRoutes(): void {

    this.routeService
      .getAllRoutes()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Routes Response:',
            response
          );


          this.routeList =
            response?.data || [];

        },


        error: (error: any) => {

          console.log(
            'Get Routes Error:',
            error
          );


          this.routeList = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load routes'

          );

        }

      });

  }


  // ==========================================
  // Get All Salesmen
  // ==========================================

  getAllSalesmen(): void {

    this.userService
      .getAllUsers('Salesman')
      .subscribe({

        next: (response: any) => {

          console.log(
            'Salesmen Response:',
            response
          );


          this.salesmanList =
            response?.data || [];

        },


        error: (error: any) => {

          console.log(
            'Get Salesmen Error:',
            error
          );


          this.salesmanList = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load salesmen'

          );

        }

      });

  }


  // ==========================================
  // Get Selected Area Name
  // ==========================================

  getSelectedAreaName(): string {

    const areaId =
      this.beatPlanForm
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
  // Get Selected Route Name
  // ==========================================

  getSelectedRouteName(): string {

    const routeId =
      this.beatPlanForm
        ?.get('route')
        ?.value;


    if (!routeId) {

      return '';

    }


    const selectedRoute =
      this.routeList.find(

        route =>
          route._id === routeId

      );


    if (!selectedRoute) {

      return '';

    }


    return (

      `${selectedRoute.routeName || ''}` +

      (

        selectedRoute.routeCode

          ? ` - ${selectedRoute.routeCode}`

          : ''

      )

    );

  }


  // ==========================================
  // Get Selected Salesman Name
  // ==========================================

  getSelectedSalesmanName(): string {

    const salesmanId =
      this.beatPlanForm
        ?.get('salesman')
        ?.value;


    if (!salesmanId) {

      return '';

    }


    const selectedSalesman =
      this.salesmanList.find(

        salesman =>
          salesman._id === salesmanId

      );


    if (!selectedSalesman) {

      return '';

    }


    return (

      `${selectedSalesman.fullName || ''}` +

      (

        selectedSalesman.employeeCode

          ? ` - ${selectedSalesman.employeeCode}`

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
    // View Mode Protection
    // ========================================

    if (this.isViewMode) {

      return;

    }


    // ========================================
    // Validate
    // ========================================

    if (
      this.beatPlanForm.invalid
    ) {

      this.beatPlanForm
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
      this.beatPlanForm.getRawValue();


    // ========================================
    // Payload
    // ========================================

    const beatPlanData = {

      beatName:
        value.beatName
          ?.trim(),

      area:
        value.area,

      route:
        value.route,

      salesman:
        value.salesman,

      day:
        value.day,

      description:
        value.description
          ?.trim() || ''

    };


    console.log(
      'UPDATE BEAT PLAN PAYLOAD:',
      beatPlanData
    );


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // Update API
    // ========================================

    this.beatPlanService
      .updateBeatPlan(
        this.beatPlanId,
        beatPlanData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Beat Plan Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Beat Plan updated successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/beat-plan-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Update Beat Plan Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update Beat Plan'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/beat-plan-list'

    ]);

  }


}
