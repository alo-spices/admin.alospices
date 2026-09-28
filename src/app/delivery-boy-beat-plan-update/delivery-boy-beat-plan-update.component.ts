import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService } from '../Services/areas.service';
import { BeatPlanService } from '../Services/beat-plan.service';
import { CommomPopupService } from '../Services/commom-popup.service';
import { PartiesService } from '../Services/parties.service';
import { RoutesService } from '../Services/routes.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-delivery-boy-beat-plan-update',
  templateUrl: './delivery-boy-beat-plan-update.component.html',
  styleUrls: ['./delivery-boy-beat-plan-update.component.css']
})
export class DeliveryBoyBeatPlanUpdateComponent implements OnInit {

  // =========================================================
  // FORM
  // =========================================================

  beatPlanForm!: FormGroup;


  // =========================================================
  // BEAT PLANS
  // =========================================================

  beatPlanList: any[] = [];

  selectedBeatPlan: any = null;


  // =========================================================
  // SELECTED BEAT PLAN ID
  // =========================================================

  beatPlanId: string = '';


  // =========================================================
  // DELIVERY BOYS
  // =========================================================

  deliveryBoyList: any[] = [];


  // =========================================================
  // LOADING
  // =========================================================

  isLoading: boolean = false;

  isLoadingBeatPlan: boolean = false;

  isUpdating: boolean = false;


  // =========================================================
  // SUBMITTED
  // =========================================================

  isSubmitted: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private beatPlanService: BeatPlanService,
    private userService: UserService,

    private alertService: CommomPopupService
  ) { }


  // =========================================================
  // NG ON INIT
  // =========================================================

  ngOnInit(): void {

    this.initializeForm();

    this.getAllDeliveryBoys();

    this.activatedRoute.paramMap.subscribe(
      (params) => {

        const id = params.get('id');

        if (id) {

          // First set current Beat Plan ID
          this.beatPlanId = id;

          // Then load Beat Plans
          this.getAllBeatPlans();

          // Then get selected Beat Plan details
          this.getBeatPlanById(id);

        } else {

          // Normal case
          this.getAllBeatPlans();

        }

      }
    );

  }


  // =========================================================
  // INITIALIZE FORM
  // =========================================================

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


  // =========================================================
  // GET ALL BEAT PLANS
  // =========================================================

  getAllBeatPlans(): void {

    this.isLoading = true;

    this.beatPlanService
      .getAllBeatPlans()
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;

          const data = response?.data || [];


          this.beatPlanList = data.filter(
            (beat: any) => {

              // Current edit Beat Plan
              const isCurrentBeatPlan =
                String(beat?._id) ===
                String(this.beatPlanId);


              return (

                beat?.isDeleted !== true &&

                beat?.status === 'Active' &&

                beat?.salesman &&

                (
                  // New/unassigned Beat Plans
                  !beat?.deliveryBoy ||

                  // Current editing Beat Plan
                  isCurrentBeatPlan
                )

              );

            }
          );


          console.log(
            'Beat Plan Dropdown List:',
            this.beatPlanList
          );

        },

        error: (error: any) => {

          this.isLoading = false;

          console.error(
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


  // =========================================================
  // GET ALL DELIVERY BOYS
  // =========================================================

  getAllDeliveryBoys(): void {

    this.userService
      .getAllUsers()
      .subscribe({

        next: (response: any) => {

          const data =
            response?.data || [];


          this.deliveryBoyList =
            data.filter(
              (user: any) => {

                return (

                  user?.role === 'DeliveryBoy' &&

                  user?.status === 'Active' &&

                  user?.isDeleted !== true

                );

              }
            );


          console.log(
            'Delivery Boys:',
            this.deliveryBoyList
          );

        },

        error: (error: any) => {

          console.error(
            'Get Delivery Boys Error:',
            error
          );

          this.deliveryBoyList = [];

        }

      });

  }


  // =========================================================
  // BEAT PLAN CHANGE
  // =========================================================

  onBeatPlanChange(): void {

    const beatPlanId =
      this.beatPlanForm
        .get('beatPlan')
        ?.value;


    if (!beatPlanId) {

      this.selectedBeatPlan = null;

      return;

    }


    this.beatPlanId = beatPlanId;

    this.getBeatPlanById(
      beatPlanId
    );

  }


  // =========================================================
  // GET BEAT PLAN BY ID
  // =========================================================

  getBeatPlanById(id: string): void {

    if (!id) {
      return;
    }

    this.isLoadingBeatPlan = true;

    this.beatPlanService
      .getBeatPlanById(id)
      .subscribe({

        next: (response: any) => {

          this.isLoadingBeatPlan = false;

          const beat = response?.data;

          if (!beat) {
            this.selectedBeatPlan = null;
            return;
          }

          this.selectedBeatPlan = beat;

          // IMPORTANT
          this.beatPlanId = beat._id;

          console.log(
            'Beat Plan ID:',
            beat._id
          );

          console.log(
            'Form before patch:',
            this.beatPlanForm.value
          );

          this.beatPlanForm.patchValue({

            beatPlan: beat._id,

            deliveryBoy:
              beat.deliveryBoy?._id ||
              beat.deliveryBoy ||
              ''

          });

          console.log(
            'Form after patch:',
            this.beatPlanForm.value
          );

        },

        error: (error: any) => {

          this.isLoadingBeatPlan = false;

          this.selectedBeatPlan = null;

          console.error(
            'Get Beat Plan By ID Error:',
            error
          );

          this.alertService.error(
            error?.error?.message ||
            'Failed to load Beat Plan'
          );

        }

      });

  }

  // =========================================================
  // UPDATE DELIVERY BOY
  // =========================================================

  onSubmit(): void {
    this.isSubmitted = true;
    // =========================================
    // FORM VALIDATION
    // =========================================
    if (
      this.beatPlanForm.invalid
    ) {

      this.beatPlanForm.markAllAsTouched();

      return;

    }


    // =========================================
    // BEAT PLAN ID
    // =========================================

    const beatPlanId =
      this.beatPlanForm
        .get('beatPlan')
        ?.value ||
      this.beatPlanId;


    if (!beatPlanId) {

      this.alertService.error(
        'Please select Beat Plan'
      );

      return;

    }


    // =========================================
    // DELIVERY BOY
    // =========================================

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


    // =========================================
    // UPDATE
    // =========================================

    this.isUpdating = true;


    this.beatPlanService
      .assignDeliveryBoyToBeatPlan(
        beatPlanId,
        deliveryBoy
      )
      .subscribe({

        next: (response: any) => {

          this.isUpdating = false;


          console.log(
            'Update Response:',
            response
          );


          this.alertService.success(
            response?.message ||
            'Delivery Boy updated successfully'
          );


          // =====================================
          // GO BACK
          // =====================================

          this.goBack();

        },

        error: (error: any) => {

          this.isUpdating = false;


          console.error(
            'Update Beat Plan Error:',
            error
          );


          this.alertService.error(
            error?.error?.message ||
            'Failed to update Delivery Boy'
          );

        }

      });

  }




  // =========================================================
  // GO BACK
  // =========================================================

  goBack(): void {

    this.router.navigate([
      '/admin/delivery-boy-beat-plan-list'
    ]);

  }

}
