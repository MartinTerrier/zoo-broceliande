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
    description VARCHAR NOT NULL,
    "imageId" INT,
    FOREIGN KEY ("imageId")
                     REFERENCES service_image(id)
);

CREATE TABLE service_image (
                               id SERIAL PRIMARY KEY NOT NULL,
                               "imageFile" BYTEA NOT NULL,
                               "serviceId" INT,
                               FOREIGN KEY ("serviceId")
                                   REFERENCES service(id)
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
VALUES ('Visite guidée du parc', 'Venez passer un moment exceptionnel au zooparc de Brocéliande ! Apprenez comment fonctionne le parc, ses projets, la gestion des animaux au quotidien. Au programme également, l’engagement du zoo pour la conservation des espèces en milieu naturel, les échanges avec d''autres parcs zoologiques, des anecdotes etc. Ces visites sont gratuites.'),
        ('Visite en train', 'Profitez d''une visite à travers le zooparc à bord de notre petit train de caractère. Un départ a lieu toutes les heures de 10 heures à 18 heures, et la visite dure une demi-heure. Tous à bord ! Coût du billet : 5 euros.');
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