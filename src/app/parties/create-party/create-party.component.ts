import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { PartiesService } from 'src/app/Services/parties.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {

  partyForm!: FormGroup;

  areas: any[] = [];
  routes: any[] = [];
 salesmen: any[] = [];

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  loading = false;
  areaLoading = false;
  routeLoading = false;
  salesmanLoading = false;

  partyTypes = [
    'Distributor',
    'Wholesaler',
    'Retailer'
  ];

  constructor(
    private fb: FormBuilder,
    private partyService: PartiesService,
    private beatPlanService: BeatPlanService,
    private alertService: CommomPopupService,
    private router: Router,
      private userService: UserService,

  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAreas();
    this.getSalesmen();
  }

  // =========================
  // FORM
  // =========================

  initializeForm(): void {
    this.partyForm = this.fb.group({

      // BASIC DETAILS
      partyType: ['', Validators.required],
      partyCode: ['', Validators.required],
      partyName: ['', Validators.required],
      shopName: ['', Validators.required],
      ownerName: [''],

      // CONTACT
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      alternateMobile: [''],
      whatsappNumber: [''],
      email: ['', Validators.email],

      // BUSINESS DETAILS
      gstNumber: [''],
      panNumber: [''],
      licenseNumber: [''],

      // AREA & ROUTE
      area: ['', Validators.required],
      route: ['', Validators.required],
      // IMPORTANT
  assignedSalesman: ['', Validators.required],

      // ADDRESS
      address: [''],
      city: [''],
      district: [''],
      state: ['Andhra Pradesh'],
      pincode: [''],

      // LOCATION
      latitude: [null],
      longitude: [null],

      // CREDIT SETTINGS
      creditLimit: [0],
      creditDays: [0],
      openingBalance: [0],

      // STATUS
      status: ['Active', Validators.required]
    });
  }

  // =========================
  // AREAS
  // =========================

  getAreas(): void {

    this.areaLoading = true;

    this.beatPlanService.getAreas().subscribe({
      next: (response: any) => {

        this.areaLoading = false;

        if (response?.success) {

          this.areas = (response.data || [])
            .filter((area: any) =>
              area.status === 'Active'
            );

        } else {

          this.areas = [];

          this.alertService.error(
            response?.message ||
            'Failed to load areas'
          );
        }
      },

      error: (error: any) => {

        this.areaLoading = false;
        this.areas = [];

        console.error(
          'Get Areas Error:',
          error
        );

        this.alertService.error(
          error?.error?.message ||
          'Failed to load areas'
        );
      }
    });
  }

  // =========================
  // AREA CHANGE
  // =========================

  onAreaChange(event: Event): void {

    const areaId =
      (event.target as HTMLSelectElement).value;

    this.partyForm.patchValue({
      route: ''
    });

    this.routes = [];

    if (areaId) {
      this.getRoutesByArea(areaId);
    }
  }

  // =========================
  // ROUTES
  // =========================

  getRoutesByArea(areaId: string): void {

    this.routeLoading = true;

    this.beatPlanService
      .getRoutesByArea(areaId)
      .subscribe({

        next: (response: any) => {

          this.routeLoading = false;

          if (response?.success) {

            this.routes = (response.data || [])
              .filter((route: any) =>
                route.status === 'Active'
              );

          } else {

            this.routes = [];

            this.alertService.error(
              response?.message ||
              'Failed to load routes'
            );
          }
        },

        error: (error: any) => {

          this.routeLoading = false;
          this.routes = [];

          console.error(
            'Get Routes Error:',
            error
          );

          this.alertService.error(
            error?.error?.message ||
            'Failed to load routes'
          );
        }
      });
  }

  // =========================
  // SALESMEN
  // =========================

getSalesmen(): void {

  this.salesmanLoading = true;

  this.userService.getAllUsers().subscribe({

    next: (response: any) => {

      this.salesmanLoading = false;

      console.log('Get All Users Response:', response);

      const users: any[] = Array.isArray(response)
        ? response
        : response?.data || [];

      // Only Salesman role users
      this.salesmen = users.filter(
        (user: any) =>
          user?.role?.toString().toLowerCase() === 'salesman'
      );

      console.log(
        'Salesman Dropdown Data:',
        this.salesmen
      );
    },

    error: (error: any) => {

      this.salesmanLoading = false;
      this.salesmen = [];

      console.error(
        'Get Users Error:',
        error
      );

      this.alertService.error(
        error?.error?.message ||
        'Failed to load users'
      );
    }

  });
}

  // =========================
  // IMAGE
  // =========================

  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length > 0
    ) {

      this.selectedImage = input.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview =
          reader.result as string;
      };

      reader.readAsDataURL(
        this.selectedImage
      );
    }
  }

  removeImage(): void {

    this.selectedImage = null;
    this.imagePreview = null;
  }

  // =========================
  // CREATE PARTY
  // =========================

createParty(): void {

  if (this.partyForm.invalid) {

    this.partyForm.markAllAsTouched();

    this.alertService.validation(
      'Please fill all required fields'
    );

    return;
  }

  const assignedSalesman =
    this.partyForm.get('assignedSalesman')?.value;

  if (!assignedSalesman) {

    this.alertService.validation(
      'Please select Assigned Salesman'
    );

    return;
  }

  this.loading = true;

  const formData = new FormData();

  Object.keys(this.partyForm.value).forEach(
    (key: string) => {

      const value =
        this.partyForm.value[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {

        formData.append(
          key,
          value.toString()
        );
      }
    }
  );

  // IMPORTANT
  // assignedSalesman must be present
  formData.set(
    'assignedSalesman',
    assignedSalesman.toString()
  );

  // Shop image
  if (this.selectedImage) {

    formData.append(
      'shopImage',
      this.selectedImage
    );
  }

  console.log(
    'Assigned Salesman:',
    assignedSalesman
  );

  this.partyService
    .createParty(formData)
    .subscribe({

      next: (response: any) => {

        this.loading = false;

        console.log(
          'Create Party Response:',
          response
        );

        if (response?.success) {

          this.alertService
            .success(
              response.message ||
              'Party created successfully'
            )
            .then(() => {

              this.router.navigate([
                '/admin/parties-list'
              ]);

            });

        } else {

          this.alertService.error(
            response?.message ||
            'Failed to create party'
          );
        }
      },

      error: (error: any) => {

        this.loading = false;

        console.error(
          'Create Party Error:',
          error
        );

        this.alertService.error(
          error?.error?.message ||
          'Failed to create party'
        );
      }

    });
}

  // =========================
  // CANCEL
  // =========================

  cancel(): void {

    this.router.navigate([
      '/admin/parties-list'
    ]);
  }

}