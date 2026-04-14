'use client';

import { useState } from 'react';
import { Upload, X, Music, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  file: File;
  id: string;
}

export default function SoundUpload() {
  const [uploadMode, setUploadMode] = useState<'single' | 'multiple' | 'zip'>('single');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    
    if (uploadMode === 'single') {
      if (newFiles.length > 0) {
        setFiles([{ file: newFiles[0], id: Math.random().toString() }]);
      }
    } else {
      setFiles([
        ...files,
        ...newFiles.map(f => ({ file: f, id: Math.random().toString() }))
      ]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Please select files to upload' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      files.forEach(({ file }) => {
        formData.append('files', file);
      });
      formData.append('mode', uploadMode);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.message || 'Upload failed' });
        return;
      }

      setMessage({ type: 'success', text: `Successfully uploaded ${files.length} file(s)` });
      setFiles([]);
      setUploadProgress(0);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Upload failed' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="grid grid-cols-3 gap-3">
        {(['single', 'multiple', 'zip'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => {
              setUploadMode(mode);
              setFiles([]);
              setMessage(null);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              uploadMode === mode
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Music size={20} className="mx-auto mb-2" />
            <p className="text-xs font-medium capitalize">{mode} Sound{mode !== 'single' ? 's' : ''}</p>
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          multiple={uploadMode !== 'single'}
          accept={uploadMode === 'zip' ? '.zip' : 'audio/*'}
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer block">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">
            {uploadMode === 'zip' ? 'Drop ZIP file here or click to select' : 'Drop audio files here or click to select'}
          </p>
          <p className="text-xs text-foreground/60">
            {uploadMode === 'zip' 
              ? 'Supported: .zip files with audio files inside'
              : 'Supported: MP3, WAV, OGG, M4A, FLAC'}
          </p>
        </label>
      </div>

      {/* Message */}
      {message && (
        <div className={`rounded-lg p-4 flex items-gap-3 ${
          message.type === 'success'
            ? 'bg-green-500/10 border border-green-500/30'
            : 'bg-destructive/10 border border-destructive/30'
        }`}>
          <AlertCircle size={18} className={message.type === 'success' ? 'text-green-500' : 'text-destructive'} />
          <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-destructive'}`}>
            {message.text}
          </p>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm font-medium mb-3">Selected files ({files.length})</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map(({ file, id }) => (
              <div key={id} className="flex items-center justify-between bg-background p-3 rounded-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <Music size={16} className="text-muted-foreground flex-shrink-0" />
                  <p className="text-sm text-foreground truncate">{file.name}</p>
                  <span className="text-xs text-foreground/60 flex-shrink-0">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button
                  onClick={() => removeFile(id)}
                  className="text-foreground/60 hover:text-destructive transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Uploading...</p>
            <span className="text-xs text-foreground/60">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
      >
        {isUploading ? `Uploading... ${uploadProgress}%` : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
      </Button>
    </div>
  );
}
