CREATE TABLE artists ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    bio TEXT,
    genre VARCHAR(255)
); 

CREATE TABLE albums ( 
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255), 
    release_date date, 
    genre VARCHAR(255),
    artist_id INT REFERENCES artists(id)
); 

CREATE TABLE album_artists ( 
    album_id INT REFERENCES albums(id),
    artist_id INT REFERENCES artists(id), 
    PRIMARY KEY (album_id, artist_id) 
); 

