// Get reference to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form reload
    // Collect input values
    // for personal information
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
        var resumeHTML = "\n    <div class=\"resume-section\">\n        <h2 class=\"resume-heading\">Resume</h2>\n        ".concat(profilePicURL ? "<img src=\"".concat(profilePicURL, "\" alt=\"Profile Picture\" class=\"profile-pic\" />") : '', "\n        <div class=\"resume-content\">\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Personal Information</h3>\n                <p><strong>Name:</strong> ").concat(name, "</p>\n                <p><strong>Father Name:</strong> ").concat(fName, "</p>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(phone, "</p>\n            </div>\n\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Education</h3>\n                <p><strong>Degree:</strong> ").concat(degree, "</p>\n                <p><strong>Major/Field of Study:</strong> ").concat(field, "</p>\n                <p><strong>University:</strong> ").concat(university, "</p>\n                <p><strong>Years Attended:</strong> ").concat(years, "</p>\n                <p><strong>CGPA:</strong> ").concat(cgpa, "</p>\n            </div>\n\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Experience</h3>\n                <p><strong>Job Title:</strong> ").concat(job, "</p>\n                <p><strong>Company Name:</strong> ").concat(company, "</p>\n                <p><strong>Duration of Work:</strong> ").concat(duration, "</p>\n                <strong>Key Responsibilities:</strong>\n                <ul class=\"responsibilities-list\">\n                    ").concat(responsibilities.map(function (res) { return "<li>".concat(res, "</li>"); }).join(''), "\n                </ul>\n            </div>\n\n            <div class=\"section\">\n                <h3 class=\"section-heading\">Skills</h3>\n                <ul class=\"skills-list\">\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </div>\n        </div>\n    </div>\n    ");
        // Display Generated Resume
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
        }
        else {
            console.error('The Resume Display Element is Missing.');
        }
    }
});
