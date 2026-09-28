import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionsService } from '../Services/collections.service';

@Component({
  selector: 'app-outstanding-view',
  templateUrl: './outstanding-view.component.html',
  styleUrls: ['./outstanding-view.component.css']
})
export class OutstandingViewComponent implements OnInit {

  // ==========================================
  // LOADING
  // ==========================================
  isLoading = false;


  // ==========================================
  // PARTY DETAILS
  // ==========================================
  party: any = null;


  // ==========================================
  // SUMMARY
  // ==========================================
  summary: any = {
    totalOutstanding: 0,
    pendingInvoices: 0,
    completedInvoices: 0
  };


  // ==========================================
  // ORDERS
  // ==========================================
  orders: any[] = [];


  // ==========================================
  // COMPLETED ORDERS
  // ==========================================
  completedOrders: any[] = [];


  constructor(
    private outstandingService: CollectionsService,

    private dialogRef:
      MatDialogRef<OutstandingViewComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }


  // ==========================================
  // ON INIT
  // ==========================================
  ngOnInit(): void {

    this.getPartyOutstanding();

  }


  // ==========================================
  // GET PARTY OUTSTANDING
  // ==========================================
  getPartyOutstanding(): void {

    const partyId = this.data?.partyId;


    if (!partyId) {

      console.error(
        'Party ID NOT FOUND'
      );

      return;

    }


    this.isLoading = true;


    this.outstandingService
      .getOutstandingById(partyId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Party Outstanding Details:',
            response
          );


          if (response?.success) {

            // ==================================
            // PARTY
            // ==================================
            this.party =
              response.party || null;


            // ==================================
            // SUMMARY
            // ==================================
            this.summary = {

              totalOutstanding:
                Number(
                  response.summary?.totalOutstanding || 0
                ),

              pendingInvoices:
                Number(
                  response.summary?.pendingInvoices || 0
                ),

              completedInvoices:
                Number(
                  response.summary?.completedInvoices || 0
                )

            };


            // ==================================
            // ORDERS
            // ==================================
            this.orders =
              response.orders || [];


            // ==================================
            // COMPLETED ORDERS
            // ==================================
            this.completedOrders =
              response.completedOrders || [];

          }


          this.isLoading = false;

        },

        error: (error) => {

          console.error(
            'Get Party Outstanding Error:',
            error
          );

          this.isLoading = false;

        }

      });

  }


  // ==========================================
  // CLOSE POPUP
  // ==========================================
  close(): void {

    this.dialogRef.close();

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================
  formatDate(date: any): string {

    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }


  // ==========================================
  // FORMAT DATE + TIME
  // ==========================================
  formatDateTime(date: any): string {

    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );

  }


  // ==========================================
  // GET ORDER PRODUCTS COUNT
  // ==========================================
  getProductCount(order: any): number {

    return order?.products?.length || 0;

  }


  // ==========================================
  // GET COLLECTION COUNT
  // ==========================================
  getCollectionCount(order: any): number {

    return order?.collections?.length || 0;

  }

}
