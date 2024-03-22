import { Getter, Setter, atom } from 'jotai'
import { Schema } from '../schema';

export const submitDataAtom = atom<Schema[] | null>(null);
export const getSubmitDataAtom = atom(
  get => get(submitDataAtom)
)
export const updateSubmitDataAtom = atom(
  [null],
  (get: Getter, set: Setter, data: Schema) => {
    const currentData = get(submitDataAtom);
    if (currentData === null) {
      // submitDataAtom が null の場合、新しい配列をセット
      set(submitDataAtom, [data]);
    } else {
      // 既存の配列に新しいデータを追加
      set(submitDataAtom, [...currentData, data]);
    }
  }
)