// Smooth Scroll Functionality for internal links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Propose Trade Button Event Listener
document.querySelectorAll('.trade-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Propose Trade functionality is coming soon!');
    });
});

// Adding animations using vanilla JS
window.addEventListener('scroll', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < window.innerHeight) {
            card.style.transitionDelay = `${index * 100}ms`;
            card.classList.add('fade-in');
        }
    });
});

// Form Validation
document.getElementById('registration-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    // Simple validation
    if (name.length < 3) {
        alert('Name must be at least 3 characters long.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }
    if (bio.length < 10) {
        alert('Please provide a longer bio.');
        return;
    }

    // Save form data in local storage
    saveFormDataToLocal(name, email, bio);
    alert('Registration successful!');

    // Optional: Reset form after submission
    document.getElementById('registration-form').reset();
});

// Email Validation Function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Save form data to local storage
function saveFormDataToLocal(name, email, bio) {
    const formData = {
        name: name,
        email: email,
        bio: bio,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Retrieve form data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
        document.getElementById('name').value = savedFormData.name;
        document.getElementById('email').value = savedFormData.email;
        document.getElementById('bio').value = savedFormData.bio;
    }
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img.lazy');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Loading Spinner
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loading-spinner").style.visibility = "visible";
    } else {
        document.querySelector("#loading-spinner").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};

// Highlight active section on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach((section, i) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
});
