import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from 'src/app/Services/areas.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-view-areas-details',
  templateUrl: './view-areas-details.component.html',
  styleUrls: ['./view-areas-details.component.css']
})
export class ViewAreasDetailsComponent implements OnInit {


  // ==========================================
  // Area
  // ==========================================

  area: any = null;


  // ==========================================
  // Area ID
  // ==========================================

  areaId: string = '';


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private areaService:
      AreasService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    // ========================================
    // Get ID
    // ========================================

    this.areaId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    console.log(
      'Area ID:',
      this.areaId
    );


    // ========================================
    // Validate
    // ========================================

    if (!this.areaId) {

      this.alertService.error(
        'Area ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Get Area
    // ========================================

    this.getAreaById();

  }


  // ==========================================
  // Get Area By ID
  // ==========================================

  getAreaById(): void {

    this.isLoading = true;


    this.areaService
      .getAreaById(
        this.areaId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Area Details Response:',
            response
          );


          this.area =
            response?.data || null;


          this.isLoading = false;


          // ====================================
          // No Data
          // ====================================

          if (!this.area) {

            this.alertService.error(
              'Area details not found'
            );

          }

        },


        error: (error: any) => {

          console.log(
            'Get Area Details Error:',
            error
          );


          this.area = null;

          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load area details'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/areas-list'

    ]);

  }

}
