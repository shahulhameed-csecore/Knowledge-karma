// script.js
const users = [];
const reviews = [];

function registerUser() {
    const name = document.getElementById('name').value;
    const skillsOffered = document.getElementById('skills-offered').value.split(',').map(skill => skill.trim());
    const skillsWanted = document.getElementById('skills-wanted').value.split(',').map(skill => skill.trim());
    const availability = document.getElementById('availability').value.split(',').map(day => day.trim());
    const timeSlots = document.getElementById('time-slots').value.split(',').map(slot => slot.trim());

    const user = { name, skillsOffered, skillsWanted, availability, timeSlots };
    users.push(user);

    document.getElementById('registration-form').reset();
    findMatches();
}

function findMatches() {
    const tableBody = document.getElementById('matches-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    for (const learner of users) {
        for (const teacher of users) {
            if (learner === teacher) continue;

            for (const skill of learner.skillsWanted) {
                if (teacher.skillsOffered.includes(skill)) {
                    const commonAvailability = findCommonAvailability(learner, teacher);

                    if (commonAvailability.length > 0) {
                        const row = tableBody.insertRow();
                        row.insertCell(0).textContent = learner.name;
                        row.insertCell(1).textContent = teacher.name;
                        row.insertCell(2).textContent = skill;
                        row.insertCell(3).textContent = commonAvailability.join(', ');

                        const feedbackCell = row.insertCell(4);
                        const feedbackButton = document.createElement('button');
                        feedbackButton.textContent = 'Provide Feedback';
                        feedbackButton.onclick = () => showFeedbackForm(learner.name, teacher.name);
                        feedbackCell.appendChild(feedbackButton);
                    }
                }
            }
        }
    }
}

function findCommonAvailability(learner, teacher) {
    const commonTimes = [];

    learner.availability.forEach(day => {
        if (teacher.availability.includes(day)) {
            learner.timeSlots.forEach(slot => {
                if (teacher.timeSlots.includes(slot)) {
                    commonTimes.push(`${day} ${slot}`);
                }
            });
        }
    });

    return commonTimes;
}

function showFeedbackForm(learnerName, teacherName) {
    document.getElementById('feedback-learner').value = learnerName;
    document.getElementById('feedback-teacher').value = teacherName;
    document.getElementById('feedback-form').style.display = 'block';
}

function submitFeedback() {
    const learner = document.getElementById('feedback-learner').value;
    const teacher = document.getElementById('feedback-teacher').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comment = document.getElementById('comment').value;

    reviews.push({ learner, teacher, rating, comment });

    document.getElementById('feedback-form-content').reset();
    document.getElementById('feedback-form').style.display = 'none';
    document.getElementById('feedback-message').textContent = 'Feedback submitted successfully!';
    displayReviews();
}

function displayReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `
            <p><strong>Learner:</strong> ${review.learner}</p>
            <p><strong>Teacher:</strong> ${review.teacher}</p>
            <p><strong>Rating:</strong> ${'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
            <p><strong>Comment:</strong> ${review.comment}</p>
            <hr>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}

function filterReviews() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const reviewDivs = document.querySelectorAll('#reviews-list .review');

    reviewDivs.forEach(div => {
        const text = div.textContent.toLowerCase();
        div.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}
