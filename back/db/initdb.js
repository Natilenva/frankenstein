import 'dotenv/config';
console.log('frankenstein variables: ', process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);

import { getConnectionNoDb } from './getConnectionWithoutDb.js';

async function main() {
    const connection = await getConnectionNoDb();
    console.log('Connected to MySQL server');

    try {
        // Drop the database if it exists
        await connection.query(`DROP DATABASE IF EXISTS frankenstein`);
        console.log('Database dropped if it exists');

        // Create the database
        await connection.query(`CREATE DATABASE frankenstein`);
        console.log('Database created successfully');
    
        // Selecting the newly created database
        await connection.query(`USE frankenstein `);
        console.log(`Using database `);

        // Drop the table if it exists
        await connection.query('DROP TABLE IF EXISTS register, profile, questions, events, projects, responses, votes');
        console.log('Tables dropped if it exists');

        console.log('Creating tables');

        await connection.query(`
            CREATE TABLE register (
                register_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email varchar(100) UNIQUE NOT NULL,
                register_password varchar(100) NOT NULL,
                register_code varchar(36),
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                modified_at datetime DEFAULT CURRENT_TIMESTAMP
            );  
        `);

        await connection.query(`
            CREATE TABLE  profile (
                profile_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                profile_name varchar(50) NOT NULL,
                profile_lastname varchar(50) NOT NULL,
                profile_username varchar(50),
                birthdate DATETIME,
                profile_role enum('expert','company', 'students') ,
                company_name varchar(100) ,
                avatar varchar(255) ,
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                register_id int NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
            );
        `);

        await connection.query(`
            CREATE TABLE questions (
                question_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                question_title varchar(255)   NOT NULL,
                question_description text NOT NULL,
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                register_id  int NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
            );   
        `);

        await connection.query(`
            CREATE TABLE events (
                event_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                event_title varchar(100) NOT NULL,
                event_description text NOT NULL,
                place varchar(50) NOT NULL,
                event_url varchar(255),
                event_photo varchar(255),
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                register_id  int NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
            );     
        `);

        await connection.query(`
            CREATE TABLE projects (
                project_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                project_title varchar(100) NOT NULL,
                project_description text,
                project_photo varchar(255),
                project_url varchar(255),
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                register_id  int NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
            );
        `);

        await connection.query(`
            CREATE TABLE responses (
                response_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                response_text text NOT NULL,
                register_id  int NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
            );  
        `);

        await connection.query(`
            CREATE TABLE votes (
                vote_response_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
                vote_value tinyint NOT NULL,
                register_id  int NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
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
