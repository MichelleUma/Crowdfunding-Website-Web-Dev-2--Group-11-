-- CREATE DATABASE `crowdfunding_db` ;

-- USE crowdfunding_db;

CREATE TABLE CATEGORY(
  CATEGORY_ID int AUTO_INCREMENT,
  NAME varchar(50),
  PRIMARY KEY (CATEGORY_ID)
);

CREATE TABLE FUNDRAISER(
  FUNDRAISER_ID int AUTO_INCREMENT,
  ORGANIZER varchar(255),
  CAPTION varchar(255),
  TARGET_FUNDING decimal(10,2),
  CURRENT_FUNDING decimal(10,2),
  CITY varchar(50),
  ACTIVE tinyint(1),
  CATEGORY_ID int,
  PRIMARY KEY (FUNDRAISER_ID),
  FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);

CREATE TABLE DONATION (
  DONATION_ID int AUTO_INCREMENT, 
  DATE datetime,
  AMOUNT decimal(10,2),
  GIVER varchar(255),
  FUNDRAISER_ID int,
  PRIMARY KEY (DONATION_ID),
  FOREIGN KEY (FUNDRAISER_ID) REFERENCES FUNDRAISER(FUNDRAISER_ID)
);

-- Insert categories
INSERT INTO CATEGORY (NAME) VALUES
('Medical'), 
('Education'), 
('Social Impact'), 
('Environment'), 
('Animal Welfare');

-- Insert fundraisers
INSERT INTO FUNDRAISER(ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES
('Mike', 'Housefire recovery', 10000.00, 2530.50, 'Sydney', 1, 1),
('Austin', 'School renovation fund', 15000.00, 7500.00, 'Brisbane', 1, 2),
('Thomas', 'Help samantha recover', 20000.00, 9000.00, 'Melbourne', 1, 3),
('Arthur', 'Hospital funds', 13000.00, 3000.00, 'Canberra', 1, 1),
('Justin', 'Hosting student accommodation', 17000.00, 2000.00, 'Perth', 1, 2),
('Olivia', 'Save the rainforest', 12000.00, 4000.00, 'Adelaide', 1, 5),
('Sophia', 'Support local artists', 18000.00, 8500.00, 'Hobart', 1, 3),
('Jake', 'Clean water for all', 15000.00, 5000.00, 'Darwin', 1, 4),
('Sophia', 'Childhood education', 10000.00, 6500.00, 'Sydney', 1, 2),
('Liam', 'Help the homeless', 20000.00, 14000.00, 'Perth', 1, 3);

-- Insert donations
INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES
('2024-10-06 14:30:00', 500.00, 'Alice', 1),
('2024-10-06 15:00:00', 300.00, 'Bob', 2),
('2024-10-06 15:15:00', 700.00, 'Charlie', 3),
('2024-10-06 16:00:00', 200.00, 'Diana', 4),
('2024-10-06 16:30:00', 450.00, 'Edward', 5),
('2024-10-06 17:00:00', 600.00, 'Fiona', 6),
('2024-10-06 17:30:00', 350.00, 'George', 7),
('2024-10-06 18:00:00', 100.00, 'Harry', 8),
('2024-10-06 18:15:00', 900.00, 'Isla', 9),
('2024-10-06 18:30:00', 1200.00, 'Jack', 10);

-- Select statements for verification
SELECT * FROM CATEGORY;
SELECT * FROM FUNDRAISER;
SELECT * FROM DONATION;
