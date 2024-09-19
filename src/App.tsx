import "./App.css";
import { ChangeEvent } from "react";

import "react-image-crop/dist/ReactCrop.css";
import { CropDialog } from "./CropDialog.tsx";
import { useAppDispatch, useAppSelector } from "./store.ts";
import { appActions, appSelectors } from "./appSlice.ts";

export default function App() {
  // const [selectedImg, setSelectedImg] = useState<null | ImgProps>(null);

  const dispatch = useAppDispatch();

  const imgSrcs = useAppSelector(appSelectors.imgSrcs);
  const selectedImg = useAppSelector(appSelectors.selectedImg);
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file); // Создаём URL для файла

    dispatch(appActions.addImgSrcs({ imageUrl }));

    // Очистите URL после использования, чтобы избежать утечек памяти
    return () => URL.revokeObjectURL(imageUrl);
  };

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {selectedImg ? <CropDialog /> : null}
      {imgSrcs.map((img) => (
        <div className={"imageCard"} key={img.id}>
          <img
            src={img.croppedImageUrl ? img.croppedImageUrl : img.imageUrl}
            onClick={() => {
              dispatch(appActions.addOrRemoveSelectedImg(img));
            }}
          />
        </div>
      ))}
    </div>
  );
}
