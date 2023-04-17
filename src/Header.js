import React from 'react';

function Header() {
    const repoAddress = "https://github.com/Stevoni/Legilimens-Hogwarts-Legacy-Collectible-Finder-Site"
    const originalRepoAddress = "https://github.com/Malin001/Legilimens-Hogwarts-Legacy-Collectible-Finder"

    return (
        <header>
            <h1>Legilimens Collectible Finder</h1>
            <h3>A Hogwarts Legacy tool to find your missing collectibles <br/>
               <a href={repoAddress}>{repoAddress}</a>.
            </h3>
            <h3>
                Based on the python tool originally created by Malin001 <br/>
                <a href={originalRepoAddress}>{originalRepoAddress}</a>.
            </h3>
        </header>
    );
}

export default Header;
