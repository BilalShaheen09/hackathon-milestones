document.addEventListener("DOMContentLoaded", () => {
    // Form and Resume elements
    const form = document.getElementById('resumeForm');
    const resumeContent = document.getElementById('resume');
    const shareableLink = document.getElementById('shareable-link');
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const downloadBtn = document.getElementById('download-btn');
    const linkModal = document.getElementById('link-modal');
    const closeModal = document.getElementById('close-modal');

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect user input data
        const resumeData = {
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
        const profilePicInput = document.getElementById('profile-pic');
        const file = profilePicInput.files?.[0];
        const reader = new FileReader();

        if (file) {
            reader.onload = function(event) {
                resumeData.profilePicUrl = event.target.result;
                displayResume(resumeData);
            };
            reader.readAsDataURL(file);
        } else {
            displayResume(resumeData);
        }
    });

    // Function to generate and display the resume (non-editable)
    function displayResume(data) {
        resumeContent.innerHTML = `
            <div class="left-section">
                <div class="profile">
                    ${data.profilePicUrl ? `<img src="${data.profilePicUrl}" alt="Profile Picture">` : ''}
                    <h2 contenteditable="true" data-field="fname">${data.fname}</h2>
                    <p class="about_p" contenteditable="true" data-field="objective">${data.objective}</p>
                </div>
                <section>
                    <h3>Contact Information</h3>
                    <ul>
                        <li><i class="fa-solid fa-phone"></i> <span contenteditable="true" data-field="contact">${data.contact}</span></li>
                        <li><i class="fa-solid fa-envelope"></i> <span contenteditable="true" data-field="email">${data.email}</span></li>
                        <li><i class="fa-solid fa-map-marker-alt"></i> <span contenteditable="true" data-field="address">${data.address}</span></li>
                    </ul>
                </section>
                <section>
                    <h3>Skills</h3>
                    <ul class="skills-list">
                        ${data.skill.split(',').map(skill => `<li contenteditable="true" data-field="skill">${skill.trim()}</li>`).join('')}
                    </ul>
                </section>
            </div>
            <div class="right-section">
                <section>
                    <h3>Education</h3>
                    <ul>
                        <li><span contenteditable="true" data-field="field">${data.field}</span> from <span contenteditable="true" data-field="institute">${data.institute}</span> (<span contenteditable="true" data-field="year">${data.year}</span>)</li>
                    </ul>
                </section>
                <section>
                    <h3>Experience</h3>
                    <ul>
                        <li><span contenteditable="true" data-field="job">${data.job}</span> at <span contenteditable="true" data-field="comp">${data.comp}</span> (<span contenteditable="true" data-field="sdate">${data.sdate}</span> - <span contenteditable="true" data-field="edate">${data.edate}</span>)</li>
                    </ul>
                </section>
            </div>
        `;

        // Add event listeners to handle content changes
        const editableElements = resumeContent.querySelectorAll('[contenteditable]');
        editableElements.forEach(el => {
            el.addEventListener('input', (event) => {
                const target = event.target;
                const field = target.getAttribute('data-field');
                if (field) {
                    if (field === 'skill') {
                        // Update the skill list
                        const skills = Array.from(resumeContent.querySelectorAll('.skills-list li'))
                            .map(li => li.innerText.trim())
                            .filter(skill => skill.length > 0)
                            .join(', ');
                        data[field] = skills;
                    } else {
                        data[field] = target.innerText;
                    }
                }
            });
        });

        // Generate the unique URL
        const userName = data.fname.toLowerCase().replace(/\s+/g, "");
        const uniqueUrl = `resume-viewer.html?username=${userName}`;
        localStorage.setItem(userName, JSON.stringify(data)); // Save data

        // Update the shareable link
        shareableLink.href = uniqueUrl;
        shareableLink.textContent = `Open Resume: ${uniqueUrl}`;
        shareableLink.style.display = "inline"; // Make the link visible

        // Enable "Copy Link" button
        copyLinkBtn.style.display = "inline-block";
        copyLinkBtn.addEventListener("click", function () {
            copyToClipboard(`/${uniqueUrl}`);
            alert("Link copied to clipboard!");
        });

        // Show the modal with shareable link and download button
        linkModal.style.display = "block";
    }

    // Function to copy link to clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    // Download resume as PDF
    downloadBtn.addEventListener("click", function () {
        const opt = {
            margin: 1,
            filename: "Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().from(resumeContent).set(opt).save();
    });

    // Close modal
    closeModal.addEventListener("click", () => {
        linkModal.style.display = "none";
    });
});
