import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionService } from 'src/app/Services/production.service';

@Component({
  selector: 'app-production-monitoring-view-details',
  templateUrl: './production-monitoring-view-details.component.html',
  styleUrls: ['./production-monitoring-view-details.component.css']
})
export class ProductionMonitoringViewDetailsComponent implements OnInit {


  // =====================================================
  // PRODUCTION DATA
  // =====================================================

  production: any = null;


  // =====================================================
  // LOADING
  // =====================================================

  loading: boolean = false;


  // =====================================================
  // PRODUCTION ID
  // =====================================================

  productionId: string = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private productionService: ProductionService

  ) { }


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.productionId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.productionId) {

      console.log(
        'Production ID not found.'
      );

      return;

    }

    this.getProductionById(
      this.productionId
    );

  }


  // =====================================================
  // GET PRODUCTION BY ID
  // =====================================================

  getProductionById(id: string): void {

    this.loading = true;

    this.productionService
      .getProductionById(id)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Production Details Response:',
            response
          );


          if (response?.success) {

            this.production =
              response.data || null;

          }

          else {

            this.production = null;

            console.log(
              response?.message ||
              'Production details not found.'
            );

          }

          this.loading = false;

        },


        error: (error: any) => {

          console.log(
            'Production Details Error:',
            error
          );

          console.log(
            'Backend Error:',
            error?.error
          );

          this.production = null;

          this.loading = false;

        }

      });

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate([
      '/admin/production-monitoring'
    ]);

  }

}
