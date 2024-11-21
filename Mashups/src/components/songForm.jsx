import React, { useState } from "react";
import axios from "axios";

const SongUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    artist: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    // Create FormData for the request
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image); // Image is a URL
    formDataToSend.append("artist", formData.artist);
    formDataToSend.append("file", formData.file);

    try {
      const response = await apiconnecter('post','songs/createsongs',
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResponseMessage(response.data.message || "Song uploaded successfully!");
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Error uploading the song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload a Song</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">
            Song Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter song name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium text-gray-700">
            Artist Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="artist" className="mb-2 font-medium text-gray-700">
            Artist Name:
          </label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter artist name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="file" className="mb-2 font-medium text-gray-700">
            Song File:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </form>

      {responseMessage && (
        <p className="mt-4 text-center text-gray-700">{responseMessage}</p>
      )}
    </div>
  );
};

export default SongUploadForm;
