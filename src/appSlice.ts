import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AspectVals, CropInit } from "./CropDialog.tsx";
import { v1 } from "uuid";

export type ImgProps = {
  id: string;
  imageUrl: string | undefined;
  croppedImageUrl: string | null;
  crop?: CropInit;
  zoom?: number | null; // Изменяем тип на number | null | undefined
  aspect?: AspectVals | null; // Добавляем возможность null для aspect
};
export type CroppedImgForProps = Partial<ImgProps> & Pick<ImgProps, "id">;
export type UpdateImgById = Omit<ImgProps, "imageUrl">;

const slice = createSlice({
  name: "app",
  initialState: {
    createPostImages: [] as ImgProps[],
    selectedImg: null as ImgProps | null,
  },
  reducers: {
    addImgSrcs(state, action: PayloadAction<{ imageUrl: string }>) {
      const imgDataToSave: ImgProps = {
        id: v1(),
        imageUrl: action.payload.imageUrl,
        croppedImageUrl: null,
        zoom: null, // Изначально null
        aspect: null, // Изначально null
      };
      state.createPostImages.push(imgDataToSave);
    },
    resetImgById(state, action: PayloadAction<{ id: string }>) {
      const imgIndex = state.createPostImages.findIndex(
        (img) => img.id === action.payload.id,
      );
      if (imgIndex !== -1) {
        const img = state.createPostImages[imgIndex];
        const updatedImg: ImgProps = {
          ...img,
          croppedImageUrl: null,
          crop: undefined,
          zoom: null,
          aspect: null,
        };
        state.createPostImages[imgIndex] = updatedImg;
      }
    },
    updateImageById(state, action: PayloadAction<UpdateImgById>) {
      const imgIndex = state.createPostImages.findIndex(
        (img) => img.id === action.payload.id,
      );
      if (imgIndex !== -1) {
        const img = state.createPostImages[imgIndex];
        const updatedImg: ImgProps = {
          ...img,
          ...action.payload,
        };
        state.createPostImages[imgIndex] = updatedImg;
      }
    },
    addOrRemoveSelectedImg(state, action: PayloadAction<ImgProps | null>) {
      state.selectedImg = action.payload;
    },
  },
  selectors: {
    imgSrcs: (sliceState) => sliceState.createPostImages,
    selectedImg: (sliceState) => sliceState.selectedImg,
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;
export const appSelectors = slice.selectors;
