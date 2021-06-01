# Cypher- The Cryptic Hunt

***A full stack website to host and deploy online cryptic/treasure hunts***

Built with:

<img src="https://img.shields.io/badge/database-mongoDB-brightgreen?style=flat&logo=mongoDB">
<img src="https://img.shields.io/badge/Backend-Node-green?style=flat&logo=Node.js">
<img src="https://img.shields.io/badge/Frontend-Material Design-blue?style=flat&logo=material-Design">
<img src="https://img.shields.io/badge/Template Engine-Pug-purple?style=flat">

## 1. How to setup
- Clone or download the repository.
  ```
  git clone git@github.com:elit-altum/Cryptic-Hunt.git
  ```
- Get a hosted mongoDB Atlas Cluster (Learn More [Here](https://www.youtube.com/watch?v=rPqRyYJmx2g))
- Create a ```config.env``` file on the root of the project and create the following variables there :
  ```
  MONGO_SRV=<SRV string provided while hosting the cluster>

  JWT_SECRET=<any 32 character string for encoding JWTs>

  <Just copy paste the following lines>
  JWT_EXPIRE=7d
  COOKIE_EXPIRE=7
  ```
- Host the created app on Heroku or Netlify for free. (Learn More [Here](https://www.youtube.com/watch?v=MxfxiR8TVNU))
- Do provide the ```config.env``` variables as heroku environment variables as well.

### 2. Creating an admin
- Create/register a new user for yourself using the frontend
- Access this user document on the Mongo cluster on the users collection of the database. It should match the format of the schema.
```
username: {
		type: String,
		required: true,
		unique: [true, "This username is already taken!"],
	},
	password: {
		type: String,
		required: true,
		minlength: [8, "Please have atleast 8 characters!"],
		select: false,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	level: {
		type: Number,
		default: 0,
	},
	lastSolved: {
		type: Date,
		default: Date.now(),
	},
```
and make sure you set the ```role``` value as "admin"
