import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css']
})
export class UpdateSubcategoryComponent implements OnInit {

  subCategoryForm!: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null;
  imagePreview: any = null;
  subCategoryId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subService: SubcategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.subCategoryForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      isActive: [true]
    });

    this.subCategoryId =
      this.route.snapshot.paramMap.get('id')!;

    this.getCategories();
    this.getSubCategoryById();
  }

  getCategories() {
    this.categoryService.getAllCategories()
      .subscribe((res: any) => {
        this.categories = res.data;
      });
  }

  getSubCategoryById() {
    this.subService
      .getSubCategoryById(this.subCategoryId)
      .subscribe((res: any) => {

        const data = res.data;

        this.subCategoryForm.patchValue({
          name: data.name,
          category: data.category?._id || data.category
        });

        this.imagePreview = data.image;
      });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('name', this.subCategoryForm.value.name);
    formData.append('category', this.subCategoryForm.value.category);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.subService
      .updateSubCategory(this.subCategoryId, formData)
      .subscribe(() => {

        alert("Updated successfully");

        this.router.navigate(['/admin/subcategory']);
      });
  }

  goBack() {
    this.router.navigate(['/admin/subcategory']);
  }
}