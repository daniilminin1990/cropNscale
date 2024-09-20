// // @flow
// import * as React from "react";
// import { ChangeEvent } from "react";
// import Cropper, { Area, Point } from "react-easy-crop";
// import getCroppedImg from "./cropImage.ts";
// import { appActions, appSelectors } from "./appSlice.ts";
// import { useAppDispatch, useAppSelector } from "./store.ts";
//
// export type CropInit = {
//   x: number;
//   y: number;
// };
// export type AspectVals = {
//   text: string;
//   value: number;
// };
//
// const aspectRatios = [
//   { text: "4:5", value: 4 / 5 },
//   { text: "16:9", value: 16 / 9 },
//   { text: "1:1", value: 1 / 1 },
// ];
// export const CropDialog = () => {
//   const selectedImg = useAppSelector(appSelectors.selectedImg);
//   // Используем локальные переменные для значений по умолчанию
//   const initialZoom = selectedImg?.zoom ?? 1; // Если zoomInit равен null или undefined, используется 1
//   const initialCrop = selectedImg?.crop ?? { x: 0, y: 0 }; // Если cropInit null или undefined, используется {x: 0, y: 0}
//   const initialAspect = selectedImg?.aspect ?? aspectRatios[0]; // Если aspectInit null или undefined, используем первый элемент из aspectRatios
//
//   const dispatch = useAppDispatch();
//
//   const [zoom, setZoom] = React.useState<number>(initialZoom);
//   const [crop, setCrop] = React.useState<CropInit>(initialCrop);
//   const [aspect, setAspect] = React.useState<AspectVals>(initialAspect);
//   const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
//     null,
//   );
//
//   const onCropChange = (crop: Point) => {
//     console.log({ crop });
//     setCrop(crop);
//   };
//   const onZoomChange = (zoom: number) => {
//     setZoom(zoom);
//   };
//   const onAspectChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const value = Number(e.target.value);
//     const ratio = aspectRatios.find((ratio) => ratio.value === value);
//     if (ratio) {
//       setAspect(ratio);
//     }
//   };
//
//   const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//     console.log({ croppedArea, croppedAreaPixels });
//   };
//
//   const onCrop = async () => {
//     if (!selectedImg) return;
//     const croppedImageUrl = await getCroppedImg(
//       selectedImg.imageUrl,
//       croppedAreaPixels,
//     );
//     dispatch(
//       appActions.updateImageById({
//         id: selectedImg.id,
//         crop,
//         zoom,
//         aspect,
//         croppedImageUrl,
//       }),
//     );
//     dispatch(appActions.addOrRemoveSelectedImg(null));
//     // setCroppedImageFor({ id, crop, zoom, aspect, croppedImageUrl });
//   };
//
//   const onResetImage = () => {
//     if (!selectedImg) return;
//     dispatch(appActions.resetImgById({ id: selectedImg.id }));
//     dispatch(appActions.addOrRemoveSelectedImg(null));
//   };
//
//   const onCancel = () => {
//     // setSelectedImg(null);
//     dispatch(appActions.addOrRemoveSelectedImg(null));
//   };
//
//   const customStyles = {
//     style: {
//       // containerStyle: {
//       //   backgroundColor: "#333",
//       //   backgroundPosition: "center",
//       // },
//
//       cropAreaStyle: {
//         border: "none",
//       },
//     },
//   };
//
//   return (
//     <div>
//       {/*<div className={"backdrop"}></div>*/}
//       <div className={"crop-container"}>
//         <Cropper
//           image={selectedImg?.imageUrl || selectedImg?.croppedImageUrl || ""}
//           zoom={zoom}
//           crop={crop}
//           aspect={aspect.value}
//           onCropChange={onCropChange}
//           onZoomChange={onZoomChange}
//           onCropComplete={onCropComplete}
//           showGrid={false}
//           {...customStyles}
//         />
//       </div>
//
//       <div className={"controls"}>
//         <div className={"controls-upper-area"}>
//           <input
//             type={"range"}
//             min={1}
//             max={3}
//             step={0.1}
//             value={zoom}
//             onInput={(e) => onZoomChange(Number(e.currentTarget.value))}
//             className={"slider"}
//           ></input>
//           <select onChange={onAspectChange}>
//             {aspectRatios.map((ratio) => (
//               <option
//                 key={ratio.value}
//                 value={ratio.value}
//                 selected={ratio.value === aspect.value}
//               >
//                 {ratio.text}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={"button-area"}>
//           <button onClick={onCancel}>Cancel</button>
//           <button onClick={onResetImage}>Reset</button>
//           <button onClick={onCrop}>Crop</button>
//         </div>
//       </div>
//     </div>
//   );
// };
