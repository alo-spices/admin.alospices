import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CommomPopupService } from '../Services/commom-popup.service';
import { ProductionInstructionService } from '../Services/production-instruction.service';

@Component({
  selector: 'app-production-instruction',
  templateUrl: './production-instruction.component.html',
  styleUrls: ['./production-instruction.component.css']
})
export class ProductionInstructionComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Displayed Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'instruction',

    'warehouse',

    'rawMaterial',

    'batchNo',

    'variant',

    'packSize',

    'targetPacks',

    'targetWeight',

    'totalTargetWeight',

    'status',

    'actions'

  ];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // Production Instructions
  // ==========================================

  productionInstructions: any[] = [];


  // ==========================================
  // Paginator
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // Sort
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // ==========================================
  // Constructor
  // ==========================================

  constructor(

    private productionInstructionService:
      ProductionInstructionService,

    private router: Router,

    private dialog: MatDialog,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllProductionInstructions();


    // ========================================
    // Custom Search
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.instructionNo || '') +

        ' ' +

        (
          data.warehouse
            ?.warehouseName || ''
        ) +

        ' ' +

        (
          data.warehouse
            ?.warehouseCode || ''
        ) +

        ' ' +

        (
          data.items?.[0]
            ?.rawMaterial
            ?.rawMaterialName || ''
        ) +

        ' ' +

        (
          data.items?.[0]
            ?.rawMaterial
            ?.rawMaterialCode || ''
        ) +

        ' ' +

        (
          data.items?.[0]
            ?.batchNo || ''
        ) +

        ' ' +

        (
          data.items?.[0]
            ?.variantName || ''
        ) +

        ' ' +

        (
          data.items?.[0]
            ?.skuCode || ''
        ) +

        ' ' +

        (data.status || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // ==========================================
  // After View Init
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==========================================
  // Get All Production Instructions
  // ==========================================

  getAllProductionInstructions(): void {

    this.productionInstructionService

      .getAllProductionInstructions()

      .subscribe({

        next: (res: any) => {

          console.log(
            'Production Instructions:',
            res
          );


          this.productionInstructions =
            res.data || [];


          this.dataSource.data =
            this.productionInstructions;

        },


        error: (err: any) => {

          console.log(
            'Get Production Instructions Error:',
            err
          );


          this.alertService.error(

            err.error?.message ||

            'Failed to load production instructions'

          );

        }

      });

  }


  // ==========================================
  // Search
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;


    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // Create
  // ==========================================

  goToCreateProductionInstruction(): void {

    this.router.navigate([

      '/admin/create-production-instruction'

    ]);

  }


  // ==========================================
  // View
  // ==========================================

  viewProductionInstruction(
    instruction: any
  ): void {

    console.log(
      'View Production Instruction:',
      instruction
    );


    // Later View Dialog / View Page
    // ikkada add cheyyachu.

    this.router.navigate([

      '/admin/view-production-instruction',

      instruction._id

    ]);

  }


  // ==========================================
  // Edit
  // ==========================================

  // ==========================================
  // EDIT PRODUCTION INSTRUCTION
  // ==========================================

  editProductionInstruction(element: any): void {

    if (!element?._id) {

      console.log(
        'Production Instruction ID not found:',
        element
      );

      return;

    }

    this.productionInstructionService
      .getProductionInstructionById(element._id)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Production Instruction By ID:',
            res
          );

          if (res?.success && res?.data) {

            // Store response if required
            const instruction = res.data;

            // Navigate to edit page
            this.router.navigate(
              [
                '/admin/update-production-instructions',
                instruction._id
              ]
            );

          }
          else {

            this.alertService.error(
              res?.message ||
              'Unable to load Production Instruction.'
            );

          }

        },

        error: (error: any) => {

          console.log(
            'Get Production Instruction By ID Error:',
            error
          );

          this.alertService.error(

            error?.error?.message ||
            'Unable to load Production Instruction.'

          );

        }

      });

  }

  // ==========================================
  // Delete
  // ==========================================

  deleteProductionInstruction(
    instruction: any
  ): void {


    const dialogRef =

      this.dialog.open(

        DeleteConfirmationComponent,

        {

          width: '400px'

        }

      );


    dialogRef
      .afterClosed()
      .subscribe(result => {


        if (!result) {

          return;

        }


        this.productionInstructionService

          .deleteProductionInstruction(

            instruction._id

          )

          .subscribe({

            next: (res: any) => {


              this.alertService.success(

                res.message ||

                'Production Instruction deleted successfully'

              );


              this.getAllProductionInstructions();

            },


            error: (err: any) => {


              console.log(

                'Delete Error:',

                err

              );


              this.alertService.error(

                err.error?.message ||

                'Failed to delete production instruction'

              );

            }

          });

      });

  }

}
