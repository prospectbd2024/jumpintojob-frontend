"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
const userProfileContext = createContext();
export const useUserProfileContext = () => useContext(userProfileContext);


function UserProfileContext({ children }) {


    const pdata = {
        "title": "Software Engineer",
        "firstName": "Ahmed",
        "userType" : "",
        "lastName": "Kibria",
        "avatar": "", // Correcting 'avata' to 'avatar'
        "cvProfileImage": "",
        "email": "gkibria121@gmail.com",
        "phone": "+8801521254580",
        "currentAddress": {
            "city": "Narayanganj",
            "state": "Dhaka",
            "country": "Bangladesh",
            "postalCode": "1204" // Adding postal_code
        },
        "permanentAddress": {
            "city": "",
            "state": "",
            "country": "",
            "postalCode": "" // Adding postal_code
        },
        "dateOfBirth": "", // New field for date of birth
        "gender": "", // New field for gender
        "nationality": "", // New field for nationality
        "religion": "", // New field for religion
        "maritalStatus": "", // New field for marital status
        "summary": "",
        "mediaLinks": [
            {
                "name": "Linkedin",
                "url": "www.linkedin.com"
            }
        ]
    }

    const saveProfile =()=>{
        console.log(userProfileData);
    }


    const [jobType, setJobType] = useState('');
    const [otherPreferences, setOtherPreferences] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState('');
    const [currency, setCurrency] = useState('BDT'); // Default currency is USD
    const [preferredIndustry, setPreferredIndustry] = useState('');
    const [availability, setAvailability] = useState('');
    const [personalInformation, SetPersonalInformation] = useState(pdata);
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [hobbies, setHobbies] = useState([])
    const [more, manageMore] = useState([]);
    const [userProfileData, setUserProfileData] = useState({ status: 'in-progress' });
    const [avatar, setAvatar] = useState(null);
    const [selectedAvatar, selectAvatar] = useState(null);
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

    useEffect(() => {
        setHobbies([{ name: "traveling" }, { name: "Singing" }])
    }, [])

    useEffect(() => {
        manageMore([
            // Projects
            {
              type: 'Project',
              title: 'AI Chatbot Development',
              startDate: '2023-01-01',
              endDate: '2023-06-30',
              present: false,
              description: 'Developed an AI chatbot using natural language processing and machine learning techniques.'
            },
            {
              type: 'Project',
              title: 'E-commerce Website Redesign',
              startDate: '2022-04-15',
              endDate: '2022-10-20',
              present: false,
              description: 'Redesigned the user interface of an e-commerce website to improve user experience and increase sales.'
            },
            {
              type: 'Project',
              title: 'Mobile App for Fitness Tracking',
              startDate: '2023-05-01',
              endDate: '2023-12-01',
              present: true,
              description: 'Creating a mobile application to track fitness activities, set goals, and monitor progress.'
            },
            // Certificates
            {
              type: 'Certificate',
              title: 'Certified Data Scientist',
              date: '2023-02-15',
              description: 'Completed a comprehensive data science certification program covering statistics, machine learning, and data visualization.'
            },
            {
              type: 'Certificate',
              title: 'Project Management Professional (PMP)',
              date: '2021-08-12',
              description: 'Earned PMP certification demonstrating skills in project management, team leadership, and strategic planning.'
            },
            {
              type: 'Certificate',
              title: 'AWS Certified Solutions Architect',
              date: '2022-05-22',
              description: 'Achieved AWS certification with expertise in designing and deploying scalable, highly available systems on AWS.'
            },
            // Publications
            {
              type: 'Publication',
              title: 'Advances in Quantum Computing',
              journal: 'Journal of Computer Science',
              date: '2022-12-10',
              abstract: 'This paper explores the latest advancements in quantum computing, including new algorithms and hardware developments.'
            },
            {
              type: 'Publication',
              title: 'The Future of Artificial Intelligence',
              journal: 'AI Research Journal',
              date: '2023-03-15',
              abstract: 'A comprehensive review of current trends and future directions in artificial intelligence research and applications.'
            },
            {
              type: 'Publication',
              title: 'Blockchain Technology in Finance',
              journal: 'Financial Innovations',
              date: '2021-11-05',
              abstract: 'An analysis of how blockchain technology is transforming financial services, including security, transparency, and efficiency.'
            },
            // Others
            {
              type: 'Other',
              title: 'Volunteer at Local Animal Shelter',
              description: 'Assisted with daily operations and care of animals at the local shelter, including organizing adoption events and raising awareness.'
            },
            {
              type: 'Other',
              title: 'Mentor at Coding Bootcamp',
              description: 'Provided mentorship and guidance to students learning to code, helping them develop skills in programming and problem-solving.'
            },
            {
              type: 'Other',
              title: 'Organizer of Tech Meetup',
              description: 'Organized monthly tech meetups to foster community engagement, share knowledge, and discuss the latest trends in technology.'
            }
          ])
    }, [])



    // update resume data
    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, educations: educations }))
    }, [educations])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, experiences: experiences }))
    }, [experiences])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, skills: skills }))
    }, [skills])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, languages: languages }))
    }, [languages])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, hobbies: hobbies }))
    }, [hobbies])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, personalInformation: personalInformation }))
    }, [personalInformation])

    useEffect(() => {
        setUserProfileData(prev => ({ ...prev, others: more, status: 'done' }))
    }, [more])

    useEffect(()=>{
        setUserProfileData(prev => ({ ...prev,  avata : selectedAvatar }))
    },[selectedAvatar])


    return (
        <userProfileContext.Provider value={{
           personalInformation, SetPersonalInformation, 
            experiences, setExperiences,
            educations, setEducations, 
            languages, setLanguages, 
            skills, setSkills,
            hobbies, setHobbies, 
            more, manageMore,
            jobType, setJobType, 
            otherPreferences, setOtherPreferences, 
            salaryExpectation, setSalaryExpectation, 
            currency, setCurrency, 
            preferredIndustry, setPreferredIndustry, 
            availability, setAvailability,
            userProfileData, setUserProfileData,
            avatar, setAvatar,
            selectedAvatar, selectAvatar,
            saveProfile
        }}>
            {children}
        </userProfileContext.Provider>
    )
}

export default UserProfileContext
