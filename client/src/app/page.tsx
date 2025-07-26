"use client";

import { useState } from "react";
import axios from "../../utils/axiosInstance";
import ProtectedRoute from "../../protectedRoute";
import useUser from "./hooks/useUser";
import UploadModal from "@/modals/uploadModal";

interface FileType {
  id: string;
  filename: string;
  size: string;
  uploadedAt: string;
  type: string;
}

export default function HomePage() {
  const { userId, loading } = useUser();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;

  const dummyFiles: FileType[] = [
    {
      id: "1",
      filename: "resume.pdf",
      size: "120 KB",
      uploadedAt: "2025-07-26T10:15:00Z",
      type: "PDF",
    },
    {
      id: "2",
      filename: "profile-pic.jpg",
      size: "340 KB",
      uploadedAt: "2025-07-25T14:20:00Z",
      type: "Image",
    },
    {
      id: "3",
      filename: "project.zip",
      size: "2.4 MB",
      uploadedAt: "2025-07-24T09:00:00Z",
      type: "Archive",
    },
    {
      id: "4",
      filename: "invoice.docx",
      size: "180 KB",
      uploadedAt: "2025-07-23T08:30:00Z",
      type: "Document",
    },
    {
      id: "5",
      filename: "presentation.pptx",
      size: "1.2 MB",
      uploadedAt: "2025-07-22T11:10:00Z",
      type: "Presentation",
    },
    {
      id: "6",
      filename: "code.js",
      size: "15 KB",
      uploadedAt: "2025-07-21T13:45:00Z",
      type: "Code",
    },
    {
      id: "7",
      filename: "design.fig",
      size: "512 KB",
      uploadedAt: "2025-07-20T17:25:00Z",
      type: "Design",
    },
    {
      id: "8",
      filename: "notes.txt",
      size: "12 KB",
      uploadedAt: "2025-07-19T10:00:00Z",
      type: "Text",
    },
  ];

  const totalPages = Math.ceil(dummyFiles.length / filesPerPage);
  const startIndex = (currentPage - 1) * filesPerPage;
  const currentFiles = dummyFiles.slice(startIndex, startIndex + filesPerPage);

  const handleDownload = (filename: string) => {
    alert(`Downloading ${filename}`);
  };

  const handleView = (filename: string) => {
    alert(`Viewing ${filename}`);
  };

  const handleDelete = (filename: string) => {
    alert(`Deleting ${filename}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center justify-start pt-20 px-4">
        {loading ? (
          <p>Loading user...</p>
        ) : (
          <div className="w-full max-w-4xl p-6">
            <p className="mb-4">👤 User ID: {userId ?? "Not logged in"}</p>

            {/* Upload button */}
            <div className="flex justify-end mb-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => setIsUploadOpen(true)}
              >
                + Upload File
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">📁 Uploaded Files</h2>
            <div className="bg-white text-black rounded-lg shadow-md p-4 space-y-3">
              {currentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-semibold">{file.filename}</p>
                    <p className="text-sm text-gray-500">
                      {file.type} • {file.size} •{" "}
                      {new Date(file.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-3 text-xl">
                    <button
                      onClick={() => handleView(file.filename)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => handleDownload(file.filename)}
                      className="text-green-600 hover:text-green-800"
                      title="Download"
                    >
                      <i className="ri-download-2-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(file.filename)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
        <UploadModal isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />
      </div>
    </ProtectedRoute>
  );
}
