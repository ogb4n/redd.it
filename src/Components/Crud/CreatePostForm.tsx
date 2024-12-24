import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Typography,
} from "@mui/joy";
import Switch, { switchClasses } from "@mui/joy/Switch";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface FormActions {
  close: () => void;
  user: User | null;
  subName: string;
}

export const CreatePostForm: React.FC<FormActions> = ({
  close,
  user,
  subName,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      try {
        await addDoc(collection(db, "posts"), {
          title: formData.title,
          content: formData.content,
          author: user.displayName,
          authorId: user.uid,
          likes: 0,
          nsfw: checked,
          creationDate: new Date(),
          subId: subName,
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
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              className="h-40"
              placeholder="Write the content of your post here"
            />
          </FormControl>
          <FormControl>
            <FormLabel>NSFW</FormLabel>
            <Switch
              color={checked ? "success" : "danger"}
              checked={checked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setChecked(event.target.checked)
              }
              sx={{
                "--Switch-thumbSize": "16px",
                "--Switch-trackWidth": "40px",
                "--Switch-trackHeight": "24px",
                "--Switch-trackBackground": "#7e867e",
                "&:hover": {
                  "--Switch-trackBackground": "#7e867e",
                },
                [`&.${switchClasses.checked}`]: {
                  "--Switch-trackBackground": "#5CB176",
                  "&:hover": {
                    "--Switch-trackBackground": "#5CB176",
                  },
                },
              }}
            />
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
