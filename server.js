let express = require('express'); 
let hbs = require('hbs'); 
let fs = require('fs');
let app = express(); 
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');  

hbs.registerHelper('year', () => {
  return new Date().getFullYear(); 
}); 

hbs.registerHelper('upperCase', (text) => { 
  return text.toUpperCase();
})  

  
app.use((req, res, next) => { 
  var now = new Date().toString(); 
  var log = `${now} : ${req.method}--${req.url}`;  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => { 
  if (err) { 
    console.log('Unable to connect to Server.log');
  }              
  }); 
  next();
});
 
app.use((req, res, next) => { 
  res.render('maintain.hbs');
}); 

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => { 
   res.render('home.hbs', { 
     title : 'home page', 
     welcome : 'welcome to my web page', 
     //year : new Date().getFullYear(), 
    
   });
}); 

app.get('/about', (req, res) => { 
  res.render('about.hbs', { 
    title : "About page", 
    //year : new Date().getFullYear() 
    
  });
}); 

app.get('/bad', (req, res) => { 
  res.send({error : "Not found error"});
});  



app.listen(3000, () => {
    console.log('Server is up to port 3000');
});