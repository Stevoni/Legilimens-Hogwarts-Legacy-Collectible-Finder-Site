// import React, { useState, useEffect } from "react";
// import "./styles.css";
// import initSqlJs from "sql.js";
//
// // Required to let webpack 4 know it needs to copy the wasm file to our assets
// import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
//
// const SQL = await initSqlJs({
//   // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
//   // You can omit locateFile completely when running in node
//   locateFile: file => `https://sql.js.org/dist/${file}`
// });


//
// export default function init(){
//   const [db, setDb] = useState(null);
//   const [error, setError] = useState(null);
//
//   useEffect(async () => {
//     // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
//     // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
//     // see ../craco.config.js
//     try {
//       const SQL = await initSqlJs({ locateFile: () => sqlWasm });
//       setDb(new SQL.Database());
//     } catch (err) {
//       setError(err);
//     }
//   }, []);
//
//   if (error) return <pre>{error.toString()}</pre>;
//   else if (!db) return <pre>Loading...</pre>;
//   else return <SQLRepl db={db} />;
// }

import {useEffect, useState} from "react";

// export function executeQuery(db, query) {
// //     db.run(query);
// }
// //
// export function getData(db, query) {
// //     const result = setDb.exec(query);
// //     return result[0].values;
// }
// export const QUERIES = [{
//     'CollectionDynamic': "SELECT ItemID FROM CollectionDynamic WHERE ItemState='Obtained';",
//     'SphinxPuzzleDynamic': "SELECT SphinxPuzzleGUID FROM SphinxPuzzleDynamic WHERE EInteractiveState=34;",
//     'LootDropComponentDynamic': "SELECT LootGroup FROM LootDropComponentDynamic;",
//     'EconomicExpiryDynamic': "SELECT UniqueID FROM EconomicExpiryDynamic;",
//     'MiscDataDynamic': "SELECT DataName FROM MiscDataDynamic WHERE DataValue='1';",
//     'MapLocationDataDynamic': "SELECT MapLocationID FROM MapLocationDataDynamic WHERE State=11;",
//     'AchievementDynamic': "SELECT OneOfEach FROM AchievementDynamic WHERE AchievementID='PFA_43';",
//     'PlayerStatsDynamic': "SELECT ActivityName FROM PlayerStatsDynamic WHERE ActivityValue='Complete';",
//     'CollectionDynamic2': "SELECT ItemID FROM CollectionDynamic WHERE ItemState='Obtained' AND SubcategoryID='Exploration' AND CategoryID='Conjurations';"
// }];

export const QUERIES = {
        CollectionDynamic: "SELECT ItemID FROM CollectionDynamic WHERE ItemState='Obtained';",
        SphinxPuzzleDynamic: "SELECT SphinxPuzzleGUID FROM SphinxPuzzleDynamic WHERE EInteractiveState=34;",
        LootDropComponentDynamic: "SELECT LootGroup FROM LootDropComponentDynamic;",
        EconomicExpiryDynamic: "SELECT UniqueID FROM EconomicExpiryDynamic;",
        MiscDataDynamic: "SELECT DataName FROM MiscDataDynamic WHERE DataValue='1';",
        MapLocationDataDynamic: "SELECT MapLocationID FROM MapLocationDataDynamic WHERE State=11;",
        AchievementDynamic: "SELECT OneOfEach FROM AchievementDynamic WHERE AchievementID='PFA_43';",
        PlayerStatsDynamic: "SELECT ActivityName FROM PlayerStatsDynamic WHERE ActivityValue='Complete';",
        CollectionDynamic2: "SELECT ItemID FROM CollectionDynamic WHERE ItemState='Obtained' AND SubcategoryID='Exploration' AND CategoryID='Conjurations';",
    }
;

export const AFFECTED_TYPES = [{'CollectionDynamic': ['Revelio field guide pages'],
                  'SphinxPuzzleDynamic': ['Merlin trials'],
                  'LootDropComponentDynamic': ['Vivarium chests'],
                  'EconomicExpiryDynamic': ['Butterfly chests'],
                  'MiscDataDynamic': ['Brazier/Moth/Statue field guide pages', 'Daedalian Keys'],
                  'MapLocationDataDynamic': ["Flying field guide pages", "Collection Chests", "Demiguise Moons", "Balloon Sets", "Landing Platforms", "Astronomy Tables", "Ancient Magic Hotspots", "Infamous Foes"],
                  'AchievementDynamic': ['Finishing Touches enemies'],
                  'PlayerStatsDynamic': ['Butterfly quest bug detector'],
                  'CollectionDynamic2': ['Conjuration bug detector']}];
export const TABLES = {'Revelio': 'CollectionDynamic',
          'Merlin': 'SphinxPuzzleDynamic',
          'VivariumChest': 'LootDropComponentDynamic',
          'ButterflyChest': 'EconomicExpiryDynamic',
          'Moth': 'MiscDataDynamic',
          'Brazier': 'MiscDataDynamic',
          'Statue': 'MiscDataDynamic',
          'DaedalianKey': 'MiscDataDynamic',
          'Flying': 'MapLocationDataDynamic',
          'ArithmancyChest': 'MapLocationDataDynamic',
          'MiscConjChest': 'MapLocationDataDynamic',
          'MiscWandChest': 'MapLocationDataDynamic',
          'DungeonChest': 'MapLocationDataDynamic',
          'CampChest': 'MapLocationDataDynamic',
          'Demiguise': 'MapLocationDataDynamic',
          'Astronomy': 'MapLocationDataDynamic',
          'Landing': 'MapLocationDataDynamic',
          'Balloon': 'MapLocationDataDynamic',
          'AncientMagic': 'MapLocationDataDynamic',
          'Foe': 'MapLocationDataDynamic',
          'FinishingTouchEnemy': 'AchievementDynamic'};

export const NAMES = {
  'Revelio': ['Field guide page', 'Revelio'],
  'Merlin': ['Merlin Trial', ''],
  'VivariumChest': ['Collection Chest', 'Vivarium'],
  'ButterflyChest': ['Butterfly Chest', ''],
  'Moth': ['Field guide page', 'Moth painting'],
  'Brazier': ['Field guide page', 'Confringo brazier'],
  'Statue': ['Field guide page', 'Levioso statue'],
  'Flying': ['Field guide page', 'Flying'],
  'ArithmancyChest': ['Collection Chest', 'Arithmancy door'],
  'MiscConjChest': ['Collection Chest', ''],
  'MiscWandChest': ['Collection Chest', ''],
  'DungeonChest': ['Collection Chest', 'Dungeon'],
  'CampChest': ['Collection Chest', 'Bandit camp'],
  'Demiguise': ['Demiguise Moon', ''],
  'Astronomy': ['Astronomy Table', ''],
  'Landing': ['Landing Platform', ''],
  'Balloon': ['Balloon Set', ''],
  'AncientMagic': ['Ancient Magic Hotspot', ''],
  'Foe': ['Infamous Foe', ''],
  'DaedalianKey': ['Daedalian Key', ''],
  'FinishingTouchEnemy': ['Finishing Touch Enemy', ''],
};

export const REGIONS = [{'The Library Annex': 'Hogwarts',
           'The Astronomy Wing': 'Hogwarts',
           'The Bell Tower Wing': 'Hogwarts',
           'The South Wing': 'Hogwarts',
           'The Great Hall': 'Hogwarts',
           'The Grand Staircase': 'Hogwarts',
           'Hogsmeade': '',
           'North Ford Bog': 'The Highlands',
           'Forbidden Forest': 'The Highlands',
           'North Hogwarts Region': 'The Highlands',
           'Hogsmeade Valley': 'The Highlands',
           'South Hogwarts Region': 'The Highlands',
           'Hogwarts Valley': 'The Highlands',
           'Feldcroft Region': 'The Highlands',
           'South Sea Bog': 'The Highlands',
           'Coastal Cavern': 'The Highlands',
           'Poidsear Coast': 'The Highlands',
           'Marunweem Lake': 'The Highlands',
           'Manor Cape': 'The Highlands',
           'Cragcroftshire': 'The Highlands',
           'Clagmar Coast': 'The Highlands',
           'Vivariums': 'Hogwarts',
           'Butterflies': '',
           'Daedalian Keys': '',
           'Finishing Touches': 'Achievements'}];

//
// import React, { useState, useEffect } from 'react';
// import sqlite3 from 'sqlite3';
// import { SaveReader } from 'legilimens';
//
// // const QUERIES = {
// //   CollectionDynamic: "SELECT ItemID FROM CollectionDynamic WHERE ItemState='Obtained';",
// //   SphinxPuzzleDynamic: "SELECT SphinxPuzzleGUID FROM SphinxPuzzleDynamic WHERE EInteractiveState=34;"
// // };
// const AFFECTED_TYPES = {
//     CollectionDynamic: ['Revelio field guide pages'],
//     SphinxPuzzleDynamic: ['Merlin trials']
// };

/* eslint-disable */
function MyComponent(props) {
    const [collectibles, setCollectibles] = useState([]);
    const [bugs, setBugs] = useState({});

    useEffect(() => {
        async function fetchData() {
            // Load collectibles from some source
            // const fetchedCollectibles = await fetchCollectibles();
            // setCollectibles(fetchedCollectibles);

            // Read save file and update state
            // const bugs = await processFile();
            // setBugs(bugs);
        }

        fetchData();
    }, []);


    return (
        <div>
            {/* Render your component here */}
        </div>
    );
}

const useProcessFile = (database, collectibles, onTableUpdate) => {
    const [db, setDb] = useState(null);
    const [items, setItems] = useState(null);
    const [processedItems, setProcessedItems] = useState(null);

    useEffect(() => {
        if (db != null && items != null) {
            // processFile(db, items).then(onTableUpdate());
        }
    }, [db, items, onTableUpdate])

    function processFile(database, collectibles) {

        try {
            // Read sql tables

            const sqlData = {};
            const errors = [];
            const save = database;
            for (const [table, query] of Object.entries(QUERIES)) {
                try {
                    sqlData[table] = new Set(save.execute_query(query).map(x => x[0]));
                    if (table === 'AchievementDynamic') {
                        sqlData[table].delete('');
                    }
                } catch (err) {
                    errors.push(...AFFECTED_TYPES[table]);
                }
            }
            save.close();
            if (Object.keys(sqlData).length === 0) {
                return {message: 'Legilimens was unable to read the database in your save file'};
            }
            if (errors.length) {
                console.log('SQLite was unable to read parts of the database');
                console.log(`The following collectible types were affected and won't work correctly: ${errors.join(', ')}`);
            }
            // Find collectibles
            const updatedCollectibles = collectibles.map(collectible => {
                if (TABLES[collectible.type] in sqlData) {
                    collectible.collected = sqlData[TABLES[collectible.type]].has(collectible.key);
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
            return {butterfly: butterflyBug, conjuration: conjurationBug};
        } catch (err) {
            throw new Error(err);
        }
    }

    return {processedItems}
}
export default useProcessFile;
