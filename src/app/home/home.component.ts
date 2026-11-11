import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { StockReceiveService } from '../Services/stock-receive.service';
import { WarehouseService } from '../Services/warehouse.service';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseStockViewComponent } from '../View-dialog-Controllers/warehouse-stock-view/warehouse-stock-view.component';
import { LoginService } from '../Services/login.service';
import { finalize } from 'rxjs';
import { EmployeeService } from '../Services/employee.service';
import { OrdersService } from '../Services/orders.service';
import { ViewEmployeeOrderComponent } from '../view-employee-order/view-employee-order.component';
import { CollectionViewComponent } from '../collection-view/collection-view.component';
import { CollectionsService } from '../Services/collections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  Math = Math;
  toDay: Date = new Date();
  // =========================================================
  // LOADING / ERROR
  // =========================================================
  currentPage: number = 1;
  pageSize: number = 5;

  deliveryCurrentPage: number = 1;
  deliveryPageSize: number = 5;

  collectionCurrentPage: number = 1;
  collectionPageSize: number = 5;
  loading = false;
  errorMessage = '';

  // =========================================================
  // MAIN DASHBOARD RESPONSE
  // =========================================================

  dashboardData: any = null;

  // =========================================================
  // ROLE / SCOPE
  // =========================================================

  currentRole = '';
  scopeType = '';
  currentUserId = '';
  warehouseId: string | null = null;
  distributorId: string | null = null;

  // =========================================================
  // DASHBOARD TITLE
  // =========================================================

  dashboardTitle = 'Dashboard';
  dashboardSubtitle = 'Welcome back! Here is your business overview.';

  // =========================================================
  // SUMMARY
  // =========================================================

  summary: any = {
    employees: 0,
    salesManagers: 0,
    salesmen: 0,
    accountants: 0,
    deliveryBoys: 0,
    warehouseManagers: 0,
    distributors: 0,
    warehouses: 0,
    parties: 0,
    retailers: 0,
    wholesalers: 0,
    orders: 0,
    deliveries: 0,
    finishedGoodsPacks: 0,
    finishedGoodsWeightKg: 0,
    outstanding: 0,
    totalSales: 0,
    totalCollected: 0
  };

  // =========================================================
  // TODAY
  // =========================================================

  today: any = {
    orders: 0,
    sales: 0,
    deliveries: 0,
    delivered: 0,
    collections: 0
  };

  // =========================================================
  // EMPLOYEES
  // =========================================================

  employees: any = {
    total: 0,
    salesManagers: 0,
    salesmen: 0,
    accountants: 0,
    deliveryBoys: 0,
    warehouseManagers: 0,
    distributors: 0,
    list: []
  };

  // =========================================================
  // WAREHOUSES
  // =========================================================

  warehouses: any[] = [];
  warehouseList: any[] = [];

  selectedWarehouse: any = null;
  selectedWarehouseStock: any = null;

  showWarehouseSection = false;
  showWarehouseStock = false;

  // =========================================================
  // FINISHED GOODS
  // =========================================================

  finishedGoods: any = {
    total: {
      totalPacks: 0,
      totalWeightKg: 0,
      rejectedPacks: 0,
      skuCount: 0
    },
    warehouses: []
  };

  // =========================================================
  // PRODUCTION
  // =========================================================

  production: any = {
    totalProductions: 0,
    totalProducedWeightKg: 0,
    totalWasteKg: 0,
    totalProducedPacks: 0
  };

  // =========================================================
  // PRODUCTION INSTRUCTIONS
  // =========================================================

  productionInstructions: any = {
    total: 0,
    pending: 0,
    accepted: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0
  };

  // =========================================================
  // RAW MATERIAL STOCK
  // =========================================================

  rawMaterialStock: any = {
    totalReceives: 0,
    rawMaterialAvailableWeightKg: 0
  };

  // =========================================================
  // STOCK TRANSFERS
  // =========================================================

  stockTransfers: any = {
    totalTransfers: 0,
    pending: 0,
    approved: 0,
    inTransit: 0,
    received: 0,
    cancelled: 0
  };

  // =========================================================
  // PARTIES
  // =========================================================

  parties: any = {
    total: 0,
    active: 0,
    inactive: 0,
    retailers: 0,
    wholesalers: 0
  };

  // =========================================================
  // ORDERS
  // =========================================================

  orders: any = {
    totalOrders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    processingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalSales: 0,
    totalPaid: 0,
    totalOutstanding: 0
  };

  // =========================================================
  // DELIVERIES
  // =========================================================

  deliveries: any = {
    totalDeliveries: 0,
    pending: 0,
    assigned: 0,
    dispatched: 0,
    delivered: 0,
    failed: 0,
    cancelled: 0
  };

  // =========================================================
  // COLLECTIONS
  // =========================================================

  collections: any = {
    totalCollections: 0,
    totalCollected: 0,
    cash: 0,
    upi: 0,
    bankTransfer: 0,
    cheque: 0
  };

  // =========================================================
  // RECENT ACTIVITIES
  // =========================================================

  recentOrders: any[] = [];
  recentDeliveries: any[] = [];
  recentCollections: any[] = [];

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private dashboardService: LoginService,
    private router: Router,
    private dialog: MatDialog,
    private employeeService: OrdersService,
    private collectionService: CollectionsService
  ) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  // =========================================================
  // ON INIT
  // =========================================================

  ngOnInit(): void {
    this.loadDashboard();
  }

  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.dashboardService
      .getDashboard()
      .pipe(finalize(() => {
        this.loading = false;
      })
      )
      .subscribe({
        next: (response: any) => {

          console.log('Dashboard API Response:', response);

          if (!response || !response.success) {

            this.errorMessage =
              response?.message || 'Unable to load dashboard data.';

            return;
          }

          this.dashboardData = response;

          this.setScope(response);
          this.setDashboardData(response);

          console.log('Dashboard Data:', this.dashboardData);
        },

        error: (error: any) => {

          console.error('Dashboard API Error:', error);

          this.errorMessage =
            error?.error?.message ||
            error?.message ||
            'Something went wrong while loading dashboard.';

          this.resetDashboard();
        }
      });
  }

  // =========================================================
  // SET ROLE / SCOPE
  // =========================================================

  private setScope(response: any): void {

    this.currentRole = response?.role || '';

    const scope = response?.scope || {};

    this.scopeType = scope?.type || '';

    this.currentUserId = scope?.userId || '';

    this.warehouseId =
      scope?.warehouseId ||
      null;

    this.distributorId =
      scope?.distributorId ||
      null;

    this.setDashboardTitle();
    this.setWarehouseVisibility();
  }

  // =========================================================
  // DASHBOARD TITLE BASED ON ROLE
  // =========================================================

  private setDashboardTitle(): void {

    switch (this.currentRole) {

      case 'Admin':

        this.dashboardTitle = 'Admin Dashboard';

        this.dashboardSubtitle =
          'Complete company-wide business overview.';

        break;

      case 'SubAdmin':

        this.dashboardTitle = 'Sub Admin Dashboard';

        this.dashboardSubtitle =
          'Company operations and business overview.';

        break;

      case 'Distributor':

        this.dashboardTitle = 'Distributor Dashboard';

        this.dashboardSubtitle =
          'Your distribution, orders, deliveries and collections overview.';

        break;

      case 'WarehouseManager':

        this.dashboardTitle = 'Warehouse Dashboard';

        this.dashboardSubtitle =
          'Warehouse stock, production and transfer overview.';

        break;

      default:

        this.dashboardTitle = 'Dashboard';

        this.dashboardSubtitle =
          'Welcome back! Here is your business overview.';

        break;
    }
  }

  // =========================================================
  // WAREHOUSE VISIBILITY
  // =========================================================

  private setWarehouseVisibility(): void {

    this.showWarehouseSection =
      this.currentRole === 'Admin' ||
      this.currentRole === 'SubAdmin' ||
      this.currentRole === 'WarehouseManager';

  }

  // =========================================================
  // SET ALL DASHBOARD DATA
  // =========================================================

  private setDashboardData(response: any): void {

    const dashboard = response?.dashboard || {};

    // ---------------------------------------------------------
    // SUMMARY
    // ---------------------------------------------------------

    this.summary = {
      ...this.summary,
      ...(dashboard.summary || {})
    };

    // ---------------------------------------------------------
    // TODAY
    // ---------------------------------------------------------

    this.today = {
      ...this.today,
      ...(dashboard.today || {})
    };

    // ---------------------------------------------------------
    // EMPLOYEES
    // ---------------------------------------------------------

    this.employees = {
      ...this.employees,
      ...(dashboard.employees || {})
    };

    this.employees.list =
      dashboard?.employees?.list || [];

    // ---------------------------------------------------------
    // WAREHOUSES
    // ---------------------------------------------------------

    this.warehouses =
      dashboard?.warehouses || [];

    // ---------------------------------------------------------
    // FINISHED GOODS
    // ---------------------------------------------------------

    this.finishedGoods = {
      total: {
        totalPacks:
          dashboard?.finishedGoods?.total?.totalPacks || 0,

        totalWeightKg:
          dashboard?.finishedGoods?.total?.totalWeightKg || 0,

        rejectedPacks:
          dashboard?.finishedGoods?.total?.rejectedPacks || 0,

        skuCount:
          dashboard?.finishedGoods?.total?.skuCount || 0
      },

      warehouses:
        dashboard?.finishedGoods?.warehouses || []
    };

    // ---------------------------------------------------------
    // COMBINE WAREHOUSE + FINISHED GOODS DATA
    // ---------------------------------------------------------

    this.buildWarehouseList();

    // ---------------------------------------------------------
    // PRODUCTION
    // ---------------------------------------------------------

    this.production = {
      ...this.production,
      ...(dashboard.production || {})
    };

    // ---------------------------------------------------------
    // PRODUCTION INSTRUCTIONS
    // ---------------------------------------------------------

    this.productionInstructions = {
      ...this.productionInstructions,
      ...(dashboard.productionInstructions || {})
    };

    // ---------------------------------------------------------
    // RAW MATERIAL
    // ---------------------------------------------------------

    this.rawMaterialStock = {
      ...this.rawMaterialStock,
      ...(dashboard.rawMaterialStock || {})
    };

    // ---------------------------------------------------------
    // STOCK TRANSFERS
    // ---------------------------------------------------------

    this.stockTransfers = {
      ...this.stockTransfers,
      ...(dashboard.stockTransfers || {})
    };

    // ---------------------------------------------------------
    // PARTIES
    // ---------------------------------------------------------

    this.parties = {
      ...this.parties,
      ...(dashboard.parties || {})
    };

    // ---------------------------------------------------------
    // ORDERS
    // ---------------------------------------------------------

    this.orders = {
      ...this.orders,
      ...(dashboard.orders || {})
    };

    // ---------------------------------------------------------
    // DELIVERIES
    // ---------------------------------------------------------

    this.deliveries = {
      ...this.deliveries,
      ...(dashboard.deliveries || {})
    };

    // ---------------------------------------------------------
    // COLLECTIONS
    // ---------------------------------------------------------

    this.collections = {
      ...this.collections,
      ...(dashboard.collections || {})
    };

    // ---------------------------------------------------------
    // RECENT DATA
    // ---------------------------------------------------------

    this.recentOrders =
      dashboard?.recent?.orders || [];

    this.currentPage = 1;

    this.recentDeliveries =
      dashboard?.recent?.deliveries || [];

    this.deliveryCurrentPage = 1;


    this.recentCollections =
      dashboard?.recent?.collections || [];

    this.collectionCurrentPage = 1;

    // ---------------------------------------------------------
    // AUTO SELECT WAREHOUSE
    // ---------------------------------------------------------

    this.autoSelectWarehouse();
  }

  // =========================================================
  // BUILD WAREHOUSE LIST
  // =========================================================

  private buildWarehouseList(): void {

    const warehouseMap = new Map<string, any>();

    // ---------------------------------------------------------
    // FIRST ADD WAREHOUSE MASTER DATA
    // ---------------------------------------------------------

    this.warehouses.forEach((warehouse: any) => {

      const id = this.getId(warehouse);

      if (!id) {
        return;
      }

      warehouseMap.set(id, {
        ...warehouse,

        totalPacks: 0,
        totalWeightKg: 0,
        rejectedPacks: 0,
        skuCount: 0,
        stock: []
      });
    });

    // ---------------------------------------------------------
    // ADD FINISHED GOODS DATA
    // ---------------------------------------------------------

    const fgWarehouses =
      this.finishedGoods?.warehouses || [];

    fgWarehouses.forEach((warehouseStock: any) => {

      const warehouse =
        warehouseStock?.warehouse || {};

      const id =
        this.getId(warehouseStock) ||
        this.getId(warehouse);

      if (!id) {
        return;
      }

      const existing =
        warehouseMap.get(id) || {

          ...warehouse,

          totalPacks: 0,
          totalWeightKg: 0,
          rejectedPacks: 0,
          skuCount: 0,
          stock: []
        };

      existing.totalPacks =
        warehouseStock?.totalPacks || 0;

      existing.totalWeightKg =
        warehouseStock?.totalWeightKg || 0;

      existing.rejectedPacks =
        warehouseStock?.rejectedPacks || 0;

      existing.skuCount =
        warehouseStock?.skuCount || 0;

      existing.stock =
        warehouseStock?.stock ||
        warehouseStock?.items ||
        warehouseStock?.products ||
        [];

      if (!existing.warehouse && warehouse?._id) {
        existing.warehouse = warehouse;
      }

      warehouseMap.set(id, existing);
    });

    this.warehouseList =
      Array.from(warehouseMap.values());

    // ---------------------------------------------------------
    // WAREHOUSE MANAGER
    // ---------------------------------------------------------

    if (this.currentRole === 'WarehouseManager' && this.warehouseId) {

      this.warehouseList =
        this.warehouseList.filter((warehouse: any) => {

          const id =
            this.getId(warehouse);

          const nestedId =
            this.getId(warehouse?.warehouse);

          return (
            id === this.warehouseId ||
            nestedId === this.warehouseId
          );
        });
    }
  }

  // =========================================================
  // AUTO SELECT WAREHOUSE
  // =========================================================

  private autoSelectWarehouse(): void {

    if (!this.showWarehouseSection) {
      return;
    }

    // Warehouse Manager -> own warehouse
    if (
      this.currentRole === 'WarehouseManager' &&
      this.warehouseId
    ) {

      const warehouse =
        this.warehouseList.find((item: any) => {

          const id =
            this.getId(item);

          const nestedId =
            this.getId(item?.warehouse);

          return (
            id === this.warehouseId ||
            nestedId === this.warehouseId
          );
        });

      if (warehouse) {
        this.selectedWarehouse = warehouse;
        this.selectedWarehouseStock = warehouse;
        this.showWarehouseStock = true;
      }

      return;
    }

    // Admin / SubAdmin -> don't force selection
    this.selectedWarehouse = null;
    this.selectedWarehouseStock = null;
    this.showWarehouseStock = false;
  }

  // =========================================================
  // VIEW WAREHOUSE STOCK
  // =========================================================

  viewWarehouseStock(warehouse: any): void {

    if (!warehouse) {
      return;
    }

    this.selectedWarehouse = warehouse;

    this.selectedWarehouseStock =
      warehouse;

    this.showWarehouseStock = true;

    console.log(
      'Selected Warehouse:',
      this.selectedWarehouse
    );
  }

  // =========================================================
  // CLOSE WAREHOUSE STOCK
  // =========================================================

  closeWarehouseStock(): void {

    this.showWarehouseStock = false;

    this.selectedWarehouse = null;

    this.selectedWarehouseStock = null;
  }

  // =========================================================
  // GET WAREHOUSE STOCK COUNT
  // =========================================================

  getWarehouseStockCount(warehouse: any): number {

    if (!warehouse) {
      return 0;
    }

    return Number(
      warehouse?.totalPacks ||
      warehouse?.stockCount ||
      warehouse?.quantity ||
      0
    );
  }

  // =========================================================
  // GET WAREHOUSE WEIGHT
  // =========================================================

  getWarehouseWeight(warehouse: any): number {

    if (!warehouse) {
      return 0;
    }

    return Number(
      warehouse?.totalWeightKg ||
      warehouse?.weightKg ||
      0
    );
  }

  // =========================================================
  // GET WAREHOUSE REJECTED PACKS
  // =========================================================

  getWarehouseRejectedPacks(warehouse: any): number {

    if (!warehouse) {
      return 0;
    }

    return Number(
      warehouse?.rejectedPacks || 0
    );
  }

  // =========================================================
  // GET WAREHOUSE SKU COUNT
  // =========================================================

  getWarehouseSkuCount(warehouse: any): number {

    if (!warehouse) {
      return 0;
    }

    return Number(
      warehouse?.skuCount ||
      warehouse?.stock?.length ||
      0
    );
  }

  // =========================================================
  // GET STOCK ITEMS
  // =========================================================

  getWarehouseStockItems(warehouse: any): any[] {

    if (!warehouse) {
      return [];
    }

    return (
      warehouse?.stock ||
      warehouse?.items ||
      warehouse?.products ||
      []
    );
  }

  // =========================================================
  // GET ID
  // =========================================================

  private getId(value: any): string | null {

    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      return value;
    }

    if (value?._id) {
      return String(value._id);
    }

    if (value?.id) {
      return String(value.id);
    }

    if (value?.warehouseId) {
      return String(value.warehouseId);
    }

    return null;
  }

  // =========================================================
  // NUMBER FORMAT
  // =========================================================

  formatNumber(
    value: number | string | null | undefined,
    decimals: number = 0
  ): string {

    const numberValue =
      Number(value || 0);

    if (isNaN(numberValue)) {
      return '0';
    }

    return numberValue.toLocaleString(
      'en-IN',
      {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }
    );
  }

  // =========================================================
  // CURRENCY FORMAT
  // =========================================================

  formatCurrency(
    value: number | string | null | undefined
  ): string {

    const numberValue =
      Number(value || 0);

    if (isNaN(numberValue)) {
      return '₹0';
    }

    return numberValue.toLocaleString(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }
    );
  }

  // =========================================================
  // PAYMENT STATUS CLASS
  // =========================================================

  getPaymentStatusClass(status: string): string {

    switch ((status || '').toLowerCase()) {

      case 'paid':
        return 'status-success';

      case 'partial':
        return 'status-warning';

      case 'pending':
        return 'status-danger';

      default:
        return 'status-secondary';
    }
  }

  // =========================================================
  // ORDER STATUS CLASS
  // =========================================================

  getOrderStatusClass(status: string): string {

    switch ((status || '').toLowerCase()) {

      case 'approved':
        return 'status-info';

      case 'processing':
        return 'status-warning';

      case 'delivered':
        return 'status-success';

      case 'cancelled':
        return 'status-danger';

      case 'pending':
        return 'status-secondary';

      default:
        return 'status-secondary';
    }
  }

  // =========================================================
  // DELIVERY STATUS CLASS
  // =========================================================

  getDeliveryStatusClass(status: string): string {

    switch ((status || '').toLowerCase()) {

      case 'delivered':
        return 'status-success';

      case 'dispatched':
        return 'status-info';

      case 'assigned':
        return 'status-warning';

      case 'pending':
        return 'status-secondary';

      case 'failed':
      case 'cancelled':
        return 'status-danger';

      default:
        return 'status-secondary';
    }
  }

  // =========================================================
  // PRODUCTION STATUS CLASS
  // =========================================================

  getProductionStatusClass(status: string): string {

    switch ((status || '').toLowerCase()) {

      case 'completed':
        return 'status-success';

      case 'in progress':
        return 'status-info';

      case 'accepted':
        return 'status-warning';

      case 'pending':
        return 'status-secondary';

      case 'rejected':
      case 'cancelled':
        return 'status-danger';

      default:
        return 'status-secondary';
    }
  }

  // =========================================================
  // STOCK TRANSFER STATUS CLASS
  // =========================================================

  getTransferStatusClass(status: string): string {

    switch ((status || '').toLowerCase()) {

      case 'received':
        return 'status-success';

      case 'intransit':
      case 'in transit':
        return 'status-info';

      case 'approved':
        return 'status-warning';

      case 'pending':
        return 'status-secondary';

      case 'cancelled':
        return 'status-danger';

      default:
        return 'status-secondary';
    }
  }

  // =========================================================
  // GET EMPLOYEE DISPLAY NAME
  // =========================================================

  getEmployeeName(employee: any): string {

    if (!employee) {
      return '-';
    }

    if (employee.fullName) {
      return employee.fullName;
    }

    const firstName =
      employee.firstName || '';

    const lastName =
      employee.lastName || '';

    const name =
      `${firstName} ${lastName}`.trim();

    return name || '-';
  }

  // =========================================================
  // GET PARTY DISPLAY NAME
  // =========================================================

  getPartyName(party: any): string {

    if (!party) {
      return '-';
    }

    return (
      party.shopName ||
      party.partyName ||
      party.ownerName ||
      '-'
    );
  }

  // =========================================================
  // GET DELIVERY BOY NAME
  // =========================================================

  getDeliveryBoyName(delivery: any): string {

    if (!delivery) {
      return '-';
    }

    return this.getEmployeeName(
      delivery.deliveryBoy
    );
  }

  // =========================================================
  // GET COLLECTION EMPLOYEE NAME
  // =========================================================

  getCollectionEmployeeName(collection: any): string {

    if (!collection) {
      return '-';
    }

    return this.getEmployeeName(
      collection.employee
    );
  }

  // =========================================================
  // REFRESH DASHBOARD
  // =========================================================

  refreshDashboard(): void {
    this.loadDashboard();
  }

  // =========================================================
  // RESET DASHBOARD
  // =========================================================

  private resetDashboard(): void {

    this.dashboardData = null;

    this.summary = {
      employees: 0,
      salesManagers: 0,
      salesmen: 0,
      accountants: 0,
      deliveryBoys: 0,
      warehouseManagers: 0,
      distributors: 0,
      warehouses: 0,
      parties: 0,
      retailers: 0,
      wholesalers: 0,
      orders: 0,
      deliveries: 0,
      finishedGoodsPacks: 0,
      finishedGoodsWeightKg: 0,
      outstanding: 0,
      totalSales: 0,
      totalCollected: 0
    };

    this.today = {
      orders: 0,
      sales: 0,
      deliveries: 0,
      delivered: 0,
      collections: 0
    };

    this.warehouses = [];
    this.warehouseList = [];

    this.finishedGoods = {
      total: {
        totalPacks: 0,
        totalWeightKg: 0,
        rejectedPacks: 0,
        skuCount: 0
      },
      warehouses: []
    };

    this.recentOrders = [];
    this.recentDeliveries = [];
    this.recentCollections = [];

    this.selectedWarehouse = null;
    this.selectedWarehouseStock = null;
    this.showWarehouseStock = false;
  }


  employeesList() {
    this.router.navigate(["/admin/users-list"]);
  }

  warehouseManagement() {
    this.router.navigate(["/admin/warehouse"]);
  }

  distributorManagement() {
    this.router.navigate(["/admin/distributors-list"]);
  }

  shopsManagement() {
    this.router.navigate(["/admin/parties-list"]);
  }

  ordersManagement() {
    this.router.navigate(["/admin/orders"]);
  }

  deliveriesManagement() {
    this.router.navigate(["/admin/delivery-list"]);
  }

  collectionsManagement() {
    this.router.navigate(["/admin/collections"]);
  }

  outstandingsManagement() {
    this.router.navigate(["/admin/outstandings"]);
  }


  get totalPages(): number {
    return Math.ceil(this.recentOrders.length / this.pageSize);
  }

  get paginatedRecentOrders(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;

    return this.recentOrders.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }


  get deliveryTotalPages(): number {
    return Math.ceil(this.recentDeliveries.length / this.deliveryPageSize);
  }

  get paginatedRecentDeliveries(): any[] {
    const startIndex =
      (this.deliveryCurrentPage - 1) * this.deliveryPageSize;

    return this.recentDeliveries.slice(
      startIndex,
      startIndex + this.deliveryPageSize
    );
  }

  previousDeliveryPage(): void {
    if (this.deliveryCurrentPage > 1) {
      this.deliveryCurrentPage--;
    }
  }

  nextDeliveryPage(): void {
    if (this.deliveryCurrentPage < this.deliveryTotalPages) {
      this.deliveryCurrentPage++;
    }
  }

  get collectionTotalPages(): number {
    return Math.ceil(
      this.recentCollections.length / this.collectionPageSize
    );
  }

  get paginatedRecentCollections(): any[] {
    const startIndex =
      (this.collectionCurrentPage - 1) * this.collectionPageSize;

    return this.recentCollections.slice(
      startIndex,
      startIndex + this.collectionPageSize
    );
  }

  previousCollectionPage(): void {
    if (this.collectionCurrentPage > 1) {
      this.collectionCurrentPage--;
    }
  }

  nextCollectionPage(): void {
    if (this.collectionCurrentPage < this.collectionTotalPages) {
      this.collectionCurrentPage++;
    }
  }


  // ==========================================
  // VIEW EMPLOYEE ORDER
  // ==========================================

  viewOrder(order: any): void {

    if (!order?.orderId) {
      console.error('Order ID not found');
      return;
    }

    this.employeeService
      .getOrderById(order.orderId)
      .subscribe({

        next: (response: any) => {

          console.log('Order Details:', response);

          if (response?.success && response?.data) {

            this.dialog.open(ViewEmployeeOrderComponent, {

              width: '950px',

              maxWidth: '95vw',

              maxHeight: '90vh',

              data: response.data,

              panelClass: 'view-employee-order-dialog'

            });

          }

        },

        error: (error: any) => {

          console.error(
            'Get Order Details Error:',
            error
          );

        }

      });

  }

  // ==================================
  // View Collection
  // ==================================

  viewCollection(
    collection: any
  ): void {

    if (!collection?._id) {

      return;

    }


    this.collectionService
      .getCollectionById(collection._id)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Collection Details:',
            res
          );


          if (
            res?.success &&
            res?.data
          ) {

            this.dialog.open(
              CollectionViewComponent,
              {

                width: '950px',

                maxWidth: '95vw',

                maxHeight: '90vh',

                data: res.data,

                panelClass:
                  'view-collection-dialog'

              }

            );

          }

        },


        error: (err: any) => {

          console.log(
            'Get Collection By ID Error:',
            err
          );

        }

      });

  }
}