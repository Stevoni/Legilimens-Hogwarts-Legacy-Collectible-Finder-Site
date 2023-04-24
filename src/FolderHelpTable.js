import React, {useRef} from "react";
import "./style/FolderHelpTable.css"

function FolderHelpTable() {
    const filePaths = [
        {
            "line": "%localappdata%\\Hogwarts Legacy\\Saved\\SaveGames",
            "index": "Windows"
        }, {
            "line": "TBD",
            "index": "Linux"
        },
        {
            "line": "TBD",
            "index": "Mac"
        }
    ]

    const handleClick = (e) => {
        if (e.target.tagName === "SPAN") {
            handleCopy(e.target.innerText);
        }
    };
    const tooltipRef = useRef(null);

    const handleCopy = (text) => {
        //Todo: Add copy successful/failure indicator
        navigator.clipboard.writeText(text);
    };

    return (
        <div onClick={handleClick} ref={tooltipRef} className="folder-help-table">
            The save files are located in the following folders.
            <table>
                <thead>
                <tr>
                    <th className="folder-help-table-os">Operating System</th>
                    <th className="folder-help-table-path">Path</th>
                </tr>
                </thead>
                <tbody>
                {filePaths.map((row) => (
                    <tr key={row.index}>
                        <td className="folder-help-table-os">{row.index}</td>
                        <td className="folder-help-table-path">
                        <span key={row.index} id={row.index} onClick={(e) => handleClick(e)}>
                            {row.line}
                        </span>
                        </td>
                    </tr>))}
                </tbody>
            </table>
            Click to copy one onto the clipboard and then click the &quote;Choose file&quote; button.
        </div>);
}

export default FolderHelpTable;