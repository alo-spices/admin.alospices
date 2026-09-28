import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.css']
})
export class BrandCreateComponent implements OnInit {

  brandForm!: FormGroup;

  selectedLogoFile!: File;
  selectedBannerFile!: File;

  logoPreview: any = null;
  bannerPreview: any = null; // optional, if you add banner preview in HTML

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandService: BrandService,
    private alertService: CommomPopupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  // ==========================================
  // Initialize Form
  // ==========================================
  initializeForm(): void {
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required],
      brandCode: ['', Validators.required],
      description: [''],
      website: [''],
      email: ['', [Validators.email]],
      phone: ['']
      // Add more fields here if needed
    });
  }

  // ==========================================
  // Logo File Change
  // ==========================================
  onLogoChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedLogoFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedLogoFile);
    }
  }

  // ==========================================
  // Banner File Change
  // ==========================================
  onBannerChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedBannerFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.bannerPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedBannerFile);
    }
  }

  // ==========================================
  // Submit
  // ==========================================
  onSubmit(): void {
    this.isSubmitted = true;

    if (this.brandForm.invalid) {
      this.alertService.validation('Please fill all required fields');
      return;
    }

    const formData = new FormData();

    formData.append('brandName', this.brandForm.value.brandName);
    formData.append('brandCode', this.brandForm.value.brandCode);
    formData.append('description', this.brandForm.value.description || '');
    formData.append('website', this.brandForm.value.website || '');
    formData.append('email', this.brandForm.value.email || '');
    formData.append('phone', this.brandForm.value.phone || '');

    // Backend expects:
    // upload.fields([{ name: "logo", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }])
    if (this.selectedLogoFile) {
      formData.append('logo', this.selectedLogoFile);
    }

    if (this.selectedBannerFile) {
      formData.append('bannerImage', this.selectedBannerFile);
    }

    this.brandService.createBrand(formData).subscribe({
      next: (response: any) => {
        this.alertService.success(
          response.message || 'Brand Created Successfully'
        );
        // Adjust navigation path as per your routing
        this.router.navigate(['/admin/brand']);
      },
      error: (error) => {
        console.log(error);
        this.alertService.error(
          error.error?.message || 'Something went wrong'
        );
      }
    });
  }

  // ==========================================
  // Back
  // ==========================================
  goBack(): void {
    // Adjust navigation path as per your routing
    this.router.navigate(['/admin/brand-list']);
  }

}
