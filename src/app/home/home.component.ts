import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { StockReceiveService } from '../Services/stock-receive.service';
import { WarehouseService } from '../Services/warehouse.service';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseStockViewComponent } from '../View-dialog-Controllers/warehouse-stock-view/warehouse-stock-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
   // ==========================================
  // WAREHOUSE LIST
  // ==========================================

  warehouseList: any[] = [];


  // ==========================================
  // WAREHOUSE STOCK
  // ==========================================

  warehouseStock: any = null;

  selectedWarehouse: any = null;

  loadingWarehouseStock: boolean = false;


  
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('donutChart') donutChartRef!: ElementRef;

  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private warehouseService: WarehouseService,

    private stockReceiveService: StockReceiveService,

    private router: Router,
      private dialog: MatDialog


  ) {}


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.getWarehouses();

  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadCharts();
    }, 100);
  }

   // ==========================================
  // LOAD WAREHOUSES
  // ==========================================

  getWarehouses(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Warehouse Response:',
            res
          );

          if (res.success) {

            this.warehouseList =
              res.data || [];

          } else {

            this.warehouseList = [];

          }

        },

        error: (err) => {

          console.log(
            'Warehouse Error:',
            err
          );

          this.warehouseList = [];

        }

      });

  }


  // ==========================================
  // VIEW WAREHOUSE STOCK
  // ==========================================

viewWarehouseStock(warehouse: any): void {

  this.dialog.open(

    WarehouseStockViewComponent,

    {

      width: '1100px',

      maxWidth: '95vw',

      maxHeight: '90vh',

      data: warehouse,

      panelClass: 'warehouse-stock-dialog'

    }

  );

}


  // ==========================================
  // CLOSE WAREHOUSE STOCK
  // ==========================================

  closeWarehouseStock(): void {

    this.warehouseStock = null;

    this.selectedWarehouse = null;

  }

  loadCharts() {

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    // 🔥 BAR CHART (Gradient)
    const ctxBar = this.barChartRef.nativeElement.getContext('2d');
    const gradientBar = ctxBar.createLinearGradient(0, 0, 0, 300);
    gradientBar.addColorStop(0, '#A63D22');
    gradientBar.addColorStop(1, '#D8C2B1');

    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['05', '06', '07', '08', '09', '10'],
        datasets: [{
          data: [30, 35, 32, 28, 20, 15],
          backgroundColor: gradientBar,
          borderRadius: 6
        }]
      },
      options: {
        ...commonOptions,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#5a1a1a' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#e27b7b' } }
        }
      }
    });

    // 🔥 LINE CHART
    const ctxLine = this.lineChartRef.nativeElement.getContext('2d');
    const gradientLine = ctxLine.createLinearGradient(0, 0, 0, 300);
    gradientLine.addColorStop(0, 'rgba(255,200,0,0.5)');
    gradientLine.addColorStop(1, 'rgba(255,50,0,0)');

    new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['05', '06', '07', '08', '09', '10'],
        datasets: [
          {
            label: 'Running',
            data: [20, 25, 23, 18, 10, 5],
            borderColor: '#A63D22',
            backgroundColor: gradientLine,
            fill: true,
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#fff'
          },
          {
            label: 'Waiting',
            data: [10, 12, 11, 9, 6, 3],
            borderColor: '#A63D22',
            borderWidth: 2,
            tension: 0.4
          }
        ]
      },
      options: {
        ...commonOptions,
        plugins: {
          legend: { labels: { color: '#fff' } }
        },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#5a1a1a' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#5a1a1a' } }
        }
      }
    });

    // 🔥 DONUT CHART
    new Chart(this.donutChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Desktop', 'Mobile'],
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#A63D22', '#D8C2B1'],
          borderWidth: 0
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  }
}
