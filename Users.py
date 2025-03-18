# Use Flask and Mysqldb 

from flask import Flask, request, jsonify,render_template
from flask_mysqldb import MySQL
import MySQLdb.cursors
app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '23122006Guru*'
app.config['MYSQL_DB'] = 'todolist'


mysql = MySQL(app)

@app.route('/')
def home():
    return render_template('SignUp.html')

@app.route('/SignIn')
def login():
    return render_template('SignIn.html')

# @app.route('/users', methods=['GET'])
# def get_users():
#     cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
#     cursor.execute("SELECT * FROM Amazon_users")  
#     rows = cursor.fetchall()
  
#     return {"data":rows}
    



# @app.route('/getUser/<int:user_ID>',methods=["GET"])
# def get_SpecificUser(user_ID):
    
#     cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
#     cursor.execute("SELECT * FROM Amazon_users where user_ID=(%s)",(user_ID,))
#     rows = cursor.fetchone()
#     cursor.close()
    
#     return {"data":rows}

# @app.route('/add',methods=["POST"])
# def addUsers():
#     data = request.get_json(force=True);
#     id=data["id"]
#     name = data["name"]
#     email = data["email"]
#     password = data["password"]
    
#     cursor = mysql.connection.cursor()
#     cursor.execute("Insert into users values (%s,%s,%s,%s)",(id,name,email,password))
#     mysql.commit()
#     return [{"message":"user added"}]

# @app.route('/addUser',methods=["POST"])
# def add():
    
#     data = request.get_json(force=True);
     
#     if (not data or data is None):
#         return jsonify([{"message":"Data is empty"}])
          
#     response = {
#         "message":""
#     }
    
    
#     if("name" in data):
#         name = data["name"]
#         if(name is not None and isinstance(name,str)):
#             if(not name=="" and (name.isalpha() or name.isspace())):
#                  name = data["name"]
#             else:
#                 response["message"] = "Given name contains alphabets charachters only"  
#                 return response
#         else:
#               response["message"] = "Given name should be string / not None"
#               return response
     
#     else:
#          response["message"] = "name key in not found!"
#          return response
     
#     if("email" in data):
#         email = data["email"]
#         cursor = mysql.connection.cursor()
#         cursor.execute("SELECT Lower(email) FROM users")  
#         rows = cursor.fetchall()
#         list=[]
        
#         for i in rows:
#             list.append(i[0])
#         cursor.close()
#         if(email is not None and isinstance(email,str)):
#             if(not email=="" and (not email.isspace())):
#                 email = data["email"]
#                 if(email  in list):
#                     response["message"] = "Email already Exist"
#                     return response
                    
#             else:
#                  response["message"] = " Given email contains alphabets,numberic,speicalcharachters"
#                  return response;
#         else:
#              response["message"] = "Given email should be string / not None"
#              return response
#     else:
#         response["message"] = "email key is not found!"
#         return response
    
#     if("password" in data):
#         password = data["password"]
#         if(password is not None and isinstance(password,str)):
#             if(not password=="" and (not password.isspace())):
#                 password = data["password"]
#             else:
#                 response["message"] = " Given password contains alphabets,numberic,speicalcharachters"
#                 return response
#         else:
#             response["message"] = "Given password should be string / not None"
#             return response
#     else:
#         response["message"] = "password key is not found!"
#         return response

    
#     cursor = mysql.connection.cursor()
#     cursor.execute(
#     "INSERT INTO Users(name, email, password) VALUES (%s, %s, %s)", 
#     (name, email, password)
#     )
#     mysql.connection.commit()
#     rows = cursor.rowcount  
#     cursor.close()

    
#     if(rows==1):
#         return jsonify([{"message": "User added successfully!"}])
#     else:
#         return jsonify([{"message": "User not added!"}])


@app.route('/addUser', methods=["POST"])
def add():
    data = request.get_json(force=True)
     
    if not data:
        return jsonify([{"message": "Data is empty"}])
    
    response = {"message": ""}
    
    if "name" in data:
        name = data["name"]
        if name and isinstance(name, str) and all(char.isalpha() or char.isspace() for char in name):
            pass
        else:
            response["message"] = "Given name should contain only alphabets and spaces"
            return jsonify([response])
    else:
        response["message"] = "Name key is not found!"
        return jsonify([response])
    
    if "email" in data:
        email = data["email"]
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT LOWER(email) FROM users")
        existing_emails = [row[0] for row in cursor.fetchall()]
        cursor.close()

        if email and isinstance(email, str) and not email.isspace():
            if email.lower() in existing_emails:
                response["message"] = "Email already exists"
                return jsonify([response])
        else:
            response["message"] = "Invalid email format"
            return jsonify([response])
    else:
        response["message"] = "Email key is not found!"
        return jsonify([response])

    if "password" in data:
        password = data["password"]
        if password and isinstance(password, str) and not password.isspace():
            pass
        else:
            response["message"] = "Invalid password"
            return jsonify([response])
    else:
        response["message"] = "Password key is not found!"
        return jsonify([response])

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO Users(name, email, password) VALUES (%s, %s, %s)", 
        (name, email, password)
    )
    mysql.connection.commit()
    rows = cursor.rowcount  
    cursor.close()

    if rows == 1:
        return jsonify([{"message": "User added successfully!"}])
    else:
        return jsonify([{"message": "User not added!"}])



@app.route('/loginUser', methods=["PUT"])
def SignIn(user_ID):
    data = request.get_json(force=True)
    
    response = {"message": ""}
    
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT email from Users")  
    rows = cursor.fetchall()
    user_list = [i[0] for i in rows]
    cursor.close()


    if "email" in data:
        email = data["email"]
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT email FROM Users")  
        rows = cursor.fetchall()
        email_list = [i[0] for i in rows]
        cursor.close()

        if email and isinstance(email, str) and email not in email_list:
            cursor = mysql.connection.cursor()
            query = "UPDATE Amazon_users SET email = %s WHERE user_ID = %s"
            cursor.execute(query, (email, user_ID))
            mysql.connection.commit()
            cursor.close()
        else:
            return jsonify({"message": "Email already exists or is invalid"})

    if "password" in data:
        password = data["password"]
        if password and isinstance(password, str):
            cursor = mysql.connection.cursor()
            query = "UPDATE Amazon_users SET password = %s WHERE user_ID = %s"
            cursor.execute(query, (password, user_ID))
            mysql.connection.commit()
            cursor.close()
        else:
            return jsonify({"message": "Given password should be a valid string"})


    return jsonify([{"message": "User login successfully!"}])



# @app.route('/deleteUser/<int:user_ID>', methods=["DELETE"])
# def deleteUser(user_ID):
#     cursor = mysql.connection.cursor()

#     cursor.execute("SELECT * FROM Amazon_users WHERE user_ID = %s", (user_ID,))
#     user = cursor.fetchone()

#     if user is None:
#         cursor.close()
#         return jsonify({"error": "User_id not found"}), 404

#     query = "DELETE FROM Amazon_users WHERE user_ID = %s"
#     cursor.execute(query, (user_ID,))
#     mysql.connection.commit()

#     cursor.close()
#     return jsonify({"message": "User deleted successfully!"}), 200


if __name__ == '__main__':
    app.run(port=4903,debug=True)
