import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/Services/banner.service';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {

  bannerForm!: FormGroup;

  selectedFile:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;

  constructor(
    private fb:
      FormBuilder,

    private bannerService:
      BannerService,

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
  CREATE BANNER
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
      .createBanner(
        formData
      )
      .subscribe({
        next: () => {
          alert(
            'Banner created successfully'
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
