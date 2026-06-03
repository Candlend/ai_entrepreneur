'use client';

import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
}

export default function VideoUploader({ onVideoUpload }: VideoUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onVideoUpload(file);
      }
    }
  });

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {!selectedFile ? (
        <>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer
              transition-all duration-300 hover:scale-[1.02]
              ${isDragActive
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/30'
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="space-y-2 sm:space-y-3">
              <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isDragActive ? 'bg-purple-200' : 'bg-gray-100'
              }`}>
                <svg
                  className={`h-8 w-8 sm:h-10 sm:w-10 transition-colors duration-300 ${
                    isDragActive ? 'text-purple-600' : 'text-gray-400'
                  }`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M24 8v24m-8-8l8 8 8-8M8 40h32"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  {isDragActive ? '📥 松手上传' : '🎬 拖拽视频文件到这里'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  支持 MP4、MOV、AVI、MKV 格式，最大 2GB
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
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                onVideoUpload(file);
              }
            }}
          />

          <button
            onClick={handleFileSelect}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm sm:text-base">选择视频文件</span>
          </button>
        </>
      ) : (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-600 mt-1">大小: {formatFileSize(selectedFile.size)}</p>
            </div>
            <button
              onClick={() => {
                setSelectedFile(null);
                onVideoUpload(null as any);
              }}
              className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
