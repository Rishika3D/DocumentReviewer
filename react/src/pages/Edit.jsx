import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavSum from '../components/NavSum';

// 1️⃣ Create & Register HighlightBlot
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

const Edit = () => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
        ['highlight'] // custom button
      ],
      handlers: {
        highlight: function () {
          const range = this.quill.getSelection();
          if (range) {
            this.quill.format('highlight', 'yellow');
          }
        },
        link: function () {
          const url = prompt('Enter the link URL');
          if (url) {
            this.quill.format('link', url);
          } else {
            this.quill.format('link', false);
          }
        },
        image: function () {
          const url = prompt('Enter image URL');
          if (url) {
            this.quill.insertEmbed(this.quill.getSelection().index, 'image', url);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <NavSum />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Edit Document</h1>
          <p className="text-gray-600 mb-8">
            Use the rich text editor below to edit and highlight your document.
          </p>

          {/* Editor */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
            <ReactQuill
              value={value}
              onChange={setValue}
              modules={modules}
              placeholder="Start writing..."
              theme="snow"
              className="rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            <button
              onClick={() => console.log('Document saved:', value)}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
