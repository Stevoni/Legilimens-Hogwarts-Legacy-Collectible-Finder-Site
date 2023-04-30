import React, {useState, useEffect} from 'react';
import CollapsibleRegion from './CollapsibleRegion';
import UploadButton from './UploadButton';
import AchievementsTable from './AchievementsTable';
import {NAMES, processFile} from './useProcessFile';
import collectionDataSchema from "./CollectionDataSchema";
import {initializeSqlClient} from "./SaveDatabase";

// Build table from collections
// Import file
// Process file
// Update records

function AchievementsPage() {

    const [db, setDb] = useState(null);
    const [collectibles, setCollectibles] = useState([]);
    const [displayCollectibles, setDisplayCollectibles] = useState([]);
    const [sqlClient, setSqlClient] = useState(null);
    const [showCompleted, setShowCompleted] = useState(false);

    function handleCheckboxChange(event) {
        setShowCompleted(event.target.checked);
    }

    useEffect(() => {
        // Todo: Only show incomplete when the showCompleted checkbox is true
    }, [showCompleted]);

    const handleFileUpload = (db) => {
        setDb(db);
        if (db == null) {
            return;
        }
        // console.debug("handleFileUpload")
        // const res = db.exec("SELECT name FROM sqlite_master WHERE type='table';")
        // Todo: Add error message when database isn't loaded correctly and there aren't any tables
        // console.debug(res);
        // {butterfly: butterflyBug, conjuration: conjurationBug, items: updatedCollectibles};
        let results = processFile(db, collectibles);

        if (results.items != null) {
            setDisplayCollectibles(transformData(results.items));
        }
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
        // console.debug("AchievementsPage.useEffect");

        const fetchData = async () => {
            // eslint-disable-next-line no-undef
            const response = await fetch(process.env.PUBLIC_URL + "/collectibles.json");
            // Todo: add error handling for the response object?
            const jsonData = await response.json();

            collectionDataSchema.validate(jsonData)
                .then((validData) => {
                    // data is valid
                    setCollectibles(validData);
                })
                .catch((error) => {
                    // data is invalid
                    console.error(error);
                });
            setDisplayCollectibles(transformData(jsonData));
        };
        fetchData();

        // Pre-initialize SqlJs
        initializeSqlClient().then((sql) => setSqlClient(sql));

    }, []);

    return (
        <div>

            <UploadButton onFileUpload={handleFileUpload} onDbChange={setDb} SQLClient={sqlClient}/>
            <label>
                Only show incomplete
                <input type="checkbox" checked={showCompleted} onChange={handleCheckboxChange}/>
            </label>
            {displayCollectibles.map((region) => (
                <CollapsibleRegion key={region.region} title={region.region}>
                    {region.regionData.map((type) => (
                        <CollapsibleRegion key={type.type} title={type.type}>
                            <AchievementsTable data={db} collectibles={type.typeData} showCompleted={showCompleted}/>
                        </CollapsibleRegion>
                    ))}
                </CollapsibleRegion>
            ))}
        </div>
    );
}

export default AchievementsPage;
