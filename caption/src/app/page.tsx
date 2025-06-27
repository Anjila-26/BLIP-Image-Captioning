'use client';

import React, { useState } from 'react';
import { Upload, Link, FileImage, Loader2, ImageIcon } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:8000'; // Adjust this to your backend URL

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setCaption('');
      setError('');
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);
    if (url) {
      setPreviewUrl(url);
      setCaption('');
      setError('');
    }
  };

  const generateCaption = async () => {
    if (!selectedFile && !imageUrl) {
      setError('Please select a file or enter an image URL');
      return;
    }

    setLoading(true);
    setError('');
    setCaption('');

    try {
      let response;

      if (activeTab === 'upload' && selectedFile) {
        const formData = new FormData();
        formData.append('uploaded_file', selectedFile);
        
        response = await fetch(`${API_BASE}/caption/upload`, {
          method: 'POST',
          body: formData,
        });
      } else if (activeTab === 'url' && imageUrl) {
        response = await fetch(`${API_BASE}/caption/link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image_link: imageUrl }),
        });
      }

      if (!response) {
        setError('No response from server.');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setCaption(data.caption);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate caption: ${err.message}`);
      } else {
        setError('Failed to generate caption: An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setSelectedFile(null);
    setImageUrl('');
    setPreviewUrl('');
    setCaption('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Image Captioning</h1>
          <p className="text-gray-600">Generate captions for your images using AI</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Upload className="inline-block w-4 h-4 mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'url'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Link className="inline-block w-4 h-4 mr-2" />
            Image URL
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {activeTab === 'upload' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <FileImage className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">
                    {selectedFile ? selectedFile.name : 'Choose an image file'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Click to browse or drag and drop
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={generateCaption}
                disabled={loading || (!selectedFile && !imageUrl)}
                className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Caption'
                )}
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Preview and Results Section */}
          <div className="space-y-6">
            {/* Image Preview */}
            {previewUrl && (
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                  onError={() => setError('Failed to load image')}
                />
              </div>
            )}

            {/* Caption Result */}
            {caption && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Generated Caption:</h3>
                <p className="text-gray-800 leading-relaxed">{caption}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Placeholder when no image */}
            {!previewUrl && !loading && (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">
                  {activeTab === 'upload' 
                    ? 'Select a file to see preview' 
                    : 'Enter an image URL to see preview'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Powered by BLIP Image Captioning Model</p>
        </div>
      </div>
    </div>
  );
}