import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-warehouse-dashboard',
  templateUrl: './warehouse-dashboard.component.html',
  styleUrls: ['./warehouse-dashboard.component.css']
})
export class WarehouseDashboardComponent implements OnInit {

  loading = false;
  dashboardData: any = null;
  currentRole = '';
  dashboardTitle = 'Warehouse Dashboard';
  dashboardSubtitle = 'Warehouse operations and stock overview';

  summary: any = {};
  today: any = {};
  production: any = {};
  productionInstructions: any = {};
  rawMaterialStock: any = {};
  stockTransfers: any = {};
  orders: any = {};
  deliveries: any = {};
  collections: any = {};

  warehouse: any = null;
  finishedGoods: any = {};
  finishedGoodsList: any[] = [];
  recentOrders: any[] = [];
  recentDeliveries: any[] = [];
  recentCollections: any[] = [];

  constructor(
    private dashboardService: LoginService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    this.dashboardService.getDashboard().subscribe({
      next: (response: any) => {
        this.loading = false;

        if (!response?.success || !response?.dashboard) {
          this.dashboardData = null;
          return;
        }

        this.dashboardData = response;
        this.currentRole = response.role || '';

        const data = response.dashboard;

        this.summary = data.summary || {};
        this.today = data.today || {};
        this.production = data.production || {};
        this.productionInstructions =
          data.productionInstructions || {};

        this.rawMaterialStock = data.rawMaterialStock || {};
        this.stockTransfers = data.stockTransfers || {};
        this.orders = data.orders || {};
        this.deliveries = data.deliveries || {};
        this.collections = data.collections || {};

        // Assigned warehouse
        this.warehouse = data.warehouses?.[0] || null;

        // Finished goods for the assigned warehouse
        this.finishedGoods =
          data.finishedGoods?.total || {};

        this.finishedGoodsList =
          data.finishedGoods?.warehouses?.flatMap(
            (item: any) => item.finishedGoods || []
          ) || [];

        // Recent activity
        this.recentOrders = data.recent?.orders || [];
        this.recentDeliveries = data.recent?.deliveries || [];
        this.recentCollections = data.recent?.collections || [];
      },

      error: (error: any) => {
        this.loading = false;
        this.dashboardData = null;
        console.error('Dashboard loading failed:', error);
      }
    });
  }

  formatNumber(value: number | string | null | undefined): string {
    return Number(value || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 2
    });
  }

  getOrderStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'pending': return 'pending';
      case 'approved': return 'approved';
      case 'processing': return 'processing';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'pending';
    }
  }

  getDeliveryStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'delivered': return 'success';
      case 'dispatched': return 'processing';
      case 'assigned': return 'approved';
      case 'failed':
      case 'cancelled': return 'danger';
      default: return 'pending';
    }
  }

  getPaymentStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'paid': return 'success';
      case 'partial': return 'processing';
      case 'pending':
      case 'unpaid': return 'pending';
      default: return 'pending';
    }
  }

}
