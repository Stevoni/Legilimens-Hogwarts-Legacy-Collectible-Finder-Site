# Legilimens
Legilimens is a web based version of the tool by Malin001 to help you find your last few missing collectibles in Hogwarts Legacy and finally get that 100% completion. All you need to do is upload your save file and Legilimens will analyze and return a list of every collectible that you're missing, including a link to a Youtube video with a timestamp showing its location. Legilimens does **not** edit your save file, it only reads the databases contained within it. The save file is processed on the local client and is not sent to any remote server.

#### What Legilimens can find:
- Field Guide Pages
- Collection Chests
- Demiguise Statues
- Vivarium Chests
- Butterfly Chests
- Daedalian Keys
- Merlin Trials
- Balloon Sets
- Landing Platforms
- Ancient Magic Hotspots
- Infamous Foes
- "Finishing Touch" achievement enemies (inconsistent)

#### What it *can't* find:
- Items that you are *required* to get during a quest. For example, there are two field guide pages that you are forced to pick up during the History of Magic class quest
- Collectible items that can be bought from vendors
- Collectible items that are rewards for completing quests

## Usage
TBD

## FAQ
#### Legilimens says I'm missing Butterfly Chest #1, but there aren't any butterflies there and I've already done the "Follow the Butterflies" quest?
- This is a known bug with Hogwarts Legacy, where following any of the other 14 butterflies allows you to complete the quest, which then prevents the intended quest butterflies from ever appearing. [This](https://hogwarts-legacy-save-editor.vercel.app) save editor has a fix for it, as does [this](https://www.nexusmods.com/hogwartslegacy/mods/778) mod, but I haven't tested either one myself and take no responsibility for them, so make sure you backup your save before using them!
#### I'm missing a single conjuration exploration collectible, but Legilimens doesn't detect anything?
- This is almost certainly another [bug in the game](https://hogwartslegacy.bugs.wbgames.com/bug/HL-3868), and I haven't found anything that indicates it's a problem with Legilimens. [This](https://www.nexusmods.com/hogwartslegacy/mods/832) mod has a fix for it, but I haven't tested it myself and take no responsibility for it, so make sure you backup your save before using it!
#### I have 33/34 Field Guide Pages in The Bell Tower Wing, but Legilimens says I've completed them all. Where is it?
- This is a known bug in Hogwarts Legacy that has since been patched, where a certain Bell Tower Wing [flying page](https://youtu.be/KnHZ5gVb_qk&t=104) doesn't count towards your total. I don't know if the patch retroactively fixed the problem.
#### It's detecting the wrong enemies for the "Finishing Touches" achievement
- I did my best to make it as accurate as possible, but achievements are broken in my game, so testing the Finishing Touches achievement is basically impossible. Hopefully it's helpful for a few people though.
#### Legilimens says that I'm missing something that I've already collected, or doesn't detect all of my missing collectibles, or links to the wrong Youtube video/timestamp, or any other error.
- It's likely an error in my code, so open an [issue](https://github.com/Malin001/Legilimens-Hogwarts-Legacy-cpp/issues) on GitHub, and attach your `.sav` file. I'll do my best to figure out what went wrong and fix it as soon as possible. If you don't have a GitHub account, you can also email your save file to me at Malin4750@gmail.com, or post the output of Legilimens on [Nexus](https://www.nexusmods.com/hogwartslegacy/mods/556). ***If you don't send me either the save file or output, I won't be able to fix the problem for everyone else.***
#### I'm getting the error "SQLite was unable to read parts of the database", which is preventing me from finishing certain collectibles. How can I fix this?
- For some reason, it's possible for parts of your save file to be corrupted and unreadable by SQLite. Unfortunately, I haven't been able to figure out a fix or workaround yet. Sorry.
#### "It doesn't work"
- Make sure you've either read the instructions or watched the [video guide](https://www.youtube.com/watch?v=wWsCV8JuCGo), and read the FAQ. If you're still having problems, ***actually describe what's going wrong*** so I can help you fix it

## Credit
- Thanks to [Malin001](https://github.com/Malin001) for creating the original [Python version](https://github.com/Malin001/Legilimens-Hogwarts-Legacy-Collectible-Finder) 
- Thanks to [100% Guides](https://www.youtube.com/@100Guides), [Game Guides Channel](https://www.youtube.com/@GameGuideslolz), and [Lukinator 2321](https://www.youtube.com/@lukinator2321) on Youtube for making the videos that Legilimens links to.
- Thanks to [ekaomk](https://github.com/ekaomk/Hogwarts-Legacy-Save-Editor), whose Hogwarts Legacy Save Editor code I looked at to learn how to read the save files, and who created a fix to the butterfly quest bug.
- Thanks to [kaivar](https://www.nexusmods.com/hogwartslegacy/users/49715466) for creating a fix for the [139/140 conjuration bug](https://www.nexusmods.com/hogwartslegacy/mods/832) and the [butterfly bug](https://www.nexusmods.com/hogwartslegacy/mods/778).
- Thanks to [lillaka](https://www.nexusmods.com/users/2211740) for not only giving me ideas to improve the mod, but actually implementing those ideas and giving me the code.