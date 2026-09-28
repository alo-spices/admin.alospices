export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {

  _id?: string;

  name: string;

  image?: string;

  category: string | Category;  // both handle chestundi

  isActive?: boolean;

  createdAt?: string;

  updatedAt?: string;

}