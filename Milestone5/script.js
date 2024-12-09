// Get reference to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link-element');
var downloadPdfButton = document.getElementById('download-pdf-button');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form reload
    // Collect input values
    // for personal information
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var fName = document.getElementById('father name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    // for education
    var degree = document.getElementById('degree').value;
    var field = document.getElementById('major').value;
    var university = document.getElementById('institution').value;
    var years = document.getElementById('year').value;
    var cgpa = document.getElementById('cgpa').value;
    // for experience
    var job = document.getElementById('job-title').value;
    var company = document.getElementById('company').value;
    var duration = document.getElementById('duration').value;
    var responsibilities = document.getElementById('key').value.split('\n');
    // for skills
    var skills = document.getElementById('skills').value.split('\n');
    // for profile picture
    var profilePicInput = document.getElementById('profile-pic');
    var file = profilePicInput.files ? profilePicInput.files[0] : null;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        fName: fName,
        email: email,
        phone: phone,
        degree: degree,
        field: field,
        university: university,
        years: years,
        cgpa: cgpa,
        job: job,
        company: company,
        duration: duration,
        responsibilities: responsibilities,
        skills: skills,
        profilePicInput: profilePicInput,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    var profilePicURL = '';
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume();
        };
        reader.readAsDataURL(file);
    }
    else {
        generateResume(); // If no picture is uploaded
    }
    function generateResume() {
        // generate the resume content dynamically
        var resumeHTML = "\n    <div class=\"resume-section\">\n        <h2 class=\"resume-heading\">Editable Resume</h2>\n        ".concat(profilePicURL ? "<img src=\"".concat(profilePicURL, "\" alt=\"Profile Picture\" class=\"profile-pic\" />") : '', "\n        <div class=\"resume-content\">\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Personal Information</h3>\n                <p><strong>Name:</strong><span contenteditable=\"true\"> ").concat(name, "</span></p>\n                <p><strong>Father Name:</strong><span contenteditable=\"true\"> ").concat(fName, "</span></p>\n                <p><strong>Email:</strong><span contenteditable=\"true\"> ").concat(email, "</span></p>\n                <p><strong>Phone:</strong><span contenteditable=\"true\"> ").concat(phone, "</span></p>\n            </div>\n\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Education</h3>\n                <p><strong>Degree:</strong><span contenteditable=\"true\"> ").concat(degree, "</span></p>\n                <p><strong>Major/Field of Study:</strong><span contenteditable=\"true\"> ").concat(field, "</span></p>\n                <p><strong>University:</strong><span contenteditable=\"true\"> ").concat(university, "</span></p>\n                <p><strong>Years Attended:</strong><span contenteditable=\"true\"> ").concat(years, "</span></p>\n                <p><strong>CGPA:</strong><span contenteditable=\"true\"> ").concat(cgpa, "</span></p>\n            </div>\n\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Experience</h3>\n                <p><strong>Job Title:</strong><span contenteditable=\"true\"> ").concat(job, "</span></p>\n                <p><strong>Company Name:</strong><span contenteditable=\"true\"> ").concat(company, "</span></p>\n                <p><strong>Duration of Work:</strong><span contenteditable=\"true\"> ").concat(duration, "</span></p>\n                <strong>Key Responsibilities:</strong>\n                <ul class=\"responsibilities-list\"><span contenteditable=\"true\">\n                    ").concat(responsibilities.map(function (res) { return "<li>".concat(res, "</li>"); }).join(''), "</span>\n                </ul>\n            </div>\n\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Skills</h3>\n                <ul class=\"skills-list\"><span contenteditable=\"true\">\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</span>\n                </ul>\n            </div>\n        </div>\n    </div>\n    ");
        // Display Generated Resume
        resumeDisplayElement.innerHTML = resumeHTML;
        // Generate a shareable URL with the username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
        downloadPdfButton.style.display = 'block';
        // Handle PDF download
        downloadPdfButton.addEventListener('click', function () {
            window.print(); // This will open the print dialog and allow the user to save as PDF
        });
    }
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('father-name').value = resumeData.fName;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('degree').value = resumeData.degree;
            document.getElementById('major').value = resumeData.field;
            document.getElementById('institution').value = resumeData.university;
            document.getElementById('year').value = resumeData.years;
            document.getElementById('cgpa').value = resumeData.cgpa;
            document.getElementById('job-title').value = resumeData.job;
            document.getElementById('company').value = resumeData.company;
            document.getElementById('duration').value = resumeData.duration;
            document.getElementById('key').value = resumeData.responsibilities.join('\n');
            document.getElementById('skills').value = resumeData.skills.join('\n');
        }
    }
});
