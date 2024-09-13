// TypeScript interface for form data
interface ResumeData {
    fname: string;
    contact: string;
    email: string;
    address: string;
    field: string;
    institute: string;
    year: string;
    job: string;
    comp: string;
    sdate: string;
    edate: string;
    skill: string;
    objective: string;
    profilePicUrl: string | null;
}

document.getElementById('resumeForm')!.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve form values
    const resumeData: ResumeData = {
        fname: (document.getElementById('fname') as HTMLInputElement).value,
        contact: (document.getElementById('contact') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        address: (document.getElementById('address') as HTMLInputElement).value,
        field: (document.getElementById('field') as HTMLInputElement).value,
        institute: (document.getElementById('institute') as HTMLInputElement).value,
        year: (document.getElementById('year') as HTMLInputElement).value,
        job: (document.getElementById('job') as HTMLInputElement).value,
        comp: (document.getElementById('comp') as HTMLInputElement).value,
        sdate: (document.getElementById('sdate') as HTMLInputElement).value,
        edate: (document.getElementById('edate') as HTMLInputElement).value,
        skill: (document.getElementById('skill') as HTMLInputElement).value,
        objective: (document.getElementById('objective') as HTMLTextAreaElement).value,
        profilePicUrl: null,
    };

    // Get the file input and read the file
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    const file = profilePicInput.files?.[0];
    const reader = new FileReader();

    if (file) {
        reader.onload = function(event) {
            resumeData.profilePicUrl = event.target?.result as string;
            displayResume(resumeData);
        };
        reader.readAsDataURL(file);
    } else {
        displayResume(resumeData);
    }
});

function displayResume(data: ResumeData) {
    const resumeDiv = document.getElementById('resume')!;
    
    resumeDiv.innerHTML = `
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
    const editableElements = resumeDiv.querySelectorAll('[contenteditable]');
    editableElements.forEach(el => {
        el.addEventListener('input', (event) => {
            const target = event.target as HTMLElement;
            const field = target.getAttribute('data-field');
            if (field) {
                if (field === 'skill') {
                    // Update the skill list
                    const skills = Array.from(resumeDiv.querySelectorAll('.skills-list li'))
                        .map(li => (li as HTMLElement).innerText.trim())
                        .filter(skill => skill.length > 0)
                        .join(', ');
                    (data as any)[field] = skills;
                } else {
                    (data as any)[field] = target.innerText;
                }
            }
        });
    });
}
