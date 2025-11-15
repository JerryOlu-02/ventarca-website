"use client";

import "@/styles/components/common/fileuploadinput.scss";
import FileUpload from "@/public/icon/file-upload.svg";

import {
  ChangeEvent,
  DetailedHTMLProps,
  DOMAttributes,
  DragEventHandler,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

export default function FileUploadInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLElement>(null);

  const [content, setContent] = useState<string>(
    "Upload a file or drag and drop"
  );

  useEffect(() => {
    // fileRef.current?.addEventListener("drop", _, false);
  }, []);

  const handleFileChange = function (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setContent(e.target.files[0].name);
    } else {
      setContent("Upload a file or drag and drop");
    }
  };

  const handleFileDrop = function (e: React.DragEvent) {
    console.log(e);
    const dt = e.dataTransfer;
    const files = dt?.files;

    if (files && files.length > 0) {
      if (inputRef.current) inputRef.current.files = files;

      setContent(files[0].name);
    }
  };

  const handleFileSelect = function () {
    inputRef.current?.click();
  };

  return (
    <aside
      onDrop={handleFileDrop}
      ref={fileRef}
      onClick={handleFileSelect}
      className="file_upload"
    >
      <FileUpload />

      <div>
        <p>
          {/* <span>Upload a file</span> or drag and drop */}
          {content}
        </p>

        <p>PNG, JPG, GIF up to 10MB</p>
      </div>

      <input onChange={handleFileChange} ref={inputRef} type="file" multiple />
    </aside>
  );
}
