import dashboardReducer, { initialState } from './dashboard';

describe('dashboardReducer', () => {
  it('should return the initial state', () => {
    const state = dashboardReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  //   it('should set the categories correctly', () => {
  //     const categories = [{ name: 'Electronics', icon: 'electronics.jpg', subCategories: [], _id: '1' }];
  //     const newState = dashboardReducer(initialState, {
  //       type: 'setCategories',
  //       payload: categories,
  //     });
  //     expect(newState.categories).toEqual(categories);
  //   });

  //   it('should set the subCategories correctly', () => {
  //     const subCategories = [{ name: 'Smartphones', description: '', filters: [], _id: '1', photo: 'smartphones.jpg' }];
  //     const newState = dashboardReducer(initialState, {
  //       type: 'setSubCategories',
  //       payload: subCategories,
  //     });
  //     expect(newState.subCategories).toEqual(subCategories);
  //   });

  //   it('should set the likedItems correctly', () => {
  //     const likedItems = [
  //       {
  //         _id: '1',
  //         name: 'iPhone X',
  //         description: 'The latest iPhone',
  //         category: [{ name: 'Electronics', icon: 'electronics.jpg', subCategories: [], _id: '1' }],
  //         subCategory: [{ name: 'Smartphones', description: '', filters: [], _id: '1', photo: 'smartphones.jpg' }],
  //         price: 1000,
  //         photos: ['iphonex.jpg'],
  //         isAvailable: true,
  //         brand: 'Apple',
  //         model: 'iPhone X',
  //       },
  //     ];
  //     const newState = dashboardReducer(initialState, {
  //       type: 'setLikedItems',
  //       payload: likedItems,
  //     });
  //     expect(newState.likedItems).toEqual(likedItems);
  //   });
});
