from pymongo import MongoClient
from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to the MongoDB server
client = MongoClient("mongodb://127.0.0.1:27017/")

# Use the test_database

db = client.test_database
# Access the collection named "taskList"
collection = db["taskList"]




#  post data to database 

@app.route('/taskdata',methods=["POST"])
def new_Add():
    data = request.json
    print(data)
    if not data :
        return jsonify ({"message":"data not provided"}),400
    
    try:
       result = collection.insert_one(data)
       return jsonify({"message":"inserted"}),200
    except:
        return jsonify({"messasgae":"error"}),500
    

                                      # Get all tasks from DB



@app.route('/task', methods=["GET"])
def get_tasks():
    all_data = collection.find()
    result = []
    for document in all_data:
        document['_id'] = str(document['_id'])  # Convert ObjectId to string
        result.append(document)
    return jsonify(result)

                                    # Route to delete a single task using ID



@app.route('/task/<inserted_id>', methods=["DELETE"])
def delete_task(inserted_id):
    try:
        obj_id = ObjectId(inserted_id)  # Convert string to ObjectId
    except:
        return jsonify({"message": "Invalid task ID "}), 400

    result = collection.delete_one({"_id": obj_id})
    if result.deleted_count == 1:
        return jsonify({"message": "Task deleted successfully"}), 200
       
        
    else:
        return jsonify({"message": "Task not found"}), 404
    

                                           #   update a task 

@app.route('/task/<inserted_id>', methods=['PATCH'])
def update_task(inserted_id):
    try:
        obj_id = ObjectId(inserted_id)  # Convert string to ObjectId
    except:
        return jsonify({"message": "Invalid task ID format"}), 400

    update_data = request.json  # Get the JSON data from the request
    update_fields = {}

    # Only add fields to update if they are provided in the request
    if "id" in update_data:
        update_fields["id"] = update_data["id"]
    if "title" in update_data:
        update_fields["title"] = update_data["title"]
    if "description" in update_data:
        update_fields["description"] = update_data["description"]
    if "completion" in update_data:
        update_fields["completion"] = update_data["completion"]

    if not update_fields:
        return jsonify({"message": "No fields to update provided"}), 400

    result = collection.update_one({"_id": obj_id}, {"$set": update_fields})

    if result.matched_count == 1:
        return jsonify({"message": "Task updated successfully"}), 200
    else:
        return jsonify({"message": "Task not found"}), 404
   

if __name__ == '__main__':
    app.run(debug=True)

