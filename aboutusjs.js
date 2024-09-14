document.addEventListener("DOMContentLoaded", function() {
    const teamMembers = [
        {
            name: "Parikshit",
            position: "Founder & CEO",
            description: "Parikshit is passionate about education and believes in the power of community-driven learning. With years of experience in tech and education, he leads the vision for Skill Exchange.",
            imgSrc: "team-member1.jpg"
        },
        {
            name: "Shahul Hameed",
            position: "Chief Technology Officer",
            description: "Shahul Hameed  oversees the technical aspects of Skill Exchange. With a background in software development, he ensures that our platform is innovative and user-friendly.",
            imgSrc: "team-member2.jpg"
        },
        {
            name: "Rahamatulla",
            position: "Community Manager",
            description: "Rahamatulla is dedicated to fostering a positive and engaging community. he works to ensure that users have a great experience and that their feedback is heard and acted upon.",
            imgSrc: "team-member3.jpg"
        }
    ];

    const teamGrid = document.querySelector(".team-grid");

    teamMembers.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("team-member");
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.position}</p>
            <p>${member.description}</p>
        `;
        teamGrid.appendChild(memberCard);
    });
});
