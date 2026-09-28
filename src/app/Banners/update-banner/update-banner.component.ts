import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/Services/banner.service';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.css']
})
export class UpdateBannerComponent 
implements OnInit {

  bannerForm!: FormGroup;

  selectedFile:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;

  bannerId!: string;

  constructor(
    private fb:
      FormBuilder,

    private bannerService:
      BannerService,

    private route:
      ActivatedRoute,

    private router:
      Router
  ) {}

  ngOnInit(): void {

    this.bannerForm =
      this.fb.group({
        title: [
          '',
          Validators.required
        ],
        description: [
          '',
          Validators.required
        ]
      });

    this.bannerId =
      this.route.snapshot.params['id'];

    this.getBannerById();
  }

  /*
  GET BANNER BY ID
  */
  getBannerById(): void {
    this.bannerService
      .getAllBanners()
      .subscribe({
        next: (
          response: any
        ) => {

          const banner =
            response.data.find(
              (item: any) =>
                item._id ===
                this.bannerId
            );

          if (banner) {

            this.bannerForm.patchValue({
              title:
                banner.title,
              description:
                banner.description
            });

            this.imagePreview =
              banner.image;
          }
        }
      });
  }

  /*
  FILE CHANGE
  */
  onFileChange(
    event: any
  ): void {

    const file =
      event.target.files[0];

    if (file) {
      this.selectedFile =
        file;

      const reader =
        new FileReader();

      reader.onload = () => {
        this.imagePreview =
          reader.result;
      };

      reader.readAsDataURL(
        file
      );
    }
  }

  /*
  UPDATE BANNER
  */
  onSubmit(): void {

    if (
      this.bannerForm.invalid
    ) {
      return;
    }

    const formData =
      new FormData();

    formData.append(
      'title',
      this.bannerForm.value.title
    );

    formData.append(
      'description',
      this.bannerForm.value.description
    );

    if (
      this.selectedFile
    ) {
      formData.append(
        'image',
        this.selectedFile
      );
    }

    this.bannerService
      .updateBanner(
        this.bannerId,
        formData
      )
      .subscribe({
        next: () => {
          alert(
            'Banner updated successfully'
          );

          this.router.navigate([
            '/admin/banner'
          ]);
        },

        error: (
          error
        ) => {
          console.error(
            error
          );
        }
      });
  }

  /*
  BACK
  */
  goBack(): void {
    this.router.navigate([
      '/admin/banner'
    ]);
  }
}