document.addEventListener('DOMContentLoaded', function () {
    // Load the header dynamically
    fetch('base.html') // Fetch the content from index.html
        .then(response => response.text())
        .then(data => {
            // Inject content into the header
            const header = document.getElementById('header');
            if (header) {
                header.innerHTML = data; // Adjust this if the header section is specific
            } else {
                console.error("Header element with ID 'header' not found.");
            }

            // Inject content into the footer
            const footer = document.getElementById('footer');
            if (footer) {
                footer.innerHTML = data; // Adjust this if the footer section is specific
                
                // Initially hide the footer
                footer.style.display = "none";

                // Add scroll event listener to toggle footer visibility
                window.addEventListener('scroll', function () {
                    const scrollPosition = window.scrollY + window.innerHeight;
                    const pageHeight = document.body.scrollHeight;

                    console.log(`Scroll position: ${scrollPosition}, Page height: ${pageHeight}`);

                    if (scrollPosition >= pageHeight - 10) {
                        // Show footer when near the bottom
                        footer.style.display = "block";
                    } else {
                        // Hide footer otherwise
                        footer.style.display = "none";
                    }
                });
            } else {
                console.error("Footer element with ID 'footer' not found.");
            }
        })
        .catch(error => console.error('Error loading content:', error));

        const menu = document.getElementById('menu');

}
);
