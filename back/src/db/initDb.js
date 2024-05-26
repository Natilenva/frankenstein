import getConnection from './getConnection.js';

const createTables = async () => {
    try {
        const connection = await getConnection();

        console.log('Borrando tablas...');

        await connection.query(
            'DROP TABLE IF EXISTS register, profile, questions, events, projects, responses, votes, companies, Skills, ExpertSkills'
        );
        await connection.query('USE frankenstein');
        console.log('Creando tablas');

        await connection.query(`
                CREATE TABLE register (
                    register_id int AUTO_INCREMENT PRIMARY KEY,
                    email varchar(100) UNIQUE NOT NULL,
                    register_password varchar(100) NOT NULL,
                    register_code varchar(36),
                    active BOOLEAN DEFAULT false,
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    modified_at datetime DEFAULT CURRENT_TIMESTAMP
                );
            `);

        await connection.query(`
                CREATE TABLE  profile (
                    profile_id INT PRIMARY KEY AUTO_INCREMENT,
                    profile_name varchar(50) NOT NULL,
                    profile_lastname varchar(50) NOT NULL,
                    profile_username varchar(50),
                    birthdate DATE,
                    profile_role enum('expert','company', 'student') ,
                    avatar varchar(255) ,
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                    register_id int NOT NULL UNIQUE,
                    company_id int DEFAULT NULL,
                    is_company_validated BOOLEAN DEFAULT false,
                    validate boolean DEFAULT false,
                    FOREIGN KEY (register_id) REFERENCES register(register_id)

                );
            `);
        //,FOREIGN KEY (company_id) REFERENCES companies(company_id)

        await connection.query(`
                CREATE TABLE questions (
                    question_id int PRIMARY KEY AUTO_INCREMENT,
                    question_title varchar(255) NOT NULL,
                    question_description text NOT NULL,
                    technology varchar(100),
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                    user_id int NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES register(register_id)
                );
            `);

        await connection.query(`
                CREATE TABLE events (
                    event_id int PRIMARY KEY AUTO_INCREMENT,
                    event_title varchar(100) NOT NULL,
                    event_description text NOT NULL,
                    place varchar(50) NOT NULL,
                    event_url varchar(255),
                    event_photo varchar(255),
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                    register_id int NOT NULL,
                    FOREIGN KEY (register_id) REFERENCES register(register_id)
                );
            `);

        await connection.query(`
                CREATE TABLE projects (
                    project_id INT PRIMARY KEY AUTO_INCREMENT,
                    project_title varchar(100) NOT NULL,
                    project_description text,
                    project_photo varchar(255),
                    project_url varchar(255),
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    modified_at datetime DEFAULT CURRENT_TIMESTAMP,
                    register_id  INT ,
                    FOREIGN KEY (register_id) REFERENCES register(register_id)
                );
            `);

        await connection.query(`
                CREATE TABLE responses (
                    response_id INT PRIMARY KEY AUTO_INCREMENT,
                    response_text text NOT NULL,
                    register_id INT,
                    question_id INT NOT NULL,
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(register_id, response_id),
                    FOREIGN KEY (question_id) REFERENCES questions(question_id),
                    FOREIGN KEY (register_id) REFERENCES register (register_id)
                );

            `);

        await connection.query(`
                CREATE TABLE votes (
                    vote_response_id INT PRIMARY KEY AUTO_INCREMENT,
                    vote_value tinyint NOT NULL,
                    register_id INT NOT NULL,
                    response_id INT NOT NULL,
                    created_at datetime DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (register_id) REFERENCES register(register_id),
                    FOREIGN KEY (response_id) REFERENCES responses(response_id)
                );
            `);
        await connection.query(`
            CREATE TABLE companies(
                company_id INT PRIMARY KEY AUTO_INCREMENT,
                company_name varchar(100) UNIQUE,
                register_id  INT NOT NULL,
                FOREIGN KEY (register_id) REFERENCES register(register_id)
            )
            `);

        await connection.query(`
            CREATE TABLE Skills (
                idSkill INT PRIMARY KEY AUTO_INCREMENT,
                skill VARCHAR(100) UNIQUE NOT NULL,
                description VARCHAR(100) NOT NULL
            );
        `);
        await connection.query(`
                CREATE TABLE ExpertSkills (
                    idSkill INT NOT NULL,
                    expertUserID INT NOT NULL,
                    FOREIGN KEY (expertUserID) REFERENCES register(register_id),
                    FOREIGN KEY (idSkill) REFERENCES Skills(idSkill)
                );
            `);

        console.log('Creando tablas');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createTables();
