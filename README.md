# A birthday story, made for a phone

This is a vanilla HTML, CSS, and JavaScript birthday website. It is designed mobile-first: the story unfolds in full-height phone-friendly screens with comfortably large touch targets.

## Run it

Open `index.html` in a modern browser. For the most reliable local test, use VS Code's Live Server extension, but no server or build step is required.

## Personalize it

Open `js/script.js`. The clearly marked **PERSONALIZE THIS SECTION FIRST** block is the only place you need for normal edits:

- Change `herName`, `myName`, `birthdayMessage`, and `letter` in `birthdayConfig`.
- Change the `memories` array to add/remove timeline events.
- Change the `photos` array to set the gallery photos and captions.
- Change `thingsILove` so the reveal cards contain your own details.

## Add photos and music

Create an `images` folder beside `index.html`, then put your photos there. The default names are `photo1.jpg`, `photo2.jpg`, and so on. Or use any names you prefer and update the image paths in `script.js`.

Create an `audio` folder and place your song at the path set by `music` in `js/script.js`. This project currently uses `audio/our-song.webm`. The music button intentionally does not autoplay; she can tap it when she wants. If the file is missing, every other feature still works.

## Deploy it

Because it is static, upload the project files to GitHub Pages, Netlify, Cloudflare Pages, or any regular web host. Make sure the `css`, `js`, `images`, and optional `audio` folders are uploaded alongside `index.html`.
