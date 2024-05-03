const express = require ('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000 ;

// MIDDLEWARE

app.use(cors());
app.use(express.json());



app.get('/', (req,res)=>{
    console.log('ART CRAFT STORE SERVER ');
});

app.listen(port,()=>{
    console.log(`ART CRAFT STORE SERVER RUNNING : ${port}`);
})