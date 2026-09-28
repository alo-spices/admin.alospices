import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './CategoryConteroller/category/category.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CreateCategoryComponent } from './CategoryConteroller/create-category/create-category.component';
import { MatDialogModule } from '@angular/material/dialog';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './CategoryConteroller/update-category/update-category.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SubCategoryListComponent } from './SubCategory/sub-category-list/sub-category-list.component';
import { CreateSubcategoryComponent } from './SubCategory/create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './SubCategory/update-subcategory/update-subcategory.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductListComponent } from './ProductController/product-list/product-list.component';
import { ProductCreateComponent } from './ProductController/product-create/product-create.component';
import { ProductUpdateComponent } from './ProductController/product-update/product-update.component';
import { AddressComponent } from './address/address.component';
import { ListBannerComponent } from './Banners/list-banner/list-banner.component';
import { CreateBannerComponent } from './Banners/create-banner/create-banner.component';
import { UpdateBannerComponent } from './Banners/update-banner/update-banner.component';
import { ViewCategoryComponent } from './View-dialog-Controllers/view-category/view-category.component';
import { ViewSubCategoryComponent } from './View-dialog-Controllers/view-sub-category/view-sub-category.component';
import { ViewSubSubCategoryComponent } from './View-dialog-Controllers/view-sub-sub-category/view-sub-sub-category.component';
import { ViewProductComponent } from './View-dialog-Controllers/view-product/view-product.component';
import { OrdersComponent } from './orders/orders.component';
import { BrandListComponent } from './Brand/brand-list/brand-list.component';
import { BrandCreateComponent } from './Brand/brand-create/brand-create.component';
import { BrandUpdateComponent } from './Brand/brand-update/brand-update.component';
import { PoductionListComponent } from './Production/poduction-list/poduction-list.component';
import { ProductionCreateComponent } from './Production/production-create/production-create.component';
import { CommomPopupComponent } from './commom-popup/commom-popup.component';
import { CommonModule } from '@angular/common';
import { StockReciveListComponent } from './Stock-Receive/stock-recive-list/stock-recive-list.component';
import { StockReciveCreateComponent } from './Stock-Receive/stock-recive-create/stock-recive-create.component';
import { SupplierListComponent } from './Supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './Supplier/supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './Supplier/supplier-update/supplier-update.component';
import { WarehouseListComponent } from './Warehouse/warehouse-list/warehouse-list.component';
import { WarehouseCreateComponent } from './Warehouse/warehouse-create/warehouse-create.component';
import { WarehouseUpdateComponent } from './Warehouse/warehouse-update/warehouse-update.component';
import { StockReceiveViewDialogComponent } from './view-pages/stock-receive-view-dialog/stock-receive-view-dialog.component';
import { UpdateProductionComponent } from './Production/update-production/update-production.component';
import { ViewWarehouseComponent } from './View-dialog-Controllers/view-warehouse/view-warehouse.component';
import { ViewSupplierComponent } from './View-dialog-Controllers/view-supplier/view-supplier.component';
import { ViewProductionsComponent } from './View-dialog-Controllers/view-productions/view-productions.component';
import { RawmaterialListComponent } from './Raw-material/rawmaterial-list/rawmaterial-list.component';
import { RawmaterialCreateComponent } from './Raw-material/rawmaterial-create/rawmaterial-create.component';
import { RawmaterialUpdateComponent } from './Raw-material/rawmaterial-update/rawmaterial-update.component';
import { RawMeterialComponent } from './View-dialog-Controllers/raw-meterial/raw-meterial.component';
import { WarehouseStockViewComponent } from './View-dialog-Controllers/warehouse-stock-view/warehouse-stock-view.component';
import { WarehouseProductionComponent } from './warehouse-production/warehouse-production.component';
import { CurrentRawMaterialStockListComponent } from './Raw-Material-Stock/current-raw-material-stock-list/current-raw-material-stock-list.component';
import { CreateProductionInstructionComponent } from './Production-instruction/create-production-instruction/create-production-instruction.component';
import { ProductionInstructionComponent } from './Production-instruction/production-instruction.component';
import { UpdateProductionInstructionsComponent } from './Production-instruction/update-production-instructions/update-production-instructions.component';
import { ProductionMonitoringListComponent } from './Production-monitoring/production-monitoring-list/production-monitoring-list.component';
import { ProductionMonitoringViewDetailsComponent } from './Production-monitoring/production-monitoring-view-details/production-monitoring-view-details.component'; import { AssignedProductionListComponent } from './warehouse-production/assigned-production-list/assigned-production-list.component';
import { CreateAssignedProductionComponent } from './warehouse-production/create-assigned-production/create-assigned-production.component';
import { UpdateAssignedProductionComponent } from './warehouse-production/update-assigned-production/update-assigned-production.component';
import { AcceptProductionInstructionPopupComponent } from './accept-production-instruction-popup/accept-production-instruction-popup.component';
import { AssignedProductionViewDetailsComponent } from './warehouse-production/assigned-production-view-details/assigned-production-view-details.component';
import { WarehouseProductionEntryComponent } from './warehouse-production/warehouse-production-entry/warehouse-production-entry.component';
import { WarehouFinishedGoodsStockComponent } from './warehouse-production/warehou-finished-goods-stock/warehou-finished-goods-stock.component';
import { AdminFinishedGoodsStockComponent } from './admin-finished-goods-stock/admin-finished-goods-stock.component';
import { AdminFinishedGoodsStockViewDetailsComponent } from './admin-finished-goods-stock-view-details/admin-finished-goods-stock-view-details.component';
import { WarehouseRawMaterialStockComponent } from './warehouse-raw-material-stock/warehouse-raw-material-stock.component';
import { WarehouseRawMaterialStockViewDetailsComponent } from './warehouse-raw-material-stock-view-details/warehouse-raw-material-stock-view-details.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ViewUserDetailsComponent } from './user/view-user-details/view-user-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ChangeUserStatusComponent } from './user/change-user-status/change-user-status.component';
import { WarehouseFinishedGoodsStockViewDetailsComponentComponent } from './warehouse-finished-goods-stock-view-details-component/warehouse-finished-goods-stock-view-details-component.component';
import { AreasListComponent } from './area/areas-list/areas-list.component';
import { CreateAreasComponent } from './area/create-areas/create-areas.component';
import { UpdateAreasComponent } from './area/update-areas/update-areas.component';
import { ViewAreasDetailsComponent } from './area/view-areas-details/view-areas-details.component';
import { RoutesListComponent } from './routes/routes-list/routes-list.component';
import { CreateRoutesComponent } from './routes/create-routes/create-routes.component';
import { UpdateRoutesComponent } from './routes/update-routes/update-routes.component';
import { ViewRoutesDetailsComponent } from './routes/view-routes-details/view-routes-details.component';
import { PartiesListComponent } from './parties/parties-list/parties-list.component';
import { PartiesViewDetailsComponent } from './parties/parties-view-details/parties-view-details.component';
import { EmployeeOrdersComponent } from './employees/employee-orders/employee-orders.component';
import { EmployeeVisitsComponent } from './employees/employee-visits/employee-visits.component';
import { EmployeeViewDetailsComponent } from './employees/employee-view-details/employee-view-details.component';
import { EmployeeAttendenceComponent } from './employees/employee-attendence/employee-attendence.component';
import { DistributorListComponent } from './distributor/distributor-list/distributor-list.component';
import { CreateDistributorComponent } from './distributor/create-distributor/create-distributor.component';
import { UpdateDistributorComponent } from './distributor/update-distributor/update-distributor.component';
import { ViewDistributorDetailsComponent } from './distributor/view-distributor-details/view-distributor-details.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { DistributorAssingedEmployeesComponent } from './distributor/distributor-assinged-employees/distributor-assinged-employees.component';
import { BeatPlanListComponent } from './beat-plan/beat-plan-list/beat-plan-list.component';
import { BeatPlanAddComponent } from './beat-plan/beat-plan-add/beat-plan-add.component';
import { BeatPlanUpdateComponent } from './beat-plan/beat-plan-update/beat-plan-update.component';
import { AdminGuidenceFileComponent } from './admin-guidence-file/admin-guidence-file.component';
import { SubadminDashboardComponent } from './subadmin-dashboard/subadmin-dashboard.component';
import { WarehouseDashboardComponent } from './warehouse-dashboard/warehouse-dashboard.component';
import { DistributorDashboardComponent } from './distributor-dashboard/distributor-dashboard.component';
import { WarehouseCreateLoginsComponent } from './warehouse-create-logins/warehouse-create-logins.component';
import { WarehouseLoginsListComponent } from './warehouse-logins-list/warehouse-logins-list.component';
import { ApprovalPopupComponent } from './approval-popup/approval-popup.component';
import { ViewBrandComponent } from './Brand/view-brand/view-brand.component';
import { CreateStockTransferComponent } from './stock-transfer/create-stock-transfer/create-stock-transfer.component';
import { AllStockTransferComponent } from './stock-transfer/all-stock-transfer/all-stock-transfer.component';
import { TransferStockHistroyComponent } from './stock-transfer/transfer-stock-histroy/transfer-stock-histroy.component';
import { DistributorIncomingStockComponent } from './distributor/distributor-incoming-stock/distributor-incoming-stock.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StockTransferStatusPopupComponent } from './stock-transfer-status-popup/stock-transfer-status-popup.component';
import { IncomingStockTransferViewComponent } from './distributor/incoming-stock-transfer-view/incoming-stock-transfer-view.component';
import { DistributorMyStockComponent } from './distributor/distributor-my-stock/distributor-my-stock.component';
import { DistributorStockHistoryComponent } from './distributor/distributor-stock-history/distributor-stock-history.component';
import { DistributorEmployeesComponent } from './distributor/distributor-employees/distributor-employees.component';
import { DistributorEmployeesDetailsViewComponent } from './distributor/distributor-employees-details-view/distributor-employees-details-view.component';
import { DistributorOrdersComponent } from './distributor/distributor-orders/distributor-orders.component';
import { DistributorViewOrdersComponent } from './distributor/distributor-view-orders/distributor-view-orders.component';
import { DistributorStockDeliveriesComponent } from './distributor/distributor-stock-deliveries/distributor-stock-deliveries.component';
import { AllDistributoresStockComponent } from './admin/all-distributores-stock/all-distributores-stock.component';
import { ViewDistributoresStockComponent } from './admin/view-distributores-stock/view-distributores-stock.component';
import { DistributoresStockTransferComponent } from './admin/distributores-stock-transfer/distributores-stock-transfer.component';
import { DeliveryBoyBeatPlanComponent } from './delivery-boy-beat-plan/delivery-boy-beat-plan.component';
import { DeliveryBoyBeatPlanListComponent } from './delivery-boy-beat-plan-list/delivery-boy-beat-plan-list.component';
import { DeliveryBoyBeatPlanUpdateComponent } from './delivery-boy-beat-plan-update/delivery-boy-beat-plan-update.component';
import { DeliveryBoyBeatPlanViewDetailsComponent } from './delivery-boy-beat-plan-view-details/delivery-boy-beat-plan-view-details.component';
import { DeliverisListComponent } from './deliveris-list/deliveris-list.component';
import { CreateDeliveriesComponent } from './create-deliveries/create-deliveries.component';
import { UpdateDeliveriesComponent } from './update-deliveries/update-deliveries.component';
import { ViewDeliveryDetailsComponent } from './view-delivery-details/view-delivery-details.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderViewListComponent } from './order-view-list/order-view-list.component';
import { ViewDeliveriesComponent } from './view-deliveries/view-deliveries.component';
import { DistributorDeliveriesListComponent } from './distributor/distributor-deliveries-list/distributor-deliveries-list.component';
import { DistributorDeliveriesViewDetailsComponent } from './distributor/distributor-deliveries-view-details/distributor-deliveries-view-details.component';
import { DistributorCollectionsComponent } from './distributor/distributor-collections/distributor-collections.component';
import { DistributorOutstandingsComponent } from './distributor/distributor-outstandings/distributor-outstandings.component';
import { DistributorOutstandingViewComponent } from './distributor/distributor-outstanding-view/distributor-outstanding-view.component';
import { DistributorCollectionViewComponent } from './distributor/distributor-collection-view/distributor-collection-view.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionViewComponent } from './collection-view/collection-view.component';
import { OutstandingComponent } from './outstanding/outstanding.component';
import { OutstandingViewComponent } from './outstanding-view/outstanding-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    CategoryComponent,
    LoginComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteConfirmationComponent,
    SubCategoryListComponent,
    CreateSubcategoryComponent,
    UpdateSubcategoryComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    AddressComponent,
    ListBannerComponent,
    CreateBannerComponent,
    UpdateBannerComponent,
    ViewCategoryComponent,
    UserListComponent,
    ViewSubCategoryComponent,
    ViewSubSubCategoryComponent,
    ViewProductComponent,
    OrdersComponent,
    BrandListComponent,
    BrandCreateComponent,
    BrandUpdateComponent,
    PoductionListComponent,
    ProductionCreateComponent,
    CommomPopupComponent,
    StockReciveListComponent,
    StockReciveCreateComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    SupplierUpdateComponent,
    WarehouseListComponent,
    WarehouseCreateComponent,
    WarehouseUpdateComponent,
    StockReceiveViewDialogComponent,
    UpdateProductionComponent,
    ViewWarehouseComponent,
    ViewSupplierComponent,
    ViewProductionsComponent,
    RawmaterialListComponent,
    RawmaterialCreateComponent,
    RawmaterialUpdateComponent,
    RawMeterialComponent,
    WarehouseStockViewComponent,
    WarehouseProductionComponent,
    EmployeeOrdersComponent,
    EmployeeVisitsComponent,
    EmployeeViewDetailsComponent,
    CurrentRawMaterialStockListComponent,
    ProductionInstructionComponent,
    CreateProductionInstructionComponent,
    UpdateProductionInstructionsComponent,
    ProductionMonitoringListComponent,
    ProductionMonitoringViewDetailsComponent,
    AssignedProductionListComponent,
    CreateAssignedProductionComponent,
    UpdateAssignedProductionComponent,
    AcceptProductionInstructionPopupComponent,
    AssignedProductionViewDetailsComponent,
    WarehouseProductionEntryComponent,
    WarehouFinishedGoodsStockComponent,
    AdminFinishedGoodsStockComponent,
    AdminFinishedGoodsStockViewDetailsComponent,
    WarehouseRawMaterialStockComponent,
    WarehouseRawMaterialStockViewDetailsComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ViewUserDetailsComponent,
    ChangeUserStatusComponent,
    WarehouseFinishedGoodsStockViewDetailsComponentComponent,
    AreasListComponent,
    CreateAreasComponent,
    UpdateAreasComponent,
    ViewAreasDetailsComponent,
    RoutesListComponent,
    CreateRoutesComponent,
    UpdateRoutesComponent,
    ViewRoutesDetailsComponent,
    PartiesListComponent,
    PartiesViewDetailsComponent,
    EmployeeAttendenceComponent,
    DistributorListComponent,
    CreateDistributorComponent,
    UpdateDistributorComponent,
    ViewDistributorDetailsComponent,
    EmployeesListComponent,
    DistributorAssingedEmployeesComponent,
    BeatPlanListComponent,
    BeatPlanAddComponent,
    BeatPlanUpdateComponent,
    AdminGuidenceFileComponent,
    SubadminDashboardComponent,
    WarehouseDashboardComponent,
    DistributorDashboardComponent,
    WarehouseCreateLoginsComponent,
    WarehouseLoginsListComponent,
    ApprovalPopupComponent,
    ViewBrandComponent,
    CreateStockTransferComponent,
    AllStockTransferComponent,
    TransferStockHistroyComponent,
    DistributorIncomingStockComponent,
    StockTransferStatusPopupComponent,
    IncomingStockTransferViewComponent,
    DistributorMyStockComponent,
    DistributorStockHistoryComponent,
    DistributorEmployeesComponent,
    DistributorEmployeesDetailsViewComponent,
    DistributorOrdersComponent,
    DistributorViewOrdersComponent,
    DistributorStockDeliveriesComponent,
    AllDistributoresStockComponent,
    ViewDistributoresStockComponent,
    DistributoresStockTransferComponent,
    DeliveryBoyBeatPlanComponent,
    DeliveryBoyBeatPlanListComponent,
    DeliveryBoyBeatPlanUpdateComponent,
    DeliveryBoyBeatPlanViewDetailsComponent,
    DeliverisListComponent,
    CreateDeliveriesComponent,
    UpdateDeliveriesComponent,
    ViewDeliveryDetailsComponent,
    OrdersListComponent,
    OrderViewListComponent,
    ViewDeliveriesComponent,
    DistributorDeliveriesListComponent,
    DistributorDeliveriesViewDetailsComponent,
    DistributorCollectionsComponent,
    DistributorOutstandingsComponent,
    DistributorOutstandingViewComponent,
    DistributorCollectionViewComponent,
    CollectionsComponent,
    CollectionViewComponent,
    OutstandingComponent,
    OutstandingViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule, MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
