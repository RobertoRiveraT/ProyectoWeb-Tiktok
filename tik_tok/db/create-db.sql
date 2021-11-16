CREATE DATABASE IF NOT EXISTS tik_tok;

CREATE USER 'tik_tok' IDENTIFIED BY 'UnEevMNzCj';

GRANT INSERT,DELETE,UPDATE,SELECT
ON tik_tok.*
TO tik_tok;

USE tik_tok;

CREATE TABLE IF NOT EXISTS user (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL UNIQUE,
    profile_name VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
    description VARCHAR(300) CHARACTER SET utf8mb4 NOT NULL,
    password VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS video (
    video_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    url VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL UNIQUE,
    title VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL
);

CREATE TABLE IF NOT EXISTS comment (
    comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    content VARCHAR(250) CHARACTER SET utf8mb4 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS video_like (
    like_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    video_id INT NOT NULL
);

INSERT INTO user
(username, profile_name, description, password)
VALUES('arayfer_2', 'Ara y Fer', 'Bonita vida', 'qwerty');

INSERT INTO video
(user_id, url, title)
VALUES(1, '/tiktoks/video1.mp4', 'A bailaar');

INSERT INTO video
(user_id, url, title)
VALUES(1, '/tiktoks/video4.mp4', 'En esta cuenta estamos subiendo más videos :)');

INSERT INTO user
(username, profile_name, description, password)
VALUES('soojinicoreana', 'Chingu Amiga', 'IG Soojinicoreana', 'qwerty');

INSERT INTO video
(user_id, url, title)
VALUES(2, '/tiktoks/video2.mp4', 'Me sorprendí que es TAN diferente');

INSERT INTO user
(username, profile_name, description, password)
VALUES('angelaaguilar_', 'Anguela Aguilar :)', 'MX', 'qwerty');

INSERT INTO video
(user_id, url, title)
VALUES(3, '/tiktoks/video3.mp4', '#EnRealidadChallenge');
