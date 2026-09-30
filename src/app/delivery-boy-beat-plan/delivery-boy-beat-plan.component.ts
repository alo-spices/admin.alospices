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
  beatPlanForm!: FormGroup;


  // ==========================================
  // BEAT PLAN LIST
  // ==========================================

  beatPlanList: any[] = [];


  // ==========================================
  // SELECTED BEAT PLANS
  // ==========================================

  selectedBeatPlans: any[] = [];


  // ==========================================
  // DELIVERY BOY LIST
  // ==========================================

  deliveryBoyList: any[] = [];


  // ==========================================
  // SELECTED DELIVERY BOY
  // ==========================================

  selectedDeliveryBoy: any = null;


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

      deliveryBoy: [
        '',
        Validators.required
      ],

      beatPlans: [
        [],
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
           * Only Active Beat Plans
           *
           * Must have Salesman
           *
           * Delivery Boy should NOT
           * already be assigned.
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


          // Clear selected Beat Plans
          // which are no longer available

          this.selectedBeatPlans =
            this.selectedBeatPlans.filter(
              (selected: any) =>
                this.beatPlanList.some(
                  (beat: any) =>
                    beat._id === selected._id
                )
            );


          this.updateBeatPlanFormValue();

        },


        error: (error: any) => {

          console.log(
            'Get Beat Plans Error:',
            error
          );


          this.beatPlanList = [];

          this.selectedBeatPlans = [];

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
  // DELIVERY BOY CHANGE
  // ==========================================

  onDeliveryBoyChange(): void {

    const deliveryBoyId =
      this.beatPlanForm
        .get('deliveryBoy')
        ?.value;


    this.selectedDeliveryBoy =
      this.deliveryBoyList.find(
        (item: any) =>
          item._id === deliveryBoyId
      ) || null;

  }


  // ==========================================
  // CHECK BEAT PLAN SELECTED
  // ==========================================

  isBeatPlanSelected(
    beatPlanId: string
  ): boolean {

    return this.selectedBeatPlans.some(
      (beat: any) =>
        beat._id === beatPlanId
    );

  }


  // ==========================================
  // TOGGLE BEAT PLAN
  // ==========================================

  toggleBeatPlan(beatPlan: any): void {

    const index =
      this.selectedBeatPlans.findIndex(
        (beat: any) =>
          beat._id === beatPlan._id
      );


    if (index === -1) {

      // Add

      this.selectedBeatPlans.push(
        beatPlan
      );

    } else {

      // Remove

      this.selectedBeatPlans.splice(
        index,
        1
      );

    }


    this.updateBeatPlanFormValue();

  }


  // ==========================================
  // UPDATE FORM VALUE
  // ==========================================

  updateBeatPlanFormValue(): void {

    const ids =
      this.selectedBeatPlans.map(
        (beat: any) =>
          beat._id
      );


    this.beatPlanForm.patchValue({

      beatPlans: ids

    });

  }


  // ==========================================
  // REMOVE BEAT PLAN
  // ==========================================

  removeBeatPlan(
    beatPlanId: string
  ): void {

    this.selectedBeatPlans =
      this.selectedBeatPlans.filter(
        (beat: any) =>
          beat._id !== beatPlanId
      );


    this.updateBeatPlanFormValue();

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;

    // ==========================================
    // DELIVERY BOY VALIDATION
    // ==========================================

    const deliveryBoy =
      this.beatPlanForm
        .get('deliveryBoy')
        ?.value;


    if (!deliveryBoy) {

      this.alertService.validation(
        'Please select Delivery Boy'
      );

      return;

    }


    // ==========================================
    // BEAT PLAN VALIDATION
    // ==========================================

    if (
      !this.selectedBeatPlans ||
      this.selectedBeatPlans.length === 0
    ) {

      this.alertService.validation(
        'Please select at least one Beat Plan'
      );

      return;

    }


    // ==========================================
    // GET BEAT PLAN IDS
    // ==========================================

    const beatPlanIds =
      this.selectedBeatPlans.map(
        (beat: any) =>
          beat._id
      );


    // ==========================================
    // API PAYLOAD
    // ==========================================

    const payload = {

      deliveryBoy: deliveryBoy,

      beatPlans: beatPlanIds

    };


    console.log(
      'Bulk Delivery Boy Assignment Payload:',
      payload
    );


    // ==========================================
    // LOADING
    // ==========================================

    this.isLoading = true;


    // ==========================================
    // BULK API CALL
    // ==========================================

    this.beatPlanService.assignDeliveryBoyToBeatPlans(
      payload
    )
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Beat Plans assigned successfully'

          );


          // ======================================
          // RESET
          // ======================================

          this.beatPlanForm.reset({

            deliveryBoy: '',

            beatPlans: []

          });


          this.selectedBeatPlans = [];

          this.selectedDeliveryBoy = null;

          this.isSubmitted = false;


          // ======================================
          // RELOAD
          // ======================================

          this.getAllBeatPlans();


          // ======================================
          // BACK
          // ======================================

          this.goBack();

        },


        error: (error: any) => {

          this.isLoading = false;


          console.log(
            'Bulk Assign Delivery Boy Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to assign Beat Plans'

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
