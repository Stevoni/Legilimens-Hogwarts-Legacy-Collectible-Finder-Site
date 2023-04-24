import React, {useState} from 'react';
import {loadDatabase, validateDatabase} from "./SaveDatabase";
import PropTypes from "prop-types";
import "./style/UploadButton.css"
import FolderHelpTable from "./FolderHelpTable";


function UploadButton({onFileUpload, SQLClient}) {
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0])
        if (!file) return;
        try {

            const reader = new FileReader();
            reader.onload = function (event) {
                console.debug("UploadButton.handleFileChange.reader.onload")
                try {
                    const save_data = new Uint8Array(event.target.result);
                    if (validateDatabase(save_data)) {
                        const newDb = loadDatabase(SQLClient, save_data);
                        onFileUpload(newDb);
                    }
                } catch (err) {
                    console.error(err);
                    setError(err);
                }
            }

            reader.readAsArrayBuffer(file);
            setError(null);
        } catch (err) {
            console.error("Error occurred: ", err);
            setError(err);
        }
    };

    return (
        <div className="file-upload">
            <FolderHelpTable/>
            <br/>
            <label id="file-upload-label" title="The file 'uploaded' is processed in the browser and does not leave your computer">Select file to upload*: </label>
            <br/>
            <input type="file" id="file-upload" onChange={handleFileChange}/>
            {error &&
                <div>
                    <label className="file-upload-error">Error: {error.message}</label>
                </div>
            }
        </div>
    );
}

UploadButton.propTypes = {
    onFileUpload: PropTypes.func.isRequired,
    SQLClient: PropTypes.object
};

export default UploadButton;
