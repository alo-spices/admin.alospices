import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeatPlanService } from '../Services/beat-plan.service';
import { CommomPopupService } from '../Services/commom-popup.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-delivery-boy-beat-plan',
  templateUrl: './delivery-boy-beat-plan.component.html',
  styleUrls: ['./delivery-boy-beat-plan.component.css']
})
export class DeliveryBoyBeatPlanComponent implements OnInit {

  // ==========================================
  // FORM
  // ==========================================

  beatPlanForm!: FormGroup;


  // ==========================================
  // BEAT PLAN LIST
  // ==========================================

  beatPlanList: any[] = [];


  // ==========================================
  // DELIVERY BOY LIST
  // ==========================================

  deliveryBoyList: any[] = [];


  // ==========================================
  // SELECTED BEAT PLAN
  // ==========================================

  selectedBeatPlan: any = null;


  // ==========================================
  // FLAGS
  // ==========================================

  isSubmitted = false;

  isLoading = false;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private fb: FormBuilder,

    private router: Router,

    private beatPlanService: BeatPlanService,

    private userService: UserService,

    private alertService: CommomPopupService

  ) { }


  // ==========================================
  // NG ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllBeatPlans();

    this.getAllDeliveryBoys();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.beatPlanForm = this.fb.group({

      beatPlan: [

        '',

        Validators.required

      ],

      deliveryBoy: [

        '',

        Validators.required

      ]

    });

  }


  // ==========================================
  // GET ALL BEAT PLANS
  // ==========================================

  getAllBeatPlans(): void {

    this.beatPlanService
      .getAllBeatPlans()
      .subscribe({

        next: (response: any) => {

          const data =
            response?.data || [];


          /*
           * Only Active Salesman Beat Plans
           *
           * deliveryBoy empty means
           * Delivery Boy is not assigned yet.
           */

          this.beatPlanList =
            data.filter((beat: any) => {

              return (

                beat?.isDeleted !== true &&

                beat?.status === 'Active' &&

                beat?.salesman &&

                !beat?.deliveryBoy

              );

            });

        },


        error: (error: any) => {

          console.log(
            'Get Beat Plans Error:',
            error
          );

          this.beatPlanList = [];

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Beat Plans'

          );

        }

      });

  }


  // ==========================================
  // GET ALL DELIVERY BOYS
  // ==========================================

  getAllDeliveryBoys(): void {

    this.userService
      .getAllUsers('DeliveryBoy')
      .subscribe({

        next: (response: any) => {

          const data =
            response?.data ||
            response?.users ||
            [];


          this.deliveryBoyList =
            data.filter((item: any) => {

              return (

                item?.role === 'DeliveryBoy' &&

                item?.status === 'Active' &&

                item?.isDeleted !== true

              );

            });

        },


        error: (error: any) => {

          console.log(
            'Get Delivery Boys Error:',
            error
          );

          this.deliveryBoyList = [];

          this.alertService.error(

            error?.error?.message ||

            'Failed to load Delivery Boys'

          );

        }

      });

  }


  // ==========================================
  // BEAT PLAN CHANGE
  // ==========================================

  onBeatPlanChange(): void {

    const beatPlanId =
      this.beatPlanForm
        .get('beatPlan')
        ?.value;


    this.selectedBeatPlan =
      this.beatPlanList.find(
        (beat: any) =>
          beat._id === beatPlanId
      ) || null;


    /*
     * Clear previously selected
     * Delivery Boy
     */

    this.beatPlanForm.patchValue({

      deliveryBoy: ''

    });

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (this.beatPlanForm.invalid) {

      this.alertService.validation(

        'Please select Beat Plan and Delivery Boy'

      );

      return;

    }


    // ==========================================
    // GET FORM VALUES
    // ==========================================

    const beatPlanId =
      this.beatPlanForm
        .get('beatPlan')
        ?.value;


    const deliveryBoy =
      this.beatPlanForm
        .get('deliveryBoy')
        ?.value;


    // ==========================================
    // EXTRA VALIDATION
    // ==========================================

    if (!beatPlanId) {

      this.alertService.error(

        'Please select Beat Plan'

      );

      return;

    }


    if (!deliveryBoy) {

      this.alertService.error(

        'Please select Delivery Boy'

      );

      return;

    }


    if (!this.selectedBeatPlan) {

      this.alertService.error(

        'Selected Beat Plan not found'

      );

      return;

    }


    // ==========================================
    // API CALL
    // ==========================================

    this.isLoading = true;


    this.beatPlanService
      .assignDeliveryBoyToBeatPlan(
        beatPlanId,
        deliveryBoy
      )
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Delivery Boy assigned successfully'

          );
          this.goBack();

          // ======================================
          // RESET FORM
          // ======================================

          this.beatPlanForm.reset();

          this.selectedBeatPlan = null;

          this.isSubmitted = false;


          // ======================================
          // RELOAD BEAT PLANS
          // ======================================

          this.getAllBeatPlans();

        },


        error: (error: any) => {

          this.isLoading = false;


          console.log(
            'Assign Delivery Boy Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to assign Delivery Boy'

          );

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/delivery-boy-beat-plan-list'

    ]);

  }


}
