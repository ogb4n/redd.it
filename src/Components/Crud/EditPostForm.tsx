import React, { useState, useEffect } from "react";
import { FormControl, Button, Typography, Input } from "@mui/joy";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditPostFormProps {
  postId: string;
  initialTitle: string;
  initialContent: string;
  onCancel: () => void;
}

export const EditPostForm: React.FC<EditPostFormProps> = ({
  postId,
  initialTitle,
  initialContent,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Typography>Content</Typography>
        <ReactQuill
          theme="snow"
          value={""}
          onChange={(value) => setContent(value)}
          className="h-40"
          placeholder="Write the content of your post here"
        />
      </FormControl>
      <FormControl>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </FormControl>
    </form>
  );
};
