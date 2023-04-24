// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import useProcessFile from "./useProcessFile";
import YoutubeEmbed from "./YoutubeEmbed";

const doneIcon = "https://img.icons8.com/cotton/128/null/checkmark.png"
const unknownIcon = "https://img.icons8.com/cotton/128/null/info--v4.png"
// "https://img.icons8.com/cotton/128/null/synchronize--v3.png"
// <img src="https://img.icons8.com/cotton/128/null/info--v4.png"/>
const unstartedIcon = "https://img.icons8.com/cotton/128/nulsl/cancel-2--v2.png"

// eslint-disable-next-line react/prop-types
function AchievementsTable({database, collectibles, showCompleted}) {

    // eslint-disable-next-line no-unused-vars
    const {data} = useProcessFile(database, collectibles, () => {
        console.log("onTableUpdate");
    })

    useEffect(() => {
        // console.log("ShowCompleted Checked in AchievementTable", showCompleted);
    }, [showCompleted])

    return (
        // eslint-disable-next-line react/prop-types
        collectibles && collectibles.some((row) => !showCompleted || (showCompleted && !row.collected)) &&
        <table className="achievement-table">
            <thead>
            <tr>
                <th className="index">Name</th>
                <th className="video">Video</th>
                <th className="state">Is Complete</th>
            </tr>
            </thead>
            <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {collectibles && collectibles.filter((row) => !showCompleted || (showCompleted && !row.collected)).map((row) => (
                <tr key={row.key}>
                    <td className="index">{row.name}</td>
                    <td className="video">
                        <YoutubeEmbed embedId={row.video} startTime={row.time}/>
                    </td>
                    <td className="state">
                        {row.collected !== undefined && row.collected === true &&
                            <img className="achievement-state" src={doneIcon}/>}
                        {row.collected === undefined && <img className="achievement-state" src={unknownIcon}/>}
                        {row.collected !== undefined && row.collected === false &&
                            <img className="achievement-state" src={unstartedIcon}/>}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        ||
        // eslint-disable-next-line react/prop-types
        collectibles && collectibles.some((row) => !showCompleted || (showCompleted && !row.collected)) === false &&
        <div style={{'textAlign': "center", 'font-weight': "bold"}}> Good job, all items collected! </div>
    );
}

export default AchievementsTable;
