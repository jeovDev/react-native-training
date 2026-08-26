export interface Nav {
  navigate: (value: string, {}) => void;
  goBack: () => void;
  reset: (value: object) => void;
  addListener(
    type: 'focus' | 'blur' | 'state' | 'beforeRemove',
    callback: () => void,
  ): () => void;
}
