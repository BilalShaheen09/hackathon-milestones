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
                <h2>${data.fname}</h2>
                <p class="about_p">${data.objective}</p>
            </div>
            <section>
                <h3>Contact Information</h3>
                <ul>
                    <li><i class="fa-solid fa-phone"></i> ${data.contact}</li>
                    <li><i class="fa-solid fa-envelope"></i> ${data.email}</li>
                    <li><i class="fa-solid fa-map-marker-alt"></i> ${data.address}</li>
                </ul>
            </section>
            <section>
                <h3>Skills</h3>
                <ul>
                    <li>${data.skill}</li>
                </ul>
            </section>
        </div>
        <div class="right-section">
            <section>
                <h3>Education</h3>
                <ul>
                    <li>${data.field} from ${data.institute} (${data.year})</li>
                </ul>
            </section>
            <section>
                <h3>Experience</h3>
                <ul>
                    <li>${data.job} at ${data.comp} (${data.sdate} - ${data.edate})</li>
                </ul>
            </section>
        </div>
    `;
}
