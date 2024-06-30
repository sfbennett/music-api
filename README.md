# Music API

A RESTful music API that I created with Express.js and connected up to a PostgreSQL database.

The API manages data from various endpoints and is hosted on Render. The PostgreSQL database was first created using Postbird and then hosted on Supabase.

## Installation

```
git clone https://github.com/yourusername/music-api.git
cd music-api
npm install
```

## Running the server

`node app.js`

## API Endpoints

Album HTTP routes:

- GET - all albums
- GET - a random album
- GET - album by ID
- GET - all albums by specific artist ID (e.g. ID 6 for Black Sabbath to retrieve all of their albums)
- POST - add a new album
- DELETE - remove album by ID

Artist HTTP routes:

- GET - all artists
- GET - a random artist
- GET - artist by ID
- POST - add a new artist
- DELETE - remove an artist by ID

## Technologies used

- Node.js
- Express.js
- Routers, Route Handlers
- Middleware
- HTTP Methods
- JSON
- node-postgres
- Render for API hosting
- Supabase for hosting a PostgreSQL database
