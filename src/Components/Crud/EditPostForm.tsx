import React, { useState, useEffect } from "react";

interface EditPostFormProps {
  postId: string;
  initialTitle: string;
  initialContent: string;
  initialMediaUrls?: string[];
  onCancel: () => void;
  onSubmit: (
    postId: string,
    title: string,
    content: string,
    mediaUrls: string[]
  ) => void;
}

export const EditPostForm: React.FC<EditPostFormProps> = ({
  postId,
  initialTitle,
  initialContent,
  initialMediaUrls = [],
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [mediaUrls, setMediaUrls] = useState<string[]>(initialMediaUrls);
  const [newMediaFiles, setNewMediaFiles] = useState<File[]>([]);
  const [newMediaPreviews, setNewMediaPreviews] = useState<string[]>([]);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setMediaUrls(initialMediaUrls);
  }, [initialTitle, initialContent, initialMediaUrls]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setNewMediaFiles((prev) => [...prev, ...files]);
      setNewMediaPreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveExistingMedia = (index: number) => {
    setMediaUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewMedia = (index: number) => {
    setNewMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setNewMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(postId, title, content, mediaUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label>Existing Media</label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {mediaUrls.map((url, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {url.endsWith(".mp4") ||
              url.endsWith(".webm") ||
              url.endsWith(".ogg") ? (
                <video
                  src={url}
                  controls
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <img
                  src={url}
                  alt={`media-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveExistingMedia(index)}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>New Media</label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleMediaChange}
        />
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {newMediaPreviews.map((preview, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={preview}
                alt={`new-media-${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveNewMedia(index)}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
