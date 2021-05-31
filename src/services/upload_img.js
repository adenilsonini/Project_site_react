import api from "../services/api";

class FileUploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("files", file);

    return api.post("upload/img", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return api.get("/files");
  }
}

export default new FileUploadService();