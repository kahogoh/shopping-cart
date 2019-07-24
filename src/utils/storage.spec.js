import { saveAs, load } from './storage';

describe('utils/storage', () => {
  describe('saveAs', () => {
    it('should save value to local storage', () => {
      const KEY = 'keySave';
      const VALUE = 'valueSave';

      saveAs(KEY)(VALUE);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
      expect(localStorage.__STORE__[KEY]).toBe(VALUE);
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });
  });

  describe('load', () => {
    it('should load value from local storage', () => {
      const KEY = 'keyLoad';
      const VALUE = 'valueLoad';

      localStorage.__STORE__[KEY] = VALUE;
      const loaded = load(KEY)();
      expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
      expect(loaded).toBe(VALUE);
    });
  });
});
