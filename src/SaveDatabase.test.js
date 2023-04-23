import React, {useEffect, useState} from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {findSequenceInArray, validateDatabase} from "./SaveDatabase";
import {ArrayBuffer, TextDecoder, TextEncoder} from 'util';

global.TextEncoder = TextEncoder;

const TEST_MAGIC_HEADER = 'GVAS'

test('confirm findSequenceInArray works as expected for array', () => {
    const encoder = new TextEncoder();

    const testInput = "This is a test string";
    const testCompare = "test";

    const input = encoder.encode("This is a test string");
    const compare = encoder.encode("test");
    const expectedIndex = 10;

    expect(findSequenceInArray(input, compare)).toEqual(expectedIndex);
    expect(testInput.indexOf(testCompare)).toEqual(expectedIndex);
});

test('confirm findSequenceInArray works as expected for strings', () => {
    const testInput = "This is a test string";
    const testCompare = "test";

    const input = testInput;
    const compare = testCompare;
    const expectedIndex = 10;

    expect(findSequenceInArray(input, compare)).toEqual(expectedIndex);
    expect(testInput.indexOf(testCompare)).toEqual(expectedIndex);
});

test('validate database with header and without db img string', () => {
    const encoder = new TextEncoder();

    const testInput = "GVAS   \f     ä+€   ++stream+Main_TeamCity_Code";
    const input = encoder.encode(testInput);

    expect(() => validateDatabase(input)).toThrowError("DB Image string not found");
});

test('validate database without header and without db img string', () => {
    const encoder = new TextEncoder();

    const testInput = "   \f     ä+€   ++stream+Main_TeamCity_Code";
    const input = encoder.encode(testInput);

    expect(() => validateDatabase(input)).toThrowError("Magic header not found")
});

test('validate database with header and with db img string', () => {
    const encoder = new TextEncoder();

    const testInput = "GVAS   \f     ä+€   ++stream+Main_TeamCity_CodeRawDatabaseImageasdfasdfsd";
    const input = encoder.encode(testInput);

    expect(() => validateDatabase(input)).toBeTruthy();
});
