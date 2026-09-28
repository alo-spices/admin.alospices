import { Category } from "./Category";
import { SubCategory } from "./SubCategory";

export interface SubSubCategory {

  _id?: string;

  name: string;

  image?: string;

  category: string | Category;

  subCategory: string | SubCategory;

  isActive?: boolean;

  createdAt?: string;

  updatedAt?: string;

}