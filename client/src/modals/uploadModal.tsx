"use client";

import { Dialog, Transition } from "@headlessui/react";
import { log } from "console";
import { Upload, X } from "lucide-react";
import { Fragment, useState } from "react";

export default function UploadModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(""); // You can pre-fill with logged-in user ID if available

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return alert("Fill all fields");

    const payload = {
      filename: file.name,
      originalName: file.name,
      size: file.size,
    };

    try {
      console.log(payload);
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-800">
                  Upload File
                </Dialog.Title>
                <X
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="space-y-4">
                <input
                  type="file"
                  accept="*/*"
                  onChange={handleFileChange}
                  className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                />
              </div>

              <button
                onClick={handleUpload}
                className="mt-6 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              >
                <Upload size={18} /> Upload File
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
