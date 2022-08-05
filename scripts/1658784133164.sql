--created Notes table
CREATE TABLE Notes (
    id int NOT NULL AUTO_INCREMENT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME ON UPDATE CURRENT_TIMESTAMP,
    title varchar(255) NOT NULL,
    content varchar(255),
    archived boolean NOT NULL,
    PRIMARY KEY (id)
);

--made archived false by default
ALTER TABLE Notes ALTER archived SET DEFAULT 0;