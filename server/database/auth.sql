CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  profile_pic TEXT,
  role VARCHAR(10) CHECK (role IN ('user', 'admin')) NOT NULL
);
