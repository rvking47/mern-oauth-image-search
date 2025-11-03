import React, { useEffect, useState } from "react";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';



const base_url = "https://mern-oauth-image-search-backend.onrender.com";

const SearchUI = () => {
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topSearch, setTopSearch] = useState([]);
  const [error, setError] = useState("");
  const accessToken = localStorage.getItem("accessToken");


  const handleFetchImages = async (searchTerm = "all") => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${base_url}/api/images`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { term: searchTerm },
        validateStatus: () => true,
      });
      if (res.status === 200) {
        setImages(res.data.results || []);
      }
    }
    catch (err) {
      toast.error("Server Error:", err);
    }
    finally {
      setLoading(false);
    }
  }

  const handleSearch = async () => {
    if (!term.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${base_url}/api/search`, { term }, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
        validateStatus: () => true
      });
      if (res.status === 200) {
        setImages(res.data.results);
      }
      else if (term === "") {
        handleFetchImages();
      }
    }
    catch (err) {
      toast.error("Server Error:", err);
    }
    finally {
      setLoading(false);
    }
  }

  const handleTopSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/api/top-histroy`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true
      });
      if (res.status === 200) {
        setTopSearch(res.data);
      }
    }
    catch (err) {
      toast.error("Server Error:", err);
    }
  }
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    handleFetchImages();
    handleTopSearch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster />
      <div className="flex flex-col items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 font-sans">Image Search</h1>

        <div className="w-full sm:w-3/4 lg:w-2/3">
          <div className="flex items-center gap-2">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search images..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md shadow"
              onClick={handleSearch}
            >
              <FaSearch />
              <span className="font-medium">Search</span>
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-1 font-sans">
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="font-semibold text-gray-800">Most Popular Searches (Across All Users):</span>
            {loading && (
              <p className="text-center text-gray-600 mt-6 font-medium">
                Loading...
              </p>
            )}
            {!loading && topSearch.length > 0 ? (
              topSearch.map((val) => (
                <span
                  key={val._id}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition"
                >
                  {val._id} ({val.count})
                </span>
              ))
            ) : (
              <span className="text-gray-500 italic ml-2">No Search History</span>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600 font-sans">
          Selected:{" "}
          <span className="font-medium text-blue-600">{selected.length}</span>{" "}
          image{selected.length !== 1 && "s"}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && (
          <p className="text-center text-gray-600 mt-6 font-medium">
            Loading images...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 mt-4 font-medium">{error}</p>
        )}
        {!loading && images.length > 0 && (
          <>
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => toggleSelect(img.id)}
                className={`relative overflow-hidden rounded-lg shadow-sm transition cursor-pointer 
                ${selected.includes(img.id)
                    ? "ring-4 ring-blue-500 scale-[0.98]"
                    : "hover:shadow-md"
                  }`}
              >
                <img
                  src={img.urls.small}
                  alt={img.alt_description || "Unsplash Image"}
                  className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                />
                {selected.includes(img.id) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <FaCheckCircle className="text-white text-3xl" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 from-black/60 to-transparent text-white text-xs">
                  {img.user.name}
                </div>
              </div>
            ))}
          </>
        )}

        {!loading && images.length === 0 && !error && (
          <p className="text-center text-gray-500 mt-10">
            Try searching for something like <strong>"Nature"</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchUI;

