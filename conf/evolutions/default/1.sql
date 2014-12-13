# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "EVENTS" ("ID" BIGSERIAL NOT NULL PRIMARY KEY,"DATE" DATE NOT NULL,"PLACE" VARCHAR(254) NOT NULL);
create table "PRESENTATIONS" ("ID" BIGSERIAL NOT NULL PRIMARY KEY,"NAME" VARCHAR(254) NOT NULL,"TIME" VARCHAR(254) NOT NULL,"PRESENTERS" VARCHAR(254) NOT NULL,"EVENT_ID" BIGINT NOT NULL);
create table "USERS" ("EMAIL" VARCHAR(254) NOT NULL PRIMARY KEY,"TOKEN" VARCHAR(254) NOT NULL,"ROLE" VARCHAR(254) NOT NULL);
alter table "PRESENTATIONS" add constraint "EVENT_FK" foreign key("EVENT_ID") references "EVENTS"("ID") on update NO ACTION on delete NO ACTION;

# --- !Downs

alter table "PRESENTATIONS" drop constraint "EVENT_FK";
drop table "USERS";
drop table "PRESENTATIONS";
drop table "EVENTS";

