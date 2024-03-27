import React, { useState, useEffect } from "react";
import "./DocumentUpload.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Navbar from "./Navbar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
//import SideNav from "./SideNav";

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [modelState, setmodelState] = useState(false);
  useEffect(() => {
    // Fetch the list of documents from the API when the component mounts
    fetchDocumentList();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(
          "http://localhost:5253/api/documents/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const uploadedDocument = await response.json();
          setDocumentList([...documentList, uploadedDocument]);

          fetchDocumentList();
          setSelectedFile(null);

          // Clear the file input field
          const fileInput = document.getElementById("file-input");
          if (fileInput) {
            fileInput.value = "";
          }
        } else {
          console.error("Failed to upload document:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading document:", error);
      }
    }
  };

  const fetchDocumentList = async () => {
    try {
      const response = await fetch("http://localhost:5253/api/documents/list");

      if (response.ok) {
        const documents = await response.json();
        setDocumentList(documents);
      } else {
        console.error("Failed to fetch document list:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching document list:", error);
    }
  };

  const handleDelete = async (index, fileName) => {
    // try {
    //   const response = await fetch(
    //     `https://localhost:7238/api/documents/delete/${fileName}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   if (response.ok) {
    //     const updatedList = [...documentList];
    //     updatedList.splice(index, 1);
    //     setDocumentList(updatedList);
    //   } else {
    //     const errorMessage = await response.text(); // Get the error message from the response
    //     console.error(`Failed to delete document: ${errorMessage}`);
    //   }
    // } catch (error) {
    //   console.error("Error deleting document:", error);
    // }
    setFileToDelete({ index, fileName });
    setmodelState(true);
  };

  const confirmDelete = async () => {
    if (fileToDelete) {
      await deleteDocument(fileToDelete.index, fileToDelete.fileName);
      setFileToDelete(null);
      setmodelState(false);
    }
  };

  const deleteDocument = async (index, fileName) => {
    try {
      const response = await fetch(
        `http://localhost:5253/api/documents/delete/${fileName}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedList = [...documentList];
        updatedList.splice(index, 1);
        setDocumentList(updatedList);
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        console.error(`Failed to delete document: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const cancelDelete = () => {
    setFileToDelete(null);
    setmodelState(false);
  };
  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className={`chatbox-container ${modelState ? "modal-active" : ""}`}>
      {modelState && <div className="backdrop" />}
      <div className="side-nav-left">
        <Navbar />
      </div>
      <div className="main-content">
        <div className="left-section">
          <div className="document-upload-container">
            <div className="document-upload-list">
              <h3>Document Upload</h3>
              <div className="file-input-container">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="file-input"
                />
              </div>
              <div className="upload-button-container">
                <button className="upload-button" onClick={handleUpload}>
                  <FileUploadIcon />
                </button>
              </div>
            </div>
            <div className="doc-count">
              <p>Total Documents: {documentList.length}</p>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="document-container">
            <div className="document-list">
              <h3>Uploaded Documents</h3>
              <table className="document-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documentList.map((document, index) => (
                    <tr key={index}>
                      <td>{document.name}</td>
                      <td>{bytesToMB(document.size)}</td>
                      {/* <td>{document.size}</td> */}
                      <td>
                        {/* You may need to replace DeleteForeverIcon with your actual delete icon */}
                        <DeleteForeverIcon
                          onClick={() => handleDelete(index, document.name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {fileToDelete && (
        <div className="delete-modal-overlay  ">
          <div className="delete-modal">
            <p>{`Are you sure you want to delete file ${fileToDelete.fileName}?`}</p>
            <button onClick={confirmDelete}>
              <CheckIcon />
            </button>
            <button onClick={cancelDelete}>
              <CloseIcon></CloseIcon>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
