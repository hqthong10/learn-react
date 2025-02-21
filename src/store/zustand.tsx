/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface CounterState {
  count2: number;
  increment2: () => void;
  decrement2: () => void;
  reset2: () => void;
  incrementByAmount2: (action: number) => void;
}

// Tạo store Zustand
const useCounterStore = create<CounterState>((set) => ({
  count2: 0,
  increment2: () => set((state: any) => ({ count2: state.count2 + 1 })),
  decrement2: () => set((state: any) => ({ count2: state.count2 - 1 })),
  reset2: () => set(() => ({ count2: 0 })),
  incrementByAmount2: (action) => set((state: any) => ({ count2: state.count2 + action})),
  fetchUsers: () => {},
}));

export default useCounterStore;
