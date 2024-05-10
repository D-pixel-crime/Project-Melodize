import {
  cloudinary_cloud_name,
  cloudinary_upload_preset,
} from "../../config.js";
import { openUploadWidget } from "../../utils/CloudinaryService.js";

const CloudinaryUpload = ({ setValue }) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudinary_cloud_name,
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setValue({
            fileName: result.info.original_filename,
            url: result.info.secure_url,
          });
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="rounded-full bg-yellow-500 max-sm:text-sm"
      onClick={uploadImageWidget}
    >
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
