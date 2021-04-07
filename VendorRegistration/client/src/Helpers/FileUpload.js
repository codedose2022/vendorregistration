import { uploadFile } from "../Actions/vendorRegActions";

export const uploadFileToServer = (
  e,
  vendor,
  val,
  dispatch,
  activeCompany,
  token,
  sectionName
) => {
  let vendorReg = "";
  if (vendor.vendors.length > 0) {
    vendorReg = vendor.vendors.filter(
      (res) => res.companyDetailId === activeCompany.activeCompany._id
    );
  }
  const vendorId = vendorReg.length > 0 ? vendorReg[0]._id : "";
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("sectionName", sectionName);
  dispatch(uploadFile(formData, token, vendorId, val));
};
