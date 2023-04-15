import React, {useEffect, useState} from 'react';
import initSqlJs from 'sql.js';
import {loadDatabase, validateDatabase} from "./SaveDatabase";
import App from "./App";

const MAGIC_HEADER = 'GVAS'
const DB_IMAGE_STR = 'RawDatabaseImage'

function indexOfSequence(arr, seq) {
    const seqLength = seq.length;
    const arrLength = arr.length - seqLength;
    for (let i = 0; i <= arrLength; i++) {
        let j = 0;
        while (j < seqLength && arr[i + j] === seq[j]) {
            j++;
        }
        if (j === seqLength) {
            return i;
        }
    }
    return -1;
}

function UploadButton({onFileUpload, toolTip, SQLClient}) {
    const [db, setDb] = useState(null);
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
