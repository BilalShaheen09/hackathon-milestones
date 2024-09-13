// script.ts

// Type for the button element with dataset
interface ToggleButton extends HTMLButtonElement {
    dataset: {
        target: string;
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons and sections
    const buttons = document.querySelectorAll<ToggleButton>('.toggle-buttons button');
    const sections = document.querySelectorAll<HTMLElement>('.section');

    // Function to show all sections
    const showAllSections = (): void => {
        sections.forEach(section => {
            section.classList.remove('hide');
        });
    };

    // Function to toggle a specific section
    const toggleSection = (sectionId: string): void => {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.toggle('hide');
            } else {
                section.classList.add('hide');
            }
        });
    };

    // Add click event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            if (targetId === 'showall') {
                showAllSections();
            } else if (targetId) {
                toggleSection(targetId);
            }
        });
    });

    // Show all sections by default
    showAllSections();
});
