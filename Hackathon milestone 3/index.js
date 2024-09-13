document.getElementById('resumeForm').addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // Prevent the form from submitting
    // Retrieve form values
    var resumeData = {
        fname: document.getElementById('fname').value,
        contact: document.getElementById('contact').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        field: document.getElementById('field').value,
        institute: document.getElementById('institute').value,
        year: document.getElementById('year').value,
        job: document.getElementById('job').value,
        comp: document.getElementById('comp').value,
        sdate: document.getElementById('sdate').value,
        edate: document.getElementById('edate').value,
        skill: document.getElementById('skill').value,
        objective: document.getElementById('objective').value,
        profilePicUrl: null,
    };
    // Get the file input and read the file
    var profilePicInput = document.getElementById('profile-pic');
    var file = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var reader = new FileReader();
    if (file) {
        reader.onload = function (event) {
            var _a;
            resumeData.profilePicUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            displayResume(resumeData);
        };
        reader.readAsDataURL(file);
    }
    else {
        displayResume(resumeData);
    }
});
function displayResume(data) {
    var resumeDiv = document.getElementById('resume');
    resumeDiv.innerHTML = "\n        <div class=\"left-section\">\n            <div class=\"profile\">\n                ".concat(data.profilePicUrl ? "<img src=\"".concat(data.profilePicUrl, "\" alt=\"Profile Picture\">") : '', "\n                <h2>").concat(data.fname, "</h2>\n                <p class=\"about_p\">").concat(data.objective, "</p>\n            </div>\n            <section>\n                <h3>Contact Information</h3>\n                <ul>\n                    <li><i class=\"fa-solid fa-phone\"></i> ").concat(data.contact, "</li>\n                    <li><i class=\"fa-solid fa-envelope\"></i> ").concat(data.email, "</li>\n                    <li><i class=\"fa-solid fa-map-marker-alt\"></i> ").concat(data.address, "</li>\n                </ul>\n            </section>\n            <section>\n                <h3>Skills</h3>\n                <ul>\n                    <li>").concat(data.skill, "</li>\n                </ul>\n            </section>\n        </div>\n        <div class=\"right-section\">\n            <section>\n                <h3>Education</h3>\n                <ul>\n                    <li>").concat(data.field, " from ").concat(data.institute, " (").concat(data.year, ")</li>\n                </ul>\n            </section>\n            <section>\n                <h3>Experience</h3>\n                <ul>\n                    <li>").concat(data.job, " at ").concat(data.comp, " (").concat(data.sdate, " - ").concat(data.edate, ")</li>\n                </ul>\n            </section>\n        </div>\n    ");
}
