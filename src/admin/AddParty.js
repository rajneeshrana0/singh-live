import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const PartyTable = () => {
  const [parties, setParties] = useState([]);
  const [newPartyName, setNewPartyName] = useState("");
  const [newPartyDescription, setNewPartyDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editPartyId, setEditPartyId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletePartyId, setDeletePartyId] = useState(null);

  // Fetch parties from the API
  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = () => {
    fetch("https://servers-beit.onrender.com/api/parties")
      .then((response) => response.json())
      .then((data) => setParties(data))
      .catch((error) => console.error("Error fetching parties:", error));
  };

  const handleAddParty = () => {
    fetch("https://servers-beit.onrender.com/api/parties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newPartyName,
        description: newPartyDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setParties([...parties, data]);
        setNewPartyName("");
        setNewPartyDescription("");
        toast.success("Party created successfully!");
      })
      .catch((error) => {
        console.error("Error adding party:", error);
        toast.error("Failed to create party");
      });
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setEditPartyId(id);

    const partyToEdit = parties.find((party) => party._id === id);
    setNewPartyName(partyToEdit.name);
    setNewPartyDescription(partyToEdit.description);
  };

  const handleUpdateParty = () => {
    fetch(`https://servers-beit.onrender.com/api/parties/${editPartyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newPartyName,
        description: newPartyDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedParties = parties.map((party) => {
          if (party._id === editPartyId) {
            return data;
          }
          return party;
        });
        setParties(updatedParties);
        setNewPartyName("");
        setNewPartyDescription("");
        setEditMode(false);
        setEditPartyId(null);
        toast.success("Party updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating party:", error);
        toast.error("Failed to update party");
      });
  };

  const handleDelete = (id) => {
    setDeletePartyId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`https://servers-beit.onrender.com/api/parties/${deletePartyId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete party");
        }
        return response.json();
      })
      .then(() => {
        const updatedParties = parties.filter(
          (party) => party._id !== deletePartyId
        );
        setParties(updatedParties);
        toast.success("Party deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting party:", error);
        toast.error("Failed to delete party");
      })
      .finally(() => {
        setDeleteConfirmationOpen(false);
        setDeletePartyId(null);
      });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeletePartyId(null);
  };

  return (
    <div className="w-full mt-6 bg-nav border-nav border-2 rounded-lg">
      <h1 className="text-3xl ml-4 mt-4 font-semibold mb-4 font-login">
        PARTY LIST
      </h1>

      {/* Add Party Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Party Name"
          value={newPartyName}
          onChange={(e) => setNewPartyName(e.target.value)}
          className="mr-2 px-4 ml-4 py-2 border border-gray-300 rounded-md focus:ring-darkgray focus:border-darkgray"
        />
        <input
          type="text"
          placeholder="Party Description"
          value={newPartyDescription}
          onChange={(e) => setNewPartyDescription(e.target.value)}
          className="mr-2 px-4 ml-4 py-2 border border-gray-300 rounded-md focus:ring-darkgray focus:border-darkgray"
        />
        {editMode ? (
          <button
            onClick={handleUpdateParty}
            className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
          >
            Update Party
          </button>
        ) : (
          <button
            onClick={handleAddParty}
            className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
          >
            Add Party
          </button>
        )}
      </div>

      {/* Party Table */}
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
            {parties.map((party) => (
              <tr key={party._id}>
                <td className="px-6 py-2 whitespace-nowrap">{party.name}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {party.description}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(party._id)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(party._id)}
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

export default PartyTable;
