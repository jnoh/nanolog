-- Up

CREATE TABLE Notes (
  id INTEGER PRIMARY KEY,
  createdAt TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO Notes (createdAt, content)
VALUES
  (datetime("now"), "Creating a nanolog..."),
  (datetime("now"), "Nanolog created!");

-- Down

DROP TABLE Notes;
