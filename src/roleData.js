export const roleData = {
  "Frontend Developer": {
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design",
      "REST API"
    ],
    description:
      "We are looking for a Frontend Developer who can build responsive and user-friendly web applications using HTML, CSS, JavaScript, and React. The candidate should understand reusable components, REST APIs, Git version control, and responsive web design.",
    roadmap: [
      "Revise HTML, CSS, and JavaScript fundamentals.",
      "Learn React components, props, state, and hooks.",
      "Practise REST API integration.",
      "Learn Git and GitHub workflows.",
      "Build and deploy a responsive React project."
    ]
  },

  "Backend Developer": {
    skills: [
      "Node.js",
      "Express",
      "SQL",
      "REST API",
      "Authentication",
      "Git"
    ],
    description:
      "We are looking for a Backend Developer who can develop server-side applications, create REST APIs, work with SQL databases, implement authentication, and maintain reliable application logic.",
    roadmap: [
      "Learn server-side programming fundamentals.",
      "Practise Node.js and Express.",
      "Learn SQL queries and database design.",
      "Build REST APIs and authentication.",
      "Create a backend project and test its APIs."
    ]
  },

  "Full Stack Developer": {
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "SQL",
      "Git"
    ],
    description:
      "We are looking for a Full Stack Developer who can develop responsive frontend interfaces, create backend APIs, integrate databases, and build complete web applications.",
    roadmap: [
      "Strengthen HTML, CSS, and JavaScript.",
      "Build interfaces with React.",
      "Learn Node.js and Express.",
      "Practise SQL and API integration.",
      "Build and deploy a complete web application."
    ]
  },

  "Java Developer": {
    skills: [
      "Java",
      "OOP",
      "SQL",
      "Data Structures",
      "REST API",
      "Git"
    ],
    description:
      "We are looking for a Java Developer with knowledge of object-oriented programming, data structures, SQL databases, REST APIs, and software development practices.",
    roadmap: [
      "Revise Java fundamentals and OOP.",
      "Practise data structures and algorithms.",
      "Learn SQL and database connectivity.",
      "Develop REST APIs.",
      "Build a Java application and practise testing."
    ]
  },

  "Data Analyst": {
    skills: [
      "SQL",
      "Excel",
      "Python",
      "Data Visualization",
      "Statistics",
      "Power BI"
    ],
    description:
      "We are looking for a Data Analyst who can query databases, clean datasets, analyse trends, create visual reports, and communicate data-driven insights.",
    roadmap: [
      "Learn SQL queries and joins.",
      "Practise Excel data analysis.",
      "Learn basic statistics.",
      "Practise data visualization using Power BI.",
      "Complete a data analysis project."
    ]
  },

  "Data Scientist": {
    skills: [
      "Python",
      "SQL",
      "Statistics",
      "Machine Learning",
      "Pandas",
      "Data Visualization"
    ],
    description:
      "We are looking for a Data Scientist who can analyse datasets, apply statistical methods, develop machine learning models, and communicate insights using data visualization.",
    roadmap: [
      "Learn Python and Pandas.",
      "Study statistics and probability.",
      "Practise data cleaning and visualization.",
      "Learn machine learning fundamentals.",
      "Build an end-to-end machine learning project."
    ]
  }
};

export function analyzeSkills(userSkills, jobRole) {
  const role = roleData[jobRole];

  if (!role) {
    return null;
  }

  const normalize = (skill) => skill.trim().toLowerCase();

  const enteredSkills = userSkills
    .split(",")
    .map(normalize)
    .filter(Boolean);

  const requiredSkills = role.skills;

  const matchedSkills = requiredSkills.filter((required) =>
    enteredSkills.includes(normalize(required))
  );

  const missingSkills = requiredSkills.filter(
    (required) => !enteredSkills.includes(normalize(required))
  );

  const matchPercentage = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  return {
    requiredSkills,
    matchedSkills,
    missingSkills,
    matchPercentage,
    description: role.description,
    roadmap: role.roadmap
  };
}


