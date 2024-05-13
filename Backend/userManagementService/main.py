from flask import Flask, jsonify, request, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import service

app = Flask(__name__)
app.secret_key = "smthweird"
CORS(app)


@app.route("/signup", methods=["POST"])
def signup():
  """User signup endpoint"""
  data = request.get_json()
  response = service.create_user(data)
  return jsonify(response)

@app.route("/login", methods=["POST"])
def login_route():
  """User login endpoint"""
  data = request.get_json()
  if not data or not data.get("email") or not data.get("password"):
    return jsonify({"message": "Missing required fields"}), 400

  response = service.login(data["email"], data["password"])
  #session["user_id"] = response[0]["id"]

  return jsonify(response)

@app.route("/users", methods=["GET", "POST"])
def users():
  if request.method == "GET":
    users = service.get_all_users()
    return jsonify([user.__dict__ for user in users])  # Convert users to dictionaries
  elif request.method == "POST":
    data = request.get_json()
    response = service.create_user(data)
    return jsonify(response)

@app.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user_by_id(user_id):
  if request.method == "GET":
    user = service.get_user_by_id(user_id)
    if user:
      return jsonify(user.__dict__)
    else:
      return jsonify({"message": "User not found"}), 404
  elif request.method == "PUT":
    data = request.get_json()
    response = service.update_user(user_id, data)
    return jsonify(response)
  elif request.method == "DELETE":
    response = service.delete_user(user_id)
    return jsonify(response)

@app.route("/admin/stats", methods=["GET"])
def get_stats():
  response = service.get_stats()
  return jsonify(response)

if __name__ == "__main__":
    service.create_tables()
    app.run(debug=True)
