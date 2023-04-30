// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import initSqlJs from "sql.js";

const MAGIC_HEADER = 'GVAS'
const DB_IMAGE_STR = 'RawDatabaseImage'

// eslint-disable-next-line no-unused-vars
const DB_EXCLUSIVE_STR = 'RawExclusiveImage'

/**
 * Return the ending index of the sequence found in the array.
 * @param arr {Uint8Array | string}
 * @param seq {Uint8Array | string}
  * @returns {number}
 */
export function findSequenceInArray(arr, seq)  {

    // If they're both strings, do the simpler string conversion
    if (typeof arr === "string" && typeof seq === "string"){
        return arr.indexOf(seq);
    }
    if ((arr instanceof  Uint8Array && seq instanceof  Uint8Array) === false){
        // Unexpected, throw error?
    }

    const seqLength = seq.length;
    const arrLength = arr.length

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

/**
 * Validate the database format
 * @param saveFile {Uint8Array}
 * @throws {Error}
 * @returns {boolean}
 *
 */
export function validateDatabase(saveFile) {
    const encoder = new TextEncoder()

    if (findSequenceInArray(saveFile, encoder.encode(MAGIC_HEADER)) === -1) {
        logAndThrowError('Magic header not found');
    }

    if (findSequenceInArray(saveFile, encoder.encode(DB_IMAGE_STR)) === -1) {
        logAndThrowError('DB Image string not found');
    }

    return true;
}

export function loadDatabase(SQLClient, saveData) {
    const parameters = findDatabasesInFile(saveData, DB_IMAGE_STR);

    // eslint-disable-next-line no-unused-vars
    const [testDb, dbData] = initializeDatabase(SQLClient, saveData, parameters);

    const testTables = testDb.exec("SELECT name FROM sqlite_master WHERE type='table';")
    if (testTables == null) {
        logAndThrowError("Unable to validate loaded database");
    } else {
        console.info("Database loaded");
        // console.debug(testTables);
    }
    // exportSaveFile(dbData, `${DB_IMAGE_STR}-tmp.db`);

    // db = testDb;
    return testDb;
}

// eslint-disable-next-line no-unused-vars
export function loadExclusiveDatabase(SQLClient, saveData) {
    const parameters = findDatabasesInFile(saveData, DB_EXCLUSIVE_STR);
    const [testDb, dbData] = initializeDatabase(SQLClient, saveData, parameters);

    const testTables = testDb.exec("SELECT name FROM sqlite_master WHERE type='table';")
    if (testTables == null) {
        logAndThrowError("Unable to validate loaded database");
    } else {
        console.info("Database loaded");
        // console.debug(testTables);
    }

    exportSaveFile(dbData, `${DB_EXCLUSIVE_STR}-tmp.db`);

    // db = testDb;
    return testDb;
}


function findDatabasesInFile(saveData, imageString){
    const encoder = new TextEncoder()
    // console.log(`imageString = ${imageString},  imageString.length + 48 = ${imageString.length + 49}`);

    // Increment by 49 characters to move from the field name past the properties to the actual value.
    const dbStartIdx = findSequenceInArray(saveData, encoder.encode(imageString)) + imageString.length + 49;
    // console.debug(`db_start_idx: ${dbStartIdx}`);
    const dbSizeInput = saveData.slice(dbStartIdx - 4, dbStartIdx);
    // console.debug(`db_size_input: ${dbSizeInput}`);
    const dbSize = new DataView(dbSizeInput.buffer).getUint32(0, true);
    // console.debug(`db_size: ${dbSize}`);
    return { startIndex: dbStartIdx, endIndex: dbStartIdx + dbSize };
}

function initializeDatabase(SQLClient, saveData, parameters){
    const dbData = saveData.slice(parameters.startIndex, parameters.endIndex);
    const testDb = new SQLClient.Database(dbData);
    return [testDb, dbData];
}


function logAndThrowError(errorMessage) {
    console.error(errorMessage);
    throw new Error(errorMessage);
}

export const executeQuery = (datasource, query) => {
    let result = null;
    if (datasource != null) {
        result = datasource.exec(query)
    }
    return result;
};


export const initializeSqlClient = async () => {
    const sql = await initSqlJs({
        locateFile: (file) => {
            // console.debug("locateFile", file);
            // eslint-disable-next-line no-undef
            let result = process.env.PUBLIC_URL + "/" + file;
            // console.debug("localFile.Result", result);
            return result;
        }
    });
    if (sql === null) {
        logAndThrowError("Failed to initialize Sql.JS using initSqlJs");
    }
    return sql;
}

// eslint-disable-next-line
function exportSaveFile(userInfo, fileName) {
  const blob = new Blob([userInfo], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}