import React from 'react';


function Header() {
    const repoAddress = "https://github.com/Malin001/Legilimens-Hogwarts-Legacy-Collectible-Finder"

    return (
        <header>
            <h1>Legilimens Collectible Finder</h1>
            <h3>A Hogwarts Legacy tool to find your missing collectibles <br/>
               <a href={repoAddress}>{repoAddress}</a></h3>
        </header>
    );
}

export default Header;
