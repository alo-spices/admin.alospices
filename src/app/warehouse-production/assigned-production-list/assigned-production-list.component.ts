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
import { UpdateProductionStatusPopupComponent } from 'src/app/update-production-status-popup/update-production-status-popup.component';

@Component({
  selector: 'app-assigned-production-list',
  templateUrl: './assigned-production-list.component.html',
  styleUrls: ['./assigned-production-list.component.css']
})
export class AssignedProductionListComponent implements OnInit, AfterViewInit {
  instruction: any = null;

  isAdmin = false;
  isWarehouseManager = false;
  currentUser: any = null;

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

    this.loadCurrentUser();

    // Existing search filter
    this.dataSource.filterPredicate = (
      data: any,
      filter: string
    ) => {
      const instructionNo = data.instructionNo || '';
      const instructionDate = data.instructionDate || '';
      const warehouseName = data.warehouse?.warehouseName || '';
      const warehouseCode = data.warehouse?.warehouseCode || '';
      const status = data.status || '';
      const remarks = data.remarks || '';

      const itemSearch = Array.isArray(data.items)
        ? data.items.map((item: any) =>
          [
            item.rawMaterial?.rawMaterialName || '',
            item.rawMaterial?.rawMaterialCode || '',
            item.stockReceive?.receiveNo || '',
            item.batchNo || '',
            item.variantName || '',
            item.skuCode || '',
            item.packSize || ''
          ].join(' ')
        ).join(' ')
        : '';

      const search = [
        instructionNo,
        instructionDate,
        warehouseName,
        warehouseCode,
        itemSearch,
        status,
        remarks
      ].join(' ').toLowerCase();

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

  loadCurrentUser(): void {
    this.currentUser = this.getStoredUser();

    if (!this.currentUser) {
      console.error('Logged-in user not found in localStorage.');
      return;
    }

    const role = this.currentUser.role;

    this.isAdmin = role === 'Admin';
    this.isWarehouseManager = role === 'WarehouseManager';

    if (this.isWarehouseManager) {
      this.loadAssignedWarehouse();
    } else if (this.isAdmin) {
      this.getAllWarehouses();
    } else {
      this.warehouseList = [];
      this.instructionList = [];
      this.dataSource.data = [];
      console.error('Unauthorized role:', role);
    }
  }

  /**
   * Reads the stored user object.
   * If your application uses a known localStorage key,
   * you can replace this helper with that exact key.
   */
  private getStoredUser(): any {
    const possibleKeys = [
      'user',
      'currentUser',
      'loggedInUser',
      'currentUserData'
    ];

    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);

      if (!value) continue;

      try {
        const parsed = JSON.parse(value);

        if (parsed?.role) {
          return parsed;
        }

        // Handles storage values wrapped inside { user: {...} }
        if (parsed?.user?.role) {
          return parsed.user;
        }
      } catch {
        // Continue checking other known keys.
      }
    }

    // Fallback: find the stored object containing the logged-in role.
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (!key) continue;

      try {
        const parsed = JSON.parse(localStorage.getItem(key) || '');

        if (parsed?.role === 'Admin' ||
          parsed?.role === 'WarehouseManager') {
          return parsed;
        }

        if (parsed?.user?.role === 'Admin' ||
          parsed?.user?.role === 'WarehouseManager') {
          return parsed.user;
        }
      } catch {
        // Ignore non-JSON localStorage values.
      }
    }

    return null;
  }

  loadAssignedWarehouse(): void {
    const warehouse = this.currentUser?.warehouse;

    const warehouseId =
      typeof warehouse === 'string'
        ? warehouse
        : warehouse?._id || warehouse?.id;

    if (!warehouseId) {
      this.warehouseList = [];
      this.selectedWarehouse = null;
      this.selectedWarehouseId = '';
      this.instructionList = [];
      this.dataSource.data = [];

      console.error('Warehouse ID not found for WarehouseManager.');
      return;
    }

    // WarehouseManager gets only their assigned warehouse in the UI.
    this.selectedWarehouseId = warehouseId;

    this.selectedWarehouse =
      typeof warehouse === 'object'
        ? warehouse
        : {
          _id: warehouseId,
          warehouseName: 'Assigned Warehouse',
          warehouseCode: ''
        };

    this.warehouseList = [this.selectedWarehouse];

    this.getProductionInstructionsByWarehouse(warehouseId);
  }
  // ==========================================
  // Get All Warehouses
  // ==========================================

  getAllWarehouses(): void {
    if (!this.isAdmin) {
      return;
    }

    this.warehouseService.getAllWarehouses().subscribe({
      next: (response: any) => {
        this.warehouseList = response?.data || [];

        if (this.warehouseList.length > 0) {
          this.selectedWarehouseId = this.warehouseList[0]._id;
          this.selectedWarehouse = this.warehouseList[0];

          this.getProductionInstructionsByWarehouse(
            this.selectedWarehouseId
          );
        } else {
          this.selectedWarehouseId = '';
          this.selectedWarehouse = null;
          this.instructionList = [];
          this.dataSource.data = [];
        }
      },
      error: (error: any) => {
        console.error('Warehouse Error:', error);
        this.warehouseList = [];
        this.selectedWarehouse = null;
        this.instructionList = [];
        this.dataSource.data = [];
      }
    });
  }


  // ==========================================
  // Warehouse Change
  // ==========================================

  onWarehouseChange(warehouseId: string): void {
    if (this.isWarehouseManager) {
      const assignedWarehouse = this.currentUser?.warehouse;

      const assignedWarehouseId =
        typeof assignedWarehouse === 'string'
          ? assignedWarehouse
          : assignedWarehouse?._id || assignedWarehouse?.id;

      if (warehouseId !== assignedWarehouseId) {
        return;
      }
    }

    this.instructionList = [];
    this.dataSource.data = [];

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (!warehouseId) {
      this.selectedWarehouse = null;
      this.selectedWarehouseId = '';
      return;
    }

    this.selectedWarehouseId = warehouseId;

    this.selectedWarehouse = this.warehouseList.find(
      warehouse => warehouse._id === warehouseId
    );

    this.getProductionInstructionsByWarehouse(warehouseId);
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


  goToProductionEntry(instruction: any): void {

    if (!instruction?._id) {
      return;
    }

    // Prevent opening production entry after completion
    if (instruction.status === 'Completed') {
      this.alertService.warning(
        'Production is already completed.'
      );
      return;
    }

    // Allow entry only for Accepted or In Progress
    if (
      instruction.status !== 'Accepted' &&
      instruction.status !== 'In Progress'
    ) {
      this.alertService.warning(
        'Production instruction must be Accepted before production entry.'
      );
      return;
    }

    this.router.navigate([
      '/admin/warehouse-production-entry',
      instruction._id
    ]);
  }
  openStatusPopup(instruction: any): void {

    if (!instruction?._id) {
      return;
    }

    if (
      instruction.status === 'Completed' ||
      instruction.status === 'Rejected' ||
      instruction.status === 'Cancelled'
    ) {
      this.alertService.warning(
        'This production instruction can no longer be changed.'
      );
      return;
    }

    const dialogRef = this.dialog.open(
      UpdateProductionStatusPopupComponent,
      {
        width: '480px',
        maxWidth: '95vw',
        panelClass: 'accept-production-dialog',
        disableClose: true,
        data: {
          instructionId: instruction._id,
          instructionNo: instruction.instructionNo,
          currentStatus: instruction.status
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (selectedStatus: string | undefined) => {

        if (
          !selectedStatus ||
          selectedStatus === instruction.status
        ) {
          return;
        }

        // Production must exist before completing.
        if (
          selectedStatus === 'Completed' &&
          !instruction.production
        ) {
          this.alertService.warning(
            'Please complete the production entry before marking this instruction as Completed.'
          );
          return;
        }

        this.productionInstructionService
          .updateProductionInstructionStatus(
            instruction._id,
            selectedStatus
          )
          .subscribe({

            next: (response: any) => {

              this.alertService.success(
                response?.message ||
                'Production status updated successfully'
              ).then(() => {

                if (this.selectedWarehouseId) {
                  this.getProductionInstructionsByWarehouse(
                    this.selectedWarehouseId
                  );
                }

              });

            },

            error: (error: any) => {

              this.alertService.error(
                error?.error?.message ||
                'Failed to update production status'
              );

            }

          });

      }
    );
  }
}
