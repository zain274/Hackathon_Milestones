// Get reference to the form and display area

const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link-element') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf-button') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit' , (event: Event) => {
    event.preventDefault(); // Prevent form reload

    // Collect input values
    // for personal information
    const username = (document.getElementById('username') as HTMLInputElement).value;
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

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        fName,
        email,
        phone,
        degree,
        field,
        university,
        years,
        cgpa,
        job,
        company,
        duration,
        responsibilities,
        skills,
        profilePicInput,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

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
        <h2 class="resume-heading">Editable Resume</h2>
        ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" class="profile-pic" />` : ''}
        <div class="resume-content">
            <div class="section">
                <h3 class="section-heading">Personal Information</h3>
                <p><strong>Name:</strong><span contenteditable="true"> ${name}</span></p>
                <p><strong>Father Name:</strong><span contenteditable="true"> ${fName}</span></p>
                <p><strong>Email:</strong><span contenteditable="true"> ${email}</span></p>
                <p><strong>Phone:</strong><span contenteditable="true"> ${phone}</span></p>
            </div>

            <div class="section">
                <h3 class="section-heading">Education</h3>
                <p><strong>Degree:</strong><span contenteditable="true"> ${degree}</span></p>
                <p><strong>Major/Field of Study:</strong><span contenteditable="true"> ${field}</span></p>
                <p><strong>University:</strong><span contenteditable="true"> ${university}</span></p>
                <p><strong>Years Attended:</strong><span contenteditable="true"> ${years}</span></p>
                <p><strong>CGPA:</strong><span contenteditable="true"> ${cgpa}</span></p>
            </div>

            <div class="section">
                <h3 class="section-heading">Experience</h3>
                <p><strong>Job Title:</strong><span contenteditable="true"> ${job}</span></p>
                <p><strong>Company Name:</strong><span contenteditable="true"> ${company}</span></p>
                <p><strong>Duration of Work:</strong><span contenteditable="true"> ${duration}</span></p>
                <strong>Key Responsibilities:</strong>
                <ul class="responsibilities-list"><span contenteditable="true">
                    ${responsibilities.map(res => `<li>${res}</li>`).join('')}</span>
                </ul>
            </div>

            <div class="section">
                <h3 class="section-heading">Skills</h3>
                <ul class="skills-list"><span contenteditable="true">
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}</span>
                </ul>
            </div>
        </div>
    </div>
    `;

 // Display Generated Resume
 resumeDisplayElement.innerHTML = resumeHTML;

 // Generate a shareable URL with the username only
 const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

 // Display the shareable link
 shareableLinkContainer.style.display = 'block';
 shareableLinkElement.href = shareableURL;
 shareableLinkElement.textContent = shareableURL;
 downloadPdfButton.style.display = 'block';

 // Handle PDF download
 downloadPdfButton.addEventListener('click', () => {
     window.print(); // This will open the print dialog and allow the user to save as PDF
 });
}
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {
 // Autofill form if data is found in localStorage
 const savedResumeData = localStorage.getItem(username);
 if (savedResumeData) {
     const resumeData = JSON.parse(savedResumeData);
     (document.getElementById('username') as HTMLInputElement).value = username;
     (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
     (document.getElementById('father-name') as HTMLInputElement).value = resumeData.fName;
     (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
     (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
     (document.getElementById('degree') as HTMLTextAreaElement).value = resumeData.degree;
     (document.getElementById('major') as HTMLTextAreaElement).value = resumeData.field;
     (document.getElementById('institution') as HTMLTextAreaElement).value = resumeData.university;
     (document.getElementById('year') as HTMLTextAreaElement).value = resumeData.years;
     (document.getElementById('cgpa') as HTMLTextAreaElement).value = resumeData.cgpa;
     (document.getElementById('job-title') as HTMLTextAreaElement).value = resumeData.job;
     (document.getElementById('company') as HTMLTextAreaElement).value = resumeData.company;
     (document.getElementById('duration') as HTMLTextAreaElement).value = resumeData.duration;
     (document.getElementById('key') as HTMLTextAreaElement).value = resumeData.responsibilities.join('\n');
     (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills.join('\n');
 }
}
});