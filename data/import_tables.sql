BEGIN;

DROP TABLE IF EXISTS "user", "training", "type", "exercice", "materiel","niveau", "exercice_has_niveau", "training_has_type", "training_has_exercice", "exercice_has_materiel", 
"serie", "user_has_training", "exercice_has_serie"; 



CREATE TABLE IF NOT EXISTS "training"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "titre" VARCHAR NOT NULL,
    "detail" VARCHAR NOT NULL
   
);



CREATE TABLE IF NOT EXISTS "user"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "nom" VARCHAR NOT NULL,
    "prenom" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "mot_de_passe" VARCHAR NOT NULL,
    "role" integer NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS "type"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "titre" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "exercice"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "titre" VARCHAR NOT NULL,
    "detail" VARCHAR NOT NULL,
    "illustration" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "materiel"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "nom" VARCHAR NOT NULL
);


CREATE TABLE IF NOT EXISTS "niveau"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "description" VARCHAR NOT NULL,
    "max_rep" integer NOT NULL
);



CREATE TABLE IF NOT EXISTS "exercice_has_niveau"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "niveau_id" integer REFERENCES "niveau" ("id"),
    "exercice_id" integer REFERENCES "exercice" ("id"),
    "user_id" integer REFERENCES "user" ("id"),
    "validated" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "training_has_type"
(
    "type_id" integer REFERENCES "type" ("id"),
    "training_id" integer REFERENCES "training" ("id"),
    PRIMARY KEY ("type_id", "training_id")
);

CREATE TABLE IF NOT EXISTS "training_has_exercice"
(
    "training_id"  integer REFERENCES "training" ("id"),
    "exercice_id"  integer REFERENCES "exercice" ("id"),
    PRIMARY KEY ("training_id", "exercice_id")
);

CREATE TABLE IF NOT EXISTS "exercice_has_materiel"
(
    "materiel_id"  integer REFERENCES "materiel" ("id"),
    "exercice_id"  integer REFERENCES "exercice" ("id"),
    PRIMARY KEY ("materiel_id", "exercice_id")
);

CREATE TABLE IF NOT EXISTS "user_has_training"
(
    "user_id"  integer REFERENCES "user" ("id"),
    "training_id"  integer REFERENCES "training" ("id"),
    PRIMARY KEY ("user_id", "training_id")
);

CREATE TABLE IF NOT EXISTS "serie"
(
    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "niveau_id"  integer NOT NULL,
    "exercice_id" integer NOT NULL,
    "nombre_rep" integer NOT NULL,
    "numero_serie" integer NOT NULL 
);

CREATE TABLE IF NOT EXISTS "exercice_has_serie"
(    "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "user_id"  integer REFERENCES "exercice_has_niveau" ("id"),
    "niveau_id"  integer REFERENCES "exercice_has_niveau" ("id"),
    "exercice_id"  integer REFERENCES "exercice_has_niveau" ("id"),    
    "numero_serie" integer NOT NULL,
     "nombre_rep" integer NOT NULL
   
);

COMMIT;