import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AcceptProductionInstructionPopupComponent } from 'src/app/accept-production-instruction-popup/accept-production-instruction-popup.component';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { ProductionInstructionService } from 'src/app/Services/production-instruction.service';
import { WarehouseProductionService } from 'src/app/Services/warehouse-production.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-assigned-production-list',
  templateUrl: './assigned-production-list.component.html',
  styleUrls: ['./assigned-production-list.component.css']
})
export class AssignedProductionListComponent implements OnInit, AfterViewInit {
  instruction: any = null;

  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'instruction',

    'rawMaterial',

    'variant',

    'packSize',

    'targetPacks',

    'targetWeight',

    'status',

    'actions'

  ];


  // ==========================================
  // Warehouse List
  // ==========================================

  warehouseList: any[] = [];


  // ==========================================
  // Selected Warehouse
  // ==========================================

  selectedWarehouseId: string = '';

  selectedWarehouse: any = null;


  // ==========================================
  // Production Instructions
  // ==========================================

  instructionList: any[] = [];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


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


  constructor(

    private productionInstructionService:
      ProductionInstructionService,

    private router:
      Router,

    private dialog:
      MatDialog,

    private alertService:
      CommomPopupService,
    private warehouseService: WarehouseService,
    private warehouseProductionService: WarehouseProductionService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllWarehouses();


    // ========================================
    // Search Filter
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const instructionNo =
        data.instructionNo || '';


      const instructionDate =
        data.instructionDate || '';


      const warehouseName =
        data.warehouse?.warehouseName || '';


      const warehouseCode =
        data.warehouse?.warehouseCode || '';


      const status =
        data.status || '';


      const remarks =
        data.remarks || '';


      // ========================================
      // Items Search
      // ========================================

      let itemSearch = '';


      if (
        Array.isArray(
          data.items
        )
      ) {

        itemSearch =
          data.items
            .map(
              (item: any) => {

                return (

                  (item.rawMaterial
                    ?.rawMaterialName || '') +

                  ' ' +

                  (item.rawMaterial
                    ?.rawMaterialCode || '') +

                  ' ' +

                  (item.stockReceive
                    ?.receiveNo || '') +

                  ' ' +

                  (item.batchNo || '') +

                  ' ' +

                  (item.variantName || '') +

                  ' ' +

                  (item.skuCode || '') +

                  ' ' +

                  (item.packSize || '')

                );

              }
            )
            .join(' ');

      }


      // ========================================
      // Final Search String
      // ========================================

      const search = (

        instructionNo +

        ' ' +

        instructionDate +

        ' ' +

        warehouseName +

        ' ' +

        warehouseCode +

        ' ' +

        itemSearch +

        ' ' +

        status +

        ' ' +

        remarks

      ).toLowerCase();


      return search.includes(
        filter
      );

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
  // Get All Warehouses
  // ==========================================

  getAllWarehouses(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Warehouse Response:',
            response
          );


          this.warehouseList =
            response?.data || [];


          // ========================================
          // Select First Warehouse
          // ========================================

          if (
            this.warehouseList.length > 0
          ) {

            this.selectedWarehouseId =
              this.warehouseList[0]._id;


            this.selectedWarehouse =
              this.warehouseList[0];


            // ======================================
            // Load Instructions
            // ======================================

            this.getProductionInstructionsByWarehouse(
              this.selectedWarehouseId
            );

          }

        },

        error: (error: any) => {

          console.log(
            'Warehouse Error:',
            error
          );


          this.warehouseList = [];

        }

      });

  }


  // ==========================================
  // Warehouse Change
  // ==========================================

  onWarehouseChange(
    warehouseId: string
  ): void {


    // ==========================================
    // Clear Previous Data
    // ==========================================

    this.instructionList = [];

    this.dataSource.data = [];


    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }


    // ==========================================
    // No Warehouse
    // ==========================================

    if (!warehouseId) {

      this.selectedWarehouse = null;

      return;

    }


    // ==========================================
    // Selected Warehouse
    // ==========================================

    this.selectedWarehouseId =
      warehouseId;


    this.selectedWarehouse =
      this.warehouseList.find(

        warehouse =>
          warehouse._id === warehouseId

      );


    // ==========================================
    // Get Instructions
    // ==========================================

    this.getProductionInstructionsByWarehouse(
      warehouseId
    );

  }


  // ==========================================
  // Get Instructions By Warehouse
  // ==========================================

  getProductionInstructionsByWarehouse(
    warehouseId: string
  ): void {

    this.warehouseProductionService
      .getProductionInstructionsByWarehouse(
        warehouseId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Production Instructions:',
            response
          );


          this.instructionList =
            response?.data || [];


          // ======================================
          // Bind Table
          // ======================================

          this.dataSource.data =
            this.instructionList;


          // ======================================
          // Re-assign Paginator
          // ======================================

          this.dataSource.paginator =
            this.paginator;


          // ======================================
          // Re-assign Sort
          // ======================================

          this.dataSource.sort =
            this.sort;

        },

        error: (error: any) => {

          console.log(
            'Production Instruction Error:',
            error
          );


          this.instructionList = [];

          this.dataSource.data = [];

        }

      });

  }


  // ==========================================
  // Search
  // ==========================================

  applyFilter(
    event: Event
  ): void {

    const filterValue = (

      event.target as
      HTMLInputElement

    ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }

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
  // Edit
  // ==========================================

  editProductionInstruction(
    instruction: any
  ): void {

    if (!instruction?._id) {

      return;

    }


    this.router.navigate([

      '/admin/update-production-instruction',

      instruction._id

    ]);

  }


  // ==========================================
  // Delete
  // ==========================================

  deleteProductionInstruction(
    instruction: any
  ): void {

    if (!instruction?._id) {

      return;

    }


    this.alertService
      .confirmDelete()
      .then((confirmed: any) => {

        if (!confirmed) {

          return;

        }


        this.productionInstructionService
          .deleteProductionInstruction(
            instruction._id
          )
          .subscribe({

            next: (response: any) => {

              this.alertService
                .success(
                  response?.message ||
                  'Production Instruction Deleted Successfully'
                )
                .then(() => {

                  // Reload current warehouse

                  if (
                    this.selectedWarehouseId
                  ) {

                    this.getProductionInstructionsByWarehouse(
                      this.selectedWarehouseId
                    );

                  }

                });

            },

            error: (error: any) => {

              console.log(
                'Delete Error:',
                error
              );


              this.alertService.error(

                error?.error?.message ||
                'Failed to delete production instruction'

              );

            }

          });

      });

  }

  // ==========================================
  // Accept Production Instruction
  // ==========================================

  acceptProductionInstruction(
    instruction: any
  ): void {

    if (!instruction?._id) {

      return;

    }


    // ========================================
    // Open Confirmation Popup
    // ========================================

    const dialogRef =
      this.dialog.open(

        AcceptProductionInstructionPopupComponent,

        {

          width: '420px',

          maxWidth: '92vw',

          panelClass:
            'accept-production-dialog',

          disableClose: true,

          data: instruction

        }

      );


    // ========================================
    // Popup Result
    // ========================================

    dialogRef.afterClosed()
      .subscribe(

        (confirmed: boolean) => {

          if (!confirmed) {

            return;

          }


          // ====================================
          // Accept API
          // ====================================

          this.productionInstructionService
            .acceptProductionInstruction(
              instruction._id
            )
            .subscribe({

              next: (response: any) => {

                this.alertService
                  .success(

                    response?.message ||
                    'Production Instruction Accepted Successfully'

                  )
                  .then(() => {

                    // ==============================
                    // Refresh Current Warehouse
                    // ==============================

                    if (
                      this.selectedWarehouseId
                    ) {

                      this.getProductionInstructionsByWarehouse(

                        this.selectedWarehouseId

                      );

                    }

                  });

              },


              error: (error: any) => {

                console.log(
                  'Accept Production Instruction Error:',
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


  viewProductionInstruction(
    instruction: any
  ): void {

    if (!instruction?._id) {

      return;

    }


    this.router.navigate([

      '/admin/warehouse-production-assigned-view-details',

      instruction._id

    ]);

  }

  goBack(): void {

    this.router.navigate([

      '/admin/warehouse-production-assigned'


    ]);

  }

  goToProductionEntry(
    instruction: any
  ): void {

    if (!instruction?._id) {

      return;

    }

    this.router.navigate([

      '/admin/warehouse-production-entry',

      instruction._id

    ]);

  }
}
