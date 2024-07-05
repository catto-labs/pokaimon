<img height="125" align="left" style="float: left; margin: 0 10px 0 0;" alt="Pokaimon" src="https://pokaimon.cattolabs.com/assets/pokaimon.1e188256.svg">

# Pokaimon
Pokaimon is a Genshin Impact themed collectible game with mechanics similar to Pokémon, made for the Supabase Launch Week 5 Hackathon.

Play the game here: https://www.pokaimon.moe

## Idea
After swiftly forming a team for the hackathon, we wanted to do a project that's fun to use but also fun to make for us (by building something based on a common interest). As we all play the game "Genshin Impact", an open-world action RPG, I (trobonox) came up with the idea of using the game's story and characters as a base and mixing it up with another game. The choice for the other game was Pokémon, as it is a truly classic game with simple core concepts but is very fun and a part of many people’s childhood.

## Tech Stack
The main tech stack is Vue 3 using TypeScript and the Composition API, TailwindCSS, HeadlessUI and (of course, being the most essential for this hackathon) Supabase with the v2 JavaScript SDK.

Features of Supabase have been utilized as follows:
- Authentication: Made a full user system with email + OAuth login and an onboarding process on initial registration
- Triggers: Used a trigger on initial user signup to create an entry in a public users table
- PG Functions: Used in combination with the trigger on user signup to make the actual database entries
- Database: Used to store all information necessary for the game like user profile data, user inventory contents, game status and detailed character information
- Realtime: Used to display data about 1v1 multiplayer fights in realtime and to show cursors of connected users on the main map for more interactivity
- Edge Functions: Used to handle all sensitive information and prevent cheating in situations like inserting ingame currency or receiving rewards on a game win
- Storage: Used to store tiles for the main menu map, character portrait and body images and other miscellaneous artwork

This usage is covering all major feature areas of Supabase, and many of these features like the database, edge functions and storage are heavily used across the entire game.

## Team (with GitHub handles)
- [@trobonox](https://github.com/trobonox): creator of initial concept/idea, project manager (leading development, setting priorities and goals), full stack developer (mostly front-end)
- [@Vexcited](https://github.com/vexcited): full stack developer (insanely productive, carried the project 😂♥)
- [@pnxl](https://github.com/pnxl): front-end developer, ui/ux designer

Other miscellaneous contributors [can be found on the website](https://www.pokaimon.moe/docs/contributors), but they are not part of the main development team.

## Project setup
If you just want to play the game, you can access the live website at [pokaimon.moe](https://www.pokaimon.moe). 

If you want to contribute, you can [read the contribution guidelines here.](https://github.com/trobonox/pokaimon/blob/main/CONTRIBUTING.md)

---
© 2022-2023 catto labs

Licensed under the MIT license

