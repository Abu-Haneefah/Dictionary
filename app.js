const express = require('express');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT||13000;
const https = require('https');
const server = https.createServer(app);
const bodyParser = require('body-parser');
const { json } = require('express');
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('index');

});
app.post('/result', function(req,res){
    const search =req.body.search;
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;
    https.get(url, function(response){
        response.on('data', function(data){
            const apiData = JSON.parse(data);
          const result = apiData[0];
            const meaning = result.meanings[0].definitions[0].definition;
            const phonetics = result.phonetics[0].text;
            const wordSearch = result.word;
            const partOfSpeech = result.meanings[0].partOfSpeech;
            if(response.statusCode=== 200){
                res.render('app', {searchedWord: wordSearch, phonet: phonetics, partOfSpeech: partOfSpeech, Meaning: meaning});

            }else{
               res.send('Oops!! no result')
            }
          
        });
    });
    
});


app.listen(port, function(){
    console.log('Server has started on port 13000');
});

