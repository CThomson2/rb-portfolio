--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Postgres.app)
-- Dumped by pg_dump version 16.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: still; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.still (
    id integer NOT NULL,
    code character varying(4),
    site character(2) NOT NULL,
    power integer NOT NULL,
    capacity integer NOT NULL,
    is_vacuum boolean DEFAULT false,
    is_operational boolean DEFAULT true,
    CONSTRAINT stills_capacity_check CHECK ((capacity = ANY (ARRAY[1, 2]))),
    CONSTRAINT stills_location_check CHECK ((site = ANY (ARRAY['OS'::bpchar, 'NS'::bpchar])))
);


ALTER TABLE public.still OWNER TO postgres;

--
-- Name: stills_still_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stills_still_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stills_still_id_seq OWNER TO postgres;

--
-- Name: stills_still_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stills_still_id_seq OWNED BY public.still.id;


--
-- Name: still id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.still ALTER COLUMN id SET DEFAULT nextval('public.stills_still_id_seq'::regclass);


--
-- Data for Name: still; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.still (id, code, site, power, capacity, is_vacuum, is_operational) FROM stdin;
1	A	OS	18	1	f	t
2	B	OS	18	1	f	t
3	C	OS	18	1	f	t
4	D	OS	9	1	f	t
5	E	OS	9	1	f	t
6	F	OS	9	1	f	t
7	G	OS	9	1	f	t
8	M	NS	27	2	f	t
9	N	NS	27	1	f	t
10	P	NS	27	1	f	t
11	Q	NS	27	1	f	t
12	R	NS	27	1	t	t
13	S	NS	27	2	f	t
14	T	NS	27	1	t	t
15	W	NS	27	1	t	t
\.


--
-- Name: stills_still_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stills_still_id_seq', 15, true);


--
-- Name: still stills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.still
    ADD CONSTRAINT stills_pkey PRIMARY KEY (id);


--
-- Name: still stills_still_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.still
    ADD CONSTRAINT stills_still_code_key UNIQUE (code);


--
-- PostgreSQL database dump complete
--

