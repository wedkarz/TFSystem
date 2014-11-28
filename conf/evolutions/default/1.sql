# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "EVENTS" ("ID" SERIAL NOT NULL PRIMARY KEY,"DATE" DATE NOT NULL);
create table "PRESENTATIONS" ("ID" SERIAL NOT NULL PRIMARY KEY,"NAME" VARCHAR(254) NOT NULL,"TIME" VARCHAR(254) NOT NULL, "EVENT_ID" INTEGER);
alter table "PRESENTATIONS" add constraint "EVENT_FK" foreign key("EVENT_ID") references "EVENTS"("ID") on update NO ACTION on delete NO ACTION;

INSERT INTO "EVENTS" VALUES (1, '2014-12-11');
INSERT INTO "EVENTS" VALUES (2, '2015-01-31');
INSERT INTO "EVENTS" VALUES (3, '2015-02-02');
INSERT INTO "PRESENTATIONS" VALUES (1, 'Scala', '15.00-16.00', 1);
INSERT INTO "PRESENTATIONS" VALUES (2, 'Play', '16.00-16.45', 1);
INSERT INTO "PRESENTATIONS" VALUES (3, 'Slick', '17.00-17.30', 1);
INSERT INTO "PRESENTATIONS" VALUES (4, 'test', '17.00-17.45', 2);
INSERT INTO "PRESENTATIONS" VALUES (5, 'zzzzzzzzz', '18.00-18.45', 2);

# --- !Downs

alter table "PRESENTATIONS" drop constraint "EVENT_FK";
drop table "EVENTS";
drop table "PRESENTATIONS";

