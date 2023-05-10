interface FiltersType {
  isAvailable: boolean;
  minPrice: number;
  maxPrice: number;
  brand: string;
  model: string;
}
interface CommonCategoryType {
  id: string;
  name: string;
  description: string;
  filters: string[];
}

interface CategoryType extends CommonCategoryType {
  subCategories: SubCategoryType[];
  icon: string;
}

interface SubCategoryType extends CommonCategoryType {
  photo: string;
}


export { CategoryType, FiltersType, SubCategoryType };
