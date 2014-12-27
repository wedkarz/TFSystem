# --- !Ups

INSERT INTO "USERS" VALUES ('so.dominik.kwiatkowski@example.com', 'D4BC5B90-78E7-11E4-82F8-0800200C9A66', 'superorganizer');
INSERT INTO "USERS" VALUES ('so.jakub.nowicki@example.com', 'BAD8CE60-78FC-11E4-82F8-0800200C9A66', 'superorganizer');
INSERT INTO "USERS" VALUES ('so.aleksander.bołt@example.com', 'C82DE460-78FC-11E4-82F8-0800200C9A66', 'superorganizer');
INSERT INTO "USERS" VALUES ('so.artur.rybak@example.com', 'D9D4A140-78FC-11E4-82F8-0800200C9A66', 'superorganizer');
INSERT INTO "USERS" VALUES ('o.dominik.kwiatkowski@example.com', 'D21E391C-4F92-4A4B-9F04-ED8D72E3C486', 'organizer');
INSERT INTO "USERS" VALUES ('o.jakub.nowicki@example.com', 'E40276D1-6317-47C6-B461-C8FBAB5757F7', 'organizer');
INSERT INTO "USERS" VALUES ('o.aleksander.bołt@example.com', 'CDE035F9-D561-4EF1-BB1E-493BC8838474', 'organizer');
INSERT INTO "USERS" VALUES ('o.artur.rybak@example.com', '7C3C912C-5F54-4D3E-951E-B31C720CADAE', 'organizer');
INSERT INTO "USERS" VALUES ('pres.dominik.kwiatkowski@example.com', 'F47745F0-7F0C-11E4-B4A9-0800200C9A66', 'presenter');
INSERT INTO "USERS" VALUES ('pres.jakub.nowicki@example.com', 'FC04DDF0-7F0C-11E4-B4A9-0800200C9A66', 'presenter');
INSERT INTO "USERS" VALUES ('pres.aleksander.bołt@example.com', '02D9FB60-7F0D-11E4-B4A9-0800200C9A66', 'presenter');
INSERT INTO "USERS" VALUES ('pres.artur.rybak@example.com', '09B692E0-7F0D-11E4-B4A9-0800200C9A66', 'presenter');
INSERT INTO "USERS" VALUES ('user.dominik.kwiatkowski@example.com', '110C5200-7F0D-11E4-B4A9-0800200C9A66', 'participant');
INSERT INTO "USERS" VALUES ('user.jakub.nowicki@example.com', '1C041710-7F0D-11E4-B4A9-0800200C9A66', 'participant');
INSERT INTO "USERS" VALUES ('user.aleksander.bołt@example.com', '252C2530-7F0D-11E4-B4A9-0800200C9A66', 'participant');
INSERT INTO "USERS" VALUES ('user.artur.rybak@example.com', '2BF0EEF0-7F0D-11E4-B4A9-0800200C9A66', 'participant');

# --- !Downs

DELETE FROM "USERS";
