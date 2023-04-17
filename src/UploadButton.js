import React, {useEffect, useState} from 'react';
import {loadDatabase, validateDatabase} from "./SaveDatabase";

// eslint-disable-next-line react/prop-types
function UploadButton({onFileUpload, toolTip, SQLClient}) {
    const [db, setDb] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {

            const reader = new FileReader();
            reader.onload = function (event) {
                console.debug("UploadButton.handleFileChange.reader.onload")
                const save_data = new Uint8Array(event.target.result);
                if (validateDatabase(save_data)) {
                    setDb(loadDatabase(SQLClient, save_data));
                }
            }
            reader.readAsArrayBuffer(file);
        } catch (err) {
            setError(err);
        }
    };
    useEffect(() => {
        onFileUpload(db);
    }, [db])

    return (
        <div>
            <label htmlFor="file-upload" title={toolTip}>Select file to upload*: </label>
            <input type="file" id="file-upload" onChange={handleFileChange}/>
        </div>
    );
}

export default UploadButton;
