--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: user_character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_character (
    life_points integer NOT NULL,
    attack_points integer NOT NULL,
    defense_points integer NOT NULL,
    player_id integer,
    character_id integer,
    is_active boolean
);


ALTER TABLE user_character OWNER TO postgres;

--
-- Name: Characters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Characters_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Characters_id_seq" OWNER TO postgres;

--
-- Name: Characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Characters_id_seq" OWNED BY user_character.player_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id integer NOT NULL,
    name character varying(2044) NOT NULL,
    gold integer
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "user".id;


--
-- Name: character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "character" (
    id integer NOT NULL,
    character_name character varying(2044) NOT NULL,
    base_health integer NOT NULL,
    base_attack integer NOT NULL,
    base_defense integer NOT NULL
);


ALTER TABLE "character" OWNER TO postgres;

--
-- Name: leaderboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE leaderboard (
    score integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE leaderboard OWNER TO postgres;

--
-- Name: player_character_character_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE player_character_character_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE player_character_character_id_seq OWNER TO postgres;

--
-- Name: player_character_character_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE player_character_character_id_seq OWNED BY "character".id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE teams (
    player_id integer NOT NULL,
    character_id_1 integer NOT NULL,
    character_id_2 integer NOT NULL,
    character_id_3 integer NOT NULL
);


ALTER TABLE teams OWNER TO postgres;

--
-- Name: character id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "character" ALTER COLUMN id SET DEFAULT nextval('player_character_character_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Name: user_character player_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_character ALTER COLUMN player_id SET DEFAULT nextval('"Characters_id_seq"'::regclass);


--
-- Name: Characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Characters_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Users_id_seq"', 1, false);


--
-- Data for Name: character; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "character" VALUES (11, 'Grougal', 50, 50, 50);
INSERT INTO "character" VALUES (12, 'Samantha', 60, 60, 60);
INSERT INTO "character" VALUES (13, 'Nefarian', 40, 40, 40);
INSERT INTO "character" VALUES (14, 'Menegal', 80, 100, 120);
INSERT INTO "character" VALUES (15, 'Rubius', 10, 10, 10);
INSERT INTO "character" VALUES (16, 'Oster', 80, 54, 68);
INSERT INTO "character" VALUES (17, 'Triela', 87, 51, 87);


--
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO leaderboard VALUES (140, 2);
INSERT INTO leaderboard VALUES (140, 1);


--
-- Name: player_character_character_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('player_character_character_id_seq', 1, false);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO teams VALUES (1, 14, 15, 16);
INSERT INTO teams VALUES (2, 11, 12, 13);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" VALUES (1, 'father', 400);
INSERT INTO "user" VALUES (2, 'danilo', 400);


--
-- Data for Name: user_character; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_character VALUES (60, 60, 60, 2, 11, true);
INSERT INTO user_character VALUES (80, 110, 125, 1, 14, true);
INSERT INTO user_character VALUES (90, 60, 90, 1, 16, true);
INSERT INTO user_character VALUES (15, 10, 10, 1, 15, true);
INSERT INTO user_character VALUES (62, 60, 70, 2, 12, true);
INSERT INTO user_character VALUES (80, 100, 120, 2, 13, true);
INSERT INTO user_character VALUES (87, 51, 87, 1, 17, false);


--
-- Name: user Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: character character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "character"
    ADD CONSTRAINT character_pkey PRIMARY KEY (id);


--
-- Name: teams unique_player_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT unique_player_id UNIQUE (player_id);


--
-- Name: index_character_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_character_id ON user_character USING btree (character_id);


--
-- Name: index_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_user_id ON leaderboard USING btree (user_id);


--
-- Name: leaderboard lnk_Users_Scores; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY leaderboard
    ADD CONSTRAINT "lnk_Users_Scores" FOREIGN KEY (user_id) REFERENCES "user"(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_character lnk_character_player_character; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_character
    ADD CONSTRAINT lnk_character_player_character FOREIGN KEY (character_id) REFERENCES "character"(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_character lnk_team_user_character; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_character
    ADD CONSTRAINT lnk_team_user_character FOREIGN KEY (player_id) REFERENCES teams(player_id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teams lnk_user_team; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT lnk_user_team FOREIGN KEY (player_id) REFERENCES "user"(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

