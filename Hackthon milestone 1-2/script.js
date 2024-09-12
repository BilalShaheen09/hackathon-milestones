// script.ts
document.addEventListener('DOMContentLoaded', function () {
    // Use type assertion to specify button type
    var buttons = document.querySelectorAll('.toggle-buttons button');
    var sections = document.querySelectorAll('.section');
    var showAllSections = function () {
        sections.forEach(function (section) {
            section.classList.remove('hide');
        });
    };
    var toggleSection = function (sectionId) {
        sections.forEach(function (section) {
            if (section.id === sectionId) {
                section.classList.toggle('hide');
            }
            else {
                section.classList.add('hide');
            }
        });
    };
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Use type assertion to specify dataset type
            var targetId = button.dataset.target;
            if (targetId === 'showall') {
                showAllSections();
            }
            else if (targetId) {
                toggleSection(targetId);
            }
        });
    });
    // Show all sections by default
    showAllSections();
});
