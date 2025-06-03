import {
    javascript,html,css,reactjs,tailwind,nodejs,mongodb,git,threejs,
    java,
    excel_clone,
    Drum_Kit,
    port_3d, jsp, coding_g, sorting, react1,tim_dog,online_eductaion,music_web,game,web_dev,GenAgenticAI
  } from "../assets";

  const profiles = [
    {
      link: "https://leetcode.com/Mukeshdani/",
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png",
    },
    {
      link: "https://auth.geeksforgeeks.org/user/mukeshdani00",
      icon: "https://img.icons8.com/color/344/GeeksforGeeks.png",
    },
    {
      link: "https://github.com/mukeshdani",
      icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    },
    {
      link: "https://medium.com/@mukeshdani",
      icon: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*ROAA4wmYtyIKUi2-tAjtJA.jpeg",
    }
  ];

  const achievements = [
    {
      title: "I got Rank 1 in college and Rank 6 in University",
    },
    {
      title: "Solved 700+ problems in Java Programming Language",
    },
    {
      title: "Got Rank 1086 /17K+ Participants in Weekly Contest 323 Leetcode",
    },
    {
      title: "Got Global Rank: 346 in codechef (STARTERS69)",
    },
    {
      title: `Managed student placements and internships, coordinating with employers, educational institutions, and students to ensure successful placements and a positive learning experience`,
    },
    {
      title: "Branch Topper of Computer Science & Engineering Department (2019 - 2023)",
    },
    {
      title: "Selected for 1 year Free JEE preparation (Super 30) CSRL(Centre for Social Responsibility and Leadership)",
    },
    {
      title: "National Cadet Crops (Feb 2015 - Nov 2018) Role : Cadet, Cretificate : 'A' and 'B'",
    },
  ]
  
  const technologies = [
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name:"Bootstrap",
      icon: "https://img.icons8.com/color/480/000000/bootstrap.png",
    },
    {
      name:"C++ tool",
      icon: "https://img.icons8.com/color/480/000000/c-plus-plus-logo.png",
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name:"MySql",
      icon: "https://img.icons8.com/color/480/000000/mysql-logo.png",
    },
  ];

  const list = [
    {
      id: "web",
      title: "Web Dev",
    },
    {
      id: "java",
      title: "Java Programming",
    },
    {
      id: "Generative AI and Agentic AI",
      title: "Generative AI and Agentic AI",
    },
    {
      id: "dev Interview",
      title: "Dev Interview",
    },
  ];
  export const webProject = [
    {
      name: "3D React Portfolio",
      description:
        "Created an impressive website made using React with 3D graphics and animations to bring their content to life. Responsive webpage is made with user friendly interface",
      tags: [
        {
          name: "TailwindCSS",
          color: "blue-text-gradient",
        },
        {
          name: "ThreeJS",
          color: "green-text-gradient",
        },
        {
          name: "React JS",
          color: "pink-text-gradient",
        },
      ],
      image: port_3d,
      source_link: "#",
      source_code_link: "#",
    },
    {
      name: "Meal Plans delivery website",
      description:
      `A web application to plan what you eat daily in accordance to dietary needs, Futher improvement: videos, feedback, meal level`,
      tags: [
        {
          name: "React JS",
          color: "blue-text-gradient",
        },
        {
          name: "MVC architecture",
          color: "blue-text-gradient",
        },
        {
          name: "REST API",
          color: "blue-text-gradient",
        },
        {
          name: "Json web token",
          color: "blue-text-gradient",
        },
        {
          name: "Postman",
          color: "blue-text-gradient",
        },
        {
          name: "Github",
          color: "blue-text-gradient",
        },
        {
          name: "Heroku | Netlify",
          color: "blue-text-gradient",
        },
        {
          name: "Express JS",
          color: "green-text-gradient",
        },
        {
          name: "MongoDB Atlas",
          color: "pink-text-gradient",
        },
      ],
      image: react1,
      source_link: "https://meal-plan-web.netlify.app/",
      source_code_link: "https://github.com/mukeshdani/Meal-Plans-delivery-website",
    },
    {
      name: "My Drive",
      description:
      `In which a user can create a nested folder structure, currently a user can also create, manage and update text files and albums Tech Used - HTML, CSS and JavaScript. Currently this project uses Local Storage to store user data.`,
      tags: [
        {
          name: "JavaScript",
          color: "blue-text-gradient",
        },
        {
          name: "HTML",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: jsp,
      source_link: "https://mydriveproject.netlify.app/",
      source_code_link: "https://github.com/mukeshdani/My-Drive-Project",
    },
    {
      name: "【﻿CODING G】",
      description:
        "Coding G is a web app Using React which includes an IDE supporting multiple languages for programming Like Java , C++ , Python , Kotlin , Ruby and Swift in addition with a highly customizable Web Editor supporting real time changes Tech Used - React",
      tags: [
        {
          name: "React JS",
          color: "blue-text-gradient",
        },
        {
          name: "IDE",
          color: "green-text-gradient",
        },
        {
          name: "JavaScript",
          color: "pink-text-gradient",
        },
      ],
      image: coding_g,
      source_link: "https://coding-g.netlify.app/",
      source_code_link: "https://github.com/mukeshdani",
    },
    {
      name: "Sorting Visualizer",
      description:
        `Sorting Visualizer is Web App that helps visualize various sorting algorithms.

        Visualize the following Sorting Algorithms in one of the most efficient way Bubble Sort Insertion Sort Selection Sort Heap Sort Merge Sort Quick Sort
        
        Tech Used - HTML , CSS , Javascript`,
      tags: [
        {
          name: "React JS",
          color: "blue-text-gradient",
        },
        {
          name: "HTML",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: sorting,
      source_link: "https://s-visualizer.netlify.app/",
      source_code_link: "https://github.com/mukeshdani/Sorting-Visualizer",
    },
     {
      name: "Excel Clone",
      description:
        `This project have different formatting
        textcolor,fillcolor,alignment,cut ,copy,paste.
        we can save our excel file
        we can add/delete sheeet
        add new file and also open the old saved one.
        Tech Used - HTML , CSS , Javascript`,
      tags: [
        {
          name: "Javascript",
          color: "blue-text-gradient",
        },
        {
          name: "HTML",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: excel_clone,
      source_link: "https://myexcelclone.netlify.app/",
      source_code_link: "https://github.com/mukeshdani/My-Excel-",
    },
    {
      name: "Drum-Kit",
      description:
        `A web-based Drum music game for playing the drum. This can give you an experience of drum playing. So enjoy playing.
        In this project i learned the Advance JavaScript and DOM Manipulation Listeners Higher Order Functions and Passing Functions as Arguments`,
      tags: [
        {
          name: "JavaScript",
          color: "blue-text-gradient",
        },
        {
          name: "HTML",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: Drum_Kit,
      source_link: "https://mukeshdani.github.io/Drum-Kit-/",
      source_code_link: "https://github.com/mukeshdani/Drum-Kit-",
    },
    {
      name: "TinDog",
      description:
        `A home page website which provides details of the application to the end user like the desscription of the website, from where we can download the application, a section that displays the feedback from the clients and different plans and subscriptions`,
      tags: [
        {
          name: "Bootstrap",
          color: "blue-text-gradient",
        },
        {
          name: "Carousel, Card",
          color: "green-text-gradient",
        },
        {
          name: "Font Awesome",
          color: "pink-text-gradient",
        },
        {
          name: "HTML5",
          color: "pink-text-gradient",
        },
        {
          name: "css3",
          color: "pink-text-gradient",
        },
      ],
      image: tim_dog,
      source_link: "https://mukeshdani.github.io/TinDog/",
      source_code_link: "https://github.com/mukeshdani/TinDog",
    },
    {
      name: "Simon-Game",
      description:
        `Simon Game is a web game build by using Basic Frontend Teachnology`,
      tags: [
        {
          name: "JavaScript",
          color: "blue-text-gradient",
        },
        {
          name: "HTML",
          color: "pink-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: game,
      source_link: "https://mukeshdani.github.io/Simon-Game/",
      source_code_link: "https://github.com/mukeshdani/Simon-Game",
    },
    {
      name: "Music Player",
      description:
        `Music Player is a website in which user can listen songs and also read details of music (author name).`,
      tags: [
        {
          name: "JavaScript",
          color: "blue-text-gradient",
        },
        {
          name: "HTML",
          color: "pink-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: music_web,
      source_link: "https://mukeshdani.github.io/music-player-/",
      source_code_link: "https://github.com/mukeshdani",
    },
    {
      name: "Online-Education",
      description:
        `Online-Education is website where you can explore many corses and buy that course`,
      tags: [
        {
          name: "JavaScript",
          color: "blue-text-gradient",
        },
        {
          name: "HTML5",
          color: "pink-text-gradient",
        },
        {
          name: "css3",
          color: "pink-text-gradient",
        },
      ],
      image: online_eductaion,
      source_link: "https://educationw.netlify.app",
      source_code_link: "https://github.com/mukeshdani/online-Education",
    },
  ];
  export const javaProject = [
    {
      name: "Java Programming Language",
      description:
        "My solutions to coding interview problems on LeetCode, AlgoExpert, GFG, and Other Coding Sites. I will be adding my solutions to this repository every day whenever I do solve them :)",
      tags: [
        {
          name: "Java",
          color: "blue-text-gradient",
        },
        {
          name: "Data Structure",
          color: "green-text-gradient",
        },
        {
          name: "algorithms",
          color: "pink-text-gradient",
        },
      ],
      image: java,
      source_link: "https://github.com/mukeshdani/Data-Stractures-and-algorithms-",
      source_code_link: "https://github.com/mukeshdani/Data-Stractures-and-algorithms-",
    }
  ];
  export const devProject = [
    {
      name: "Dev Interview Preparation",
      description:
        "This is a repository in which i have store all interview related materials :)",
      tags: [
        {
          name: "Java",
          color: "blue-text-gradient",
        },
        {
          name: "Data Structure",
          color: "green-text-gradient",
        },
        {
          name: "algorithms",
          color: "pink-text-gradient",
        },
      ],
      image: web_dev,
      source_link: "https://github.com/mukeshdani/Dev",
      source_code_link: "https://github.com/mukeshdani/Dev",
    }
  ];
   export const GenerativeAgenticAIProject = [
  {
    name: "Generative AI and Agentic AI",
    description:
      "This repository includes projects, theory, and interview prep focused on Generative and Agentic AI. It explores real-world enterprise use cases like automation, decision support, and intelligent agents",
    tags: [
      {
        name: "Generative AI",
        color: "blue-text-gradient"
      },
      {
        name: "Agentic AI",
        color: "green-text-gradient"
      },
      {
        name: "Enterprise AI",
        color: "pink-text-gradient"
      },
      {
        name: "Interview Prep",
        color: "orange-text-gradient"
      }
    ],
    image: GenAgenticAI,
    source_link: "https://github.com/mukeshdani/DsaWebCloudPractice/tree/Interview/Agentic%20AI",
    source_code_link: "https://github.com/mukeshdani/DsaWebCloudPractice/tree/Interview/Agentic%20AI"
  }
];
  const experiences = [
    {
      title: "Software Engineer",
      company_name: "Adani Group",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adani_logo_2012.svg/1280px-Adani_logo_2012.svg.png",
      iconBg: "#383E56",
      date: "October 2023 - Present",
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/AdaniGroupWE.md",
      points:["🏥 (Healthcare Module) Intelligent Automation in Healthcare Systems","🕒 Employee Attendance Data Management Tool","📊 Talent Acquisition Dashboard (AI-Powered Talent Acquisition Dashboard) & Data Lake Development",
    // "Healthcare Module: Integrated a new line of business into the EHR application. Automated doctor-patient interactions using Google Speech-to-Text and NLP APIs. Developed a clinical assistant chatbot using LangChain and OpenAI GPT-4, capable of summarizing patient history and generating draft prescriptions. Reduced documentation time by 70% and improved prescription accuracy by 85%. Handled 1,000+ daily interactions.",
    // "Employee Attendance Data Management Tool: Led the development of a data management platform for 50,000+ employees. Integrated data sources into a unified SQL database using Python. Developed backend microservices and APIs using Node.js and Python to support a React-based frontend. Implemented agentic AI for predictive analytics and anomaly detection in attendance patterns. Integrated a chatbot assistant using RAG (Retrieval-Augmented Generation) with OpenAI to answer HR queries related to attendance and leave policies. Reduced data retrieval time by 80% and enhanced decision-making accuracy by 90%.",
    // "Talent Acquisition Dashboard & Data Lake Development: Developed a comprehensive dashboard and centralized data lake. Integrated data from Oracle Fusion, HRMS, and Tydy using API and SQL. Achieved 97% data accuracy, facilitating informed decision-making and improving reporting efficiency by 90%. Implemented robust data security measures with an admin portal for access control. Utilized technologies like React, Django, and Docker to ensure high performance and scalability. Enhanced data security by 97%. Leveraged generative AI to automate candidate profiling, resume parsing, and intelligent matching: - Used OpenAI GPT-4 to analyze and categorize candidate profiles based on skills and experience. - Implemented resume parsing algorithms using NLP techniques (e.g., NER, section classification, skill extraction) to convert unstructured resumes into structured data. - Applied semantic similarity and rule-based filters to match candidates with job requirements. - Developed intelligent ranking models to prioritize best-fit candidates based on historical hiring patterns and recruiter feedback. Built a recruiter assistant chatbot using OpenAI API and LangChain Agents to provide real-time access. The chatbot acts as a conversational interface for recruiters to: - Retrieve real-time hiring metrics such as open requisitions and candidate pipeline status. - Summarize candidate profiles and interview feedback using LLM-based summarization. - Automate repetitive queries and trigger workflows like interview scheduling or status updates. This significantly reduces manual dashboard navigation and enhances recruiter productivity through natural language interaction.",
    // "IT Infrastructure Management: IAM Roles Management: Managed IAM roles and optimized ESXI licenses, resulting in 30% cost savings and improved resource utilization. Infrastructure as Code (IaC): Designed and implemented IaC solutions using Terraform, ensuring consistent environment provisioning and compliance with security standards, reducing deployment times by 30%."
     ],
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/AdaniGroupWE.md",
    },
    {
      title: "Software Development Engineer (Backend Engineer)",
      company_name: "Adani Group",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adani_logo_2012.svg/1280px-Adani_logo_2012.svg.png",
      iconBg: "#383E56",
      date: "January 2023 - October 2023",
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/AdaniInternWE.md",
      points: [
        "Adani Digital labs Private Limited",
        "Adani One Applictaion",
        "Food and Beverages Line of Business (LOB)",
        "Forex LOB and Mutual Fund Application",
        "SonarQube Setup",
        "Performance Monitoring (Grafana)",
      ],
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/AdaniInternWE.md",
    },
    {
      title: "Web Developer and DSA Mentor",
      company_name: "Pepcoding Education Private Limited (Scaler)",
      icon: "https://pbs.twimg.com/profile_images/1487293863639195648/zVkOw31F_400x400.jpg",
      iconBg: "#E6DEDD",
      date: "February 2022 - August 2022",
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/PepcodingWE.md",
      points: [
        "Worked on the Nados web app and contributed to the Integrated Development Environment (IDE) module using React.js.",
        "Teaching Assistant : Teaching Assistant for online batches of Data Structures, Algorithms, and Competitive Programming, with an average rating of 4.9.",
        "Responsible for reviewing and writing articles based on Data Structures and Algorithms.",
      ],
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/PepcodingWE.md",
    },
    {
      title: "Mentor",
      company_name: "Self Employed",
      icon: 'mukesh logo.png',
      iconBg: "#383E56",
      date: "July 2019 - March 2022",
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/MentorE.md",
      points: [
        "Mentored more than 500 students",
        "Subject: Maths, Physics, Chemistry"
      ],
      link: "https://github.com/mukeshdani/Work-Experience-Showcase/blob/main/MentorE.md",
    }
  ];
  
  const educations = [
    {
      degree: "Bachelor of Technology",
      branch:
        "Computer Science and Engineering",
      marks:
        "CGPA: 9.70/10",
      name: "Maharaja Surajmal Institute of Technology (GGSIPU), New Delhi",
      year: "(2019 - 2023)",
      image: "https://www.msit.in/static/img/msit.png",
    },
    {
      degree:
        "12th Grade",
      branch : "Science",
      marks:
        "Percentage: 89%",
      name: "MP Hindu Inter College, Ramnagar, Nainital, Uttarakhand",
      year: "(2018)",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTkll-mewD2cG4CjO1Locz_00FyvrnXceHlg&s",
    },
    {
      degree:
        "10th Grade",
      branch: "SSC",
      marks:"Percentage : 85%",
      name: "MP Hindu Inter College, Ramnagar, Nainital, Uttarakhand",
      year: "(2016)",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTkll-mewD2cG4CjO1Locz_00FyvrnXceHlg&s",
    },
  ];
  
  export { list, profiles, technologies, experiences, educations, achievements };
