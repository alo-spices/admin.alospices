import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { RoutesService } from 'src/app/Services/routes.service';

@Component({
  selector: 'app-view-routes-details',
  templateUrl: './view-routes-details.component.html',
  styleUrls: ['./view-routes-details.component.css']
})
export class ViewRoutesDetailsComponent implements OnInit {


  // ==========================================
  // Route Data
  // ==========================================

  routeData: any = null;


  // ==========================================
  // Route ID
  // ==========================================

  routeId: string = '';


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private routeService:
      RoutesService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.routeId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    console.log(
      'Route ID:',
      this.routeId
    );


    // ========================================
    // Validate ID
    // ========================================

    if (!this.routeId) {

      this.alertService.error(
        'Route ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Get Route
    // ========================================

    this.getRouteById();

  }


  // ==========================================
  // Get Route By ID
  // ==========================================

  getRouteById(): void {

    this.isLoading = true;


    this.routeService
      .getRouteById(
        this.routeId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Route Details Response:',
            response
          );


          this.routeData =
            response?.data || null;


          this.isLoading = false;


          if (!this.routeData) {

            this.alertService.error(
              'Route details not found'
            );

          }

        },


        error: (error: any) => {

          console.log(
            'Get Route Details Error:',
            error
          );


          this.routeData = null;

          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load route details'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/routes-list'

    ]);

  }

}
