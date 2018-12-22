let express = require('express'); 
let hbs = require('hbs'); 
let fs = require('fs'); 
const port = process.env.PORT || 3000;
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
 
//app.use((req, res, next) => { 
//  res.render('maintain.hbs');
//}); 

app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => { 
   res.render('home.hbs', { 
     title : 'home page', 
     welcome : 'welcome to my web page', 
     //year : new Date().getFullYear(), 
    
   });
});  

app.get('/project',(req, res) =>{ 
  res.render('project.hbs', { 
    title : 'project page', 
    
  });
});

app.get('/about', (req, res) => { 
  res.render('about.hbs', { 
    title : "about page", 
    //year : new Date().getFullYear() 
    
  });
}); 

app.get('/bad', (req, res) => { 
  res.send({error : "Not found error"});
});  



app.listen(port, () => {
    console.log(`Server is up to port ${port}`);
});