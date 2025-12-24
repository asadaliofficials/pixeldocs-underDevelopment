export const templates = [
	{
		id: 'blank',
		lable: 'Blank Document',
		imageUrl: '/blank-document.svg',
		initialContent: '',
	},
	{
		id: 'software-proposal',
		lable: 'Software Development Proposal',
		imageUrl: '/software-proposal.svg',
		initialContent: `
			<h1>Software Development Proposal</h1>
			<h2>1. Executive Summary</h2>
			<p>Provide a brief overview of the proposed software solution, its purpose, and the key benefits it will deliver to the client.</p>
			
			<h2>2. Project Scope</h2>
			<p>Detailed description of the work to be performed.</p>
			<ul>
				<li><strong>Feature 1:</strong> Description of feature.</li>
				<li><strong>Feature 2:</strong> Description of feature.</li>
				<li><strong>Feature 3:</strong> Description of feature.</li>
			</ul>

			<h2>3. Technology Stack</h2>
			<p>This project will utilize the following technologies:</p>
			<ul>
				<li>Frontend: React, Next.js, Tailwind CSS</li>
				<li>Backend: Node.js, Express (or similar)</li>
				<li>Database: PostgreSQL / MongoDB</li>
			</ul>

			<h2>4. Timeline</h2>
			<table>
				<tr>
					<th>Phase</th>
					<th>Description</th>
					<th>Duration</th>
				</tr>
				<tr>
					<td>Planning</td>
					<td>Requirements gathering and design</td>
					<td>2 Weeks</td>
				</tr>
				<tr>
					<td>Development</td>
					<td>Implementation of core features</td>
					<td>6 Weeks</td>
				</tr>
				<tr>
					<td>Testing</td>
					<td>QA and bug fixing</td>
					<td>2 Weeks</td>
				</tr>
				<tr>
					<td>Deployment</td>
					<td>Launch and handover</td>
					<td>1 Week</td>
				</tr>
			</table>

			<h2>5. Budget</h2>
			<p>Total estimated cost: $XX,XXX</p>
		`,
	},
	{
		id: 'project-proposal',
		lable: 'Project Proposal',
		imageUrl: '/project-proposal.svg',
		initialContent: `
			<h1>Project Proposal</h1>
			<h2>Introduction</h2>
			<p>State the problem or opportunity that this project addresses. Explain why this project is necessary.</p>

			<h2>Objectives</h2>
			<p>List the specific goals that the project aims to achieve.</p>
			<ul>
				<li>Goal 1</li>
				<li>Goal 2</li>
				<li>Goal 3</li>
			</ul>

			<h2>Methodology</h2>
			<p>Describe the approach or methods that will be used to accomplish the project objectives.</p>

			<h2>Resources Required</h2>
			<p>List the personnel, equipment, and budget needed to complete the project.</p>

			<h2>Expected Outcomes</h2>
			<p>Describe the deliverables and the impact of the project upon completion.</p>
		`,
	},
	{
		id: 'business-letter',
		lable: 'Business Letter',
		imageUrl: '/business-letter.svg',
		initialContent: `
			<p><strong>Your Name</strong><br>
			Your Job Title<br>
			Your Company<br>
			Your Address<br>
			City, State, Zip Code<br>
			Your Email<br>
			Your Phone Number</p>

			<p>Date: [Date]</p>

			<p><strong>Recipient Name</strong><br>
			Recipient Job Title<br>
			Recipient Company<br>
			Recipient Address<br>
			City, State, Zip Code</p>

			<p>Dear [Recipient Name],</p>

			<p>I am writing to you regarding [Subject of the letter].</p>

			<p>[Body Paragraph 1: Introduction and purpose of the letter]</p>

			<p>[Body Paragraph 2: Details and main points]</p>

			<p>[Body Paragraph 3: Call to action or next steps]</p>

			<p>Sincerely,</p>

			<p>[Your Signature]</p>
			<p>Your Name</p>
		`,
	},
	{
		id: 'resume',
		lable: 'Resume',
		imageUrl: '/resume.svg',
		initialContent: `
			<h1>[Your Name]</h1>
			<p>[Your Address] | [Your Phone Number] | [Your Email] | [LinkedIn Profile]</p>

			<h2>Professional Summary</h2>
			<p>A brief summary of your skills and experience.</p>

			<h2>Experience</h2>
			<h3>[Job Title]</h3>
			<p><strong>[Company Name]</strong> | [Dates of Employment]</p>
			<ul>
				<li>Responsibility or achievement 1</li>
				<li>Responsibility or achievement 2</li>
				<li>Responsibility or achievement 3</li>
			</ul>

			<h3>[Previous Job Title]</h3>
			<p><strong>[Previous Company Name]</strong> | [Dates of Employment]</p>
			<ul>
				<li>Responsibility or achievement 1</li>
				<li>Responsibility or achievement 2</li>
			</ul>

			<h2>Education</h2>
			<h3>[Degree Earned]</h3>
			<p><strong>[University Name]</strong> | [Graduation Year]</p>

			<h2>Skills</h2>
			<ul>
				<li>Skill 1</li>
				<li>Skill 2</li>
				<li>Skill 3</li>
				<li>Skill 4</li>
			</ul>
		`,
	},
	{
		id: 'cover-letter',
		lable: 'Cover Letter',
		imageUrl: '/cover-letter.svg',
		initialContent: `
			<p>[Your Name]<br>
			[Your Address]<br>
			[City, State, Zip Code]<br>
			[Your Email]<br>
			[Your Phone Number]</p>

			<p>[Date]</p>

			<p>[Hiring Manager's Name]<br>
			[Company Name]<br>
			[Company Address]</p>

			<p>Dear [Hiring Manager's Name],</p>

			<p>I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [Where you found the job posting]. With my background in [Your Field/Area of Expertise], I am confident in my ability to contribute effectively to your team.</p>

			<p>In my previous role at [Previous Company], I [mention a key achievement or responsibility relevant to the new job]. This experience has prepared me to [mention how you will help the new company].</p>

			<p>I am particularly drawn to [Company Name] because [mention something specific you admire about the company]. I am eager to bring my skills in [Skill 1] and [Skill 2] to your organization.</p>

			<p>Thank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you.</p>

			<p>Sincerely,</p>

			<p>[Your Name]</p>
		`,
	},
	{
		id: 'letter',
		lable: 'Letter',
		imageUrl: '/letter.svg',
		initialContent: `
			<p>[Your Name]<br>
			[Your Address]<br>
			[City, State, Zip Code]</p>

			<p>[Date]</p>

			<p>[Recipient Name]<br>
			[Recipient Address]<br>
			[City, State, Zip Code]</p>

			<p>Dear [Recipient Name],</p>

			<p>[Opening paragraph: State the reason for writing.]</p>

			<p>[Body paragraph(s): Provide details, explanation, or arguments supporting your purpose.]</p>

			<p>[Closing paragraph: Summarize your main point and state any expected action.]</p>

			<p>Sincerely,</p>

			<p>[Your Name]</p>
		`,
	},
];
