


const express = require('express');
const bodyParser = require ('body-parser');
const request = require('request');
const https = require ('https');

const app = express();

app.use(bodyParser.urlencoded({extended : true }));

app.use(express.static("public"));



app.get('/',function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})


app.post('/',function(req,res)
{

    const fname = req.body.fname;
    const lname = req.body.lname; 
    const data = {
        members : [
            {
                email_address :  req.body.email,
                status : "subscribed",
                merge_feilds : {

                    FNAME:fname,
                    LNAME:lname
                }
                
            }
        ]
    }


    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/a62ae68394";

    const options = {
        method : "POST",
        auth : "anu:6af1be4cce0b5d61f46194fcbfd28b88-us21"
    }


const request =  https.request(url , options , function(response)
    {
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})



app.post('/failure', function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function()  //process.env.port is a dynamic port means like our 3000 the heroku will give it a port to listen on 
{
    console.log("Listening on port 3000");
})









// 2877d31680e0bf77ae5b3038d96e7e02-us21 

// list id 
// a62ae68394.