DROP DATABASE IF EXISTS frankenstein;
CREATE DATABASE frankenstein;
USE frankenstein;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  username varchar(30) NOT NULL,
  avatar varchar(100) DEFAULT NULL,
  role enum('expert','business', 'students', 'anonymous') DEFAULT 'anonymous',
 token varchar(36) DEFAULT NULL,
  recover_pass_code varchar(36) DEFAULT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  modified_at datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
);

DROP TABLE IF EXISTS entries;
CREATE TABLE entries (
  entry_id int NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  place varchar(50),
  description text,
  photo varchar(255) DEFAULT NULL,
  role enum('events','proyect', 'question') DEFAULT 'proyect',
  user_id int DEFAULT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  modified_at datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (entry_id),
  KEY user_id (user_id),
  CONSTRAINT entries_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL ON UPDATE CASCADE
);


DROP TABLE IF EXISTS entry_votes;
CREATE TABLE entry_votes (
  vote_id int NOT NULL AUTO_INCREMENT,
  value tinyint NOT NULL,
  entry_id int NOT NULL,
  user_id int DEFAULT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  modified_at datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vote_id),
  KEY entry_id (entry_id),
  KEY user_id (user_id),
  CONSTRAINT entry_votes_ibfk_1 FOREIGN KEY (entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT entry_votes_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL ON UPDATE CASCADE
);