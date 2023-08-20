--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg23.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg23.04+1)

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
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    "hashtagId" integer NOT NULL,
    "trendingCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: hashtags_hashtagId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."hashtags_hashtagId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_hashtagId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."hashtags_hashtagId_seq" OWNED BY public.hashtags."hashtagId";


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    content character varying,
    "postUrl" character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "imgMetadata" character varying,
    "titleMetadata" character varying,
    "descriptionMetadata" character varying,
    hashtags character varying,
    "updatedAt" character varying
);


--
-- Name: posts_postId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."posts_postId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_postId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."posts_postId_seq" OWNED BY public.posts."postId";


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    "sessionId" integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying NOT NULL,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: sessions_sessionId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."sessions_sessionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_sessionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."sessions_sessionId_seq" OWNED BY public.sessions."sessionId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    "imageUrl" character varying NOT NULL,
    "createdAt" timestamp without time zone NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: hashtags hashtagId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN "hashtagId" SET DEFAULT nextval('public."hashtags_hashtagId_seq"'::regclass);


--
-- Name: posts postId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN "postId" SET DEFAULT nextval('public."posts_postId_seq"'::regclass);


--
-- Name: sessions sessionId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN "sessionId" SET DEFAULT nextval('public."sessions_sessionId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (32, 1, 'TEste primeiro post', 'https://wehandle.com.br/', '2023-08-18 12:42:10.619298-03', 'https://wehandle.com.br/wp-content/uploads/2021/11/gestao-fornecedores-201028.jpg', 'Software gestão de terceiros e fornecedores | Wehandle', 'Garanta a gestão estratégica dos seus contratos e fornecedores de maneira otimizada, segura e sem correr riscos.', NULL, NULL);
INSERT INTO public.posts VALUES (33, 1, 'O básico do JS', 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics', '2023-08-18 13:02:16.163216-03', 'https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png', 'JavaScript basics - Learn web development | MDN', 'JavaScript is a programming language that adds interactivity to your website. This happens in games, in the behavior of responses when buttons are pressed or with data entry on forms; with dynamic styling; with animation, etc.
  This article helps you get started with JavaScript and furthers your understanding of what is possible.', NULL, NULL);
INSERT INTO public.posts VALUES (34, 1, 'Url Metadata Article', 'https://www.npmjs.com/package/url-metadata', '2023-08-18 13:21:11.810112-03', 'https://static-production.npmjs.com/338e4905a2684ca96e08c7780fc68412.png', 'url-metadata', 'Request an http(s) url and scrape its metadata in node.js or the browser.. Latest version: 3.0.2, last published: 2 months ago. Start using url-metadata in your project by running `npm i url-metadata`. There are 20 other projects in the npm registry using url-metadata.', NULL, NULL);
INSERT INTO public.posts VALUES (35, 1, 'sadasda', 'https://www.youtube.com/watch?v=jfKfPfyJRdk', '2023-08-18 17:46:52.488413-03', 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault_live.jpg', 'lofi hip hop radio 📚 - beats to relax/study to', '🎼 | Listen on Spotify, Apple music and more→  https://fanlink.to/lofigirl-music🌎 | Lofi Girl on all social media→  https://fanlink.to/lofigirl-social👕 | L...', NULL, NULL);
INSERT INTO public.posts VALUES (36, 1, 'Postgres', 'https://www.postgresql.org/docs/current/sql-insert.html', '2023-08-18 17:47:13.843047-03', 'https://www.postgresql.org/media/img/about/press/elephant.png', 'INSERT', 'INSERT INSERT — create new rows in a table Synopsis [ WITH [ RECURSIVE ] with_query [, ...] ] INSERT …', NULL, NULL);
INSERT INTO public.posts VALUES (37, 1, 'Globo', 'https://www.youtube.com/watch?v=whsNEqallk0&t=1355s', '2023-08-18 17:58:10.38012-03', 'https://i.ytimg.com/vi/whsNEqallk0/maxresdefault.jpg', 'VHOOR | Boiler Room x Primavera Sound Barcelona x Cupra', 'VHOOR – live from Boiler Room x Cupra at Primavera Sound Barcelona.►  Listen to Boiler Room’s archive on Apple Music: https://apple.co/BoilerRoom►  Shop Boil...', NULL, NULL);
INSERT INTO public.posts VALUES (38, 1, 'sda', 'https://github.com/levymc/projeto19-linkr-back/compare/main...postReturnUser', '2023-08-18 17:58:16.87948-03', 'https://opengraph.githubassets.com/bf95bddf48bcb611665d41b0ae1dad7bb43d45c1000abff27d9ccb8510f8a6e3/levymc/projeto19-linkr-back', 'Comparing main...postReturnUser · levymc/projeto19-linkr-back', 'Contribute to levymc/projeto19-linkr-back development by creating an account on GitHub.', NULL, NULL);
INSERT INTO public.posts VALUES (39, 1, 'Trello', 'https://trello.com/b/3D5RUCIu/mar%C3%ADliaprojeto-19-linkr', '2023-08-18 18:00:33.304537-03', '', '', '', NULL, NULL);
INSERT INTO public.posts VALUES (40, 1, 'aasda', 'https://github.com/levymc/projeto19-linkr-back/compare/main...postReturnUser', '2023-08-18 18:05:56.601966-03', 'https://opengraph.githubassets.com/bf95bddf48bcb611665d41b0ae1dad7bb43d45c1000abff27d9ccb8510f8a6e3/levymc/projeto19-linkr-back', 'Comparing main...postReturnUser · levymc/projeto19-linkr-back', 'Contribute to levymc/projeto19-linkr-back development by creating an account on GitHub.', NULL, NULL);
INSERT INTO public.posts VALUES (41, 1, 'Trello', 'https://trello.com/b/3D5RUCIu/mar%C3%ADliaprojeto-19-linkr', '2023-08-18 18:06:08.551355-03', '', '', '', NULL, NULL);
INSERT INTO public.posts VALUES (42, 1, 'teste', 'https://libreflix.org/', '2023-08-18 18:20:31.008215-03', '/sm-share3.jpg', 'Libreflix - Sua plataforma de streaming livre', 'Libreflix é uma plataforma de streaming aberta e colaborativa que reúne produções audiovisuais independentes, de livre exibição e que fazem pensar.', NULL, NULL);
INSERT INTO public.posts VALUES (43, 1, 'Google', 'https://www.google.com.br/?hl=pt-BR', '2023-08-18 18:21:09.176229-03', '', '', '', NULL, NULL);
INSERT INTO public.posts VALUES (44, 1, 'aa', 'https://globoplay.globo.com/v/11219940/?s=0s', '2023-08-18 18:21:27.817794-03', 'https://s01.video.glbimg.com/x216/11219940.jpg', 'T1:E7 - Episódio 7 - Os Outros online no Globoplay', 'Veja Os Outros Temporada 1 Episódio 7 online no Globoplay', NULL, NULL);
INSERT INTO public.posts VALUES (45, 2, 'Teste YT', 'https://www.youtube.com/watch?v=_1becGoB6c4', '2023-08-19 10:03:32.68245-03', 'https://i.ytimg.com/vi/_1becGoB6c4/maxresdefault.jpg', 'ALBUQUERQUE @ Warung Beach Club (Itajaí-SC, Brasil)', 'Set gravado na íntegra dentro da pista principal do Warung Beach Club. Vídeo comemorativo de 9 anos de residência no club. Da pista semi-cheia ao caos, passe...', NULL, NULL);
INSERT INTO public.posts VALUES (46, 2, 'Out', 'https://outlook.office.com/mail/', '2023-08-19 10:04:51.3778-03', '', '', '', NULL, NULL);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MjM4OTYyMX0.gInQIuz6YDmcv3gtKDAZe8TxUzyxNVRDw7w0xsnmCBw', '2023-08-18 17:13:41.811105');
INSERT INTO public.sessions VALUES (4, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5MjQ1MTkzNCwiZXhwIjoxNjkyNTM4MzM0fQ.QZ_yEuPk9N2PkLzb2mMNDoVlvsXCTaEkKSGzM7XANLU', '2023-08-19 10:32:14.206709');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'levymcruz@gmail.com', '$2b$10$ZnYwY0sKvvjcfgZ6ObYpxO0DMdv8LlaGRV5/DvA3ha79/vYTtuNTm', 'Levy M. Cruz', 'https://trecobox.com.br/wp-content/uploads/2022/06/Monkey-D-Luffy-One-Piece-Imagem-2.jpg.webp', '2023-08-17 20:39:09.460884');
INSERT INTO public.users VALUES (2, 'fred@gmail.com', '$2b$10$twjXxKZwSuJcuv7aiCvAoOqDwj.i05.bqZyBawUqLScMhWHtwNo7a', 'fred@gmail.com', 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/dbc6678fa878b18fce75e03488876bc17653cdc7a2ef0dd33541473e7527d884._RI_TTW_SX720_FMjpg_.jpg', '2023-08-19 09:50:24.580677');


--
-- Name: hashtags_hashtagId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."hashtags_hashtagId_seq"', 1, false);


--
-- Name: posts_postId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."posts_postId_seq"', 46, true);


--
-- Name: sessions_sessionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."sessions_sessionId_seq"', 4, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 2, true);


--
-- Name: hashtags hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pk PRIMARY KEY ("hashtagId");


--
-- Name: likes likes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pk PRIMARY KEY ("userId", "postId");


--
-- Name: posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY ("postId");


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY ("sessionId");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY ("userId");


--
-- Name: likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY ("postId") REFERENCES public.posts("postId");


--
-- Name: sessions sessions_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_users_fk FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- PostgreSQL database dump complete
--

