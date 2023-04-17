// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
// import initSqlJs from 'sql.js';

// database.js

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

export function validateDatabase(saveFile) {
    const encoder = new TextEncoder()

    if (!saveFile.slice(0, MAGIC_HEADER.length).every(
        (value, index) => value === encoder.encode(MAGIC_HEADER)[index])) {
        logAndThrowError('Magic header not found');
    }

    if (indexOfSequence(saveFile, encoder.encode(DB_IMAGE_STR)) === -1) {
        logAndThrowError('DB Image string not found');
    }

    return true;
}

export function loadDatabase(SQLClient, saveData) {
    const encoder = new TextEncoder()
    const dbStartIdx = indexOfSequence(saveData, encoder.encode(DB_IMAGE_STR)) + 65;
    console.debug(`db_start_idx: ${dbStartIdx}`);
    const dbSizeInput = saveData.slice(dbStartIdx - 4, dbStartIdx);
    console.debug(`db_size_input: ${dbSizeInput}`);
    const dbSize = new DataView(dbSizeInput.buffer).getUint32(0, true);
    console.debug(`db_size: ${dbSize}`);
    const dbData = saveData.slice(dbStartIdx, dbStartIdx + dbSize);

    const testDb = new SQLClient.Database(dbData);
    const testTables = testDb.exec("SELECT name FROM sqlite_master WHERE type='table';")

    if (testTables == null) {
        logAndThrowError("Unable to validate loaded database");
    } else {
        console.debug(testTables);
    }
    // db = testDb;
    return testDb;
}

// export function executeQuery(query) {
//     var result = null;
//     if (db != null) {
//         result = db.exec("SELECT name FROM sqlite_master WHERE type='table';")
//     }
//     return result;
// }

function logAndThrowError(errorMessage) {
    console.error(errorMessage);
    throw new Error(errorMessage);
}