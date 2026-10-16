import { create } from "zustand";

export type CaseModal = {
  kind: "case";
  title: string;
  category: string;
  background: string;
  solution: string;
  result: string;
};

export type GalleryModal = {
  kind: "gallery";
  title: string;
  image: string;
  fallbackImage: string;
  caption: string;
};

export type DocModal = {
  kind: "doc";
  title: string;
  description: string;
};

export type ModalState = CaseModal | GalleryModal | DocModal | null;

type Feedback = {
  toast: string | null;
  modal: ModalState;
  showToast: (msg: string) => void;
  openModal: (modal: Exclude<ModalState, null>) => void;
  closeModal: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export const useFeedback = create<Feedback>((set) => ({
  toast: null,
  modal: null,
  showToast: (msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: msg });
    toastTimer = setTimeout(() => set({ toast: null }), 3200);
  },
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));
