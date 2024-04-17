import 'dotenv/config';


import getConnection from './db.js';


async function main() {
 let connection;

 try {
   connection = await getConnection();

   console.log('Borrando tablas existentes');

   await connection.query('DROP TABLE IF EXISTS votes_proyects');
   
   
   await connection.query('DROP TABLE IF EXISTS proyects_comments');
   await connection.query('DROP TABLE IF EXISTS proyects');
   await connection.query('DROP TABLE IF EXISTS votes_events');
   await connection.query('DROP TABLE IF EXISTS events_comments');
   await connection.query('DROP TABLE IF EXISTS events');
   await connection.query('DROP TABLE IF EXISTS votes_responses');
   await connection.query('DROP TABLE IF EXISTS users_responses');
   await connection.query('DROP TABLE IF EXISTS responses');
   await connection.query('DROP TABLE IF EXISTS questions');
   await connection.query('DROP TABLE IF EXISTS topics');
   await connection.query('DROP TABLE IF EXISTS users');
   await connection.query('DROP TABLE IF EXISTS users_types');
   await connection.query('DROP TABLE IF EXISTS persons');
   



   console.log('Creando tablas');

   await connection.query(`

   CREATE TABLE persons (
    person_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    birthdate DATETIME NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    modified_at datetime DEFAULT CURRENT_TIMESTAMP
  );

   `);


   await connection.query(`
   -- DROP TABLE IF EXISTS users_types;
   CREATE TABLE users_types(
   user_type_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   role enum('expert','business', 'students', 'anonymous') DEFAULT  'anonymous'
   );
      
   
   `);
   
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS users;
   -- un usu tiene varias cuentas
   CREATE TABLE users (
     user_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
     email varchar(100) NOT NULL,
     password varchar(100) NOT NULL,
     username varchar(30) DEFAULT NULL,
     avatar varchar(100) DEFAULT NULL,
     code_registration varchar(36) DEFAULT NULL,
     recover_pass_code varchar(36) DEFAULT NULL,
     created_at datetime DEFAULT CURRENT_TIMESTAMP,
     modified_at datetime DEFAULT CURRENT_TIMESTAMP,
     person_id  int NOT NULL,
     FOREIGN KEY (person_id) REFERENCES persons(person_id),
     user_type_id  int NOT NULL,
      FOREIGN KEY (user_type_id) REFERENCES users_types(user_type_id)
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS topics;
   CREATE TABLE topics (
   topic_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   role enum('design_code',' design','code') DEFAULT 'design_code'
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS questions;
   CREATE TABLE questions (
   question_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   question_title text NOT NULL,
   topic_id  int NOT NULL,
   FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS responses;
   CREATE TABLE responses (
   response_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   response_title text NOT NULL,
   question_id int NOT NULL,
   FOREIGN KEY (question_id) REFERENCES questions(question_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS users_responses;
   CREATE TABLE users_responses (
   user_response_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   user_id int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id),
   response_id int NOT NULL,
   FOREIGN KEY (response_id) REFERENCES responses(response_id)
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS votes_responses;
   CREATE TABLE votes_responses (
   vote_response_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   value tinyint NOT NULL,
   response_id int NOT NULL,
   FOREIGN KEY (response_id) REFERENCES responses(response_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   `);
   
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS events;
   CREATE TABLE events (
     event_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
     title varchar(100) NOT NULL,
     place varchar(50) DEFAULT NULL,
     description text DEFAULT NULL,
     photo varchar(255) DEFAULT NULL,
     created_at datetime DEFAULT CURRENT_TIMESTAMP,
     modified_at datetime DEFAULT CURRENT_TIMESTAMP,
     user_id int NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS events_comments;
   CREATE TABLE events_comments (
   event_comment_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   comment text,
   event_id int NOT NULL,
   FOREIGN KEY (event_id) REFERENCES events(event_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS votes_events;
   CREATE TABLE votes_events (
   vote_event_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   value tinyint NOT NULL,
   event_id int NOT NULL,
   FOREIGN KEY (event_id) REFERENCES events(event_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );   
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS proyects;
   CREATE TABLE proyects (
     proyect_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
     title varchar(100) NOT NULL,
     description text DEFAULT NULL,
     photo varchar(255) DEFAULT NULL,
     created_at datetime DEFAULT CURRENT_TIMESTAMP,
     modified_at datetime DEFAULT CURRENT_TIMESTAMP,
     user_id int NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   `);
   
   
   await connection.query(`
   
      CREATE TABLE proyects_comments (
   proyect_comment_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   comment text,
   proyect_id int NOT NULL,
   FOREIGN KEY (proyect_id) REFERENCES proyects(proyect_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   `);
   
   await connection.query(`
   
      -- DROP TABLE IF EXISTS votes_proyects;
   CREATE TABLE votes_proyects (
   vote_proyect_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
   value tinyint NOT NULL,
   proyect_id int NOT NULL,
   FOREIGN KEY (proyect_id) REFERENCES proyects(proyect_id),
   user_id  int NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id)
   );
   
   
   `);
   
   


 } catch (error) {
   console.error(error);
 } finally {
   if (connection) connection.release();
   process.exit();
 }
}

main();