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
const PORT = 8000;
const app = express();
app.use(express.json())
const skills = [
  { name: "AngularJS", id: 1 },
  { name: "Git", id: 2 },
  { name: "Figma","i": 3 },
  { name: "SAAS", id: 4 },
  { name: "AJAX", id:5 },
  { name: "InVision", id: 6 },
  { name: "Object Oriented Programming", id: 7 },
  { name: "Restful APIs", id: 8 },
  { name: "NodeJS", id: 9 },
  { name: "NestJS", id: 10},
  { name: "Django", id: 11 },
  { name: "Tailwind CSS", id: 12 }
];
app.use(cors());

app.post("/auth/user/login", (req, resp) => {
  console.log(req);
  const user_info = {
    data: {
      result: true,
      message: "Successfully logged in",
      token_type: "Bearer",
      expires_at: "2023-12-11 09:10:16",
      access_token: "365|3j735o0FEfgbG01Pz8Yaq0BPRyrJ1xVQHJ0F5GoHce0c2713",
      user_type: "job_seeker",
      user: {
        first_name: "kibria",
        last_name: "ahmed",
        email: "gkibria121@gmail.com",
      },
    },
  };

  resp.send(user_info);
});

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

  const filterd_data = skills.filter((item) => item.name.toLowerCase().replace(' ','').indexOf(key.toLowerCase().replace(' ','')) !=-1 );
  console.log(filterd_data)

  resp.send({data :filterd_data })

})


app.get('/skills',(req,resp) =>{
    resp.send( { data : skills} )
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
