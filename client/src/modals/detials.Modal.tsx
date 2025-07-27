// src/modals/DetailsModal.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface FileDetails {
  filename: string;
  type: string;
  size: string;
  uploadedAt: string;
  fileUrl: string;
  uploadedBy?: string;
}

export default function DetailsModal({
  isOpen,
  setIsOpen,
  file,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  file: FileDetails | null;
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              📄 File Details
            </Dialog.Title>

            {file && (
              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Filename:</strong> {file.filename}
                </p>
                <p>
                  <strong>Type:</strong> {file.type}
                </p>
                <p>
                  <strong>Size:</strong> {file.size}
                </p>
                <p>
                  <strong>Uploaded At:</strong>{" "}
                  {new Date(file.uploadedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Uploaded By:</strong> {file.uploadedBy ?? "Unknown"}
                </p>
                <p className="truncate">
                  <strong>Cloud URL:</strong>{" "}
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {file.fileUrl}
                  </a>
                </p>
              </div>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
