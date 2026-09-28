import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AcceptProductionInstructionPopupComponent } from 'src/app/accept-production-instruction-popup/accept-production-instruction-popup.component';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductionInstructionService } from 'src/app/Services/production-instruction.service';

@Component({
  selector: 'app-assigned-production-view-details',
  templateUrl: './assigned-production-view-details.component.html',
  styleUrls: ['./assigned-production-view-details.component.css']
})
export class AssignedProductionViewDetailsComponent implements OnInit {


  // ==========================================
  // Instruction
  // ==========================================

  instruction: any = null;


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  // ==========================================
  // Instruction ID
  // ==========================================

  instructionId: string = '';


  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private productionInstructionService:
      ProductionInstructionService,

    private alertService:
      CommomPopupService,

    private dialog:
      MatDialog

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.instructionId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    if (!this.instructionId) {

      this.alertService.error(
        'Production Instruction ID not found'
      );

      this.goBack();

      return;

    }


    this.getProductionInstruction();

  }


  // ==========================================
  // Get By ID
  // ==========================================

  getProductionInstruction(): void {

    this.isLoading = true;


    this.productionInstructionService
      .getProductionInstructionById(
        this.instructionId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Production Instruction:',
            response
          );


          this.instruction =
            response?.data || null;


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Production Instruction Error:',
            error
          );


          this.isLoading = false;

          this.instruction = null;


          this.alertService.error(

            error?.error?.message ||
            'Failed to load production instruction'

          );

        }

      });

  }


  // ==========================================
  // Status Class
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Completed':

        return 'active';


      case 'Accepted':

        return 'active';


      case 'In Progress':

        return 'warning';


      case 'Pending':

        return 'pending';


      case 'Rejected':

        return 'inactive';


      case 'Cancelled':

        return 'inactive';


      default:

        return 'pending';

    }

  }


  // ==========================================
  // Accept
  // ==========================================

  acceptProductionInstruction(): void {

    if (
      !this.instruction?._id
    ) {

      return;

    }


    const dialogRef =
      this.dialog.open(

        AcceptProductionInstructionPopupComponent,

        {

          width: '420px',

          maxWidth: '92vw',

          panelClass:
            'accept-production-dialog',

          disableClose: true,

          data: this.instruction

        }

      );


    dialogRef
      .afterClosed()
      .subscribe(

        (confirmed: boolean) => {

          if (!confirmed) {

            return;

          }


          this.productionInstructionService
            .acceptProductionInstruction(
              this.instruction._id
            )
            .subscribe({

              next: (response: any) => {

                this.alertService
                  .success(

                    response?.message ||
                    'Production Instruction Accepted Successfully'

                  )
                  .then(() => {

                    this.getProductionInstruction();

                  });

              },


              error: (error: any) => {

                console.log(
                  'Accept Error:',
                  error
                );


                this.alertService.error(

                  error?.error?.message ||
                  'Failed to accept production instruction'

                );

              }

            });

        }

      );

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/warehouse-production-assigned'
    ]);

  }

}
