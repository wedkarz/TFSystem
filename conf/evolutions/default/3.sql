# --- !Ups

INSERT INTO "EVENTS" VALUES (1, '2014-12-11', 'Gdańsk');
INSERT INTO "EVENTS" VALUES (2, '2015-01-31', 'Gdańsk');
INSERT INTO "EVENTS" VALUES (3, '2015-02-02', 'Gdańsk');
INSERT INTO "PRESENTATIONS" VALUES (1, 'Scala', '15.00-16.00', 'Presenter 1, Presenter 2', 1);
INSERT INTO "PRESENTATIONS" VALUES (2, 'Play', '16.00-16.45', 'Presenter 1', 1);
INSERT INTO "PRESENTATIONS" VALUES (3, 'Slick', '17.00-17.30', 'Presenter 2', 1);
INSERT INTO "PRESENTATIONS" VALUES (4, 'test', '17.00-17.45', 'Presenter 1, Presenter 2', 2);
INSERT INTO "PRESENTATIONS" VALUES (5, 'zzzzzzzzz', '18.00-18.45', 'Presenter 1, Presenter 3', 2);

# --- !Downs

