var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    // url = 'https://www.fool.com.au/2018/09/21/big-brands-are-in-danger-from-cheap-competition-shares-to-avoid/';
    url = "https://www.cnn.com/2018/09/22/politics/michael-cohen-help-prosecution-russia-new-york-trump-investigate/index.html";
    request(url, function(error, response, html){
        if(!error){

            var $ = cheerio.load(html);
            var title, release, rating;
            var json = { title : "", content : ""};

            // $('.header').filter(function(){
            //     var data = $(this);
            //     title = data.children().first().text();

            //     release = data.children().last().children().text();

            //     json.title = title;
            //     json.release = release;
            // })

            $('div').filter(function() {
                const data = $(this);
                const content = data.text();
                if(content.length > 50 && /^[A-Za-z]/.test(content)) {
                    console.log(content);
                }
            });

            // // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            // $('.star-box-giga-star').filter(function(){
            //     var data = $(this);

            //     // The .star-box-giga-star class was exactly where we wanted it to be.
            //     // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

            //     rating = data.text();

            //     json.rating = rating;
            // })

            // To write to the system we will use the built in 'fs' library.
            // In this example we will pass 3 parameters to the writeFile function
            // Parameter 1 :  output.json - this is what the created filename will be called
            // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
            // Parameter 3 :  callback function - a callback function to let us know the status of our function

            // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

            //     console.log('File successfully written! - Check your project directory for the output.json file');

            // })

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            res.send('Check your console!')

        }
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;