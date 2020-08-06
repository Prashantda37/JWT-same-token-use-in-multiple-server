require('dotenv').config()

const express = require( "express" )
const app = express();
const jwt = require("jsonwebtoken")

app.use(express.json())

const post = [
	{
		name: "Prashant",
		comment:3
	},
	{
		name: "Tushar",
		comment: 2
	}
]


app.get( "/posts", authenticate, (req, res) => { 
	res.status( 200 ).json( req.user )
} )

app.get( "/test", authenticate, ( req, res ) => {
	res.status( 200 ).json( "testing" )
} )

//app.post("/login", ( req, res ) => { 
//	console.log( req.body );
//	const { username } = req.body;
//	const user = { name: username };
//	const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//	res.json( { token })
//});

// Middleware
function authenticate( req, res, next ) { 
	const authHeaders = req.headers["authorization"];
	const bearToken = authHeaders && authHeaders.split(" ")[1];
	if ( bearToken == null ) res.sendStatus( 401 );
	
	jwt.verify( bearToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => { 
		if ( error ) res.sendStatus( 403 )
		req.user = user
		next()
	})
}

app.listen( 5000, () => { 
	console.log("running PORT 5000")
})