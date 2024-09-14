// Mock Data
const skills = [
    { name: "Guitar Lessons", category: "music", description: "Learn how to play the guitar from beginner to advanced." },
    { name: "Vegan Cooking", category: "cooking", description: "Delicious plant-based recipes and techniques." },
    { name: "Spanish Language", category: "languages", description: "Spanish lessons for all levels." },
    { name: "Soccer Coaching", category: "sports", description: "Improve your soccer skills with professional coaching." }
];

// Initialize Page
document.addEventListener("DOMContentLoaded", function() {
    loadSkills();
});

// Load Skills
function loadSkills() {
    const skillsGrid = document.getElementById("skillsGrid");
    skillsGrid.innerHTML = ""; // Clear previous content
    skills.forEach(skill => {
        const skillCard = document.createElement("div");
        skillCard.classList.add("skill-card");
        skillCard.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <span class="category-tag">${skill.category}</span>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

// Search Skills
function searchSkills() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredSkills = skills.filter(skill => skill.name.toLowerCase().includes(searchInput));
    displaySkills(filteredSkills);
}

// Filter By Category
function filterByCategory() {
    const categoryFilter = document.getElementById("categoryFilter").value;
    const filteredSkills = categoryFilter === "all" ? skills : skills.filter(skill => skill.category === categoryFilter);
    displaySkills(filteredSkills);
}

// Display Skills
function displaySkills(filteredSkills) {
    const skillsGrid = document.getElementById("skillsGrid");
    skillsGrid.innerHTML = "";
    filteredSkills.forEach(skill => {
        const skillCard = document.createElement("div");
        skillCard.classList.add("skill-card");
        skillCard.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <span class="category-tag">${skill.category}</span>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

// Modal for adding skills
const modal = document.getElementById("addSkillModal");
const addSkillBtn = document.getElementById("add-skill-btn");
const closeModalBtn = document.getElementsByClassName("close")[0];

// Open modal
addSkillBtn.onclick = function () {
    modal.style.display = "block";
}

// Close modal
function closeModal() {
    modal.style.display = "none";
}

// Handle form submission for adding a skill
document.getElementById("add-skill-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const skillName = document.getElementById("skill-name").value;
    const skillCategory = document.getElementById("skill-category").value;
    const skillDescription = document.getElementById("skill-description").value;

    skills.push({
        name: skillName,
        category: skillCategory,
        description: skillDescription
    });

    closeModal();
    loadSkills(); // Reload the skills grid
});
