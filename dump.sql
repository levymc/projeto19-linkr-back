CREATE TABLE users (
    "userId" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);


CREATE TABLE follows (
  "followerId" INTEGER NOT NULL,
    FOREIGN KEY ("followerId") REFERENCES "users"("userId"),
  "followingId" INTEGER NOT NULL,
    FOREIGN KEY ("followingId") REFERENCES "users"("userId"),
  PRIMARY KEY ("followerId", "followingId")
);


CREATE INDEX users_login_index
    ON "users" ("email")
    INCLUDE ("password");

CREATE TABLE sessions (
    "sessionId" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("userId"),
    "token" TEXT NOT NULL,
    "editedAt" TIMESTAMP WITHOUT TIME ZONE,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX session_token_index
    ON "sessions" ("token");

CREATE TABLE posts (
    "postId" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("userId"),
    "content" TEXT NOT NULL,
    "postUrl" TEXT NOT NULL,
    "imgMetadata" TEXT,
    "titleMetadata" TEXT,
    "descriptionMetadata" TEXT,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX posts_createdat_index
    ON "posts" ("createdAt");

CREATE TABLE likes (
    "userId" INTEGER NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users"("userId"),
    "postId" INTEGER NOT NULL,
        FOREIGN KEY ("postId") REFERENCES "posts"("postId"),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),

    PRIMARY KEY ("userId", "postId")
);

CREATE INDEX likes_pk_reverse_order_index
    ON "likes" ("postId", "userId");

CREATE TABLE hashtags (
    "hashtagId" SERIAL PRIMARY KEY,
    "hashtagName" TEXT UNIQUE NOT NULL,
    "currentInteractions" INTEGER NOT NULL DEFAULT 1,
    "dailyInteractionsArray" INTEGER[] NOT NULL DEFAULT '{}'
);

CREATE INDEX hashtags_name_index
    ON "hashtags" ("hashtagName");

CREATE TABLE "hashtagPostJunction" (
    "hashtagId" INTEGER NOT NULL,
        FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("hashtagId"),
    "postId" INTEGER NOT NULL,
        FOREIGN KEY ("postId") REFERENCES "posts"("postId"),

    PRIMARY KEY ("hashtagId", "postId")
);

CREATE INDEX hashtagpostjunction_pk_reverse_order_index
    ON "hashtagPostJunction" ("postId", "hashtagId");

