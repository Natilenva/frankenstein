import 'dotenv/config';

import { getConnection } from './db.js';

async function main() {
    let connection;

    try {
        connection = await getConnection();
        
        console.log('Poniendo base de datos en uso');
        await connection.query('USE frankenstein');
        console.log('Base de datos en uso');

        console.log('Borrando tablas existentes');
        await connection.query
            ('DROP TABLE IF EXISTS votes_proyects, proyects_comments, proyects, votes_events, events_comments, events, votes_responses, users_responses, responses, questions, topics, users, users_types, persons;'
            );
            
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
            CREATE TABLE users_types(
              user_type_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
              role enum('expert','business', 'students', 'anonymous') DEFAULT  'anonymous'
            );   
        `);

        await connection.query(`
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
                person_id  int DEFAULT NULL,
                FOREIGN KEY (person_id) REFERENCES persons(person_id),
                user_type_id  int DEFAULT NULL,
                FOREIGN KEY (user_type_id) REFERENCES users_types(user_type_id)
            );   
        `);

        await connection.query(`
            CREATE TABLE topics (
              topic_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
              role enum('design_code',' design','code') DEFAULT 'design_code'
            );  
        `);

        await connection.query(`
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
                CREATE TABLE users_responses (
                user_response_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                user_id int NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                response_id int NOT NULL,
                FOREIGN KEY (response_id) REFERENCES responses(response_id)
            );   
        `);

        await connection.query(`
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
            CREATE TABLE projects (
                  project_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  title varchar(100) NOT NULL,
                  description text DEFAULT NULL,
                  photo varchar(255) DEFAULT NULL,
                  created_at datetime DEFAULT CURRENT_TIMESTAMP,
                  modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                  user_id int DEFAULT NULL,
                  FOREIGN KEY (user_id) REFERENCES users(user_id)
            );
        `);

        await connection.query(` 
            CREATE TABLE projects_comments (
                project_comment_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                comment text,
                project_id int NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects(project_id),
                user_id int NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            );  
        `);

        await connection.query(`
            CREATE TABLE votes_projects (
                vote_project_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                value tinyint NOT NULL,
                project_id int NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects(project_id),
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
