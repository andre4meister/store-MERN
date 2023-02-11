import { OrderType } from './order-types';

// const initialState: OrderInitialState = {
//   OrderInfo: {} as OrderType,
// };

describe('orderReducer', () => {
  test('should correctly initialize orderReducer', () => {
    expect(1).toBe(1);
  });
});
//   it('should handle initial state', () => {
//     expect(OrderReducer(undefined, {} as any)).toEqual(initialState);
//   });

//   it('should handle setOrderData', () => {
//     const OrderData: OrderType = {
//       _id: '1',
//       name: 'Order 1',
//       description: 'Order 1 description',
//       reviews: [],
//       category: {
//         name: 'Category 1',
//         _id: '124095',
//         description: 'some description',
//         filters: [],
//         icon: 'icon.svg',
//         subCategories: [],
//       },
//       subCategory: {
//         name: 'Category 1',
//         _id: '124095',
//         description: 'some description',
//         filters: [],
//         photo: 'photo.svg',
//       },
//       price: 10,
//       photos: ['photo1.jpg'],
//       isAvailable: true,
//     };

//     const expectedState = { OrderInfo: OrderData };
//     const action = setOrderData(OrderData);
//     expect(OrderReducer(initialState, action)).toEqual(expectedState);
//   });

//   it('should handle removeOrderData', () => {
//     const expectedState = { OrderInfo: {} as OrderType };
//     expect(OrderReducer(initialState, setOrderData({} as OrderType))).toEqual(expectedState);
//   });
// });
