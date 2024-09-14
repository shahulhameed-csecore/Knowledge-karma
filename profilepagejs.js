// scripts.js

// Get modal elements
const editModal = document.getElementById('edit-modal');
const editButton = document.getElementById('edit-button');
const closeButton = document.getElementsByClassName('close')[0];
const editPicBtn = document.getElementById('edit-pic-btn');

// Get form elements
const editForm = document.getElementById('edit-form');
const usernameField = document.getElementById('edit-username');
const bioField = document.getElementById('edit-bio');
const emailField = document.getElementById('edit-email');
const locationField = document.getElementById('edit-location');
const skillsField = document.getElementById('edit-skills');

// Display elements to update
const displayUsername = document.getElementById('username');
const displayBio = document.getElementById('bio');
const displayEmail = document.getElementById('email');
const displayLocation = document.getElementById('location');
const displaySkills = document.getElementById('skills-list');

// Open the modal
editButton.onclick = () => {
    editModal.style.display = 'block';
};

// Close the modal
closeButton.onclick = () => {
    editModal.style.display = 'none';
};

// Close modal if clicking outside of it
window.onclick = (event) => {
    if (event.target == editModal) {
        editModal.style.display = 'none';
    }
};

// Handle form submission
editForm.onsubmit = (event) => {
    event.preventDefault();

    // Update profile display with new data
    displayUsername.textContent = usernameField.value;
    displayBio.textContent = bioField.value;
    displayEmail.textContent = emailField.value;
    displayLocation.textContent = locationField.value;

    // Update skills list
    const skills = skillsField.value.split(',').map(skill => skill.trim());
    displaySkills.innerHTML = '';
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        displaySkills.appendChild(li);
    });

    // Close the modal
    editModal.style.display = 'none';
};

// Placeholder for profile picture edit functionality
editPicBtn.onclick = () => {
    alert('Profile picture editing functionality will be implemented here!');
};
