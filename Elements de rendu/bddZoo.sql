CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE "user" (
    "userName" VARCHAR(50) PRIMARY KEY NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE service (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR NOT NULL
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY NOT NULL,
    alias VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    "isDisplayed" BOOLEAN NOT NULL
);

CREATE TABLE habitat (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    comment VARCHAR
);

CREATE TABLE habitat_image (
    id SERIAL PRIMARY KEY NOT NULL,
    "imagePath" VARCHAR NOT NULL,
    "habitatId" INT,
    FOREIGN KEY ("habitatId")
    REFERENCES habitat(id)
);

CREATE TABLE species (
    id SERIAL PRIMARY KEY NOT NULL,
    label VARCHAR(100) NOT NULL
);

CREATE TABLE animal (
    id SERIAL PRIMARY KEY NOT NULL ,
    name VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    views INT NOT NULL,
    "speciesId" INT,
    "habitatId" INT,
    FOREIGN KEY ("speciesId")
        REFERENCES species(id),
    FOREIGN KEY ("habitatId")
        REFERENCES habitat(id)
);


CREATE TABLE meal (
    id SERIAL PRIMARY KEY NOT NULL,
    food VARCHAR(50) NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    "animalId" INT,
    "employeeUserName" VARCHAR(50),
    FOREIGN KEY ("animalId")
        REFERENCES animal(id),
    FOREIGN KEY ("employeeUserName")
        REFERENCES "user"("userName")
);

CREATE TABLE vet_report (
    id SERIAL PRIMARY KEY NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    "animalId" INT,
    "vetUserName" VARCHAR(50),
    FOREIGN KEY ("animalId")
        REFERENCES animal(id),
    FOREIGN KEY ("vetUserName")
        REFERENCES "user"("userName")
);

INSERT INTO "user" ("userName", password, name, "firstName", role)
VALUES ('admin@example.com', '$2b$10$JxNxhrtSq.tzk53VF7jZoekgaKuHsx3L/RilYJOooLNU8zrJEuZ5u', 'admin', 'adm', 'admin'),
       ('john@example.com', '$2b$10$JxNxhrtSq.tzk53VF7jZoekgaKuHsx3L/RilYJOooLNU8zrJEuZ5u', 'Doe', 'John', 'vet'),
       ('jane@example.com', '$2b$10$JxNxhrtSq.tzk53VF7jZoekgaKuHsx3L/RilYJOooLNU8zrJEuZ5u', 'Smith', 'Jane', 'employee');
INSERT INTO service (name, description)
VALUES ('Guided Tour', 'Guided tour of the zoo'),
        ('Animal Encounter', 'Up-close encounter with animals');
INSERT INTO species (label) VALUES ('Lion'), ('Tiger'), ('Elephant');
INSERT INTO comment (alias, content, "isDisplayed")
VALUES ('User1', 'Great zoo!', true),
       ('User2', 'Amazing animals!', false);
INSERT INTO habitat (name, description, comment)
VALUES ('Savanna', 'Large grasslands', 'Suitable for lions'),
       ('Rainforest', 'Dense tropical forests', '');
INSERT INTO animal (name, status, views, "speciesId", "habitatId")
VALUES ('Alex', 'healthy', 234, 2, 1),
       ('Hati', 'sick', 152, 3, 2);
INSERT INTO meal (food, quantity, "animalId", "employeeUserName")
VALUES ('meat', '5 kg', 1, 'jane@example.com'),
       ('leaves', '10 kg', 2, 'jane@example.com');
INSERT INTO vet_report (content, "animalId", "vetUserName")
VALUES ('Monthly checkup', 1, 'john@example.com'),
       ('Emergency surgery', 2, 'john@example.com');