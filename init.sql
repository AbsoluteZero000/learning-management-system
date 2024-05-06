-- Create the database (if it doesn't exist)
CREATE DATABASE els IF NOT EXISTS;

-- Use the newly created database
USE els;

-- Create the accounts table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS accounts (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(), -- Use a UUID for unique identifier
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, -- Email should be unique for each user
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

-- Create the Users table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY, -- Use SERIAL for auto-incrementing integer
  filiation VARCHAR(255) NOT NULL,
  bio TEXT,
  accid VARCHAR(255) NOT NULL UNIQUE, -- Ensure a user has only one account
  FOREIGN KEY (accid) REFERENCES accounts(id)
);

-- Create the Instructors table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS Instructors (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES Users(id)
);

-- Create the Courses table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS Courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  instructorid INT NOT NULL,
  content TEXT,
  durations VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  capacity INT NOT NULL,
  FOREIGN KEY (instructorid) REFERENCES Instructors(id) -- Reference instructor table ID
);

-- Create the Reviews table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS Reviews (
  id SERIAL PRIMARY KEY,
  reviewtext TEXT NOT NULL,
  userid INT NOT NULL,
  courseid INT NOT NULL,
  FOREIGN KEY (userid) REFERENCES Users(id),
  FOREIGN KEY (courseid) REFERENCES Courses(id)
);

-- Create the UserCourses table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS UserCourses (
  id SERIAL PRIMARY KEY,
  userid INT NOT NULL,
  courseid INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  FOREIGN KEY (userid) REFERENCES Users(id),
  FOREIGN KEY (courseid) REFERENCES Courses(id)
);
