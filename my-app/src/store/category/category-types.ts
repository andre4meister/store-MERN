import { WithIdType } from 'store/user/user';

interface FiltersType {
  isAvailable: boolean;
  minPrice: number;
  maxPrice: number;
  brand: string;
  model: string;
}

interface CommonCategoryType extends WithIdType {
  name: string;
  description: string;
  filters: FiltersType[];
}

interface CategoryType extends CommonCategoryType {
  subCategories: SubCategoryType[];
  icon: string;
}

interface SubCategoryType extends CommonCategoryType {
  photo: string;
}

export type { CategoryType, SubCategoryType, CommonCategoryType };
