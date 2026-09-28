import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './CategoryConteroller/category/category.component';
import { LoginComponent } from './login/login.component';
import { CreateCategoryComponent } from './CategoryConteroller/create-category/create-category.component';
import { UpdateCategoryComponent } from './CategoryConteroller/update-category/update-category.component';
import { SubCategoryListComponent } from './SubCategory/sub-category-list/sub-category-list.component';
import { CreateSubcategoryComponent } from './SubCategory/create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './SubCategory/update-subcategory/update-subcategory.component';
import { ProductListComponent } from './ProductController/product-list/product-list.component';
import { ProductCreateComponent } from './ProductController/product-create/product-create.component';
import { ProductUpdateComponent } from './ProductController/product-update/product-update.component';
import { AddressComponent } from './address/address.component';
import { ListBannerComponent } from './Banners/list-banner/list-banner.component';
import { CreateBannerComponent } from './Banners/create-banner/create-banner.component';
import { UpdateBannerComponent } from './Banners/update-banner/update-banner.component';
import { OrdersComponent } from './orders/orders.component';
import { PoductionListComponent } from './Production/poduction-list/poduction-list.component';
import { ProductionCreateComponent } from './Production/production-create/production-create.component';
import { StockReciveListComponent } from './Stock-Receive/stock-recive-list/stock-recive-list.component';
import { StockReciveCreateComponent } from './Stock-Receive/stock-recive-create/stock-recive-create.component';
import { SupplierListComponent } from './Supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './Supplier/supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './Supplier/supplier-update/supplier-update.component';
import { WarehouseListComponent } from './Warehouse/warehouse-list/warehouse-list.component';
import { WarehouseCreateComponent } from './Warehouse/warehouse-create/warehouse-create.component';
import { WarehouseUpdateComponent } from './Warehouse/warehouse-update/warehouse-update.component';
import { UpdateProductionComponent } from './Production/update-production/update-production.component';
import { RawmaterialListComponent } from './Raw-material/rawmaterial-list/rawmaterial-list.component';
import { RawmaterialCreateComponent } from './Raw-material/rawmaterial-create/rawmaterial-create.component';
import { RawmaterialUpdateComponent } from './Raw-material/rawmaterial-update/rawmaterial-update.component';
import { WarehouseProductionComponent } from './warehouse-production/warehouse-production.component';
import { CurrentRawMaterialStockListComponent } from './Raw-Material-Stock/current-raw-material-stock-list/current-raw-material-stock-list.component';
import { AssignedProductionListComponent } from './warehouse-production/assigned-production-list/assigned-production-list.component';
import { AssignedProductionViewDetailsComponent } from './warehouse-production/assigned-production-view-details/assigned-production-view-details.component';
import { WarehouseProductionEntryComponent } from './warehouse-production/warehouse-production-entry/warehouse-production-entry.component';
import { WarehouFinishedGoodsStockComponent } from './warehouse-production/warehou-finished-goods-stock/warehou-finished-goods-stock.component';
import { AdminFinishedGoodsStockComponent } from './admin-finished-goods-stock/admin-finished-goods-stock.component';
import { AdminFinishedGoodsStockViewDetailsComponent } from './admin-finished-goods-stock-view-details/admin-finished-goods-stock-view-details.component';
import { WarehouseRawMaterialStockComponent } from './warehouse-raw-material-stock/warehouse-raw-material-stock.component';
import { WarehouseRawMaterialStockViewDetailsComponent } from './warehouse-raw-material-stock-view-details/warehouse-raw-material-stock-view-details.component';
import { AuthGuard } from './Services/auth.guard';
import { BrandListComponent } from './Brand/brand-list/brand-list.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ViewUserDetailsComponent } from './user/view-user-details/view-user-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { WarehouseFinishedGoodsStockViewDetailsComponentComponent } from './warehouse-finished-goods-stock-view-details-component/warehouse-finished-goods-stock-view-details-component.component';
import { AreasListComponent } from './area/areas-list/areas-list.component';
import { CreateAreasComponent } from './area/create-areas/create-areas.component';
import { UpdateAreasComponent } from './area/update-areas/update-areas.component';
import { ViewAreasDetailsComponent } from './area/view-areas-details/view-areas-details.component';
import { RoutesListComponent } from './routes/routes-list/routes-list.component';
import { CreateRoutesComponent } from './routes/create-routes/create-routes.component';
import { UpdateRoutesComponent } from './routes/update-routes/update-routes.component';
import { ViewRoutesDetailsComponent } from './routes/view-routes-details/view-routes-details.component';
import { EmployeeOrdersComponent } from './employees/employee-orders/employee-orders.component';
import { EmployeeViewDetailsComponent } from './employees/employee-view-details/employee-view-details.component';
import { EmployeeVisitsComponent } from './employees/employee-visits/employee-visits.component';
import { CreateProductionInstructionComponent } from './Production-instruction/create-production-instruction/create-production-instruction.component';
import { ProductionInstructionComponent } from './Production-instruction/production-instruction.component';
import { UpdateProductionInstructionsComponent } from './Production-instruction/update-production-instructions/update-production-instructions.component';
import { ProductionMonitoringListComponent } from './Production-monitoring/production-monitoring-list/production-monitoring-list.component';
import { ProductionMonitoringViewDetailsComponent } from './Production-monitoring/production-monitoring-view-details/production-monitoring-view-details.component';
import { EmployeeAttendenceComponent } from './employees/employee-attendence/employee-attendence.component';
import { DistributorListComponent } from './distributor/distributor-list/distributor-list.component';
import { CreateDistributorComponent } from './distributor/create-distributor/create-distributor.component';
import { UpdateDistributorComponent } from './distributor/update-distributor/update-distributor.component';
import { ViewDistributorDetailsComponent } from './distributor/view-distributor-details/view-distributor-details.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { DistributorAssingedEmployeesComponent } from './distributor/distributor-assinged-employees/distributor-assinged-employees.component';
import { BeatPlanUpdateComponent } from './beat-plan/beat-plan-update/beat-plan-update.component';
import { BeatPlanAddComponent } from './beat-plan/beat-plan-add/beat-plan-add.component';
import { BeatPlanListComponent } from './beat-plan/beat-plan-list/beat-plan-list.component';
import { PartiesListComponent } from './parties/parties-list/parties-list.component';
import { PartiesViewDetailsComponent } from './parties/parties-view-details/parties-view-details.component';
import { AdminGuidenceFileComponent } from './admin-guidence-file/admin-guidence-file.component';
import { DistributorDashboardComponent } from './distributor-dashboard/distributor-dashboard.component';
import { WarehouseDashboardComponent } from './warehouse-dashboard/warehouse-dashboard.component';
import { SubadminDashboardComponent } from './subadmin-dashboard/subadmin-dashboard.component';
import { WarehouseCreateLoginsComponent } from './warehouse-create-logins/warehouse-create-logins.component';
import { WarehouseLoginsListComponent } from './warehouse-logins-list/warehouse-logins-list.component';
import { BrandCreateComponent } from './Brand/brand-create/brand-create.component';
import { BrandUpdateComponent } from './Brand/brand-update/brand-update.component';
import { CreateStockTransferComponent } from './stock-transfer/create-stock-transfer/create-stock-transfer.component';
import { AllStockTransferComponent } from './stock-transfer/all-stock-transfer/all-stock-transfer.component';
import { TransferStockHistroyComponent } from './stock-transfer/transfer-stock-histroy/transfer-stock-histroy.component';
import { DistributorIncomingStockComponent } from './distributor/distributor-incoming-stock/distributor-incoming-stock.component';
import { DistributorMyStockComponent } from './distributor/distributor-my-stock/distributor-my-stock.component';
import { DistributorStockHistoryComponent } from './distributor/distributor-stock-history/distributor-stock-history.component';
import { DistributorEmployeesComponent } from './distributor/distributor-employees/distributor-employees.component';
import { DistributorOrdersComponent } from './distributor/distributor-orders/distributor-orders.component';
import { AllDistributoresStockComponent } from './admin/all-distributores-stock/all-distributores-stock.component';
import { DeliveryBoyBeatPlanListComponent } from './delivery-boy-beat-plan-list/delivery-boy-beat-plan-list.component';
import { DeliveryBoyBeatPlanComponent } from './delivery-boy-beat-plan/delivery-boy-beat-plan.component';
import { DeliveryBoyBeatPlanUpdateComponent } from './delivery-boy-beat-plan-update/delivery-boy-beat-plan-update.component';
import { DeliverisListComponent } from './deliveris-list/deliveris-list.component';
import { CreateDeliveriesComponent } from './create-deliveries/create-deliveries.component';
import { UpdateDeliveriesComponent } from './update-deliveries/update-deliveries.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { DistributorDeliveriesListComponent } from './distributor/distributor-deliveries-list/distributor-deliveries-list.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { OutstandingComponent } from './outstanding/outstanding.component';
import { OutstandingViewComponent } from './outstanding-view/outstanding-view.component';
import { DistributorCollectionsComponent } from './distributor/distributor-collections/distributor-collections.component';
import { DistributorOutstandingsComponent } from './distributor/distributor-outstandings/distributor-outstandings.component';


const routes: Routes = [

  // =========================================================
  // LOGIN
  // =========================================================

  {
    path: '',
    component: LoginComponent
  },


  // =========================================================
  // ADMIN DASHBOARD LAYOUT
  //
  // All 4 backend roles can enter the dashboard shell.
  //
  // Admin
  // SubAdmin
  // WarehouseManager
  // Distributor
  // =========================================================

  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],

    data: {
      roles: [
        'Admin',
        'SubAdmin',
        'WarehouseManager',
        'Distributor'
      ]
    },

    children: [

      // =======================================================
      // DASHBOARD
      // =======================================================

      {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'WarehouseManager',
            'Distributor'
          ]
        }
      },

      // ADMIN DASHBOARD
      {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['Admin']
        }
      },

      // SUB ADMIN DASHBOARD
      {
        path: 'subadmin-dashboard',
        component: SubadminDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['SubAdmin']
        }
      },

      // WAREHOUSE DASHBOARD
      {
        path: 'warehouse-dashboard',
        component: WarehouseDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['WarehouseManager']
        }
      },

      // DISTRIBUTOR DASHBOARD
      {
        path: 'distributor-dashboard',
        component: DistributorDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['Distributor']
        }

      },

      // =======================================================
      // ADMIN GUIDE
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'admin-guidence-file',
        component: AdminGuidenceFileComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // BRAND
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'brand-list',
        component: BrandListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin']
        }
      },
      {
        path: 'add-brand',
        component: BrandCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin']
        }
      },
      {
        path: 'update-brand/:id',
        component: BrandUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin']
        }
      },


      // =======================================================
      // CATEGORY
      // =======================================================

      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-category',
        component: CreateCategoryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-category/:id',
        component: UpdateCategoryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // SUB CATEGORY
      // =======================================================

      {
        path: 'list_subcategory',
        component: SubCategoryListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-subcategory',
        component: CreateSubcategoryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-subcategory/:id',
        component: UpdateSubcategoryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },
      // =======================================================
      // Stock Transfer Routes
      // =======================================================

      {
        path: 'create-stock-transfer',
        component: CreateStockTransferComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'delivery-boy-beat-plan-list',
        component: DeliveryBoyBeatPlanListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'delivery-boy-beat-plan-update/:id',
        component: DeliveryBoyBeatPlanUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'delivery-boy-beat-plan',
        component: DeliveryBoyBeatPlanComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'delivery-list',
        component: DeliverisListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'create-delivery',
        component: CreateDeliveriesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'update-delivery/:id',
        component: UpdateDeliveriesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'all-stock-transfer',
        component: AllStockTransferComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'transfer-stock-history',
        component: TransferStockHistroyComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'distributores-stock-list',
        component: AllDistributoresStockComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin']
        }
      },
      // =======================================================
      // PRODUCT
      // =======================================================

      {
        path: 'product',
        component: ProductListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-product',
        component: ProductCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-product/:id',
        component: ProductUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // ADDRESS
      // =======================================================

      {
        path: 'address',
        component: AddressComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // BANNERS
      // =======================================================

      {
        path: 'banners',
        component: ListBannerComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-banner',
        component: CreateBannerComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-banner/:id',
        component: UpdateBannerComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // ORDERS
      //
      // Admin + SubAdmin + Distributor
      // =======================================================

      {
        path: 'orders',
        component: OrdersListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'Distributor'
          ]
        }
      },

      // =======================================================
      // Admin Collections Details Routes
      // =======================================================
      {
        path: 'collections',
        component: CollectionsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin']
        }
      },
      {
        path: 'collection-view-details',
        component: CollectionViewComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin']
        }
      },
      {
        path: 'outstandings',
        component: OutstandingComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin']
        }
      },
      {
        path: 'outstanding-view-details',
        component: OutstandingViewComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin']
        }
      },


      // =======================================================
      // PRODUCTION - ADMIN
      //
      // Admin  
      // =======================================================

      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      // =======================================================
      // PRODUCTION - ADMIN
      //
      // Admin  
      // =======================================================

      {
        path: 'warehouse',
        component: WarehouseListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'employees-list',
        component: EmployeesListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      // =======================================================
      // PRODUCTION - ADMIN
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'production',
        component: PoductionListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-production',
        component: ProductionCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-production/:id',
        component: UpdateProductionComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // STOCK RECEIVE
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'stockReceive-list',
        component: StockReciveListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-stock-receive',
        component: StockReciveCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // SUPPLIER
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'supplier-list',
        component: SupplierListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'supplier-create',
        component: SupplierCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'supplier-update/:id',
        component: SupplierUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // RAW MATERIAL MASTER
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'rawmaterial-list',
        component: RawmaterialListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'rawmaterial-create',
        component: RawmaterialCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'rawmaterial-update/:id',
        component: RawmaterialUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // AREAS
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'areas-list',
        component: AreasListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-areas',
        component: CreateAreasComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-area/:id',
        component: UpdateAreasComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'view-area/:id',
        component: ViewAreasDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // ROUTES
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'routes-list',
        component: RoutesListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-route',
        component: CreateRoutesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-route/:id',
        component: UpdateRoutesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'view-routes/:id',
        component: ViewRoutesDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // BEAT PLANS
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'beat-plan-list',
        component: BeatPlanListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'beat-plan-add',
        component: BeatPlanAddComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'beat-plan-update/:id',
        component: BeatPlanUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // PARTIES / SHOPS
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'parties-list',
        component: PartiesListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'parties-view',
        component: PartiesViewDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // PRODUCTION INSTRUCTIONS
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'production-instructions',
        component: ProductionInstructionComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-production-instructions',
        component: CreateProductionInstructionComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-production-instructions/:id',
        component: UpdateProductionInstructionsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // PRODUCTION MONITORING
      //
      // Admin + SubAdmin + WarehouseManager
      // =======================================================

      {
        path: 'production-monitoring',
        component: ProductionMonitoringListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'WarehouseManager'
          ]
        }
      },

      {
        path: 'production-monitoring-view/:id',
        component: ProductionMonitoringViewDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'WarehouseManager'
          ]
        }
      },


      // =======================================================
      // CURRENT RAW MATERIAL STOCK
      //
      // Admin + WarehouseManager
      // =======================================================

      {
        path: 'current-raw-material-stock',
        component: CurrentRawMaterialStockListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },


      // =======================================================
      // ADMIN FINISHED GOODS STOCK
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'finished-goods-stock',
        component: AdminFinishedGoodsStockComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'finished-goods-stock-view-details/:warehouseId',
        component: AdminFinishedGoodsStockViewDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // WAREHOUSE PRODUCTION
      //
      // Admin + WarehouseManager
      // =======================================================

      {
        path: 'warehouse-production',
        component: WarehouseProductionComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },

      {
        path: 'warehouse-production-assigned',
        component: AssignedProductionListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },

      {
        path: 'warehouse-production-assigned-view-details/:id',
        component: AssignedProductionViewDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },

      {
        path: 'warehouse-production-entry/:id',
        component: WarehouseProductionEntryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },


      // =======================================================
      // WAREHOUSE RAW MATERIAL STOCK
      //
      // Admin + WarehouseManager
      // =======================================================

      {
        path: 'warehouse-raw-material-stock',
        component: WarehouseRawMaterialStockComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },

      {
        path: 'warehouse-raw-material-stock-view-details/:id',
        component: WarehouseRawMaterialStockViewDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },


      // =======================================================
      // WAREHOUSE FINISHED GOODS STOCK
      //
      // Admin + WarehouseManager
      // =======================================================

      {
        path: 'warehouse-finished-goods-stock',
        component: WarehouFinishedGoodsStockComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },

      {
        path: 'finished-goods-stock-view-details/:warehouseId',
        component: WarehouseFinishedGoodsStockViewDetailsComponentComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'WarehouseManager'
          ]
        }
      },


      // =======================================================
      // EMPLOYEES
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'users-list',
        component: UserListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'add-user',
        component: CreateUserComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },
      {
        path: 'add-warehouse-logins',
        component: WarehouseCreateLoginsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      {
        path: 'warehouse-logins-list',
        component: WarehouseLoginsListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'view-users/:id',
        component: ViewUserDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-user/:id',
        component: UpdateUserComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'employees-list/:id',
        component: EmployeesListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'employee-view-details/:id',
        component: EmployeeViewDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'Distributor'

          ]
        }
      },
      {
        path: 'employee-assignment',
        component: DistributorAssingedEmployeesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'employee-attendance/:id',
        component: EmployeeAttendenceComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'Distributor'
          ]
        }
      },

      {
        path: 'employee-orders/:employeeId',
        component: EmployeeOrdersComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'Distributor'
          ]
        }
      },

      {
        path: 'employee-visits/:employeeId',
        component: EmployeeVisitsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin',
            'Distributor'
          ]
        }
      },


      // =======================================================
      // DISTRIBUTOR MANAGEMENT
      //
      // Admin + SubAdmin
      // =======================================================

      {
        path: 'distributors-list',
        component: DistributorListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'create-distributors',
        component: CreateDistributorComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'update-distributors/:id',
        component: UpdateDistributorComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'view-distributor-details/:id',
        component: ViewDistributorDetailsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },

      {
        path: 'distributor-assinged-employees',
        component: DistributorAssingedEmployeesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin',
            'SubAdmin'
          ]
        }
      },


      // =======================================================
      // WAREHOUSE MASTER
      //
      // Admin ONLY
      // =======================================================

      {
        path: 'warehouse-list',
        component: WarehouseListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'create-warehouse',
        component: WarehouseCreateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'update-warehouse/:id',
        component: WarehouseUpdateComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },
      // Distributor Role Paths
      {
        path: 'distributor-incoming-stock',
        component: DistributorIncomingStockComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
      {
        path: 'distributor-my-stock',
        component: DistributorMyStockComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
      {
        path: 'distributor-stock-history',
        component: DistributorStockHistoryComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
      {
        path: 'distributor-my-employees',
        component: DistributorEmployeesComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
      {
        path: 'distributor-orders',
        component: DistributorOrdersComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
      {
        path: 'distributor-deliveries-list',
        component: DistributorDeliveriesListComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },

      {
        path: 'distributor-collections',
        component: DistributorCollectionsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
      {
        path: 'distributor-outstandings',
        component: DistributorOutstandingsComponent,
        canActivate: [AuthGuard],

        data: {
          roles: [
            'Distributor'
          ]
        }
      },
    ]
  },


  // =========================================================
  // UNAUTHORIZED
  // =========================================================

  {
    path: 'unauthorized',
    component: HomeComponent
  },


  // =========================================================
  // FALLBACK
  // =========================================================

  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
