import React, { useState } from "react";
import { uploadMedia } from "../../utils/MediaUpload";
import { Stack, Typography } from "@mui/material";

const MediaUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadMedia(file, "posts");
      setUploadUrl(url);
      alert("Upload réussi !");
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack sx={{ padding: 4, border: 1, borderRadius: 6 }}>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {uploadUrl && (
        <Typography className="mt-2">
          Fichier disponible ici : <a href={uploadUrl}>{uploadUrl}</a>
        </Typography>
      )}
    </Stack>
  );
};

export default MediaUploader;
