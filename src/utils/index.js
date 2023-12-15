import { ShowNotification } from "../components";

export const imageValidation = (selectedFile) => {
  if (selectedFile) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      ShowNotification({
        title: "Error Uploading Images",
        text: "Please select a valid image file (JPEG, PNG)",
        icon: "error",
      });
      return;
    }
  }

  const maxSizeInBytes = 2 * 1024 * 1024;
  if (selectedFile?.size > maxSizeInBytes) {
    ShowNotification({
      title: "Error Uploading Images",
      text: "File size exceeds the maximum limit of 5 MB",
      icon: "error",
    });
    return;
  }

  return true;
};
