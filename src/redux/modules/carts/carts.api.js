import * as R from 'ramda';
import { saveAs, load } from 'src/utils';

const STORAGE_KEY = 'MY_CARTS';

export const getMyCarts = () => {
  const str = load(STORAGE_KEY)();
  try {
    return JSON.parse(str);
  } catch (e) {}
  return [];
};

export const saveMyCarts = R.pipe(
  JSON.stringify,
  saveAs(STORAGE_KEY)
);
