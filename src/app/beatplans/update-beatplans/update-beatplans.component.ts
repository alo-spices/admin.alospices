import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { BeatplansService } from 'src/app/Services/beatplans.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { PartiesService } from 'src/app/Services/parties.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-beatplans',
  templateUrl: './update-beatplans.component.html',
  styleUrls: ['./update-beatplans.component.css']
})
export class UpdateBeatplansComponent implements OnInit {
salesmen: any[] = [];
salesmanLoading = false;
  // ============================
  // FORM
  // ============================

  beatPlanForm!: FormGroup;


  // ============================
  // BEAT PLAN ID
  // ============================

  beatPlanId!: string;


  // ============================
  // AREA LIST
  // ============================

  areas: any[] = [];


  // ============================
  // ROUTE LIST
  // ============================

  routes: any[] = [];


  // ============================
  // SHOPS LIST
  // ============================

  shops: any[] = [];


  // ============================
  // SELECTED SHOPS
  // ============================

  selectedShopIds: string[] = [];


  // ============================
  // SALESMAN LIST
  // ============================


getSalesmen(): void {

  this.salesmanLoading = true;

  this.userService.getAllUsers().subscribe({

    next: (response: any) => {

      this.salesmanLoading = false;

      console.log(
        'Get All Users Response:',
        response
      );

      const users: any[] =
        Array.isArray(response)
          ? response
          : response?.data || [];

      // Only Salesman role users
      this.salesmen = users.filter(
        (user: any) =>
          user?.role
            ?.toString()
            .toLowerCase() === 'salesman'
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

  // ============================
  // LOADING
  // ============================

  loading = false;

  areaLoading = false;

  routeLoading = false;

  shopLoading = false;



  // ============================
  // MESSAGES
  // ============================

  successMessage = '';

  errorMessage = '';


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
    private beatPlanService: BeatPlanService,
    private shopesservices: PartiesService,
    private alertService: CommomPopupService,
    private route: ActivatedRoute,
    private router: Router,
      private userService: UserService,

  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAreas();

    this.getSalesmen();

    this.beatPlanId =
      this.route.snapshot.paramMap.get('id') || '';

    if (this.beatPlanId) {

      this.getBeatPlanById(this.beatPlanId);

    }

  }



  // =====================================================
  // INITIALIZE FORM
  // =====================================================

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
      ],

      shops: [
        [],
        Validators.required
      ]

    });

  }


  // =====================================================
  // FORM CONTROLS
  // =====================================================

  get f() {

    return this.beatPlanForm.controls;

  }


  // =====================================================
  // GET ALL AREAS
  // =====================================================

  getAreas(): void {

    this.areaLoading = true;

    this.errorMessage = '';

    this.beatPlanService.getAreas().subscribe({

      next: (response: any) => {

        console.log(
          'Areas Response:',
          response
        );

        this.areaLoading = false;

        if (response.success) {

          this.areas =
            response.data || [];

        } else {

          this.areas = [];

          this.errorMessage =
            response.message ||
            'Failed to load areas';

        }

      },


      error: (error) => {

        console.error(
          'Get Areas Error:',
          error
        );

        this.areaLoading = false;

        this.areas = [];

        this.errorMessage =
          error.error?.message ||
          'Failed to load areas';

      }

    });

  }


  // =====================================================
  // GET BEAT PLAN BY ID
  // =====================================================

  getBeatPlanById(beatPlanId: string): void {

  this.loading = true;

  this.beatPlanService
    .getBeatPlanById(this.beatPlanId)
    .subscribe({

      next: (response: any) => {

        this.loading = false;

        console.log(
          'Beat Plan Response:',
          response
        );

        const beatPlan = response?.data;

        if (!beatPlan) {

          this.alertService.error(
            'Beat Plan details not found'
          );

          return;
        }


        // ===============================
        // AREA ID
        // ===============================

        const areaId =
          typeof beatPlan.area === 'object'
            ? beatPlan.area?._id
            : beatPlan.area;


        // ===============================
        // ROUTE ID
        // ===============================

        const routeId =
          typeof beatPlan.route === 'object'
            ? beatPlan.route?._id
            : beatPlan.route;


        // ===============================
        // SALESMAN ID
        // ===============================

        const salesmanId =
          typeof beatPlan.salesman === 'object'
            ? beatPlan.salesman?._id
            : beatPlan.salesman;


        // ===============================
        // SHOP IDS
        // ===============================

        const shopIds =
          (beatPlan.shops || []).map(
            (shop: any) =>
              typeof shop === 'object'
                ? shop._id
                : shop
          );


        // ===============================
        // PATCH FORM
        // ===============================

        this.beatPlanForm.patchValue({

          beatName:
            beatPlan.beatName || '',

          description:
            beatPlan.description || '',

          area:
            areaId || '',

          route:
            routeId || '',

          salesman:
            salesmanId || '',

          day:
            beatPlan.day || '',

          shops:
            shopIds,

          status:
            beatPlan.status || 'Active'

        });


        // ===============================
        // SELECTED SHOPS
        // ===============================

        this.selectedShopIds = [
          ...shopIds
        ];


        // ===============================
        // LOAD ROUTES
        // ===============================

        if (areaId) {

          this.getRoutesByArea(areaId);

        }


        // ===============================
        // LOAD SHOPS
        // ===============================

        if (routeId) {

          this.getShopsByRoute(routeId);

        }

      },

      error: (error) => {

        this.loading = false;

        console.error(
          'Get Beat Plan Error:',
          error
        );

        this.alertService.error(
          error?.error?.message ||
          'Failed to load Beat Plan'
        );

      }

    });

}


  // =====================================================
  // AREA CHANGE
  // =====================================================

  onAreaChange(event: any): void {

    const areaId =
      event.target.value;


    // Clear old route

    this.beatPlanForm.patchValue({
      route: ''
    });


    // Clear routes

    this.routes = [];


    // Clear shops

    this.shops = [];


    // Clear selected shops

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


  // =====================================================
  // ROUTE CHANGE
  // =====================================================

  onRouteChange(event: any): void {

    const routeId =
      event.target.value;


    // Clear previous shops

    this.shops = [];


    // Clear selected shops

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


  // =====================================================
  // GET ROUTES BY AREA
  // =====================================================

  getRoutesByArea(
    areaId: string,
    selectedRouteId?: string
  ): void {

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

            this.routes =
              (response.data || [])
                .filter(
                  (route: any) =>
                    route.status === 'Active'
                );


            // =================================================
            // EXISTING BEAT PLAN ROUTE
            // =================================================

            if (selectedRouteId) {

              this.beatPlanForm.patchValue({

                route: selectedRouteId

              });


              // =================================================
              // LOAD EXISTING ROUTE SHOPS
              // =================================================

              this.getShopsByRoute(
                selectedRouteId
              );

            }

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
  // GET SHOPS BY ROUTE
  // =====================================================

  getShopsByRoute(routeId: string): void {

    this.shopLoading = true;

    this.errorMessage = '';

    this.shopesservices
      .getPartiesByRoute(routeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Shops By Route Response:',
            response
          );

          this.shopLoading = false;

          if (response.success) {

            this.shops =
              response.data || [];


            // =================================================
            // KEEP EXISTING SELECTED SHOPS
            // =================================================

            this.beatPlanForm.patchValue({

              shops:
                this.selectedShopIds

            });

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

          this.shopLoading = false;

          this.shops = [];

          this.errorMessage =
            error.error?.message ||
            'Failed to load shops';

        }

      });

  }


  // =====================================================
  // SHOP CHANGE
  // =====================================================

  onShopChange(
    event: any,
    shopId: string
  ): void {

    if (event.target.checked) {

      // Prevent duplicate IDs

      if (
        !this.selectedShopIds.includes(shopId)
      ) {

        this.selectedShopIds.push(shopId);

      }

    } else {

      this.selectedShopIds =
        this.selectedShopIds.filter(
          id => id !== shopId
        );

    }


    // Update form

    this.beatPlanForm.patchValue({

      shops:
        this.selectedShopIds

    });

  }



  // =====================================================
  // UPDATE BEAT PLAN
  // =====================================================

  updateBeatPlan(): void {

    if (this.beatPlanForm.invalid) {

      this.beatPlanForm.markAllAsTouched();

      this.alertService.validation(
        'Please fill all required fields'
      );

      return;

    }


    this.loading = true;

    this.errorMessage = '';


    this.beatPlanService
      .updateBeatPlan(
        this.beatPlanId,
        this.beatPlanForm.value
      )
      .subscribe({

        next: (response: any) => {

          this.loading = false;

          if (response.success) {

            this.alertService.success(
              response.message ||
              'Beat Plan updated successfully'
            ).then(() => {

              // =========================================
              // SUCCESS -> BEAT PLAN LIST
              // =========================================

              this.router.navigate([
                '/admin/beatplan-list'
              ]);

            });

          } else {

            this.alertService.error(
              response.message ||
              'Failed to update Beat Plan'
            );

          }

        },

        error: (error) => {

          this.loading = false;

          console.error(
            'Update Beat Plan Error:',
            error
          );

          this.alertService.error(
            error?.error?.message ||
            'Failed to update Beat Plan'
          );

        }

      });

  }


  // =====================================================
  // RESET FORM
  // =====================================================

  resetForm(): void {

     this.router.navigate([
                '/admin/beatplan-list'
              ]);

  }

}