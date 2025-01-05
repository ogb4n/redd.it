// import React, { useState, useEffect } from "react";

// interface EditPostFormProps {
//   postId: string;
//   initialTitle: string;
//   initialContent: string;
//   onCancel: () => void;
// }

// export const EditPostForm: React.FC<EditPostFormProps> = ({
//   postId,
//   initialTitle,
//   initialContent,
//   onCancel,
// }) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [content, setContent] = useState(initialContent);

//   useEffect(() => {
//     setTitle(initialTitle);
//     setContent(initialContent);
//   }, [initialTitle, initialContent]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(postId, title, content);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="content">Content</label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>
//       <div>
//         <button type="submit">Save</button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };
