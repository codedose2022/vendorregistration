import { uploadFile } from "../Actions/vendorRegActions";

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
