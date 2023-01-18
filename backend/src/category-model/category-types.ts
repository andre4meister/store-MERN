import mongoose, { Schema } from 'mongoose';

interface FiltersType {
  isAvailable: boolean;
  minPrice: number;
  maxPrice: number;
  brand: string;
  model: string;
}
interface CommonCategoryType {
  readonly _id: string;
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

const subCategoryScheme = new Schema<SubCategoryType>({
  name: {
    type: String,
    sparse: true,
    required: true,
    validate: { validator: (v: string) => v.length >= 2, message: 'Incorrect name, it should be longer' },
  },
  photo: {
    type: String,
    sparse: true,
    required: true,
    validate: { validator: (v: string) => v.length >= 2, message: 'Incorrect name, it should be longer' },
  },
  description: {
    type: String,
    sparse: true,
    required: true,
    validate: { validator: (v: string) => v.length >= 10, message: 'Too short description' },
  },
  filters: [String],
});

const categoryScheme = new Schema<CategoryType>({
  name: {
    type: String,
    unique: false,
    required: true,
    validate: { validator: (v: string) => v.length >= 2, message: 'Incorrect name, it should be longer' },
    partialFilterExpression: { name: { $exists: true } },
    sparse: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
    partialFilterExpression: { name: { $exists: true } },
    sparse: true,
    validate: { validator: (v: string) => v.length >= 10, message: 'Too short description' },
  },
  icon: {
    type: String,
    required: true,
    partialFilterExpression: { name: { $exists: true } },
    sparse: true,
  },
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'subCategory',
      required: true,
      sparse: true,
      partialFilterExpression: { name: { $exists: true } },
    },
  ],
  filters: [String],
});

const Category = mongoose.model('category', categoryScheme);
const SubCategory = mongoose.model('subCategory', subCategoryScheme);

try {
} catch (error) {
  console.log(error);
}
export { categoryScheme, subCategoryScheme, CategoryType, FiltersType, SubCategoryType, Category, SubCategory };
