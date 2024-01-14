import {
    javascript,html,css,reactjs,tailwind,nodejs,mongodb,git,threejs,
    java,
    excel_clone,
    Drum_Kit,
    port_3d, jsp, coding_g, sorting, react1,tim_dog,online_eductaion,music_web,game,web_dev
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
      id: "dev Interview",
      title: "Dev Interview",
    }
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
  
  const experiences = [
    {
      title: "Software Devloper",
      company_name: "Adani Group",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adani_logo_2012.svg/1280px-Adani_logo_2012.svg.png",
      iconBg: "#383E56",
      date: "October 2023 - Present",
      link: "https://www.adani.com/",
      points: [],
      link: "https://www.adani.com/",
    },
    {
      title: "Software Development Engineer (Backend Engineer)",
      company_name: "Adani Group",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adani_logo_2012.svg/1280px-Adani_logo_2012.svg.png",
      iconBg: "#383E56",
      date: "Janvary 2023 - October 2023",
      link: "https://www.adanione.com/",
      points: [
        "Adani Digital labs Private Limited",
        "Integrated the Food and Beverages line of business into the order management system for the Adani One application, optimizing processes and ensuring seamless operations",
        "Integrated webhooks into the Forex line of business in the order management system for Merchant (Ebix), Merchant Fulfillment, and Cancellation, enabling real-time updates and notifications for both merchants and end-users",
        "Redefined the structure of APIs in the Forex module of the Adani One application, enhancing efficiency and scalability",
        "Worked on user onboarding and validated their data using Nest.js, ensuring a smooth and efficient registration experience for mutual fund application",
        "Redefined and optimized APIs for UCC, FATCA, lump-sum, and redemption",
        "Set up unit testing for all lines of businesses and the order level using Jest",
        "Wrote unit testing scripts for the Food and Beverages line of business",
        "Set up SonarQube for the order level, which integrates different lines of business",
        "Used SonarCube to identify and fix bugs, vulnerabilities, code smells, and security bugs, optimizing the system",
        "Monitored logs and performance using Grafana",
         "Developed expertise in technologies such as Prisma, Redis, MongoDB, Nest.js, Rx.js, and TypeScript"
      ],
      link: "https://www.adanione.com/",
    },
    {
      title: "Web Developer and DSA Mentor",
      company_name: "Pepcoding Education Private Limited (Scaler)",
      icon: "https://pbs.twimg.com/profile_images/1487293863639195648/zVkOw31F_400x400.jpg",
      iconBg: "#E6DEDD",
      date: "February 2022 - August 2022",
      link: "https://pepcoding.com/",
      points: [
        "Worked on the Nados web app , also in Integrated Development Environment module using react.js",
        "Teaching Assistant : Teaching Assistant for online batches of Data Structures, Algorithms, and Competitive programming with an average rating of 4.9*.",
        "Responsible for reviewing and writing articles based on Data Structures and Algorithms.",
      ],
      link: "https://pepcoding.com/",
    },
    {
      title: "Mentor",
      company_name: "Self Employed",
      icon: "https://pbs.twimg.com/profile_images/1487293863639195648/zVkOw31F_400x400.jpg",
      iconBg: "#383E56",
      date: "July 2019 - March 2022",
      link: "",
      points: [
        "Mentoring more then 500+ students",
        "Subject: Maths, Physic's, Chemsitry"
      ],
      link: "#",
    }
  ];
  
  const educations = [
    {
      degree: "Bachelor of Engineering",
      branch:
        "Computer Science & Engineering",
      marks:
        "CGPA : 9.70 / 10",
      name: "Maharaja Surajmal Institute of Technology (GGSIPU), New Delhi",
      year: "(2019 - 2023)",
      image: "https://www.msit.in/static/img/msit.png",
    },
    {
      degree:
        "12th Grade",
      branch : "Science",
      marks:
        "Percentage : 89 %",
      name: "MP. Hindu Inter College Ramnagar Nainital Uttarakhand",
      year: "2018",
      image: "data:image/jpeg;base64,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",
    },
    {
      degree:
        "10th Grade",
      branch: "SSC",
      marks:
        "Percentage : 85 %",
      name: "MP. Hindu Inter College Ramnagar Nainital Uttarakhand",
      year: "2016",
      image: "data:image/jpeg;base64,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",
    },
  ];
  
  export { list, profiles, technologies, experiences, educations, achievements };
