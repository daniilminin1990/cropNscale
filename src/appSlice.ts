import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { AspectVals, CropInit } from "./App.tsx";

export type ImgProps = {
  id: string;
  imageUrl: string | undefined;
  croppedAreaPx: CroppedAreaPx;
  crop: CropInit;
  zoom: number;
  aspect: AspectVals;
  originalImageUrl: string;
};

export type CroppedAreaPx = {
  x: number;
  y: number;
  height: number;
  width: number;
} | null;

type UpdateImgCrop = {
  id: string;
  crop: CropInit;
};

type UpdateImgZoom = {
  id: string;
  zoom: number;
};

type UpdateImgAspect = {
  id: string;
  aspect: AspectVals;
};

const slice = createSlice({
  name: "app",
  initialState: {
    allPostImages: [] as ImgProps[],
  },
  reducers: {
    addPostImgs(state, action: PayloadAction<{ imageUrl: string }>) {
      const existingPhoto = state.allPostImages.find(
        (img) => img.imageUrl === action.payload.imageUrl,
      );
      if (!existingPhoto) {
        const imgDataToSave: ImgProps = {
          id: v1(),
          imageUrl: action.payload.imageUrl,
          croppedAreaPx: null,
          zoom: 1,
          crop: { x: 0, y: 0 },
          aspect: { text: "1:1", value: 1 },
          originalImageUrl: "",
        };
        state.allPostImages.unshift(imgDataToSave);
      }
    },
    updateCrop(state, action: PayloadAction<UpdateImgCrop>) {
      const imgIndex = state.allPostImages.findIndex(
        (img) => img.id === action.payload.id,
      );
      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          crop: action.payload.crop,
        };
      }
    },
    updateZoom(state, action: PayloadAction<UpdateImgZoom>) {
      const imgIndex = state.allPostImages.findIndex(
        (img) => img.id === action.payload.id,
      );
      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          zoom: action.payload.zoom,
        };
      }
    },
    updateAspect(state, action: PayloadAction<UpdateImgAspect>) {
      const imgIndex = state.allPostImages.findIndex(
        (img) => img.id === action.payload.id,
      );
      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          aspect: action.payload.aspect,
        };
      }
    },
    updateCroppedAreaPixels(
      state,
      action: PayloadAction<{ id: string; croppedAreaPx: CroppedAreaPx }>,
    ) {
      const img = state.allPostImages.find((el) => el.id === action.payload.id);
      if (img) img.croppedAreaPx = action.payload.croppedAreaPx;
    },
    setAllPostImgs(state, action: PayloadAction<{ images: ImgProps[] }>) {
      state.allPostImages = action.payload.images.map((el) => ({ ...el }));
    },
  },
  selectors: {
    imgSrcs: (sliceState) => sliceState.allPostImages,
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
export const appSelectors = slice.selectors;
