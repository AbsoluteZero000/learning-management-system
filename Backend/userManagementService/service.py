import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

DATABASE_PATH = "users.db"

def connect_db():
  """Connects to the SQLite database"""
  conn = sqlite3.connect(DATABASE_PATH)
  conn.row_factory = sqlite3.Row
  return conn

def create_tables():
  """Creates the Account, Student, and Instructor tables if they don't exist"""
  conn = connect_db()
  cursor = conn.cursor()
  cursor.execute('''CREATE TABLE IF NOT EXISTS Account (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  email TEXT NOT NULL UNIQUE,
                  password TEXT NOT NULL,
                  role TEXT NOT NULL,
                  affiliation TEXT,
                  bio TEXT,
                  yoe INTEGER
              )''')
  conn.commit()
  conn.close()


class User:
  """Represents a user in the system"""
  def __init__(self, row):
    self.id = row["id"]
    self.name = row["name"]
    self.email = row["email"]
    self.role = row["role"]
    self.password = row["password"]
    if(row["role"] == "student" or row["role"] == "instructor"):
      self.affiliation = row["affiliation"]
      self.bio = row["bio"]
    if(row["role"] == "instructor"):
      self.yoe = row["yoe"]
class UserwithPass:
  def __init__(self, row):
    self.id = row["id"]
    self.name = row["name"]
    self.email = row["email"]
    self.role = row["role"]
    self.password = row["password"]


def get_user(email):
  conn = connect_db()
  cursor = conn.cursor()
  cursor.execute("SELECT id, name, email, password, role FROM Account  WHERE email = ?", (email,))
  row = cursor.fetchone()
  conn.close()
  if row:
    return UserwithPass(row)
  else:
    return None

def create_user(user_data):
  if not user_data.get("name") or not user_data.get("email") or not user_data.get("password") or not user_data.get("role"):
    return {"message": "Missing required fields"}, 400

  email = user_data["email"]
  existing_user = get_user(email)
  if existing_user:
    return {"message": "Email already exists"}, 400

  hashed_password = generate_password_hash(user_data["password"])
  conn = connect_db()
  cursor = conn.cursor()

  if user_data["role"] == "student":
    cursor.execute("INSERT INTO Account (name, email, password, role, affiliation, bio) VALUES (?, ?, ?, ?, ?, ?)", (user_data["name"], email, hashed_password, user_data["role"], user_data.get("affiliation"), user_data.get("bio")))
  elif user_data["role"] == "instructor":
    cursor.execute("INSERT INTO Account (name, email, password, role, affiliation, bio, yoe) VALUES (?, ?, ?, ?, ?, ?, ?)", (user_data["name"], email, hashed_password, user_data["role"], user_data.get("affiliation"), user_data.get("bio"), user_data.get("yoe")))
  else:
    cursor.execute("INSERT INTO Account (name, email, password, role) VALUES (?, ?, ?, ?)", (user_data["name"], email, hashed_password, user_data["role"]))

  conn.commit()
  conn.close()
  return {"message": "User created successfully"}, 201

def update_user(user_id, update_data):
  conn = connect_db()
  cursor = conn.cursor()

  # Set fields to update based on provided data
  set_clause = ""
  params = []
  if update_data.get("name"):
    set_clause += ", name = ?"
    params.append(update_data["name"])
  if update_data.get("email"):
    existing_user = get_user(update_data["email"])
    if existing_user and existing_user.id != user_id:
      return {"message": "Email already exists"}, 400
    set_clause += ", email = ?"
    params.append(update_data["email"])
  if update_data.get("password"):
    hashed_password = generate_password_hash(update_data["password"])
    set_clause += ", password = ?"
    params.append(hashed_password)
  if update_data.get("role"):
    set_clause += ", role = ?"
    params.append(update_data.get("role"))
  if update_data.get("affiliation"):
    set_clause += ", affiliation = ?"
    params.append(update_data.get("affiliation"))
  if update_data.get("bio"):
    set_clause += ", bio = ?"
    params.append(update_data.get("bio"))
  if update_data.get("yoe"):
    set_clause += ", yoe = ?"
    params.append(update_data.get("yoe"))

  if set_clause:
    base_query = "UPDATE Account SET" + set_clause[1:] + " WHERE id = ?"
    params.append(user_id)

    cursor.execute(base_query, params)
    conn.commit()
    conn.close()
    return {"message": "User updated successfully"}, 200
  else:
    conn.close()
    return {"message": "No fields provided to update"}, 400
def login(email, password):
  """Logs in a user with email and password"""
  user = get_user(email)
  if not user:
    return {"message": "Invalid email or password"}, 401
  print(user.__dict__)
  if not check_password_hash(user.password, password):
    return {"message": "Invalid email or password"}, 401
  user.password = None
  return {"user": user.__dict__}, 200
def delete_user(user_id):
  conn = connect_db()
  cursor = conn.cursor()
  cursor.execute("DELETE FROM Account WHERE id = ?", (user_id,))
  conn.commit()
  conn.close()
  return {"message": "User deleted successfully" if cursor.rowcount else "User not found"}, 200

def get_all_users():
  conn = connect_db()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM Account")
  rows = cursor.fetchall()
  users = [User(row) for row in rows]
  conn.close()
  return users

def get_user_by_id(user_id):
  conn = connect_db()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM Account WHERE id = ?", (user_id,))
  row = cursor.fetchone()
  conn.close()
  if row:
    return User(row)
  else:
    return None
