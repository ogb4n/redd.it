import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/joy";
import { Close } from "@mui/icons-material";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/system";

interface FormActions {
  close: () => void;
  user: User | null;
  subId: string;
}

export const CreatePostForm: React.FC<FormActions> = ({
  close,
  user,
  subId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMediaFiles(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setMediaPreviews(previews);
    }
  };

  const handleRemoveMedia = (index: number) => {
    const updatedFiles = mediaFiles.filter((_, i) => i !== index);
    const updatedPreviews = mediaPreviews.filter((_, i) => i !== index);
    setMediaFiles(updatedFiles);
    setMediaPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      try {
        const mediaUrls: string[] = [];

        for (const file of mediaFiles) {
          const mediaRef = ref(storage, `posts/${file.name}`);
          const snapshot = await uploadBytes(mediaRef, file);
          const url = await getDownloadURL(snapshot.ref);
          mediaUrls.push(url);
        }

        await addDoc(collection(db, "posts"), {
          title: formData.title,
          content: formData.content,
          author: user.displayName,
          authorId: user.uid,
          likes: 0,
          nsfw: checked,
          creationDate: new Date(),
          subId: subId,
          mediaUrls,
        });

        close();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <>
      <Typography id="form-modal-title" level="h4" textAlign="center">
        Create a Post
      </Typography>
      <Typography id="form-modal-description" textAlign="center" mb={2}>
        Fill the fields below to share your thoughts
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Post Title</FormLabel>
            <Input
              name="title"
              placeholder="Enter the title of your post"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Post Content</FormLabel>
            <Box sx={{ border: "1px solid #7e867e", borderRadius: "4px" }}>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Write the content of your post here"
              />
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel>Upload Media</FormLabel>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              multiple
            />
            <Stack direction="row" spacing={2} mt={2}>
              {mediaPreviews.map((preview, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {mediaFiles[index]?.type.startsWith("image/") ? (
                    <img
                      src={preview}
                      alt={`Media preview ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      src={preview}
                      controls
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <IconButton
                    onClick={() => handleRemoveMedia(index)}
                    sx={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                      },
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
