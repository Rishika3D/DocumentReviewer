'use client'; // safe to keep

import React, { useState, useTransition, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import NavSum from '../components/NavSum';
import axios from 'axios';
import Quill from 'quill';

// Highlight blot setup
const Inline = Quill.import('blots/inline');
class HighlightBlot extends Inline {
  static create(value) {
    const node = super.create();
    node.style.backgroundColor = value;
    return node;
  }
  static formats(node) {
    return node.style.backgroundColor;
  }
}
HighlightBlot.blotName = 'highlight';
HighlightBlot.tagName = 'span';
Quill.register(HighlightBlot);

export default function Edit() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
        ['highlight'],
      ],
      handlers: {
        highlight() {
          const range = this.quill.getSelection();
          if (range) this.quill.format('highlight', 'yellow');
        },
        link() {
          const url = prompt('Enter the link URL');
          this.quill.format('link', url || false);
        },
        image() {
          const url = prompt('Enter image URL');
          if (url) {
            this.quill.insertEmbed(this.quill.getSelection().index, 'image', url);
          }
        },
      },
    },
  };

  const { quill, quillRef } = useQuill({ theme: 'snow', modules, placeholder: 'Start writing...' });

  // Sync Quill content with state
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        startTransition(() => setValue(quill.root.innerHTML));
      });
    }
  }, [quill]);

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
      console.error('Error uploading file:', err);
      alert('File upload failed. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

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

      <div className="flex-1 px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Edit Document</h1>
          <p className="text-gray-600 mb-4">
            Upload a PDF/DOCX to extract text, then edit and highlight as needed.
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

          <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <div ref={quillRef} style={{ minHeight: '300px' }} />
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
    </div>
  );
}
