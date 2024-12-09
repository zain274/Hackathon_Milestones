// Get reference to the form and display area

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;

// Handle form submission
form.addEventListener('submit' , (event: Event) => {
    event.preventDefault(); // Prevent form reload

    // Collect input values
    // for personal information
    const name = (document.getElementById('name') as HTMLInputElement).value
    const fName = (document.getElementById('father name') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const phone = (document.getElementById('phone') as HTMLInputElement).value
    
    // for education
    const degree = (document.getElementById('degree') as HTMLInputElement).value
    const field = (document.getElementById('major') as HTMLInputElement).value
    const university = (document.getElementById('institution') as HTMLInputElement).value
    const years = (document.getElementById('year') as HTMLInputElement).value
    const cgpa = (document.getElementById('cgpa') as HTMLInputElement).value

    // for experience
    const job = (document.getElementById('job-title') as HTMLInputElement).value
    const company = (document.getElementById('company') as HTMLInputElement).value
    const duration = (document.getElementById('duration') as HTMLInputElement).value
    const responsibilities = (document.getElementById('key') as HTMLInputElement).value.split('\n')

    // for skills
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split('\n')

    // for profile picture
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    const file = profilePicInput.files ? profilePicInput.files[0] : null;

    let profilePicURL = '';
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePicURL = e.target?.result as string;
            generateResume();
        };
        reader.readAsDataURL(file);
    } else {
        generateResume(); // If no picture is uploaded
    }

    function generateResume() {

    // generate the resume content dynamically
    const resumeHTML = `
    <div class="resume-section">
        <h2 class="resume-heading">Resume</h2>
        ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" class="profile-pic" />` : ''}
        <div class="resume-content">
            <div class="section">
                <h3 class="section-heading">Personal Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Father Name:</strong> ${fName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
            </div>

            <div class="section">
                <h3 class="section-heading">Education</h3>
                <p><strong>Degree:</strong> ${degree}</p>
                <p><strong>Major/Field of Study:</strong> ${field}</p>
                <p><strong>University:</strong> ${university}</p>
                <p><strong>Years Attended:</strong> ${years}</p>
                <p><strong>CGPA:</strong> ${cgpa}</p>
            </div>

            <div class="section">
                <h3 class="section-heading">Experience</h3>
                <p><strong>Job Title:</strong> ${job}</p>
                <p><strong>Company Name:</strong> ${company}</p>
                <p><strong>Duration of Work:</strong> ${duration}</p>
                <strong>Key Responsibilities:</strong>
                <ul class="responsibilities-list">
                    ${responsibilities.map(res => `<li>${res}</li>`).join('')}
                </ul>
            </div>

            <div class="section">
                <h3 class="section-heading">Skills</h3>
                <ul class="skills-list">
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
    `;

    // Display Generated Resume

    if(resumeDisplayElement){
        resumeDisplayElement.innerHTML = resumeHTML;
    }else {
        console.error('The Resume Display Element is Missing.');
    }
    }

});