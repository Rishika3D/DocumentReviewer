'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import NavSum from '../components/NavSum';
import axios from 'axios';

// 🎨 Pastel color palette for highlights
const pastelColors = [
  "#FFB3BA", // pastel red
  "#FFDFBA", // pastel orange
  "#FFFFBA", // pastel yellow
  "#BAFFC9", // pastel green
  "#BAE1FF", // pastel blue
  "#E3BAFF", // pastel purple
  "transparent" // remove highlight
];

export default function Edit() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [comments, setComments] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ background: pastelColors }], // 🎨 pastel highlight dropdown
        ['clean'],
      ],
    },
  };

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules,
    placeholder: 'Start writing...',
  });

  // Sync content
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        startTransition(() => setValue(quill.root.innerHTML));
      });

      quill.on('selection-change', (range) => {
        if (range && range.length > 0) {
          const text = quill.getText(range.index, range.length);
          setSelectedText(text);
          const bounds = quill.getBounds(range.index, range.length);
          setPopupPos({ top: bounds.top, left: bounds.left + bounds.width });
          setShowPopup(true);
        } else {
          setShowPopup(false);
          setPopupPos(null);
        }
      });
    }
  }, [quill]);

  // 📝 Add comment
  const addComment = () => {
    if (!selectedText || !quill) return;
    const range = quill.getSelection();
    const newComment = {
      id: Date.now(),
      text: prompt(`Add a comment for: "${selectedText}"`) || '',
      target: selectedText,
      color: pastelColors[Math.floor(Math.random() * (pastelColors.length - 1))],
      range,
    };
    if (newComment.text) {
      setComments([newComment, ...comments]);
      quill.formatText(range.index, range.length, 'background', newComment.color);
    }
    setShowPopup(false);
  };

  // ✏️ Edit comment
  const editComment = (id) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, text: prompt('Edit comment:', c.text) || c.text } : c
    );
    setComments(updated);
  };

  // ❌ Delete comment
  const deleteComment = (id) => {
    const commentToDelete = comments.find((c) => c.id === id);
    if (quill && commentToDelete?.range) {
      quill.formatText(
        commentToDelete.range.index,
        commentToDelete.range.length,
        'background',
        'transparent'
      );
    }
    setComments(comments.filter((c) => c.id !== id));
  };

  // 🔍 Jump to comment in editor
  const jumpToComment = (comment) => {
    if (quill && comment.range) {
      quill.setSelection(comment.range.index, comment.range.length, 'user');
      quill.formatText(comment.range.index, comment.range.length, 'background', comment.color);
    }
  };

  // 📂 File upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      startTransition(() => {
        setValue(res.data.text || '');
        if (quill) {
          quill.root.innerHTML = res.data.text || '';
        }
      });
    } catch (err) {
      console.error('Upload failed:', err);
      alert('File upload failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // 📥 Download file
  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    link.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavSum />
      </div>

      <div className="flex flex-1">
        {/* Editor Section */}
        <div className="flex-1 px-8 py-10 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Edit Document</h1>
            <p className="text-gray-600 mb-4">
              Upload a PDF/DOCX to extract text, then edit, highlight, and add comments.
            </p>

            <div className="mb-6">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="mb-2"
              />
              {loading && <p className="text-sm text-gray-500">Uploading & extracting text...</p>}
            </div>

            <div className="bg-white border border-gray-300 rounded-lg shadow-sm relative">
              <div ref={quillRef} style={{ minHeight: '300px' }} />
              {showPopup && popupPos && (
                <div
                  style={{
                    position: 'absolute',
                    top: popupPos.top + 40,
                    left: popupPos.left + 20,
                    zIndex: 50,
                  }}
                  className="bg-black text-white px-2 py-1 rounded shadow cursor-pointer text-sm"
                  onClick={addComment}
                >
                  + Comment
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => console.log('Document saved:', value)}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleDownload}
                className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Download
              </button>
              {isPending && <span className="text-sm text-gray-500">Updating...</span>}
            </div>
          </div>
        </div>

        {/* Sidebar Comments */}
        <div className="w-80 border-l px-4 py-2 bg-gray-50">
          <h2 className="text-lg font-bold mb-3">Comments</h2>
          <ul>
            {comments.map((c) => (
              <li
                key={c.id}
                onClick={() => jumpToComment(c)}
                className="mb-2 p-2 rounded shadow-sm cursor-pointer hover:opacity-80"
                style={{ backgroundColor: c.color }}
              >
                <p className="text-sm font-medium">{c.target}</p>
                <p>{c.text}</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); editComment(c.id); }}
                    className="text-blue-600 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteComment(c.id); }}
                    className="text-red-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
