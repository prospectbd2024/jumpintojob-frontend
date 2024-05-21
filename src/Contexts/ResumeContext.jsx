"use client"
import React, { useContext, createContext, useState, useEffect, useCallback, cache } from 'react'


export const resumeContext = createContext();
export const useResumeContext = () => useContext(resumeContext);



function ResumeContext({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [template , setTemplate] = useState({});
  const [hobbies, setHobbies] = useState([])
  const [resumeData, setResumeData] = useState({});
  //template settings
  const templateSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2
};
  //resume others

  const [more,manageMore] = useState([]);
  //profile data
  const [profileData,setProfileData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentAddress: {
      city: "",
      state: "",
      country: ""
    },
    permanentAddress: {
      city: "",
      state: "",
      country: ""
    },
    dateOfBirth: "", // New field for date of birth
    gender: "", // New field for gender
    nationality: "", // New field for nationality
    religion: "", // New field for religion
    maritalStatus: "", // New field for marital status
    summary: "",
    mediaLinks : [{name : "Linkedin", url: "www.linkedin.com"}],
  });
  useEffect(() => {
    setExperiences([
      {
        "id": 1,
        "job_title": "Senior Software Engineer",
        "company_name": "Tech Innovators Inc.",
        "company_business": "Technology Solutions",
        "designation": "Lead Developer",
        "department": "Engineering",
        "start_date": "2015-07-20",
        "to_date": "2022-12-31",
        "currently_working": false,
        "company_location": "Silicon Valley, USA",
        "responsibilities": "Led the development of various web applications using React.js and Node.js. Collaborated with product managers and designers to define product features and timelines. Mentored junior developers and conducted code reviews.",
        "expertises": [
          { "name": "JavaScript", "months": 72 },
          { "name": "React.js", "months": 60 },
          { "name": "Node.js", "months": 48 },
          { "name": "Software Architecture", "months": 48 }
        ],
        "visible_on_cv": true
      },
      {
        "id": 2,
        "job_title": "Product Manager",
        "company_name": "GlobalTech Solutions",
        "company_business": "Technology Services",
        "designation": "Senior Product Manager",
        "department": "Product Management",
        "start_date": "2017-03-15",
        "to_date": "2023-06-30",
        "currently_working": false,
        "company_location": "New York City, USA",
        "responsibilities": "Led product development lifecycle from concept to launch. Conducted market research, defined product requirements, and collaborated with engineering and design teams to deliver high-quality software products.",
        "expertises": [
          { "name": "Product Management", "months": 72 },
          { "name": "Market Research", "months": 60 },
          { "name": "Agile Methodology", "months": 48 },
          { "name": "User Experience (UX) Design", "months": 36 }
        ],
        "visible_on_cv": true
      },
      {
        "id": 3,
        "job_title": "Data Scientist",
        "company_name": "Data Insights Co.",
        "company_business": "Data Analytics",
        "designation": "Lead Data Scientist",
        "department": "Data Science",
        "start_date": "2016-10-10",
        "to_date": "2024-04-15",
        "currently_working": false,
        "company_location": "San Francisco, USA",
        "responsibilities": "Developed machine learning models to analyze large datasets and extract actionable insights. Collaborated with cross-functional teams to identify business opportunities and drive data-driven decision-making processes.",
        "expertises": [
          { "name": "Machine Learning", "months": 60 },
          { "name": "Python", "months": 72 },
          { "name": "Data Visualization", "months": 48 },
          { "name": "Statistical Analysis", "months": 60 }
        ],
        "visible_on_cv": true
      }

    ]
    )
  }, [])
  useEffect(() => {
    console.log(currentStep);
  }, [currentStep])
  // Education
  useEffect(() => {

    setEducations([
      {
        institution_name: "University of XYZ",
        institution_location: "City, Country",
        degree: "Bachelor of Science",
        field_study: "Computer Science",
        education_starting_year: "2018",
        education_graduation_year: "2022",
        education_achievements: "Dean's List, Outstanding Student Award",
        "visible_on_cv": true
      },
      {
        institution_name: "University of ABC",
        institution_location: "City, Country",
        degree: "Bachelor of Science",
        field_study: "Computer Science",
        education_starting_year: "2020",
        education_graduation_year: "2024",
        education_achievements: "Dean's List, Outstanding Student Award",
        "visible_on_cv": true
      },
    ])

  }, [])
  useEffect(() => {
    setLanguages([
      { "id": 1, "language": "Bengali", "proficiency": "Native" },
      { "id": 2, "language": "English", "proficiency": "Fluent" },
      { "id": 3, "language": "Spanish", "proficiency": "Beginner" }
    ]);
  }, [])
  useEffect(() => {
    setSkills([
      { "id": 1, "name": "Javascript", "rating": 4, "learnedFrom": ["self"] },
      { "id": 2, "name": "ReactJS", "rating": 4.2, "learnedFrom": ["self"] },
      { "id": 3, "name": "NodeJS", "rating": 2.5, "learnedFrom": ["self"] },
      { "id": 4, "name": "ExpressJS", "rating": 2.5, "learnedFrom": ["self"] },
      { "id": 5, "name": "MongoDB", "rating": 3, "learnedFrom": ["self"] },
    ]);
  }, [])
    

// resume templates
const resumeTemplates = [
  { id: 1, name: 'classic', image: 'https://cdn.enhancv.com/images/1098/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcmVzdW1lcy90ZWFjaGVyLXJlc3VtZS5wbmc~..png', type: 'resume' ,
   template : '<p>{resumeData)}</p>' , template_type : 'jsx' },
  { id: 2, name: 'modern', image: 'https://i.ibb.co/P1crN2n/resumetemplate2.png', type: 'resume',
  template : '<p>hello world</p>' , template_type : 'jsx'  },
  { id: 3, name: 'creative', image: 'https://gosumo-cvtemplate.com/wp-content/uploads/2019/06/Word-CV-Template-Dublin.png', type: 'cv' ,
  template : '<p>hello world</p>' , template_type : 'jsx' },
  { id: 4, name: 'fancy', image: 'https://techguruplus.com/wp-content/uploads/2022/12/Resume-CV-Templates-Word-doc-023.jpg', type: 'cv' ,
  template : '<p>hello world</p>' , template_type : 'jsx' },
  { id: 5, name: 'stylish', image: 'https://blog.hubspot.com/hs-fs/hubfs/resume-templates-word_2.webp?width=650&height=841&name=resume-templates-word_2.webp', type: 'resume',
  template : '<p>hello world</p>' , template_type : 'jsx'  }
]

  useEffect(()=>{
    setHobbies([{ name : "traveling"},{name : "Singing"}])
  },[])
// update resume data
  useEffect(()=>{
    setResumeData(prev=>({...prev,educations: educations}))

  },[educations])
// update resume data
  useEffect(()=>{
    setResumeData(prev=>({...prev,experiences : experiences}))

  },[experiences])
// update resume data
useEffect(()=>{
  setResumeData(prev=>({...prev,skills : skills}))

},[skills])
// update resume data
useEffect(()=>{
  setResumeData(prev=>({...prev,languages : languages}))

},[languages])
// update resume data
useEffect(()=>{
  setResumeData(prev=>({...prev,hobbies : hobbies}))
},[hobbies])
// update resume data
useEffect(()=>{
  setResumeData(prev=>({...prev,profile : profileData}))

},[profileData])
// update resume data
useEffect(()=>{
  setResumeData(prev=>({...prev,others : more}))
},[more])
useEffect(()=>{
  console.log(resumeData);
},[resumeData])
  return (
    <resumeContext.Provider value={{ currentStep, 
    setCurrentStep, educations, 
    setEducations, experiences, 
    setExperiences,
    languages, setLanguages, 
    skills, setSkills,
    template , setTemplate,
    profileData,setProfileData,
    hobbies, setHobbies ,
    resumeData, setResumeData,
    more,manageMore,templateSettings,
    resumeTemplates }} >
                          {children}
    </resumeContext.Provider>
  )
}

export default ResumeContext