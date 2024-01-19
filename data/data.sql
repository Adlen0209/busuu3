 INSERT INTO "training" (titre, detail) VALUES
('pushup', 'test'),
('squat', 'test'),
('traction', 'test'),
('dips', 'test');

INSERT INTO "type" (titre) VALUES
('perte de poids'),
('100 pushup'),
('50 tractions');

INSERT INTO "exercice" (titre, detail, illustration) VALUES
('pushup', 'pushup detail', 'svg'),
('squat', 'squat detail', 'svg'),
('traction', 'traction detail', 'svg'),
('dips', 'dips detail', 'svg');

INSERT INTO "niveau" (description, max_rep) VALUES
('beginner-5', 1),
('beginner-5', 2),
('beginner-5', 3),
('beginner-5', 4),
('beginner-5', 5),
('beginner-10', 6),
('beginner-10', 7),
('beginner-10', 8),
('beginner-10', 9),
('beginner-10', 10);

INSERT INTO "user_has_training" (user_id, training_id) VALUES
(2, 1),
(3, 2),
(4, 3);

INSERT INTO "training_has_exercice" (training_id, exercice_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 4);

INSERT INTO "exercice_has_niveau" (niveau_id, exercice_id, user_id) VALUES
(1, 1, 2),
(2, 3, 3),
(1, 2, 2),
(3, 4, 4);


INSERT INTO "serie" (niveau_id, exercice_id, numero_serie, nombre_rep) VALUES
(1, 1, 1, 3),
(1, 1, 2, 4),
(1, 1, 3, 3),
(1, 1, 4, 3),
(1, 1, 5, 5),
(2, 1, 1, 5),
(2, 1, 2, 7),
(2, 1, 3, 5),
(2, 1, 4, 5),
(2, 1, 5, 8),
(3, 1, 1, 8),
(3, 1, 2, 10),
(3, 1, 3, 7),
(3, 1, 4, 7),
(3, 1, 5, 10),
(1, 2, 1, 3),
(1, 2, 2, 4),
(1, 2, 3, 3),
(1, 2, 4, 3),
(1, 2, 5, 5),
(2, 2, 1, 5),
(2, 2, 2, 7),
(2, 2, 3, 5),
(2, 2, 4, 5),
(2, 2, 5, 8),
(3, 2, 1, 8),
(3, 2, 2, 10),
(3, 2, 3, 7),
(3, 2, 4, 7),
(3, 2, 5, 10);


COMMIT;