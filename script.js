document.addEventListener('DOMContentLoaded', function() {
    console.log("GameLegion website loaded!");

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only prevent default for internal links (those starting with #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault(); // Stop the default jump behavior
                const targetId = this.getAttribute('href').substring(1); // Get the section ID
                const targetElement = document.getElementById(targetId); // Find the element
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' // Scroll smoothly
                    });
                }
            }
        });
    });

    // Highlight active navigation link based on scroll position
    const sections = document.querySelectorAll('section'); // Get all <section> elements
    const navLinks = document.querySelectorAll('nav a'); // Get all navigation links
    const nav = document.querySelector('nav'); // Get the navigation bar itself

    const highlightNavLink = () => {
        let current = ''; // Variable to store the ID of the current section in view

        sections.forEach(section => {
            // Calculate the top position of the section, accounting for sticky nav and a small offset
            const sectionTop = section.offsetTop - nav.offsetHeight - 50;
            const sectionHeight = section.clientHeight;

            // Check if the current scroll position is within this section
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id'); // Set current to this section's ID
            }
        });

        // Remove 'active' class from all nav links, then add it to the current one
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Add event listeners for scrolling and call the function on load
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call on load to set initial active state (e.g., if page loads scrolled)
});