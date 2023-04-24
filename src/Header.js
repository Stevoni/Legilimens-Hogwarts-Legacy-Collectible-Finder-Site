import React from 'react';

function Header() {
    const repoAddress = "https://github.com/Stevoni/Legilimens-Hogwarts-Legacy-Collectible-Finder-Site"
    const originalRepoAddress = "https://github.com/Malin001/Legilimens-Hogwarts-Legacy-Collectible-Finder"

    return (
        <header>
            <h1 style={{textAlign: "center"}}>Legilimens Collectible Finder</h1>
            <h3>A Hogwarts Legacy tool to find your missing collectibles <br/>
                <a href={repoAddress}>{repoAddress}</a>.
            </h3>
            <h5>
                Based on the python tool originally created by Malin001 <a href={originalRepoAddress}>{originalRepoAddress}</a>.
            </h5>
        </header>
    );
}

export default Header;
