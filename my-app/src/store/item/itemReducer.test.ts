import itemReducer, { ItemInitialState, setItemData } from './item';
import { ItemType } from './item-types';

const initialState: ItemInitialState = {
  itemInfo: {} as ItemType,
};

describe('itemReducer', () => {
  it('should handle initial state', () => {
    expect(itemReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle setItemData', () => {
    const itemData: ItemType = {
      _id: '1',
      name: 'Item 1',
      description: 'Item 1 description',
      reviews: [],
      category: {
        name: 'Category 1',
        _id: '124095',
        description: 'some description',
        filters: [],
        icon: 'icon.svg',
        subCategories: [],
      },
      subCategory: {
        name: 'Category 1',
        _id: '124095',
        description: 'some description',
        filters: [],
        photo: 'photo.svg',
      },
      price: 10,
      photos: ['photo1.jpg'],
      isAvailable: true,
    };

    const expectedState = { itemInfo: itemData };
    const action = setItemData(itemData);
    expect(itemReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle removeItemData', () => {
    const expectedState = { itemInfo: {} as ItemType };
    expect(itemReducer(initialState, setItemData({} as ItemType))).toEqual(expectedState);
  });
});
