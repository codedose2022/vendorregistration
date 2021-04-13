import { uploadFile } from "../Actions/vendorRegActions";
import _ from 'lodash';
export const uploadFileToServer = (
  e,
  vendor,
  val,
  dispatch,
  token,
  sectionName
) => {
  const vendorId = vendor.length > 0 ? vendor[0]._id : "";
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("sectionName", sectionName);
  dispatch(uploadFile(formData, token, vendorId, val));
};

export const addFileName = (data, fieldName) => {
  let pattern = /\.[0-9a-z]+$/i;
  if (data[fieldName] && data[fieldName].includes("\\")) {
      _.set(
        data,
        fieldName,
        fieldName + data[fieldName].match(pattern)[0]
      );
    }
    return data;
};