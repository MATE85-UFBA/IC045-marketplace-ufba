import { api } from '@/lib/axios';

export const handleFileUpload = async (file: any) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const formData = new FormData();
  formData.append("file", file);

  try {
    return await  api(apiURL, true).post(`/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => res.data.file)
  } catch (error) {
    console.error("File upload error:", error);
  }
};
