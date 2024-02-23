const express = require("express");
const cors = require("cors");
const jobs = require("../public/alljobs.json");
const companies = require("../public/companies.json");
const categories = [
  { id: 1, category_name: "Technology & IT" },
  { id: 2, category_name: "Retails and Consumer Goods" },
  { id: 3, category_name: "Finance and Banking" },
  { id: 4, category_name: "Healthcare and Pharmaceuticals" },
  { id: 5, category_name: "Manufacturing and Industrial" },
  { id: 6, category_name: "Energy and Utilities" },
  { id: 7, category_name: "Media and Entertainment" },
  { id: 8, category_name: "Real Estate and Property" },
  { id: 9, category_name: "Travel and Hospitality" },
  { id: 10, category_name: "Automotive" },
  { id: 11, category_name: "Education and E-learning" },
  { id: 12, category_name: "Agriculture and Food Production" },
  { id: 13, category_name: "Construction and Engineering" },
  { id: 14, category_name: "Transportation and Logistics" },
  { id: 15, category_name: "Telecommunications" },
  { id: 16, category_name: "Other" },
];
const PORT = 8100;
const app = express();
app.use(express.json())
const languages = [
  { name: "Bengali", id: 1 ,rating : 0},
  { name: "English", id: 2 ,rating : 0},
  { name: "Hindi","i": 3 ,rating : 0},
  { name: "Urdu", id: 4 ,rating : 0},
  { name: "Chinese", id:5 ,rating : 0},
  { name: "InVision", id: 6 ,rating : 0},
  { name: "Object Oriented Programming", id: 7 ,rating : 0},
  { name: "Restful APIs", id: 8 ,rating : 0},
  { name: "NodeJS", id: 9 ,rating : 0},
  { name: "NestJS", id: 10,rating : 0},
  { name: "Django", id: 11 ,rating : 0},
  { name: "Tailwind CSS", id: 12 ,rating : 0}
];
const skills = [
  { name: "AngularJS", id: 1 ,rating : 0},
  { name: "Git", id: 2 ,rating : 0},
  { name: "Figma","i": 3 ,rating : 0},
  { name: "SAAS", id: 4 ,rating : 0},
  { name: "AJAX", id:5 ,rating : 0},
  { name: "InVision", id: 6 ,rating : 0},
  { name: "Object Oriented Programming", id: 7 ,rating : 0},
  { name: "Restful APIs", id: 8 ,rating : 0},
  { name: "NodeJS", id: 9 ,rating : 0},
  { name: "NestJS", id: 10,rating : 0},
  { name: "Django", id: 11 ,rating : 0},
  { name: "Tailwind CSS", id: 12 ,rating : 0}
];
app.use(cors());

app.post('/auth/user/login',(req,resp)=>{
    console.log(req)
    const user_info = {
        data: {
            result: true,
            message: "Successfully logged in",
            token_type: "Bearer",
            expires_at: "2023-12-11 09:10:16",
            access_token: "365|3j735o0FEfgbG01Pz8Yaq0BPRyrJ1xVQHJ0F5GoHce0c2713",
            user_type: "Job Seeker",
            user: {

                first_name : "Kazi",
                last_name : "Solayman",
                email : 'kazisolayman123@gmail.com',
                
            }
        }
    }


  resp.send({

  })
})


app.get("/circular", (req, resp) => {
  resp.send({ data: jobs });
});
app.get("/companies", (req, resp) => {
  resp.send({ data: companies });
});
app.get("/job-categories", (req, resp) => {
  resp.send({ data: categories });
});
app.get("/logout", (req, resp) => {
  resp.send({});
});

app.post("/skills/search",(req,resp)=>{
  console.log(req.body)
  const key = req.body.key;
  if (key==''){
    resp.send({})
  }
  console.log(key)

  const filterd_data = skills.filter((item) => item.name.toLowerCase().replace(' ','').indexOf(key.toLowerCase().replace(' ','')) !=-1 );
  console.log(filterd_data)

  resp.send({data :filterd_data })

})

app.post("/languages/search",(req,resp)=>{
const key = req.body.key;
if (key==''){
  resp.send({})
}

const filterd_data = languages.filter((item) => item.name.toLowerCase().replace(' ','').indexOf(key.toLowerCase().replace(' ','')) !=-1 );
console.log(filterd_data)
resp.send( { data : filterd_data} )


})

app.get('/skills',(req,resp) =>{
    resp.send( { data : skills} )
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
