// Show modal for skill exchange request
function openRequestModal(skillName, offeredBy) {
    const modal = document.getElementById('request-modal');
    document.getElementById('skill-name').value = skillName;
    document.getElementById('offered-by').value = offeredBy;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('request-modal');
    modal.style.display = 'none';
}

// Handle form submission
document.getElementById('request-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const skill = document.getElementById('skill-name').value;
    const yourSkill = document.getElementById('your-skill').value;
    const message = document.getElementById('message').value;

    if (!yourSkill || !message) {
        alert('Please fill out all fields!');
        return;
    }

    alert(`Your request to exchange '${skill}' has been submitted. We'll notify the user.`);
    closeModal();
});

// Search skills functionality
function searchSkills() {
    const searchQuery = document.getElementById('searchSkills').value.toLowerCase();
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const skillName = card.querySelector('h3').innerText.toLowerCase();
        if (skillName.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
