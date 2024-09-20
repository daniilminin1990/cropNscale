import "./App.css";
import { ChangeEvent } from "react";

import "react-image-crop/dist/ReactCrop.css";
import { useAppDispatch, useAppSelector } from "./store.ts";
import { appActions, appSelectors } from "./appSlice.ts";
import Cropper, { Area, Point } from "react-easy-crop";

export type CropInit = {
  x: number;
  y: number;
};
export type AspectVals = {
  text: string;
  value: number;
};

const aspectRatios = [
  { text: "Original, 1:1", value: 1 / 1 },
  { text: "1:1", value: 1 / 1 },
  { text: "4:5", value: 4 / 5 },
  { text: "16:9", value: 16 / 9 },
];

export default function App() {
  const dispatch = useAppDispatch();

  const imgSrcs = useAppSelector(appSelectors.imgSrcs);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file); // Создаём URL для файла

    dispatch(appActions.addPostImgs({ imageUrl }));
    return () => URL.revokeObjectURL(imageUrl);
  };

  const onCropChange = ({ crop, id }: { crop: Point; id: string }) => {
    console.log({ crop });
    dispatch(appActions.updateCrop({ id, crop }));
  };

  const onZoomChange = ({ id, zoom }: { id: string; zoom: number }) => {
    dispatch(appActions.updateZoom({ id, zoom }));
  };

  const onAspectChange = ({
    e,
    id,
  }: {
    e: ChangeEvent<HTMLSelectElement>;
    id: string;
  }) => {
    const value = Number(e.target.value);
    const aspect = aspectRatios.find((ratio) => ratio.value === value);
    if (aspect) {
      dispatch(appActions.updateAspect({ id, aspect }));
    }
  };

  const onCropComplete =
    (id: string) => (croppedArea: Area, croppedAreaPixels: Area) => {
      dispatch(
        appActions.updateCroppedAreaPixels({
          id,
          croppedAreaPx: croppedAreaPixels,
        }),
      );
    };

  const customStyles = {
    style: {
      containerStyle: {
        backgroundColor: "red",
        // backgroundPosition: "center",
      },
      cropAreaStyle: {
        border: "none",
      },
    },
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {imgSrcs.map((img) => (
        <div className={"imageCard"} key={img.id}>
          <div className={"crop-container"}>
            <Cropper
              onCropChange={(crop) => onCropChange({ crop, id: img.id })}
              onZoomChange={(zoom) => onZoomChange({ zoom, id: img.id })}
              onCropComplete={onCropComplete(img.id)}
              crop={img.crop}
              image={img.imageUrl}
              showGrid={false}
              aspect={img.aspect.value}
              zoom={img.zoom}
              {...customStyles}
            />
          </div>

          <div className={"controls"}>
            <div className={"controls-upper-area"}>
              <input
                type={"range"}
                min={1}
                max={3}
                step={0.1}
                value={img.zoom}
                onInput={(e) =>
                  onZoomChange({
                    id: img.id,
                    zoom: Number(e.currentTarget.value),
                  })
                }
                className={"slider"}
              ></input>
              <select onChange={(e) => onAspectChange({ e, id: img.id })}>
                {aspectRatios.map((ratio) => (
                  <option
                    key={`${ratio.value}${ratio.text}`}
                    value={ratio.value}
                  >
                    {ratio.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
