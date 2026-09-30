import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { PartiesService } from 'src/app/Services/parties.service';
import { RoutesService } from 'src/app/Services/routes.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-beat-plan-add',
  templateUrl: './beat-plan-add.component.html',
  styleUrls: ['./beat-plan-add.component.css']
})
export class BeatPlanAddComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  beatPlanForm!: FormGroup;


  // ==========================================
  // Area List
  // ==========================================

  areaList: any[] = [];
  shopsList: any[] = [];
  routeList: any[] = [];
  allRoutes: any[] = [];

  selectedShopIds: string[] = [];

  selectAllShops: boolean = false;

  isLoadingShops: boolean = false;
  shopSearchText: string = '';

  // ==========================================
  // Route List
  // ==========================================


  // ==========================================
  // Salesman List
  // ==========================================

  salesmanList: any[] = [];


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

    private beatPlanService:
      BeatPlanService,

    private areaService:
      AreasService,

    private routeService:
      RoutesService,

    private userService:
      UserService,
    private partyService: PartiesService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllAreas();

    this.getAllRoutes();

    this.getAllSalesmen();

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
  // Area Change
  // ==========================================

  onAreaChange(event: any): void {

    const selectedAreaId =
      event.target.value;

    console.log(
      'Selected Area ID:',
      selectedAreaId
    );

    // Clear previously selected route
    this.beatPlanForm.patchValue({
      route: ''
    });

    // No area selected
    if (!selectedAreaId) {

      this.routeList = [];

      return;
    }

    // Filter routes based on selected area
    this.routeList =
      this.allRoutes.filter((route: any) => {

        const routeAreaId =
          route?.area?._id ||
          route?.area;

        return String(routeAreaId) ===
          String(selectedAreaId);

      });

    console.log(
      'Filtered Routes:',
      this.routeList
    );

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

          // Store complete route list
          this.allRoutes =
            response?.data || [];

          // Initially don't show routes
          this.routeList = [];

        },

        error: (error: any) => {

          console.log(
            'Get Routes Error:',
            error
          );

          this.allRoutes = [];
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
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Validate Form
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
      this.beatPlanForm.value;


    // ========================================
    // Payload
    // ========================================
    const beatPlanData = {

      beatName:
        value.beatName?.trim(),

      area:
        value.area,

      route:
        value.route,

      salesman:
        value.salesman,

      day:
        value.day,

      description:
        value.description?.trim() || '',

      shops:
        this.selectedShopIds

    };

    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // Create Beat Plan API
    // ========================================

    this.beatPlanService
      .createBeatPlan(
        beatPlanData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Beat Plan Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Beat Plan created successfully'

            )
            .then(() => {

              this.router.navigate([

                '/admin/beat-plan-list'

              ]);

            });

        },


        error: (error: any) => {

          console.log(
            'Create Beat Plan Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create Beat Plan'

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
  onRouteChange(): void {

    const routeId =
      this.beatPlanForm.get('route')?.value;

    // Clear previous shops
    this.shopsList = [];
    this.selectedShopIds = [];
    this.selectAllShops = false;

    if (!routeId) {
      return;
    }

    this.isLoadingShops = true;

    this.partyService.getShopsByRoute(routeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Route Shops Response:',
            response
          );

          this.shopsList =
            response?.data || [];

          this.isLoadingShops = false;

        },

        error: (error: any) => {

          console.error(
            'Get Route Shops Error:',
            error
          );

          this.shopsList = [];

          this.isLoadingShops = false;

          this.alertService.error(
            error?.error?.message ||
            'Failed to load shops'
          );

        }

      });
  }

  onShopSelectionChange(
    shopId: string,
    event: any
  ): void {

    const checked = event.target.checked;

    if (checked) {

      if (!this.selectedShopIds.includes(shopId)) {
        this.selectedShopIds.push(shopId);
      }

    } else {

      this.selectedShopIds =
        this.selectedShopIds.filter(
          (id: string) => id !== shopId
        );
    }

    this.selectAllShops =
      this.shopsList.length > 0 &&
      this.selectedShopIds.length === this.shopsList.length;
  }
  toggleSelectAll(event: any): void {

    const checked = event.target.checked;

    this.selectAllShops = checked;

    if (checked) {

      this.selectedShopIds = this.shopsList.map(
        (shop: any) => shop._id
      );

    } else {

      this.selectedShopIds = [];
    }
  }

  get filteredShops(): any[] {

    const search = this.shopSearchText
      ?.trim()
      .toLowerCase();

    if (!search) {
      return this.shopsList;
    }

    return this.shopsList.filter((shop: any) => {

      const shopName =
        (shop.shopName || shop.partyName || '').toLowerCase();

      const partyCode =
        (shop.partyCode || '').toLowerCase();

      const mobile =
        (shop.mobile || '').toLowerCase();

      return (
        shopName.includes(search) ||
        partyCode.includes(search) ||
        mobile.includes(search)
      );
    });
  }
}
