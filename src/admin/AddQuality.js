import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const QualityTable = () => {
  const [qualities, setQualities] = useState([]);
  const [newQualityName, setNewQualityName] = useState("");
  const [newQualityDescription, setNewQualityDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editQualityId, setEditQualityId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteQualityId, setDeleteQualityId] = useState(null);

  // Fetch qualities from the API
  useEffect(() => {
    fetchQualities();
  }, []);

  const fetchQualities = () => {
    fetch("https://servers-beit.onrender.com/api/qualities")
      .then((response) => response.json())
      .then((data) => setQualities(data))
      .catch((error) => console.error("Error fetching qualities:", error));
  };

  const handleAddQuality = () => {
    fetch("https://servers-beit.onrender.com/api/qualities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newQualityName,
        description: newQualityDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQualities([...qualities, data]);
        setNewQualityName("");
        setNewQualityDescription("");
        toast.success("Quality created successfully!");
      })
      .catch((error) => {
        console.error("Error adding quality:", error);
        toast.error("Failed to create quality");
      });
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setEditQualityId(id);

    const qualityToEdit = qualities.find((quality) => quality._id === id);
    setNewQualityName(qualityToEdit.name);
    setNewQualityDescription(qualityToEdit.description);
  };

  const handleUpdateQuality = () => {
    fetch(`https://servers-beit.onrender.com/api/qualities/${editQualityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newQualityName,
        description: newQualityDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQualities = qualities.map((quality) => {
          if (quality._id === editQualityId) {
            return data;
          }
          return quality;
        });
        setQualities(updatedQualities);
        setNewQualityName("");
        setNewQualityDescription("");
        setEditMode(false);
        setEditQualityId(null);
        toast.success("Quality updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating quality:", error);
        toast.error("Failed to update quality");
      });
  };

  const handleDelete = (id) => {
    setDeleteQualityId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`https://servers-beit.onrender.com/api/qualities/${deleteQualityId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete quality");
        }
        return response.json();
      })
      .then(() => {
        const updatedQualities = qualities.filter(
          (quality) => quality._id !== deleteQualityId
        );
        setQualities(updatedQualities);
        toast.success("Quality deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting quality:", error);
        toast.error("Failed to delete quality");
      })
      .finally(() => {
        setDeleteConfirmationOpen(false);
        setDeleteQualityId(null);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteQualityId(null);
  };

  return (
    <div className="w-full mt-6 bg-nav border-nav border-2 rounded-lg">
      <h1 className="text-3xl mt-4 ml-4 font-semibold mb-4 font-login">
        QUALITY LIST
      </h1>

      {/* Add Quality Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Quality Name"
          value={newQualityName}
          onChange={(e) => setNewQualityName(e.target.value)}
          className="mr-2 px-4 ml-4 py-2 border border-gray-300 rounded-md focus:ring-darkgray focus:border-darkgray"
        />
        <input
          type="text"
          placeholder="Quality Description"
          value={newQualityDescription}
          onChange={(e) => setNewQualityDescription(e.target.value)}
          className="mr-2 px-4 ml-4 py-2 border border-gray-300 rounded-md focus:ring-darkgray focus:border-darkgray"
        />
        {editMode ? (
          <button
            onClick={handleUpdateQuality}
            className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
          >
            Update Quality
          </button>
        ) : (
          <button
            onClick={handleAddQuality}
            className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
          >
            Add Quality
          </button>
        )}
      </div>

      {/* Quality Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y mt-6 divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-header text-header-font font-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-login font-header text-[20px] font-medium divide-gray-200">
            {qualities.map((quality) => (
              <tr key={quality._id}>
                <td className="px-6 py-2 whitespace-nowrap">{quality.name}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {quality.description}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(quality._id)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quality._id)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-white outline ml-2 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteConfirmationOpen}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default QualityTable;
