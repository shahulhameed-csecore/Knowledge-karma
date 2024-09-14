// Mock data for scheduled sessions (in real application, this would be replaced with actual data)
const scheduledSessions = [
    { date: '2023-09-15', time: '10:00', duration: 60 }, // Example of an already scheduled session
];

// Get form and its elements
const form = document.getElementById('schedule-form');
const feedbackMessage = document.getElementById('feedback-message');
const today = new Date().toISOString().split('T')[0];

// Prevent selecting a past date
document.getElementById('date').setAttribute('min', today);

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const userId = document.getElementById('user_id').value;
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;
    const duration = parseInt(document.getElementById('duration').value);

    if (validateForm(userId, selectedDate, selectedTime, duration)) {
        displayMessage('Session successfully scheduled!', 'success');
        resetForm();
        // In a real application, you'd send this data to the server here.
    } else {
        displayMessage('Please ensure all fields are filled correctly or check for conflicts.', 'error');
    }
});

// Form validation function
function validateForm(userId, date, time, duration) {
    if (!userId || !date || !time || !duration) {
        return false;
    }

    // Check if the selected date is not a past date
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        return false;
    }

    // Validate that the time is within working hours (9:00 AM to 6:00 PM)
    const [hour, minute] = time.split(':').map(Number);
    if (hour < 9 || hour > 17 || (hour === 17 && minute > 0)) {
        return false;
    }

    // Check for session conflicts
    if (isSessionConflicting(date, time, duration)) {
        return false;
    }

    return true;
}

// Check for session conflicts
function isSessionConflicting(date, time, duration) {
    const selectedStart = new Date(`${date}T${time}`);
    const selectedEnd = new Date(selectedStart.getTime() + duration * 60000);

    for (const session of scheduledSessions) {
        const sessionStart = new Date(`${session.date}T${session.time}`);
        const sessionEnd = new Date(sessionStart.getTime() + session.duration * 60000);

        if (selectedStart < sessionEnd && sessionStart < selectedEnd) {
            return true; // Conflict detected
        }
    }

    return false; // No conflicts
}

// Display feedback message
function displayMessage(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = type;
    feedbackMessage.style.display = 'block';
}

// Reset the form after submission
function resetForm() {
    form.reset();
    feedback
