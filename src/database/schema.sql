-- Active: 1682782238529@@127.0.0.1@3306



CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes NUMBER,
    dislikes NUMBER,
    created_at TEXT NOT NULL,
    updated_at TEXT,        
    FOREIGN KEY (creator_id) REFERENCES user(id)
);


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);