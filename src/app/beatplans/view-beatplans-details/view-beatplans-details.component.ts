import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';

@Component({
  selector: 'app-view-beatplans-details',
  templateUrl: './view-beatplans-details.component.html',
  styleUrls: ['./view-beatplans-details.component.css']
})
export class ViewBeatplansDetailsComponent implements OnInit {

  beatPlan: any = null;
  loading = false;
  errorMessage = '';

  constructor(
    private beatPlanService: BeatPlanService,
    private dialogRef: MatDialogRef<ViewBeatplansDetailsComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: { id: string }
  ) {}

  ngOnInit(): void {
    this.getBeatPlanById();
  }

  // =====================================================
  // GET BEAT PLAN DETAILS
  // =====================================================

  getBeatPlanById(): void {

    this.loading = true;
    this.errorMessage = '';

    this.beatPlanService
      .getBeatPlanById(this.data.id)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Beat Plan Details:',
            response
          );

          if (response.success) {

            this.beatPlan = response.data;

          } else {

            this.errorMessage =
              response.message ||
              'Failed to load Beat Plan details';

          }

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Beat Plan Details Error:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            'Something went wrong while loading details';

        }

      });

  }

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  close(): void {
    this.dialogRef.close();
  }

}