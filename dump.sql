--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    "commentId" integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    comment text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_commentId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."comments_commentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."comments_commentId_seq" OWNER TO postgres;

--
-- Name: comments_commentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."comments_commentId_seq" OWNED BY public.comments."commentId";


--
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows (
    "followerId" integer NOT NULL,
    "followingId" integer NOT NULL
);


ALTER TABLE public.follows OWNER TO postgres;

--
-- Name: hashtagPostJunction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."hashtagPostJunction" (
    "hashtagId" integer NOT NULL,
    "postId" integer NOT NULL
);


ALTER TABLE public."hashtagPostJunction" OWNER TO postgres;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hashtags (
    "hashtagId" integer NOT NULL,
    "hashtagName" text NOT NULL,
    "currentInteractions" integer DEFAULT 1 NOT NULL,
    "dailyInteractionsArray" integer[] DEFAULT '{}'::integer[] NOT NULL
);


ALTER TABLE public.hashtags OWNER TO postgres;

--
-- Name: hashtags_hashtagId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."hashtags_hashtagId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."hashtags_hashtagId_seq" OWNER TO postgres;

--
-- Name: hashtags_hashtagId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."hashtags_hashtagId_seq" OWNED BY public.hashtags."hashtagId";


--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    content text NOT NULL,
    "postUrl" text NOT NULL,
    "imgMetadata" text,
    "titleMetadata" text,
    "descriptionMetadata" text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    hashtags text
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_postId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."posts_postId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."posts_postId_seq" OWNER TO postgres;

--
-- Name: posts_postId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."posts_postId_seq" OWNED BY public.posts."postId";


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    "sessionId" integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "editedAt" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_sessionId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."sessions_sessionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."sessions_sessionId_seq" OWNER TO postgres;

--
-- Name: sessions_sessionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."sessions_sessionId_seq" OWNED BY public.sessions."sessionId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users_userId_seq" OWNER TO postgres;

--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: comments commentId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN "commentId" SET DEFAULT nextval('public."comments_commentId_seq"'::regclass);


--
-- Name: hashtags hashtagId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN "hashtagId" SET DEFAULT nextval('public."hashtags_hashtagId_seq"'::regclass);


--
-- Name: posts postId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN "postId" SET DEFAULT nextval('public."posts_postId_seq"'::regclass);


--
-- Name: sessions sessionId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN "sessionId" SET DEFAULT nextval('public."sessions_sessionId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments ("commentId", "userId", "postId", comment, "createdAt") FROM stdin;
1	1	2	aaa	2023-08-23 23:28:34.619568
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows ("followerId", "followingId") FROM stdin;
\.


--
-- Data for Name: hashtagPostJunction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."hashtagPostJunction" ("hashtagId", "postId") FROM stdin;
\.


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtags ("hashtagId", "hashtagName", "currentInteractions", "dailyInteractionsArray") FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes ("userId", "postId", "createdAt") FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts ("postId", "userId", content, "postUrl", "imgMetadata", "titleMetadata", "descriptionMetadata", "createdAt", hashtags) FROM stdin;
1	1	aaaaaa aaa	https://youtu.be/NGan7mRniEs	https://i.ytimg.com/vi/NGan7mRniEs/maxresdefault.jpg	NARUTO CLASSICO EP126 – A Luta Final: Gaara contra Kimimaro (REACT)	AJUDE A MANTER O CANAL: https://tipa.ai/TIPAT07XRL2DC198YW2VNVKW647GContato Profissional: seusirmaoscontato@gmail.comLives segunda quarta sexta e sabado naqu...	2023-08-23 23:18:39.4913	\N
2	1	teste	https://youtu.be/NGan7mRniEs	https://i.ytimg.com/vi/NGan7mRniEs/maxresdefault.jpg	NARUTO CLASSICO EP126 – A Luta Final: Gaara contra Kimimaro (REACT)	AJUDE A MANTER O CANAL: https://tipa.ai/TIPAT07XRL2DC198YW2VNVKW647GContato Profissional: seusirmaoscontato@gmail.comLives segunda quarta sexta e sabado naqu...	2023-08-23 23:20:00.512215	
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions ("sessionId", "userId", token, "editedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("userId", email, password, name, "imageUrl", "createdAt") FROM stdin;
1	sakura@gmail.com	$2b$10$zDKuhMWqy6ydtdMq6ycN4OGT5D/8Jge5mWvrSIxFvknkqp8hWVVzi	sakura	data:image/jpeg;base64,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	2023-08-23 23:18:04.612026
\.


--
-- Name: comments_commentId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."comments_commentId_seq"', 1, true);


--
-- Name: hashtags_hashtagId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."hashtags_hashtagId_seq"', 1, false);


--
-- Name: posts_postId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."posts_postId_seq"', 2, true);


--
-- Name: sessions_sessionId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."sessions_sessionId_seq"', 1, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY ("commentId");


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY ("followerId", "followingId");


--
-- Name: hashtagPostJunction hashtagPostJunction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagPostJunction"
    ADD CONSTRAINT "hashtagPostJunction_pkey" PRIMARY KEY ("hashtagId", "postId");


--
-- Name: hashtags hashtags_hashtagName_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT "hashtags_hashtagName_key" UNIQUE ("hashtagName");


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY ("hashtagId");


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY ("userId", "postId");


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY ("postId");


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY ("sessionId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: hashtagpostjunction_pk_reverse_order_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX hashtagpostjunction_pk_reverse_order_index ON public."hashtagPostJunction" USING btree ("postId", "hashtagId");


--
-- Name: hashtags_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX hashtags_name_index ON public.hashtags USING btree ("hashtagName");


--
-- Name: likes_pk_reverse_order_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX likes_pk_reverse_order_index ON public.likes USING btree ("postId", "userId");


--
-- Name: posts_createdat_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_createdat_index ON public.posts USING btree ("createdAt");


--
-- Name: session_token_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX session_token_index ON public.sessions USING btree (token);


--
-- Name: users_login_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_login_index ON public.users USING btree (email) INCLUDE (password);


--
-- Name: comments comments_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk0 FOREIGN KEY ("postId") REFERENCES public.posts("postId");


--
-- Name: follows follows_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public.users("userId");


--
-- Name: follows follows_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public.users("userId");


--
-- Name: hashtagPostJunction hashtagPostJunction_hashtagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagPostJunction"
    ADD CONSTRAINT "hashtagPostJunction_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags("hashtagId");


--
-- Name: hashtagPostJunction hashtagPostJunction_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagPostJunction"
    ADD CONSTRAINT "hashtagPostJunction_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts("postId");


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts("postId");


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- PostgreSQL database dump complete
--

