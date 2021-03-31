const FileUpload =  (state = [], action) => {
    switch (action.type) {
      case "UPLOAD_LICENSE":
        return {
          ...state,
          uploadLicense:action.payload,
        };
      default:
        return {...state} ;
    }
  };
  export default FileUpload;