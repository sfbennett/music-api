# Music API

A RESTful music API that I created with Express.js and connected up to a PostgreSQL database.

The API manages data from various endpoints and is hosted on Render. The PostgreSQL database was first created using SQL and then hosted on Supabase.

## Installation

```sh
git clone https://github.com/yourusername/music-api.git
cd music-api
npm install
```

To set up this project locally, you'll also need to run the SQL included in the `db` folder.

## Running the Server

`node app.js`

## Album API Endpoints

Get all albums

- Method: `GET`
- URL: `/albums`

Get a random album

- Method: `GET`
- URL: `/albums/random-album`

Get an album by ID

- Method: `GET`
- URL: `/albums/:albumId`

Get all albums by a specific artist ID

- Method: `GET`
- URL: `/album-artists/:artistId`

(e.g., ID 6 for Black Sabbath to retrieve all of their albums)

Add a new album

- Method: `POST`
- URL: `/albums`

Remove an album by ID

- Method: `DELETE`
- URL: `/albums/:albumId`

## Artist API Endpoints

Get all artists

- Method: `GET`
- URL: `/artists`

Get a random album

- Method: `GET`
- URL: `/artists/random-artist`

Get an artist by ID

- Method: `GET`
- URL: `/artists/:artistId`

Add a new artist

- Method: `POST`
- URL: `/artists`

Remove an artist by ID

- Method: `DELETE`
- URL: `/artists/:artistId`

## Tools and Technologies

- Node.js
- Express.js
- Routers, Route Handlers and Middleware
- HTTP Methods
- JSON
- node-postgres
- Render for API hosting
- Postbird (for accessing the database locally)
- Supabase for hosting the PostgreSQL database
