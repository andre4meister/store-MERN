import app, { initialAppState } from './app';

describe('app reducer should work correctly', () => {
  it('should handle toggleIsLoading', () => {
    const isLoading = true;
    const expectedState = {
      isLoading,
      appError: '',
    };
    expect(app(undefined, { type: 'app/toggleIsLoading', payload: isLoading })).toEqual(expectedState);
  });

  it('should fail if toggleIsLoading is called with non-boolean payload', () => {
    expect(() => app(initialAppState, { type: 'app/toggleIsLoading', payload: 'not a boolean' })).toThrowError();
  });
});
