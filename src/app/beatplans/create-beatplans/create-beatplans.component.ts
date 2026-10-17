import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { PartiesService } from 'src/app/Services/parties.service';
import { RoutesService } from 'src/app/Services/routes.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create-beatplans',
  templateUrl: './create-beatplans.component.html',
  styleUrls: ['./create-beatplans.component.css']
})
export class CreateBeatplansComponent implements OnInit {
// ============================
  // FORM
  // ============================

  beatPlanForm!: FormGroup;
  shops: any[] = [];
   salesmen: any[] = [];
     salesmanLoading = false;


  // ============================
  // AREA LIST
  // ============================

  areas: any[] = [];


  // ============================
  // ROUTE LIST
  // ============================

  routes: any[] = [];


  // ============================
  // SALESMAN LIST
  // ============================

  // salesmen: any[] = [];


  // ============================
  // LOADING
  // ============================

  loading = false;

  areaLoading = false;

  routeLoading = false;

  // salesmanLoading = false;


  // ============================
  // MESSAGES
  // ============================

  successMessage = '';

  errorMessage = '';

selectedShopIds: string[] = [];
  // ============================
  // DAYS
  // ============================

  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];


  constructor(
    private fb: FormBuilder,
        private shopesservices: PartiesService,

    private beatPlanService: BeatPlanService,
      private alertService: CommomPopupService,
        private router:
            Router,
            private userservices:UserService

  ) {}


  // ============================
  // INIT
  // ============================

  ngOnInit(): void {

    this.initializeForm();

    this.getAreas();

    this.getSalesmen();
     

  }


  // ============================
  // INITIALIZE FORM
  // ============================

  initializeForm(): void {

    this.beatPlanForm = this.fb.group({

      beatName: [
        '',
        Validators.required
      ],

      description: [
        ''
      ],

      area: [
        '',
        Validators.required
      ],

      route: [
        '',
        Validators.required
      ],

      salesman: [
        '',
        Validators.required
      ],

      day: [
        '',
        Validators.required
      ]
      , shops: [[], Validators.required]

    });

  }


  // ============================
  // FORM CONTROLS
  // ============================

  get f() {
    return this.beatPlanForm.controls;
  }

// =====================================================
// GET SHOPS BY ROUTE
// =====================================================

getShopsByRoute(routeId: string): void {

  this.shops = [];

  this.selectedShopIds = [];

  this.beatPlanForm.patchValue({
    shops: []
  });

  if (!routeId) {
    return;
  }

  this.shopesservices
    .getPartiesByRoute(routeId)
    .subscribe({

      next: (response: any) => {

        console.log(
          'Shops By Route Response:',
          response
        );

        if (response.success) {

          this.shops = response.data || [];

        } else {

          this.shops = [];

          this.errorMessage =
            response.message ||
            'Failed to load shops';

        }

      },

      error: (error) => {

        console.error(
          'Get Shops By Route Error:',
          error
        );

        this.shops = [];

        this.errorMessage =
          error.error?.message ||
          'Failed to load shops';

      }

    });

}
  // =====================================================
  // GET ALL AREAS
  // =====================================================

  getAreas(): void {

    this.areaLoading = true;

    this.errorMessage = '';

    this.beatPlanService.getAreas().subscribe({

      next: (response: any) => {

        console.log('Areas Response:', response);

        this.areaLoading = false;

        if (response.success) {

          this.areas = response.data || [];

        } else {

          this.areas = [];

          this.errorMessage =
            response.message || 'Failed to load areas';

        }

      },

      error: (error) => {

        console.error('Get Areas Error:', error);

        this.areaLoading = false;

        this.areas = [];

        this.errorMessage =
          error.error?.message ||
          'Failed to load areas';

      }

    });

  }


  // =====================================================
  // AREA CHANGE
  // =====================================================

  // =====================================================
// AREA CHANGE
// =====================================================

onAreaChange(event: any): void {

  const areaId = event.target.value;


  // Clear old route

  this.beatPlanForm.patchValue({
    route: ''
  });


  // Clear routes

  this.routes = [];


  // Clear shops

  this.shops = [];

  this.selectedShopIds = [];

  this.beatPlanForm.patchValue({
    shops: []
  });


  // If no area selected

  if (!areaId) {

    return;

  }


  // Get routes for selected area

  this.getRoutesByArea(areaId);

}

  // schope onchaing
 onShopChange(event: any, shopId: string): void {

  if (event.target.checked) {

    this.selectedShopIds.push(shopId);

  } else {

    this.selectedShopIds =
      this.selectedShopIds.filter(
        id => id !== shopId
      );

  }

  this.beatPlanForm.patchValue({
    shops: this.selectedShopIds
  });

}


  // =====================================================
  // GET ROUTES BY AREA
  // =====================================================

  getRoutesByArea(areaId: string): void {

    this.routeLoading = true;

    this.errorMessage = '';


    this.beatPlanService
      .getRoutesByArea(areaId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Routes By Area Response:',
            response
          );


          this.routeLoading = false;


          if (response.success) {

            // Active routes only

            this.routes = (response.data || [])
              .filter(
                (route: any) =>
                  route.status === 'Active'
              );

          } else {

            this.routes = [];

            this.errorMessage =
              response.message ||
              'Failed to load routes';

          }

        },


        error: (error) => {

          console.error(
            'Get Routes By Area Error:',
            error
          );


          this.routeLoading = false;

          this.routes = [];


          this.errorMessage =
            error.error?.message ||
            'Failed to load routes';

        }

      });

  }


  // =====================================================
  // GET SALESMEN
  // =====================================================

  


  // =====================================================
  // CREATE BEAT PLAN
  // =====================================================
createBeatPlan(): void { 

  if (this.beatPlanForm.invalid) { 

    this.beatPlanForm.markAllAsTouched(); 

    this.alertService.validation( 
      'Please fill all required fields' 
    ); 

    return; 
  } 

  this.beatPlanService 
    .createBeatPlan(this.beatPlanForm.value) 
    .subscribe({ 

      next: (response) => { 

        if (response.success) { 

          this.alertService.success( 
            response.message || 'Beat Plan created successfully' 
          ).then(() => {
            // Success ayyaka Beat Plan List page ki

            this.router.navigate(['/beatplan-list']);

          });

          this.beatPlanForm.reset(); 

          // Clear routes after reset 
          this.routes = []; 
        } 

      }, 

      error: (error) => { 

        this.alertService.error( 
          error?.error?.message || 
          'Failed to create Beat Plan' 
        ); 

      } 

    }); 
}

  // =====================================================
  // RESET FORM
  // =====================================================

  resetForm(): void {

    this.beatPlanForm.reset();

    this.routes = [];

    this.successMessage = '';

    this.errorMessage = '';

  }

  // =====================================================
// ROUTE CHANGE
// =====================================================

onRouteChange(event: any): void {

  const routeId = event.target.value;


  // Clear previously selected shops

  this.shops = [];

  this.selectedShopIds = [];

  this.beatPlanForm.patchValue({
    shops: []
  });


  // If no route selected

  if (!routeId) {

    return;

  }


  // Get shops for selected route

  this.getShopsByRoute(routeId);

}
  // =========================
  // SALESMEN
  // =========================

getSalesmen(): void {

  this.salesmanLoading = true;

  this.userservices.getAllUsers().subscribe({

    next: (response: any) => {

      this.salesmanLoading = false;

      console.log('Get All Users Response:', response);

      const users: any[] = Array.isArray(response)
        ? response
        : response?.data || [];

      // Only Salesman role users
      this.salesmen = users.filter(
        (user: any) =>
          user?.role?.toString().toLowerCase() === 'salesman'
      );

      console.log(
        'Salesman Dropdown Data:',
        this.salesmen
      );
    },

    error: (error: any) => {

      this.salesmanLoading = false;
      this.salesmen = [];

      console.error(
        'Get Users Error:',
        error
      );

      this.alertService.error(
        error?.error?.message ||
        'Failed to load users'
      );
    }

  });
}

}