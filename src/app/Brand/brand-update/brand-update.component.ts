import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandForm!: FormGroup;

  brandId!: string;

  selectedLogoFile!: File;
  selectedBannerFile!: File;

  logoPreview: any = null;
  bannerPreview: any = null;

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private alertService: CommomPopupService
  ) { }

  ngOnInit(): void {
    this.brandId = this.route.snapshot.paramMap.get('id') || '';
    this.initializeForm();
    this.loadBrandById();
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
      phone: [''],
      logo: [''],        // for existing URL (optional, for preview logic if needed)
      bannerImage: ['']  // for existing URL (optional)
    });
  }

  // ==========================================
  // Load Brand By ID
  // ==========================================
  loadBrandById(): void {
    if (!this.brandId) {
      this.alertService.error('Invalid Brand ID');
      this.goBack();
      return;
    }

    this.brandService.getBrandById(this.brandId).subscribe({
      next: (res: any) => {
        const brand = res.data || res.brand;

        if (!brand) {
          this.alertService.error('Brand not found');
          this.goBack();
          return;
        }

        this.brandForm.patchValue({
          brandName: brand.brandName || '',
          brandCode: brand.brandCode || '',
          description: brand.description || '',
          website: brand.website || '',
          email: brand.email || '',
          phone: brand.phone || '',
          logo: brand.logo || '',
          bannerImage: brand.bannerImage || ''
        });

        // Set previews from existing URLs
        if (brand.logo) {
          this.logoPreview = brand.logo;
        }
        if (brand.bannerImage) {
          this.bannerPreview = brand.bannerImage;
        }
      },
      error: (err) => {
        console.log(err);
        this.alertService.error(
          err.error?.message || 'Failed to load brand details'
        );
        this.goBack();
      }
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
  // Submit (Update)
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

    // Send new files only if user selects them; otherwise backend keeps old URLs
    if (this.selectedLogoFile) {
      formData.append('logo', this.selectedLogoFile);
    }

    if (this.selectedBannerFile) {
      formData.append('bannerImage', this.selectedBannerFile);
    }

    this.brandService
      .updateBrand(this.brandId, formData)
      .subscribe({
        next: (res: any) => {
          this.alertService.success(
            res.message || 'Brand Updated Successfully'
          );
          this.router.navigate(['/admin/brand-list']);
        },
        error: (err) => {
          console.log(err);
          this.alertService.error(
            err.error?.message || 'Something went wrong'
          );
        }
      });
  }

  // ==========================================
  // Back
  // ==========================================
  goBack(): void {
    this.router.navigate(['/admin/brand-list']);
  }

}
