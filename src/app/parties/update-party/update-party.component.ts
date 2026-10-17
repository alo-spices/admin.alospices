import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeatPlanService } from 'src/app/Services/beat-plan.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { PartiesService } from 'src/app/Services/parties.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-party',
  templateUrl: './update-party.component.html',
  styleUrls: ['./update-party.component.css']
})
export class UpdatePartyComponent implements OnInit {

  partyForm!: FormGroup;

  partyId!: string;

  areas: any[] = [];
  routes: any[] = [];
  salesmen: any[] = [];

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  loading = false;
  salesmanLoading = false;

  constructor(
    private fb: FormBuilder,
    private partyService: PartiesService,
    private beatPlanService: BeatPlanService,
    private userService: UserService,
    private alertService: CommomPopupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.partyId = this.route.snapshot.paramMap.get('id') || '';

    this.initializeForm();

    this.getAreas();
    this.getSalesmen();
    this.getPartyById();
  }

  // ============================
  // FORM
  // ============================

  initializeForm(): void {

    this.partyForm = this.fb.group({

      partyType: ['', Validators.required],

      partyCode: ['', Validators.required],

      partyName: ['', Validators.required],

      shopName: ['', Validators.required],

      ownerName: [''],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      alternateMobile: [''],

      whatsappNumber: [''],

      email: ['', Validators.email],

      gstNumber: [''],

      panNumber: [''],

      licenseNumber: [''],

      area: ['', Validators.required],

      route: ['', Validators.required],

      assignedSalesman: ['', Validators.required],

      address: [''],

      city: [''],

      district: [''],

      state: ['Andhra Pradesh'],

      pincode: [''],

      latitude: [null],

      longitude: [null],

      creditLimit: [0],

      creditDays: [0],

      openingBalance: [0],

      status: ['Active', Validators.required]

    });
  }

  // ============================
  // GET PARTY
  // ============================

  getPartyById(): void {

    this.loading = true;

    this.partyService.getPartyById(this.partyId).subscribe({

      next: (response: any) => {

        this.loading = false;

        const party = response?.data;

        if (!party) {
          this.alertService.error('Party details not found');
          this.router.navigate(['/parties-list']);
          return;
        }

        // Load routes according to existing area
        const areaId =
          typeof party.area === 'object'
            ? party.area?._id
            : party.area;

        const routeId =
          typeof party.route === 'object'
            ? party.route?._id
            : party.route;

        const salesmanId =
          typeof party.assignedSalesman === 'object'
            ? party.assignedSalesman?._id
            : party.assignedSalesman;

        this.partyForm.patchValue({

          partyType: party.partyType || '',

          partyCode: party.partyCode || '',

          partyName: party.partyName || '',

          shopName: party.shopName || '',

          ownerName: party.ownerName || '',

          mobile: party.mobile || '',

          alternateMobile: party.alternateMobile || '',

          whatsappNumber: party.whatsappNumber || '',

          email: party.email || '',

          gstNumber: party.gstNumber || '',

          panNumber: party.panNumber || '',

          licenseNumber: party.licenseNumber || '',

          area: areaId || '',

          route: routeId || '',

          assignedSalesman: salesmanId || '',

          address: party.address || '',

          city: party.city || '',

          district: party.district || '',

          state: party.state || 'Andhra Pradesh',

          pincode: party.pincode || '',

          latitude: party.latitude ?? null,

          longitude: party.longitude ?? null,

          creditLimit: party.creditLimit ?? 0,

          creditDays: party.creditDays ?? 0,

          openingBalance: party.openingBalance ?? 0,

          status: party.status || 'Active'

        });

        // Existing shop image
        if (party.shopImage) {

          this.imagePreview = party.shopImage;

        }

        // Load routes for existing area
        if (areaId) {

          this.getRoutesByArea(areaId, routeId);

        }

      },

      error: (error) => {

        this.loading = false;

        console.error('Get Party Error:', error);

        this.alertService.error(
          error?.error?.message || 'Failed to load party details'
        );

      }

    });

  }

  // ============================
  // AREAS
  // ============================

  getAreas(): void {

    this.beatPlanService.getAreas().subscribe({

      next: (response: any) => {

        const areas = Array.isArray(response)
          ? response
          : response?.data || [];

        this.areas = areas.filter(
          (area: any) =>
            area.status === 'Active' &&
            area.isDeleted !== true
        );

      },

      error: (error) => {

        console.error('Get Areas Error:', error);

        this.alertService.error(
          error?.error?.message || 'Failed to load areas'
        );

      }

    });

  }

  // ============================
  // AREA CHANGE
  // ============================

  onAreaChange(event: any): void {

    const areaId = event.target.value;

    this.partyForm.patchValue({
      route: ''
    });

    this.routes = [];

    if (!areaId) {
      return;
    }

    this.getRoutesByArea(areaId);

  }

  // ============================
  // ROUTES
  // ============================

  getRoutesByArea(
    areaId: string,
    selectedRouteId: string = ''
  ): void {

    this.beatPlanService
      .getRoutesByArea(areaId)
      .subscribe({

        next: (response: any) => {

          const routes = Array.isArray(response)
            ? response
            : response?.data || [];

          this.routes = routes.filter(
            (route: any) =>
              route.status === 'Active' &&
              route.isDeleted !== true
          );

          // Set existing route after routes loaded
          if (selectedRouteId) {

            this.partyForm.patchValue({
              route: selectedRouteId
            });

          }

        },

        error: (error) => {

          console.error('Get Routes Error:', error);

          this.alertService.error(
            error?.error?.message || 'Failed to load routes'
          );

        }

      });

  }

  // ============================
  // SALESMEN
  // ============================

  getSalesmen(): void {

    this.salesmanLoading = true;

    this.userService.getAllUsers().subscribe({

      next: (response: any) => {

        this.salesmanLoading = false;

        const users: any[] = Array.isArray(response)
          ? response
          : response?.data || [];

        this.salesmen = users.filter(
          (user: any) =>
            user?.role?.toString().toLowerCase() === 'salesman'
        );

      },

      error: (error) => {

        this.salesmanLoading = false;

        console.error('Get Users Error:', error);

        this.alertService.error(
          error?.error?.message || 'Failed to load salesmen'
        );

      }

    });

  }

  // ============================
  // IMAGE SELECT
  // ============================

  onImageSelected(event: any): void {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    this.selectedImage = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result as string;

    };

    reader.readAsDataURL(file);

  }

  // ============================
  // REMOVE IMAGE
  // ============================

  removeImage(): void {

    this.selectedImage = null;
    this.imagePreview = null;

  }

  // ============================
  // UPDATE PARTY
  // ============================
  getFirstInvalidField(): { field: string; message: string } {

  const controls = this.partyForm.controls;

  if (controls['partyType']?.hasError('required')) {
    return {
      field: 'partyType',
      message: 'Please select Party Type'
    };
  }

  if (controls['partyCode']?.hasError('required')) {
    return {
      field: 'partyCode',
      message: 'Please enter Party Code'
    };
  }

  if (controls['partyName']?.hasError('required')) {
    return {
      field: 'partyName',
      message: 'Please enter Party Name'
    };
  }

  if (controls['shopName']?.hasError('required')) {
    return {
      field: 'shopName',
      message: 'Please enter Shop Name'
    };
  }

  if (controls['mobile']?.hasError('required')) {
    return {
      field: 'mobile',
      message: 'Please enter Mobile Number'
    };
  }

  if (controls['mobile']?.hasError('pattern')) {
    return {
      field: 'mobile',
      message: 'Please enter a valid 10-digit Mobile Number'
    };
  }

  if (controls['email']?.hasError('email')) {
    return {
      field: 'email',
      message: 'Please enter a valid Email Address'
    };
  }

  if (controls['area']?.hasError('required')) {
    return {
      field: 'area',
      message: 'Please select Area'
    };
  }

  if (controls['route']?.hasError('required')) {
    return {
      field: 'route',
      message: 'Please select Route'
    };
  }

  if (controls['assignedSalesman']?.hasError('required')) {
    return {
      field: 'assignedSalesman',
      message: 'Please select Assigned Salesman'
    };
  }

  if (controls['status']?.hasError('required')) {
    return {
      field: 'status',
      message: 'Please select Status'
    };
  }

  return {
    field: '',
    message: 'Please check the entered details'
  };
}

updateParty(): void {

  if (this.partyForm.invalid) {

    this.partyForm.markAllAsTouched();

    const invalidField = this.getFirstInvalidField();

    this.alertService.validation(
      invalidField.message
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

  // ==========================================
  // ASSIGNED SALESMAN
  // ==========================================

  formData.set(
    'assignedSalesman',
    assignedSalesman.toString()
  );

  // ==========================================
  // NEW IMAGE ONLY
  // ==========================================

  if (this.selectedImage) {

    formData.append(
      'shopImage',
      this.selectedImage
    );

  }

  this.loading = true;

  this.partyService
    .updateParty(
      this.partyId,
      formData
    )
    .subscribe({

      next: (response: any) => {

        this.loading = false;

        console.log(
          'Update Party Response:',
          response
        );

        this.alertService
          .success(
            response?.message ||
            'Party updated successfully'
          )
          .then(() => {

            this.router.navigate([
               '/admin/parties-list'
            ]);

          });

      },

      error: (error) => {

        this.loading = false;

        console.error(
          'Update Party Error:',
          error
        );

        this.alertService.error(
          error?.error?.message ||
          'Failed to update party'
        );

      }

    });
}

  // ============================
  // BACK
  // ============================

  goBack(): void {

    this.router.navigate([
      '/admin/parties-list'
    ]);

  }

}
