-- Create the keyspace
CREATE KEYSPACE IF NOT EXISTS articles WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create the table
CREATE TABLE IF NOT EXISTS articles.wiki (
indexLetters TEXT,
isStored BOOLEAN,
url TEXT,
title TEXT,
PRIMARY KEY (url, indexLetters, isStored)
) 
WITH CLUSTERING ORDER BY (indexLetters ASC, isStored ASC);

-- Create indexes
CREATE INDEX IndexLettersIndex ON articles.wiki(indexLetters);