"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import ProtectedRoute from "../../protectedRoute";
import useUser from "./hooks/useUser";
import UploadModal from "@/modals/uploadModal";
import dynamic from "next/dynamic";
import DetailsModal from "@/modals/detials.Modal";
import { useRouter } from "next/navigation";

const PdfViewer = dynamic(() => import("../modals/pdfViewer"), { ssr: false });

interface FileType {
  id: string;
  filename: string;
  size: string;
  uploadedAt: string;
  type: string;
  fileUrl: string;
  uploadedBy?: string;
  userName?: string;
}

export default function HomePage() {
  const { userId, loading, userName } = useUser();
  const router = useRouter();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [viewingFile, setViewingFile] = useState<FileType | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null); // New state

  const filesPerPage = 5;
  const totalPages = Math.ceil(files.length / filesPerPage);
  const startIndex = (currentPage - 1) * filesPerPage;
  const currentFiles = files.slice(startIndex, startIndex + filesPerPage);

  const fetchFiles = async () => {
    try {
      const { data } = await axios.get(`/file/getallfiles/${userId}`);
      const formatted = data.files.map((file: any) => ({
        id: file._id,
        filename: file.filename,
        type: file.mimeType.split("/")[1]?.toUpperCase() || "Unknown",
        size: file.size,
        uploadedAt: file.uploadedAt,
        uploadedBy: file.user?.name,
        fileUrl: file.fileUrl,
      }));
      setFiles(formatted);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFiles();
    }
  }, [userId]);

  const handleLogout = async () => {
    const { data } = await axios.get("/auth/logout");
    if (data.success) {
      router.push("/login");
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const handleView = (file: FileType) => {
    if (file.type === "PDF") {
      setViewingFile(file);
    } else if (
      ["JPG", "JPEG", "PNG", "GIF", "WEBP", "MP4", "WEBM"].includes(file.type)
    ) {
      window.open(file.fileUrl, "_blank");
    } else {
      alert("Preview not supported. Try downloading instead.");
    }
  };

  const handleInfo = (file: FileType) => {
    setSelectedFile(file);
    setDetailsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    setDeletingFileId(id);
    try {
      const { data } = await axios.delete(`/file/deletefile/${id}`);
      if (data.success) {
        alert("File deleted successfully");
        fetchFiles(); // Refresh the list
      } else {
        alert("Failed to delete the file");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error occurred while deleting.");
    } finally {
      setDeletingFileId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center justify-start pt-20 px-4">
        {loading ? (
          <p>Loading user...</p>
        ) : (
          <div className="w-full max-w-4xl p-6">
            <p className="mb-4">👤 User Name: {userName ?? "Not logged in"}</p>

            <div className="flex justify-end mb-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => setIsUploadOpen(true)}
              >
                + Upload File
              </button>
              <button
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-300 ml-3"
                onClick={handleLogout}
              >
                Logout
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
                      onClick={() => handleView(file)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => handleInfo(file)}
                      className="text-gray-600 hover:text-gray-800"
                      title="Info"
                    >
                      <i className="ri-information-line"></i>
                    </button>
                    <button
                      onClick={() => handleDownload(file.fileUrl)}
                      className="text-green-600 hover:text-green-800"
                      title="Download"
                    >
                      <i className="ri-download-2-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className={`text-red-600 hover:text-red-800 ${
                        deletingFileId === file.id
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      title="Delete"
                      disabled={deletingFileId === file.id}
                    >
                      {deletingFileId === file.id ? (
                        <i className="ri-loader-4-line animate-spin" />
                      ) : (
                        <i className="ri-delete-bin-6-line" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

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

            {viewingFile && (
              <div className="mt-6 border rounded p-4 bg-white shadow">
                <h3 className="text-lg font-semibold mb-2">
                  Viewing: {viewingFile.filename}
                </h3>
                <PdfViewer fileUrl={viewingFile.fileUrl} />
                <button
                  onClick={() => setViewingFile(null)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close Viewer
                </button>
              </div>
            )}
          </div>
        )}

        <UploadModal
          isOpen={isUploadOpen}
          setIsOpen={setIsUploadOpen}
          userId={userId}
        />

        <DetailsModal
          isOpen={detailsModalOpen}
          setIsOpen={setDetailsModalOpen}
          file={selectedFile}
        />
      </div>
    </ProtectedRoute>
  );
}
