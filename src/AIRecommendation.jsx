
import React, { useState } from "react";

// Job roles, required skills, descriptions and roadmaps
const roleData = {
  "Frontend Developer": {
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design",
      "REST API",
    ],
    description:
      "We are looking for a Frontend Developer with knowledge of HTML, CSS, JavaScript, React, responsive web design, REST APIs, and Git. The candidate should be able to build responsive user interfaces and reusable components.",
    roadmap: [
      "Revise HTML, CSS and JavaScript fundamentals.",
      "Learn React components, props, state and hooks.",
      "Practise REST API integration.",
      "Learn Git and GitHub.",
      "Build and deploy a responsive React project.",
    ],
  },

  "iOS Developer": {
    skills: [
      "Swift",
      "SwiftUI",
      "Xcode",
      "REST API",
      "Git",
      "Debugging",
    ],
    description:
      "We are looking for an iOS Developer familiar with Swift, SwiftUI, Xcode, REST API integration, Git, and debugging. The candidate should understand iOS application development and user interface design.",
    roadmap: [
      "Learn Swift programming fundamentals.",
      "Practise SwiftUI layouts and components.",
      "Build an iOS application in Xcode.",
      "Learn API integration and error handling.",
      "Test and improve the application.",
    ],
  },

  "Developer Advocate": {
    skills: [
      "JavaScript",
      "Python",
      "REST API",
      "Git",
      "Technical Writing",
      "Communication",
    ],
    description:
      "We are looking for a Developer Advocate who can explain developer tools, create technical tutorials, demonstrate APIs, write documentation, and communicate effectively with developer communities.",
    roadmap: [
      "Strengthen programming fundamentals.",
      "Practise using and explaining REST APIs.",
      "Write technical tutorials and documentation.",
      "Build sample projects and demos.",
      "Practise technical presentations and communication.",
    ],
  },

  "Android Developer": {
    skills: [
      "Java",
      "Kotlin",
      "Android Studio",
      "REST API",
      "Git",
      "SQLite",
    ],
    description:
      "We are looking for an Android Developer with knowledge of Java or Kotlin, Android Studio, REST API integration, local databases, and Git. The candidate should be able to build and test Android applications.",
    roadmap: [
      "Learn Java or Kotlin fundamentals.",
      "Understand Android Studio and application structure.",
      "Build Android layouts and navigation.",
      "Practise REST API and database integration.",
      "Build and test an Android application.",
    ],
  },

  "Data Analyst": {
    skills: [
      "SQL",
      "Excel",
      "Python",
      "Pandas",
      "Statistics",
      "Power BI",
      "Data Visualization",
    ],
    description:
      "We are looking for a Data Analyst who can use SQL, Excel, Python, and data visualization tools to clean datasets, analyse trends, prepare reports, and communicate data-driven insights.",
    roadmap: [
      "Learn SQL queries, joins and aggregations.",
      "Practise Excel data analysis.",
      "Learn basic statistics and Python Pandas.",
      "Create dashboards using Power BI.",
      "Complete a data analysis project.",
    ],
  },

  "Data Scientist": {
    skills: [
      "Python",
      "SQL",
      "Statistics",
      "Machine Learning",
      "Pandas",
      "Data Visualization",
    ],
    description:
      "We are looking for a Data Scientist who can analyse datasets, apply statistics, develop machine learning models, and communicate findings through data visualization.",
    roadmap: [
      "Strengthen Python and Pandas.",
      "Study probability and statistics.",
      "Practise data cleaning and visualization.",
      "Learn machine learning fundamentals.",
      "Build an end-to-end machine learning project.",
    ],
  },

  "Backend Developer": {
    skills: [
      "Node.js",
      "Express",
      "SQL",
      "REST API",
      "Authentication",
      "Git",
    ],
    description:
      "We are looking for a Backend Developer who can build server-side applications, develop REST APIs, work with SQL databases, implement authentication, and maintain application logic.",
    roadmap: [
      "Learn server-side programming fundamentals.",
      "Practise Node.js and Express.",
      "Learn SQL and database design.",
      "Build and test REST APIs.",
      "Create a backend project.",
    ],
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
      "Git",
    ],
    description:
      "We are looking for a Full Stack Developer who can develop frontend interfaces, build backend APIs, integrate databases, and create complete web applications.",
    roadmap: [
      "Strengthen HTML, CSS and JavaScript.",
      "Build interfaces using React.",
      "Learn Node.js and Express.",
      "Practise SQL and API integration.",
      "Build and deploy a complete web application.",
    ],
  },

  "Java Developer": {
    skills: [
      "Java",
      "OOP",
      "SQL",
      "Data Structures",
      "REST API",
      "Git",
    ],
    description:
      "We are looking for a Java Developer with knowledge of Java, object-oriented programming, data structures, SQL, REST APIs, and Git.",
    roadmap: [
      "Revise Java and object-oriented programming.",
      "Practise data structures and algorithms.",
      "Learn SQL and database connectivity.",
      "Build REST APIs.",
      "Create a Java application.",
    ],
  },
};

// Normalize common skill names
function normalizeSkill(skill) {
  const value = skill
    .toLowerCase()
    .trim()
    .replace(/[.]/g, "")
    .replace(/\s+/g, " ");

  const aliases = {
    js: "javascript",
    "react js": "react",
    reactjs: "react",
    "node js": "nodejs",
    "node.js": "nodejs",
    "express.js": "express",
    "restful api": "rest api",
    "rest apis": "rest api",
    "structured query language": "sql",
    "cascading style sheets": "css",
    "hypertext markup language": "html",
    "communication skills": "communication",
    "technical communication": "communication",
    "responsive web design": "responsive design",
    "data visualisation": "data visualization",
    "object oriented programming": "oop",
    "object-oriented programming": "oop",
  };

  return aliases[value] || value;
}

// Local skill analysis: works even if Gemini is unavailable
function analyzeSkills(skillsText, jobRole) {
  const role = roleData[jobRole];

  const userSkills = skillsText
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const normalizedUserSkills = userSkills.map(normalizeSkill);

  const matchedSkills = role.skills.filter((requiredSkill) =>
    normalizedUserSkills.includes(normalizeSkill(requiredSkill))
  );

  const missingSkills = role.skills.filter(
    (requiredSkill) =>
      !normalizedUserSkills.includes(normalizeSkill(requiredSkill))
  );

  const matchPercentage =
    role.skills.length > 0
      ? Math.round((matchedSkills.length / role.skills.length) * 100)
      : 0;

  return {
    requiredSkills: role.skills,
    matchedSkills,
    missingSkills,
    matchPercentage,
    description: role.description,
    roadmap: role.roadmap,
  };
}

// Fallback recommendation builder
function generateFallback(skillsText, jobRole) {
  const analysis = analyzeSkills(skillsText, jobRole);

  return [
    "LOCAL FALLBACK RECOMMENDATIONS",
    "",
    `Selected Job Role: ${jobRole}`,
    `Skill Match: ${analysis.matchPercentage}%`,
    "",
    `Required Skills: ${analysis.requiredSkills.join(", ")}`,
    "",
    `Matching Skills: ${
      analysis.matchedSkills.length
        ? analysis.matchedSkills.join(", ")
        : "No matching skills found"
    }`,
    "",
    `Missing Skills: ${
      analysis.missingSkills.length
        ? analysis.missingSkills.join(", ")
        : "No missing skills in this checklist"
    }`,
    "",
    "Recommended Learning Roadmap:",
    ...analysis.roadmap.map(
      (step, index) => `${index + 1}. ${step}`
    ),
    "",
    "Note: This is a rule-based estimate, not an actual hiring score.",
  ].join("\n");
}

function AIRecommendation() {
  const [skills, setSkills] = useState(
    "HTML, CSS, JavaScript, React"
  );

  const [jobRole, setJobRole] = useState("Frontend Developer");

  const [jobDescription, setJobDescription] = useState(
    roleData["Frontend Developer"].description
  );

  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const analysis = analyzeSkills(skills, jobRole);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;

    setJobRole(selectedRole);
    setJobDescription(roleData[selectedRole].description);
    setRecommendation("");
    setStatus("");
  };

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation("");
    setStatus("");

    const fallback = generateFallback(skills, jobRole);

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/online-job-portal-7101d/us-central1/getJobRecommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
            jobRole,
            jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.recommendation) {
        setRecommendation(fallback);
        setStatus(
          "Gemini is unavailable. Local fallback recommendations are displayed."
        );
        return;
      }

      setRecommendation(
        `GEMINI AI RECOMMENDATIONS\n\n${data.recommendation}`
      );

      setStatus("Recommendations generated using Gemini AI.");
    } catch (error) {
      console.warn("Backend unavailable; using local fallback:", error);

      setRecommendation(fallback);

      setStatus(
        "Backend connection failed. Local fallback recommendations are displayed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "760px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        color: "#222",
      }}
    >
      <h2>AI Job Recommendation</h2>

      <p>
        Select a job role to view its required skills, job
        description and skill gaps.
      </p>

      <label htmlFor="jobRole">
        <strong>Select Job Role</strong>
      </label>

      <select
        id="jobRole"
        value={jobRole}
        onChange={handleRoleChange}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          margin: "10px 0 20px",
          padding: "12px",
        }}
      >
        {Object.keys(roleData).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <label htmlFor="skills">
        <strong>Your Current Skills</strong>
      </label>

      <textarea
        id="skills"
        value={skills}
        onChange={(event) => setSkills(event.target.value)}
        rows={3}
        placeholder="Example: HTML, CSS, JavaScript"
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          margin: "10px 0 20px",
          padding: "12px",
        }}
      />

      <h3>Required Skills for {jobRole}</h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {analysis.requiredSkills.map((skill) => (
          <span
            key={skill}
            style={{
              padding: "7px 10px",
              backgroundColor: "#e0e7ff",
              borderRadius: "16px",
              fontSize: "14px",
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <label htmlFor="jobDescription">
        <strong>Job Description</strong>
      </label>

      <textarea
        id="jobDescription"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        rows={6}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          margin: "10px 0 20px",
          padding: "12px",
          lineHeight: "1.5",
        }}
      />

      <div
        style={{
          padding: "18px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>Skill Gap Analysis</h3>

        <p>
          <strong>Skill Match:</strong>{" "}
          {analysis.matchPercentage}%
        </p>

        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${analysis.matchPercentage}%`,
              height: "100%",
              backgroundColor: "#16a34a",
              transition: "width 0.3s",
            }}
          />
        </div>

        <h4>Matching Skills</h4>

        <p>
          {analysis.matchedSkills.length
            ? analysis.matchedSkills.join(", ")
            : "No matching skills found yet."}
        </p>

        <h4>Missing Skills to Learn</h4>

        <p>
          {analysis.missingSkills.length
            ? analysis.missingSkills.join(", ")
            : "All checklist skills are matched."}
        </p>

        <h4>Recommended Learning Roadmap</h4>

        <ol>
          {analysis.roadmap.map((step, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <button
        onClick={getRecommendation}
        disabled={loading}
        style={{
          padding: "12px 20px",
          backgroundColor: loading ? "#999" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
        }}
      >
        {loading
          ? "Generating Recommendations..."
          : "Get AI Recommendation"}
      </button>

      {status && (
        <p
          role="status"
          style={{
            marginTop: "16px",
            color: status.startsWith("Recommendations")
              ? "#15803d"
              : "#92400e",
          }}
        >
          {status}
        </p>
      )}

      {recommendation && (
        <div
          style={{
            marginTop: "24px",
            padding: "18px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "10px",
          }}
        >
          <h3>Career Recommendations</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.7",
            }}
          >
            {recommendation}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AIRecommendation;

