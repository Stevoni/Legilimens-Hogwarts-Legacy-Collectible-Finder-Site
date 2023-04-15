import React, {useState, useEffect} from 'react';
import CollapsibleRegion from './CollapsibleRegion';
import UploadButton from './UploadButton';
import AchievementsTable from './AchievementsTable';
import collectionDisplayDataSchema from "./CollectionDisplayDataSchema";
import {AFFECTED_TYPES, executeQuery, getData, NAMES, QUERIES, TABLES} from './useProcessFile';
import initSqlJs from "sql.js";
import collectionDataSchema from "./CollectionDataSchema";
// import Legilimens from "./test 2";

// Build table from collections
// Import file
// Process file
// Update records


function AchivementsPage() {

    const [db, setDb] = useState(null);
    const [collectibles, setCollectibles] = useState([]);
    const [displayCollectibles, setDisplayCollectibles] = useState([]);
    const [sqlClient, setSqlClient] = useState(null);

    const handleFileUpload = (db) => {
        setDb(db);
        if (db == null) {
            return;
        }
        console.debug("handleFileUpload")
        const res = db.exec("SELECT name FROM sqlite_master WHERE type='table';")
        console.debug(res);
        // {butterfly: butterflyBug, conjuration: conjurationBug, items: updatedCollectibles};
        let results = processFile(db, collectibles);

        if (results.items != null) {
            setDisplayCollectibles(transformData(results.items));
        }
    };

    const executeQuery = (datasource, query) => {
        var result = null;
        if (datasource != null) {
            result = datasource.exec(query)
        }
        return result;
    };

    function collectible_name(collectible) {
        let s = '',
            name2 = '';

        if (collectible['type'] !== 'FinishingTouchEnemy') {
            const [name1, n2] = NAMES[collectible['type']];
            name2 = n2;
            s += `${name1} #`;
        }
        s += `${collectible['index']}`;

        if (name2) {
            s += ` (${name2})`;
        }
        return s;
    }

    function processFile(database, collectibles) {

        try {
            // Read sql tables

            const sqlData = [];
            const errors = [];
            // const save = database;
            for (const [table, query] of Object.entries(QUERIES)) {
                try {
                    var temp = executeQuery(database, query);

                    var temp2 = temp.map(x => {
                        return x["values"].flat(10);
                    });
                    sqlData[table] = new Set(temp2);
                    if (table === 'AchievementDynamic') {
                        sqlData[table].delete('');
                    }
                } catch (err) {
                    errors.push(...AFFECTED_TYPES[table]);
                }
            }
            // save.close();
            if (Object.keys(sqlData).length === 0) {
                return {message: 'Legilimens was unable to read the database in your save file'};
            }
            if (errors.length) {
                console.log('SQLite was unable to read parts of the database');
                console.log(`The following collectible types were affected and won't work correctly: ${errors.join(', ')}`);
            }
            // Find collectibles
            const updatedCollectibles = collectibles.map(collectible => {
                console.debug(`type = ${collectible.type}; key = ${collectible.key}`)

                if (TABLES[collectible.type] in sqlData) {
                    collectible.collected =
                        [...sqlData[TABLES[collectible.type]]][0].findIndex(x => x === collectible.key) > -1;
                } else {
                    collectible.collected = false;
                }
                return collectible;
            });
            // Check for butterfly bug
            let butterflyBug = false;
            if (['EconomicExpiryDynamic', 'PlayerStatsDynamic'].every(table => table in sqlData)) {
                if ('PlayerStatsDynamic' in sqlData && sqlData['PlayerStatsDynamic'].has('COM_11') && collectibles.some(c => c.type === 'ButterflyChest' && c.index === 1 && !c.collected)) {
                    butterflyBug = true;
                }
            }
            // Check for conjuration bug
            let conjurationBug = false;
            if (['CollectionDynamic2', 'LootDropComponentDynamic', 'EconomicExpiryDynamic', 'MapLocationDataDynamic'].every(table => table in sqlData)) {
                const chestsOpened = collectibles.filter(c => c.collected && ['MiscConjChest', 'ArithmancyChest', 'DungeonChest', 'ButterflyChest', 'VivariumChest'].includes(c.type)).length;
                if ('CollectionDynamic2' in sqlData && chestsOpened > sqlData['CollectionDynamic2'].size) {
                    conjurationBug = true;
                }
            }
            return {butterfly: butterflyBug, conjuration: conjurationBug, items: updatedCollectibles};
        } catch (err) {
            throw new Error(err);
        }
    }

    function transformData(jsonData) {
        let transformedData = jsonData.reduce((accumulator, item) => {
            // Check if the region already exists in the accumulator
            const regionIndex = accumulator.findIndex(regionItem => regionItem.region === item.region);
            if (regionIndex === -1) {
                // Add the region and type to the accumulator
                accumulator.push({
                    region: item.region,
                    regionData: [
                        {
                            type: item.type,
                            typeData: [
                                {
                                    index: item.index,
                                    key: item.key,
                                    time: item.time,
                                    video: item.video,
                                    collected: item.collected,
                                    name: collectible_name(item)
                                },
                            ],
                        },
                    ],
                });
            } else {
                // Check if the type already exists in the region
                const typeIndex = accumulator[regionIndex].regionData.findIndex(typeItem => typeItem.type === item.type);
                if (typeIndex === -1) {
                    // Add the type to the region
                    accumulator[regionIndex].regionData.push({
                        type: item.type,
                        typeData: [
                            {
                                index: item.index,
                                key: item.key,
                                time: item.time,
                                video: item.video,
                                collected: item.collected,
                                name: collectible_name(item)
                            },
                        ],
                    });
                } else {
                    // Add the item to the type
                    accumulator[regionIndex].regionData[typeIndex].typeData.push({
                        index: item.index,
                        key: item.key,
                        time: item.time,
                        video: item.video,
                        collected: item.collected,
                        name: collectible_name(item)
                    });
                }
            }

            return accumulator;
        }, []);
        return transformedData;
    }

    useEffect(() => {
        console.debug("AchivementsPage.useEffect");
        const fetchData = async () => {
            const response = await fetch('Test2.json');
            const jsonData = await response.json();

            collectionDataSchema.validate(jsonData)
                .then((validData) => {
                    // data is valid
                    setCollectibles(jsonData);
                })
                .catch((error) => {
                    // data is invalid
                    console.error(error);
                });
            setDisplayCollectibles(transformData(jsonData));
        };
        fetchData();


        // Pre-initialize SqlJs
        const initializeSqlClient = async () => {
            const SQL = await initSqlJs()
            setSqlClient(SQL);
        }
        initializeSqlClient();

    }, []);

    return (
        <div>
            <UploadButton onFileUpload={handleFileUpload} toolTip="This is a tooltip" onDbChange={setDb}
                          SQLClient={sqlClient}/>
            {displayCollectibles.map((region) => (
                <CollapsibleRegion key={region.region} title={region.region}>
                    {region.regionData.map((type) => (
                        <CollapsibleRegion key={type.type} title={type.type}>
                            <AchievementsTable data={db} collectibles={type.typeData}/>
                        </CollapsibleRegion>
                    ))}
                </CollapsibleRegion>
            ))}

        </div>
    );
}

export default AchivementsPage;
