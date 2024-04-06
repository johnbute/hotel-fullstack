--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- Name: adress; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.adress AS (
        number bigint,
        city name,
        street name,
        postal_code text
);


ALTER TYPE public.adress OWNER TO postgres;

--
-- Name: payment_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_status AS ENUM (
    'paid',
    'unpaid'
);


ALTER TYPE public.payment_status OWNER TO postgres;

--
-- Name: problems/demages; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."problems/demages" AS ENUM (
    'minor',
    'none',
    'major'
);


ALTER TYPE public."problems/demages" OWNER TO postgres;

--
-- Name: reservation_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.reservation_status AS ENUM (
    'booked',
    'rented',
    'canceled'
);


ALTER TYPE public.reservation_status OWNER TO postgres;

--
-- Name: view; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.view AS ENUM (
    'sea',
    'mountain',
    'city'
);


ALTER TYPE public.view OWNER TO postgres;

--
-- Name: decrementnumberofhotels(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.decrementnumberofhotels() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Decrement the number_of_hotels column in Hotel_Chain
    UPDATE "Hotel_Chain"
    SET num_hotels = num_hotels - 1
    WHERE chain_id = OLD.parent_chain_id;

    RETURN OLD;
END;
$$;


ALTER FUNCTION public.decrementnumberofhotels() OWNER TO postgres;

--
-- Name: get_num_of_hotels(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_num_of_hotels(specific_chain_id bigint) RETURNS bigint
    LANGUAGE sql
    AS $$SELECT COUNT(*) AS num_hotels
FROM public."Hotel"
WHERE parent_chain_id = specific_chain_id;$$;


ALTER FUNCTION public.get_num_of_hotels(specific_chain_id bigint) OWNER TO postgres;

--
-- Name: incrementnumberofhotels(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.incrementnumberofhotels() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Increment the number_of_hotels column in Hotel_Chain
    UPDATE "Hotel_Chain"
    SET num_hotels = num_hotels + 1
    WHERE chain_id = NEW.parent_chain_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.incrementnumberofhotels() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Achive; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Achive" (
    achive_id bigint NOT NULL,
    start_date date,
    end_date date,
    hotel_id bigint,
    room_number bigint,
    customer_id bigint,
    check_in_date date,
    check_out_date date
);


ALTER TABLE public."Achive" OWNER TO postgres;

--
-- Name: Achive_achive_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Achive" ALTER COLUMN achive_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Achive_achive_id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    start_date date NOT NULL,
    checked_in boolean NOT NULL,
    end_date date NOT NULL,
    status public.reservation_status NOT NULL,
    reservation_id bigint NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    full_name text NOT NULL,
    registration_date date NOT NULL,
    ghest_id bigint NOT NULL,
    adress public.adress NOT NULL
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- Name: Customer_ghest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Customer" ALTER COLUMN ghest_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Customer_ghest_id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employee" (
    manager_id bigint,
    "SSN" bigint,
    phone_numbers text,
    "role/position" text,
    full_name text NOT NULL,
    employee_id bigint NOT NULL,
    hotel_id bigint NOT NULL
);


ALTER TABLE public."Employee" OWNER TO postgres;

--
-- Name: Employee_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Employee" ALTER COLUMN employee_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Employee_employee_id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Hotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hotel" (
    rating bigint NOT NULL,
    name text NOT NULL,
    emails text[],
    phone_numbers text[],
    hotel_id bigint NOT NULL,
    parent_chain_id bigint NOT NULL,
    manager_id bigint,
    adress public.adress NOT NULL,
    CONSTRAINT rating CHECK (((rating >= 0) AND (rating <= 5)))
);


ALTER TABLE public."Hotel" OWNER TO postgres;

--
-- Name: Hotel_Chain; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hotel_Chain" (
    name text NOT NULL,
    central_office_adress text NOT NULL,
    chain_id bigint NOT NULL,
    num_hotels bigint NOT NULL,
    emails text,
    phone_numbers text
);


ALTER TABLE public."Hotel_Chain" OWNER TO postgres;

--
-- Name: Hotel_Chain_chain_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Hotel_Chain" ALTER COLUMN chain_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Hotel_Chain_chain_id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Hotel_hotel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Hotel" ALTER COLUMN hotel_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Hotel_hotel_id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Renting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Renting" (
    check_in_date date NOT NULL,
    check_out_date date NOT NULL,
    payment_amount double precision NOT NULL,
    payment_status public.payment_status NOT NULL,
    end_date date NOT NULL,
    status public.reservation_status NOT NULL,
    reservation_id bigint NOT NULL
);


ALTER TABLE public."Renting" OWNER TO postgres;

--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    reservation_id bigint NOT NULL,
    end_date date NOT NULL,
    status public.reservation_status NOT NULL,
    customer_id bigint NOT NULL,
    hotel_id bigint NOT NULL,
    room_number bigint NOT NULL,
    employee_id bigint NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- Name: Reservation_reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Reservation" ALTER COLUMN reservation_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Reservation_reservation_id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    capacity bigint,
    price double precision NOT NULL,
    "TV" boolean,
    "AC" boolean,
    jacuzzi boolean,
    refrigerator boolean,
    extendable boolean,
    room_number bigint NOT NULL,
    view_type public.view,
    "problems/demages_type" public."problems/demages",
    hotel_id bigint NOT NULL,
    end_date date,
    r_id bigint,
    status public.reservation_status
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: view1; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.view1 AS
 SELECT (h.adress).city AS city,
    count(*) AS status
   FROM (public."Room" r
     JOIN public."Hotel" h ON ((r.hotel_id = h.hotel_id)))
  WHERE (r.status IS NULL)
  GROUP BY (h.adress).city;


ALTER VIEW public.view1 OWNER TO postgres;

--
-- Name: view2; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.view2 AS
 SELECT hotel_id,
    sum(capacity) AS total_capacity
   FROM public."Room"
  GROUP BY hotel_id;


ALTER VIEW public.view2 OWNER TO postgres;

--
-- Data for Name: Achive; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Achive" (achive_id, start_date, end_date, hotel_id, room_number, customer_id, check_in_date, check_out_date) FROM stdin;
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (start_date, checked_in, end_date, status, reservation_id) FROM stdin;
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" (full_name, registration_date, ghest_id, adress) FROM stdin;
\.


--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Employee" (manager_id, "SSN", phone_numbers, "role/position", full_name, employee_id, hotel_id) FROM stdin;
\.


--
-- Data for Name: Hotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hotel" (rating, name, emails, phone_numbers, hotel_id, parent_chain_id, manager_id, adress) FROM stdin;
3       Hote_name00     {hotelname00@email.com} {6132639987}    124     0       \N      (49," 'Toronto'"," 'Prince Edward'"," 'H3L L0L'")
1       Hote_name01     {hotelname01@email.com} {6132639987}    125     0       \N      (50," 'Romania'"," 'Rideau st'"," 'K2J 123'")
5       Hote_name02     {hotelname02@email.com} {6132639987}    126     0       \N      (26," 'London'"," 'Prince Edward'"," 'H3L L0L'")
0       Hote_name03     {hotelname03@email.com} {6132639987}    127     0       \N      (31," 'Belo Horizonte'"," 'Prince Edward'"," 'P2P T1T'")
3       Hote_name04     {hotelname04@email.com} {6132639987}    128     0       \N      (3," 'Romania'"," 'Rideau st'"," 'P2P T1T'")
4       Hote_name05     {hotelname05@email.com} {6132639987}    129     0       \N      (41," 'Toronto'"," 'Rue Berri'"," 'K2J 123'")
3       Hote_name06     {hotelname06@email.com} {6132639987}    130     0       \N      (16," 'Montreal'"," 'Rue Berri'"," 'P2P T1T'")
4       Hote_name07     {hotelname07@email.com} {6132639987}    131     0       \N      (28," 'Belo Horizonte'"," 'Rideau st'"," 'P2P T1T'")
2       Hote_name10     {hotelname10@email.com} {6132639987}    132     1       \N      (30," 'Ottawa'"," 'Rue Berri'"," 'K2J 123'")
2       Hote_name11     {hotelname11@email.com} {6132639987}    133     1       \N      (70," 'Belo Horizonte'"," 'Rue Berri'"," 'P2P T1T'")
3       Hote_name12     {hotelname12@email.com} {6132639987}    134     1       \N      (30," 'Belo Horizonte'"," 'Rideau st'"," 'H3L L0L'")
5       Hote_name13     {hotelname13@email.com} {6132639987}    135     1       \N      (46," 'Romania'"," 'Prince Edward'"," 'H3L L0L'")
3       Hote_name14     {hotelname14@email.com} {6132639987}    136     1       \N      (4," 'Ottawa'"," 'Prince Edward'"," 'P2P T1T'")
0       Hote_name15     {hotelname15@email.com} {6132639987}    137     1       \N      (17," 'Toronto'"," 'Prince Edward'"," 'P2P T1T'")
1       Hote_name16     {hotelname16@email.com} {6132639987}    138     1       \N      (5," 'London'"," 'Rideau st'"," 'H3L L0L'")
3       Hote_name17     {hotelname17@email.com} {6132639987}    139     1       \N      (88," 'Belo Horizonte'"," 'Prince Edward'"," 'P2P T1T'")
3       Hote_name20     {hotelname20@email.com} {6132639987}    140     2       \N      (91," 'Toronto'"," 'Rideau st'"," 'H3L L0L'")
4       Hote_name21     {hotelname21@email.com} {6132639987}    141     2       \N      (7," 'Belo Horizonte'"," 'Rideau st'"," 'K2J 123'")
3       Hote_name22     {hotelname22@email.com} {6132639987}    142     2       \N      (68," 'Montreal'"," 'Rideau st'"," 'H3L L0L'")
3       Hote_name23     {hotelname23@email.com} {6132639987}    143     2       \N      (25," 'Ottawa'"," 'Rue Berri'"," 'K2J 123'")
2       Hote_name24     {hotelname24@email.com} {6132639987}    144     2       \N      (21," 'Toronto'"," 'Prince Edward'"," 'H3L L0L'")
1       Hote_name25     {hotelname25@email.com} {6132639987}    145     2       \N      (98," 'Romania'"," 'Rue Berri'"," 'H3L L0L'")
0       Hote_name26     {hotelname26@email.com} {6132639987}    146     2       \N      (65," 'Romania'"," 'Prince Edward'"," 'P2P T1T'")
3       Hote_name27     {hotelname27@email.com} {6132639987}    147     2       \N      (13," 'Belo Horizonte'"," 'Prince Edward'"," 'H3L L0L'")
0       Hote_name30     {hotelname30@email.com} {6132639987}    148     3       \N      (82," 'London'"," 'Prince Edward'"," 'K2J 123'")
4       Hote_name31     {hotelname31@email.com} {6132639987}    149     3       \N      (46," 'London'"," 'Rideau st'"," 'P2P T1T'")
1       Hote_name32     {hotelname32@email.com} {6132639987}    150     3       \N      (36," 'London'"," 'Prince Edward'"," 'P2P T1T'")
1       Hote_name33     {hotelname33@email.com} {6132639987}    151     3       \N      (97," 'London'"," 'Rue Berri'"," 'K2J 123'")
0       Hote_name34     {hotelname34@email.com} {6132639987}    152     3       \N      (40," 'Ottawa'"," 'Rideau st'"," 'H3L L0L'")
1       Hote_name35     {hotelname35@email.com} {6132639987}    153     3       \N      (81," 'London'"," 'Rue Berri'"," 'K2J 123'")
2       Hote_name36     {hotelname36@email.com} {6132639987}    154     3       \N      (29," 'Ottawa'"," 'Rideau st'"," 'P2P T1T'")
1       Hote_name37     {hotelname37@email.com} {6132639987}    155     3       \N      (7," 'Toronto'"," 'Prince Edward'"," 'P2P T1T'")
2       Hote_name40     {hotelname40@email.com} {6132639987}    156     4       \N      (54," 'Toronto'"," 'Rideau st'"," 'P2P T1T'")
1       Hote_name41     {hotelname41@email.com} {6132639987}    157     4       \N      (99," 'Toronto'"," 'Rideau st'"," 'K2J 123'")
2       Hote_name42     {hotelname42@email.com} {6132639987}    158     4       \N      (52," 'Montreal'"," 'Prince Edward'"," 'P2P T1T'")
4       Hote_name43     {hotelname43@email.com} {6132639987}    159     4       \N      (43," 'London'"," 'Prince Edward'"," 'H3L L0L'")
5       Hote_name44     {hotelname44@email.com} {6132639987}    160     4       \N      (11," 'London'"," 'Rue Berri'"," 'K2J 123'")
1       Hote_name45     {hotelname45@email.com} {6132639987}    161     4       \N      (5," 'Belo Horizonte'"," 'Rue Berri'"," 'K2J 123'")
5       Hote_name46     {hotelname46@email.com} {6132639987}    162     4       \N      (18," 'Belo Horizonte'"," 'Rideau st'"," 'K2J 123'")
3       Hote_name47     {hotelname47@email.com} {6132639987}    163     4       \N      (69," 'Belo Horizonte'"," 'Prince Edward'"," 'H3L L0L'")
\.


--
-- Data for Name: Hotel_Chain; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hotel_Chain" (name, central_office_adress, chain_id, num_hotels, emails, phone_numbers) FROM stdin;
Big Hotels      123 some st Ottawa      0       8       bighotels@email.com     12312341234
Small Hotels    321 another str montreal        1       8       smallhotels@email.com   32143214321
Narriot 452 dubai st New York   2       8       narriot@email.com       6132639987
Transilvania    666 dracula st Romania  3       8       transilvania@email.com  33344445555
Riatt   1 this st Ottawa        4       8       riatt@email.com 45655437564
\.


--
-- Data for Name: Renting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renting" (check_in_date, check_out_date, payment_amount, payment_status, end_date, status, reservation_id) FROM stdin;
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reservation" (reservation_id, end_date, status, customer_id, hotel_id, room_number, employee_id) FROM stdin;
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (capacity, price, "TV", "AC", jacuzzi, refrigerator, extendable, room_number, view_type, "problems/demages_type", hotel_id, end_date, r_id, status) FROM stdin;
4       53.90229316348687       t       f       t       f       t       124     city    minor   124     \N      \N     \N
6       46.230230765308036      t       t       f       f       f       224     mountain        major   124     \N     \N       \N
3       95.22937198424788       f       f       t       f       t       324     sea     minor   124     \N      \N     \N
5       90.15591344335658       f       t       f       t       t       424     mountain        none    124     \N     \N       \N
3       63.526708081805914      t       f       f       f       t       524     mountain        major   124     \N     \N       \N
1       52.95023002374213       f       t       t       t       t       125     mountain        major   125     \N     \N       \N
4       98.99657924513032       f       t       t       t       t       225     mountain        none    125     \N     \N       \N
4       19.73067553883272       t       t       f       t       f       325     sea     major   125     \N      \N     \N
6       53.317189843133164      f       t       f       t       f       425     sea     major   125     \N      \N     \N
6       90.95445936436579       t       f       t       f       f       525     sea     minor   125     \N      \N     \N
2       46.199084737344485      f       f       t       f       f       126     city    major   126     \N      \N     \N
6       18.84694296513436       f       f       f       t       t       226     sea     none    126     \N      \N     \N
4       11.630063400667057      f       t       t       t       t       326     city    none    126     \N      \N     \N
4       40.19688696695178       t       t       t       f       t       426     mountain        major   126     \N     \N       \N
5       77.38462973022797       t       t       f       f       f       526     city    major   126     \N      \N     \N
6       22.704090055738835      f       f       t       f       f       127     mountain        major   127     \N     \N       \N
2       40.783382334985504      t       t       t       f       f       227     mountain        major   127     \N     \N       \N
2       68.69395931141386       f       t       f       t       t       327     mountain        minor   127     \N     \N       \N
5       74.31528029164853       t       t       t       f       f       427     sea     major   127     \N      \N     \N
6       94.84098867472332       t       f       t       t       t       527     mountain        none    127     \N     \N       \N
1       96.87143411298706       f       f       t       t       t       128     city    major   128     \N      \N     \N
2       14.953678013107918      t       f       t       t       f       228     sea     none    128     \N      \N     \N
3       32.30182914107045       t       t       f       f       f       328     sea     major   128     \N      \N     \N
1       10.652235664123033      t       f       f       t       t       428     sea     major   128     \N      \N     \N
2       57.283818007084506      t       f       f       t       t       528     mountain        major   128     \N     \N       \N
5       53.55553227621306       t       f       t       t       t       129     sea     major   129     \N      \N     \N
6       54.47424548754487       f       f       f       f       f       229     mountain        minor   129     \N     \N       \N
6       33.19625243044448       f       t       t       f       t       329     city    minor   129     \N      \N     \N
2       15.808793798345144      t       t       f       f       t       429     city    none    129     \N      \N     \N
4       51.61331152824155       f       f       t       t       f       529     mountain        minor   129     \N     \N       \N
6       57.36972162056937       f       t       t       t       f       130     city    major   130     \N      \N     \N
6       88.28471020218693       f       t       f       f       f       230     city    major   130     \N      \N     \N
3       18.740387664350134      f       f       f       f       t       330     city    none    130     \N      \N     \N
2       81.25342569880785       t       f       t       f       f       430     mountain        none    130     \N     \N       \N
2       5.723982669681882       f       t       t       f       f       530     city    minor   130     \N      \N     \N
6       40.22673580028751       t       f       f       t       f       131     sea     major   131     \N      \N     \N
6       87.9067836090436        t       f       t       t       f       231     mountain        none    131     \N     \N       \N
5       58.7155274746286        t       t       f       f       t       331     sea     none    131     \N      \N     \N
2       61.797097589875484      t       f       f       f       t       431     city    none    131     \N      \N     \N
4       81.69267543370363       f       f       t       f       f       531     sea     minor   131     \N      \N     \N
6       8.788645504459215       t       t       f       f       t       132     mountain        minor   132     \N     \N       \N
2       78.77155879050028       t       t       f       t       f       232     city    none    132     \N      \N     \N
3       44.576593955053156      t       f       t       t       t       332     mountain        major   132     \N     \N       \N
6       12.788525969504994      f       f       t       f       t       432     sea     none    132     \N      \N     \N
5       57.54884692275246       t       f       f       f       t       532     sea     major   132     \N      \N     \N
6       81.02484310432109       f       f       f       f       t       133     city    none    133     \N      \N     \N
6       34.00283797317736       f       f       t       t       t       233     mountain        minor   133     \N     \N       \N
1       87.71281229222912       t       f       f       t       f       333     mountain        major   133     \N     \N       \N
2       7.824442951816235       t       f       t       f       f       433     mountain        none    133     \N     \N       \N
5       33.64154244416415       t       t       t       f       t       533     mountain        none    133     \N     \N       \N
5       13.174698049937362      f       t       t       f       f       134     mountain        major   134     \N     \N       \N
4       13.534678000618893      t       t       t       t       f       234     sea     major   134     \N      \N     \N
3       95.02191888010461       t       t       f       t       t       334     sea     minor   134     \N      \N     \N
2       42.09760637761928       t       t       f       t       f       434     sea     major   134     \N      \N     \N
5       80.50568271381306       t       f       f       t       f       534     city    minor   134     \N      \N     \N
3       10.500047431438508      t       t       f       t       f       135     sea     none    135     \N      \N     \N
3       96.4097055928115        f       t       f       t       f       235     mountain        major   135     \N     \N       \N
4       50.91362524909635       f       t       f       t       t       335     mountain        major   135     \N     \N       \N
3       87.89735584946223       f       f       t       f       t       435     sea     minor   135     \N      \N     \N
2       84.19457717220999       t       f       f       f       f       535     sea     major   135     \N      \N     \N
5       86.09041940134038       f       f       f       t       t       136     sea     minor   136     \N      \N     \N
6       57.96333149294526       f       t       t       t       t       236     sea     none    136     \N      \N     \N
2       5.208220152593834       f       f       t       t       f       336     city    none    136     \N      \N     \N
5       66.63026029508461       t       t       f       t       t       436     city    major   136     \N      \N     \N
2       99.04089443702651       t       f       f       f       f       536     mountain        minor   136     \N     \N       \N
2       13.470818088734916      t       f       f       f       t       137     city    major   137     \N      \N     \N
4       25.317890012793963      t       t       t       f       f       237     sea     none    137     \N      \N     \N
2       25.184660727585275      t       t       t       t       t       337     city    none    137     \N      \N     \N
4       66.371688860795 t       t       t       t       f       437     city    none    137     \N      \N      \N
1       1.4138880317817515      f       t       t       f       f       537     city    none    137     \N      \N     \N
4       31.07133024934572       t       f       f       f       t       138     mountain        none    138     \N     \N       \N
5       3.2427157105591853      t       t       f       f       t       238     sea     none    138     \N      \N     \N
5       40.78921730497924       f       t       f       f       t       338     sea     none    138     \N      \N     \N
3       59.77430489052797       t       f       f       f       t       438     mountain        minor   138     \N     \N       \N
6       34.885489011273904      f       t       f       f       f       538     mountain        none    138     \N     \N       \N
4       83.3802919438389        t       t       f       f       t       139     city    minor   139     \N      \N     \N
2       72.05340052260674       f       t       f       f       t       239     sea     minor   139     \N      \N     \N
3       67.10382989086571       f       f       t       t       t       339     sea     major   139     \N      \N     \N
5       95.23422207829736       t       t       t       t       f       439     sea     minor   139     \N      \N     \N
5       99.2957035824708        f       t       t       t       t       539     city    minor   139     \N      \N     \N
4       19.58747039061006       f       t       t       t       t       140     mountain        minor   140     \N     \N       \N
6       14.784407806925959      f       f       t       f       f       240     sea     minor   140     \N      \N     \N
2       10.631423539622919      f       t       t       f       t       340     city    none    140     \N      \N     \N
2       15.54771315787642       t       t       t       f       f       440     city    minor   140     \N      \N     \N
2       3.0001062100394993      f       t       t       t       t       540     city    major   140     \N      \N     \N
2       46.20064552946821       t       f       t       t       t       141     mountain        major   141     \N     \N       \N
5       43.2653451394176        f       t       t       f       t       241     city    minor   141     \N      \N     \N
2       8.772310448088794       f       f       t       t       t       341     mountain        minor   141     \N     \N       \N
6       23.979331486182033      f       t       f       t       f       441     mountain        major   141     \N     \N       \N
4       21.569450668373747      f       f       t       f       t       541     city    none    141     \N      \N     \N
3       35.17360630639716       f       t       t       t       f       142     sea     none    142     \N      \N     \N
2       19.65554479245146       f       f       t       f       f       242     sea     none    142     \N      \N     \N
4       98.78039258344609       t       t       t       f       t       342     mountain        major   142     \N     \N       \N
2       83.17484997199607       t       t       f       f       t       442     city    minor   142     \N      \N     \N
6       68.26671703051217       f       t       f       f       t       542     sea     none    142     \N      \N     \N
1       23.625905750880683      f       t       t       f       t       143     mountain        major   143     \N     \N       \N
6       83.70976534582827       t       t       t       f       f       243     sea     none    143     \N      \N     \N
3       46.88968033825047       f       f       t       f       f       343     city    none    143     \N      \N     \N
1       65.5690036047297        f       f       t       f       f       443     sea     major   143     \N      \N     \N
3       70.90948663529484       t       f       f       t       t       543     sea     none    143     \N      \N     \N
6       85.84139282553072       f       t       f       t       t       144     sea     major   144     \N      \N     \N
2       31.395734492146698      t       f       f       f       t       244     mountain        major   144     \N     \N       \N
2       17.492802250980088      t       f       f       t       f       344     mountain        major   144     \N     \N       \N
2       6.89449166880951        t       f       f       f       f       444     sea     none    144     \N      \N     \N
4       5.359960405153386       f       t       t       t       t       544     mountain        major   144     \N     \N       \N
4       30.64395373872202       f       f       t       t       t       145     mountain        minor   145     \N     \N       \N
4       22.980644166995944      t       f       t       t       t       245     mountain        major   145     \N     \N       \N
6       94.50456778254457       t       f       t       t       t       345     city    major   145     \N      \N     \N
3       43.66178525573174       f       f       f       t       f       445     sea     major   145     \N      \N     \N
5       28.852269130014218      f       t       t       f       f       545     mountain        minor   145     \N     \N       \N
6       7.954852853441041       f       f       f       t       f       146     city    major   146     \N      \N     \N
3       40.16619392332199       f       t       f       f       t       246     sea     major   146     \N      \N     \N
6       70.09196334818348       t       t       t       t       t       346     mountain        minor   146     \N     \N       \N
4       32.91878881365984       f       f       t       f       f       446     sea     minor   146     \N      \N     \N
1       29.632331810786216      f       f       t       t       f       546     mountain        minor   146     \N     \N       \N
1       64.55340410721556       t       t       t       t       f       147     mountain        none    147     \N     \N       \N
6       25.69229332045957       f       t       f       f       t       247     mountain        minor   147     \N     \N       \N
5       41.87817383703973       t       t       f       t       f       347     sea     major   147     \N      \N     \N
5       11.311111529199414      t       f       f       f       f       447     mountain        major   147     \N     \N       \N
4       62.10762012825137       f       t       f       f       f       547     mountain        minor   147     \N     \N       \N
5       86.38673830772845       t       f       f       t       f       148     sea     none    148     \N      \N     \N
2       78.70594789295782       f       t       t       t       t       248     sea     minor   148     \N      \N     \N
6       47.62212473570926       t       t       f       t       t       348     city    minor   148     \N      \N     \N
3       36.26742869307995       f       f       t       t       f       448     sea     major   148     \N      \N     \N
5       49.48167460860975       t       t       t       f       t       548     mountain        major   148     \N     \N       \N
3       61.922053095751735      f       t       t       t       t       149     mountain        major   149     \N     \N       \N
2       85.06706415726441       f       t       f       t       f       249     city    minor   149     \N      \N     \N
2       16.551218225867448      t       f       t       f       t       349     mountain        minor   149     \N     \N       \N
2       59.173679574782724      f       t       t       f       t       449     city    minor   149     \N      \N     \N
1       91.28731968803937       t       t       f       f       t       549     mountain        minor   149     \N     \N       \N
3       17.528282031718234      t       f       f       t       t       150     mountain        none    150     \N     \N       \N
5       86.53106231990282       t       t       f       f       t       250     sea     minor   150     \N      \N     \N
3       76.87034783235079       t       f       t       t       t       350     city    major   150     \N      \N     \N
5       75.2642127369859        t       t       f       f       f       450     city    major   150     \N      \N     \N
1       84.03341577506247       t       t       f       t       t       550     mountain        major   150     \N     \N       \N
2       6.576579360770873       f       t       f       t       f       151     mountain        none    151     \N     \N       \N
3       32.73133835838715       f       t       t       t       t       251     sea     none    151     \N      \N     \N
1       83.77848480273431       t       t       f       f       f       351     sea     minor   151     \N      \N     \N
4       80.14387959389092       f       f       f       t       t       451     sea     minor   151     \N      \N     \N
1       54.931659860426805      t       t       f       f       t       551     sea     minor   151     \N      \N     \N
6       98.48115851732437       t       t       f       f       t       152     sea     major   152     \N      \N     \N
4       86.8358991944481        f       t       f       f       t       252     sea     minor   152     \N      \N     \N
5       29.806385562277015      f       t       f       t       t       352     city    none    152     \N      \N     \N
4       24.6856825017391        t       t       t       t       t       452     mountain        minor   152     \N     \N       \N
4       56.62773345262602       t       f       f       f       t       552     sea     none    152     \N      \N     \N
6       90.83126132406183       t       f       t       f       t       153     mountain        minor   153     \N     \N       \N
4       70.4271230528892        f       f       f       f       t       253     sea     none    153     \N      \N     \N
6       78.34670761358562       t       t       t       f       t       353     mountain        major   153     \N     \N       \N
4       27.21763477226453       t       f       t       t       t       453     mountain        none    153     \N     \N       \N
5       86.30802282639134       f       t       f       f       t       553     sea     major   153     \N      \N     \N
1       15.411526350503602      f       f       t       f       f       154     sea     minor   154     \N      \N     \N
5       15.657607404928031      f       t       t       f       f       254     mountain        major   154     \N     \N       \N
5       96.31869738579961       f       t       t       f       f       354     mountain        none    154     \N     \N       \N
5       33.431329270232666      t       f       t       f       f       454     sea     minor   154     \N      \N     \N
3       23.867970407973328      t       t       t       t       f       554     city    minor   154     \N      \N     \N
2       64.91504112097628       f       t       f       f       f       155     mountain        none    155     \N     \N       \N
2       28.29371803425136       t       t       t       t       t       255     mountain        none    155     \N     \N       \N
6       99.01005690658428       t       t       f       f       t       355     sea     none    155     \N      \N     \N
3       64.96814739524488       f       f       f       t       f       455     sea     major   155     \N      \N     \N
3       89.78325418509976       f       t       f       f       t       555     city    major   155     \N      \N     \N
2       44.81341066882663       t       f       f       t       t       156     sea     none    156     \N      \N     \N
3       55.165705978684244      t       f       t       f       t       256     sea     major   156     \N      \N     \N
5       98.74884120710293       f       t       f       f       f       356     city    none    156     \N      \N     \N
1       39.195661370475186      t       f       f       t       f       456     sea     major   156     \N      \N     \N
5       56.53269304302877       t       f       t       t       t       556     sea     major   156     \N      \N     \N
4       57.57720219259055       t       t       t       f       t       157     city    none    157     \N      \N     \N
6       85.11035795487736       f       f       t       t       t       257     mountain        none    157     \N     \N       \N
6       16.30615151960708       f       t       f       t       t       357     sea     none    157     \N      \N     \N
3       2.8481266967506746      f       t       f       t       f       457     city    none    157     \N      \N     \N
5       57.9548270625059        f       f       t       t       t       557     sea     major   157     \N      \N     \N
6       69.43504788997717       t       f       f       t       f       158     city    minor   158     \N      \N     \N
1       72.82271685014035       f       t       f       t       f       258     mountain        major   158     \N     \N       \N
6       94.5187711611798        f       f       f       t       f       358     city    none    158     \N      \N     \N
2       48.742078363814365      f       t       f       t       t       458     city    major   158     \N      \N     \N
6       3.861596530047917       f       f       t       t       t       558     city    minor   158     \N      \N     \N
3       92.95194793768886       f       f       t       f       f       159     sea     none    159     \N      \N     \N
1       31.4931040906719        t       t       t       t       t       259     mountain        minor   159     \N     \N       \N
5       42.59759217227088       f       t       t       f       t       359     city    none    159     \N      \N     \N
5       77.2620947870265        t       t       f       f       t       459     sea     none    159     \N      \N     \N
1       92.81351616487392       t       t       t       t       f       559     sea     none    159     \N      \N     \N
2       38.11451128905106       t       f       f       t       t       160     city    minor   160     \N      \N     \N
2       23.43205745372865       f       f       t       t       t       260     city    minor   160     \N      \N     \N
3       91.41027764668593       f       f       f       f       t       360     mountain        major   160     \N     \N       \N
3       47.031578315863065      t       f       f       t       t       460     city    major   160     \N      \N     \N
5       89.7532901504392        t       t       f       f       f       560     mountain        minor   160     \N     \N       \N
3       99.3350109928721        t       f       f       t       t       161     mountain        minor   161     \N     \N       \N
4       33.143130491950856      f       t       f       t       t       261     city    major   161     \N      \N     \N
5       89.73735566128225       f       f       t       f       t       361     sea     major   161     \N      \N     \N
3       73.26991698650951       t       f       t       t       f       461     sea     none    161     \N      \N     \N
4       37.613009245197574      t       f       t       f       t       561     city    none    161     \N      \N     \N
3       71.97129892217487       t       f       t       f       f       162     sea     none    162     \N      \N     \N
1       73.73535194185754       f       f       t       f       f       262     mountain        minor   162     \N     \N       \N
2       52.25105633262073       t       t       f       f       f       362     city    minor   162     \N      \N     \N
3       89.25817649507206       f       f       t       f       t       462     mountain        none    162     \N     \N       \N
5       28.051578662596533      t       t       t       t       t       562     mountain        minor   162     \N     \N       \N
1       12.829818868830255      t       f       f       f       t       163     city    minor   163     \N      \N     \N
1       61.58382096099986       f       t       t       t       t       263     city    none    163     \N      \N     \N
2       8.747916756228857       f       t       f       t       f       363     sea     none    163     \N      \N     \N
5       25.320168038089964      f       f       f       f       t       463     mountain        none    163     \N     \N       \N
3       69.07242593867493       f       t       t       f       t       563     mountain        major   163     \N     \N       \N
\.


--
-- Name: Achive_achive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Achive_achive_id_seq"', 0, false);


--
-- Name: Customer_ghest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customer_ghest_id_seq"', 0, false);


--
-- Name: Employee_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Employee_employee_id_seq"', 0, false);


--
-- Name: Hotel_Chain_chain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hotel_Chain_chain_id_seq"', 4, true);


--
-- Name: Hotel_hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Hotel_hotel_id_seq"', 163, true);


--
-- Name: Reservation_reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reservation_reservation_id_seq"', 0, false);


--
-- Name: Achive achive_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Achive"
    ADD CONSTRAINT achive_id PRIMARY KEY (achive_id);


--
-- Name: Booking booking_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT booking_pk PRIMARY KEY (start_date, checked_in, end_date, status, reservation_id);


--
-- Name: Hotel_Chain chain_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel_Chain"
    ADD CONSTRAINT chain_id PRIMARY KEY (chain_id);


--
-- Name: Employee employee_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT employee_id PRIMARY KEY (employee_id);


--
-- Name: Customer ghest_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT ghest_id PRIMARY KEY (ghest_id);


--
-- Name: Hotel hotel_primary_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT hotel_primary_key PRIMARY KEY (hotel_id);


--
-- Name: Renting renting_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT renting_pk PRIMARY KEY (check_in_date, check_out_date, payment_amount, payment_status, end_date, reservation_id, status);


--
-- Name: Reservation reservation_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT reservation_id_pk PRIMARY KEY (reservation_id, end_date, status);


--
-- Name: Room room_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT room_pk PRIMARY KEY (hotel_id, room_number);


--
-- Name: fki_hotel_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_hotel_fk ON public."Hotel" USING btree (parent_chain_id);


--
-- Name: hotel_rooms_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX hotel_rooms_index ON public."Room" USING btree (hotel_id);


--
-- Name: room_capacity_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX room_capacity_index ON public."Room" USING btree (capacity);


--
-- Name: room_price_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX room_price_index ON public."Room" USING btree (price);


--
-- Name: Hotel decrementnumberofhotelstrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER decrementnumberofhotelstrigger AFTER DELETE ON public."Hotel" FOR EACH ROW EXECUTE FUNCTION public.decrementnumberofhotels();


--
-- Name: Hotel incrementnumberofhotelstrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER incrementnumberofhotelstrigger AFTER INSERT ON public."Hotel" FOR EACH ROW EXECUTE FUNCTION public.incrementnumberofhotels();


--
-- Name: Room belongs_to; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT belongs_to FOREIGN KEY (hotel_id) REFERENCES public."Hotel"(hotel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Booking is_a_booking; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT is_a_booking FOREIGN KEY (end_date, status, reservation_id) REFERENCES public."Reservation"(end_date, status, reservation_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Renting is_a_renting; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renting"
    ADD CONSTRAINT is_a_renting FOREIGN KEY (end_date, status, reservation_id) REFERENCES public."Reservation"(end_date, status, reservation_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Reservation made_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT made_by FOREIGN KEY (customer_id) REFERENCES public."Customer"(ghest_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Employee manager_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT manager_id FOREIGN KEY (manager_id) REFERENCES public."Employee"(employee_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Hotel manages; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT manages FOREIGN KEY (manager_id) REFERENCES public."Employee"(employee_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Hotel owned_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT owned_by FOREIGN KEY (parent_chain_id) REFERENCES public."Hotel_Chain"(chain_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Reservation process; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT process FOREIGN KEY (employee_id) REFERENCES public."Employee"(employee_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Room transforms_into; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT transforms_into FOREIGN KEY (status, end_date, r_id) REFERENCES public."Reservation"(status, end_date, reservation_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Employee works_at; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT works_at FOREIGN KEY (hotel_id) REFERENCES public."Hotel"(hotel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TABLE "Achive"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Achive" TO username;


--
-- Name: TABLE "Booking"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Booking" TO username;


--
-- Name: TABLE "Customer"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Customer" TO username;


--
-- Name: TABLE "Employee"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Employee" TO username;


--
-- Name: TABLE "Hotel"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Hotel" TO username;


--
-- Name: TABLE "Hotel_Chain"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Hotel_Chain" TO username;


--
-- Name: TABLE "Renting"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Renting" TO username;


--
-- Name: TABLE "Reservation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Reservation" TO username;


--
-- Name: TABLE "Room"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public."Room" TO username;


--
-- PostgreSQL database dump complete
--