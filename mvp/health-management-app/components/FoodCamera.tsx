'use client';

import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

interface FoodCameraProps {
  onImageCapture: (file: File) => void;
}

export default function FoodCamera({ onImageCapture }: FoodCameraProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        handleFileSelect(file);
      }
    }
  });

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageCapture(file);
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setPreview(null);
    onImageCapture(null as any);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="预览"
            className="w-full rounded-xl shadow-lg border-2 border-gray-200"
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="清除图片"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-200" />
        </div>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer
              transition-all duration-300 hover:scale-[1.02]
              ${isDragActive
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50/30'
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="space-y-2 sm:space-y-3">
              <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isDragActive ? 'bg-green-200' : 'bg-gray-100'
              }`}>
                <svg
                  className={`h-8 w-8 sm:h-10 sm:w-10 transition-colors duration-300 ${
                    isDragActive ? 'text-green-600' : 'text-gray-400'
                  }`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  {isDragActive ? '📥 松手上传' : '📤 拖拽或点击上传'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  支持 JPG、PNG、WEBP
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-white text-gray-500">或</span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />

          <button
            onClick={handleCameraClick}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm sm:text-base">📸 打开相机拍照</span>
          </button>
        </>
      )}
    </div>
  );
}
