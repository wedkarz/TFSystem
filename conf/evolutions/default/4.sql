# --- !Ups

INSERT INTO "NOTIFICATIONS" VALUES (1, 1, 'participant', 48, 'default');
INSERT INTO "NOTIFICATIONS" VALUES (2, 2, 'participant', 72, 'default'); 
INSERT INTO "NOTIFICATIONS" VALUES (3, 3, 'participant', 100, 'default');

# --- !Downs

DELETE FROM "NOTIFICATIONS";