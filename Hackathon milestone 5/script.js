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
    resumeDiv.innerHTML = "\n        <div class=\"left-section\">\n            <div class=\"profile\">\n                ".concat(data.profilePicUrl ? "<img src=\"".concat(data.profilePicUrl, "\" alt=\"Profile Picture\">") : '', "\n                <h2 contenteditable=\"true\" data-field=\"fname\">").concat(data.fname, "</h2>\n                <p class=\"about_p\" contenteditable=\"true\" data-field=\"objective\">").concat(data.objective, "</p>\n            </div>\n            <section>\n                <h3>Contact Information</h3>\n                <ul>\n                    <li><i class=\"fa-solid fa-phone\"></i> <span contenteditable=\"true\" data-field=\"contact\">").concat(data.contact, "</span></li>\n                    <li><i class=\"fa-solid fa-envelope\"></i> <span contenteditable=\"true\" data-field=\"email\">").concat(data.email, "</span></li>\n                    <li><i class=\"fa-solid fa-map-marker-alt\"></i> <span contenteditable=\"true\" data-field=\"address\">").concat(data.address, "</span></li>\n                </ul>\n            </section>\n            <section>\n                <h3>Skills</h3>\n                <ul class=\"skills-list\">\n                    ").concat(data.skill.split(',').map(function (skill) { return "<li contenteditable=\"true\" data-field=\"skill\">".concat(skill.trim(), "</li>"); }).join(''), "\n                </ul>\n            </section>\n        </div>\n        <div class=\"right-section\">\n            <section>\n                <h3>Education</h3>\n                <ul>\n                    <li><span contenteditable=\"true\" data-field=\"field\">").concat(data.field, "</span> from <span contenteditable=\"true\" data-field=\"institute\">").concat(data.institute, "</span> (<span contenteditable=\"true\" data-field=\"year\">").concat(data.year, "</span>)</li>\n                </ul>\n            </section>\n            <section>\n                <h3>Experience</h3>\n                <ul>\n                    <li><span contenteditable=\"true\" data-field=\"job\">").concat(data.job, "</span> at <span contenteditable=\"true\" data-field=\"comp\">").concat(data.comp, "</span> (<span contenteditable=\"true\" data-field=\"sdate\">").concat(data.sdate, "</span> - <span contenteditable=\"true\" data-field=\"edate\">").concat(data.edate, "</span>)</li>\n                </ul>\n            </section>\n        </div>\n    ");
    // Add event listeners to handle content changes
    var editableElements = resumeDiv.querySelectorAll('[contenteditable]');
    editableElements.forEach(function (el) {
        el.addEventListener('input', function (event) {
            var target = event.target;
            var field = target.getAttribute('data-field');
            if (field) {
                if (field === 'skill') {
                    // Update the skill list
                    var skills = Array.from(resumeDiv.querySelectorAll('.skills-list li'))
                        .map(function (li) { return li.innerText.trim(); })
                        .filter(function (skill) { return skill.length > 0; })
                        .join(', ');
                    data[field] = skills;
                }
                else {
                    data[field] = target.innerText;
                }
            }
        });
    });
}
