import React, { useState, useEffect, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Api from "../../api/social";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: 10,
  },
}));

const Profilepic = () => {
  const classes = useStyles();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(undefined);
  const [btn, setBtn] = useState(false);
  const ID = useSelector((state) => state.user.userid);

  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    aspect: 4 / 4,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const previewCanvasRef = useRef(null);
  const IMGRef = useRef(null);
  const btnRef = useRef();

  useEffect(() => {
    if (file) {
      var objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(undefined);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const fileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const resizer = (img) => {
    const imgRef = document.getElementsByClassName("ReactCrop__image");
    const clntHt = imgRef[0].clientHeight;

    if (clntHt > 500) {
      imgRef[0].style.height = "400px";
    }

    IMGRef.current = img;
  };

  const reset = () => {
    setCompletedCrop(null);
    setPreview(null);
    setFile(null);
    btnRef.current.value = null;
  };

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const handleSubmit = async () => {
    setBtn(true);
    const dataURL = await previewCanvasRef.current.toDataURL();
    const blob = await dataURLtoBlob(dataURL);

    const formData = new FormData();
    formData.append("profileupload", blob);
    formData.append("id", ID);
    const response = await Api.post(`/profilepic`, formData);
    if (response.data === "uploaded") {
      setBtn(false);
      reset();
      history.push("/homepage");
    }
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !IMGRef.current) {
      return;
    }

    const image = IMGRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className="profile_pic_cont">
      <div className="profile_pic_btn_cont">
        <div>
          <input
            type="file"
            onChange={fileChange}
            className="craete_file_input"
            ref={btnRef}
          />
          <div className="profilepic_btn_upload">
            <Button variant="contained" onClick={() => btnRef.current.click()}>
              Add Picture
            </Button>
          </div>
        </div>
        {completedCrop ? (
          <div className="profile_pic_stats_btn">
            <Button
              variant="contained"
              className={classes.btn}
              onClick={handleSubmit}
              disabled={btn}
            >
              Upload
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => reset()}
              disabled={btn}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </div>

      <div className="profile_crop_canvas">
        <ReactCrop
          src={preview}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          onImageLoaded={(img) => resizer(img)}
        />
        <div className="profile_pic_preview_cont">
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profilepic;
