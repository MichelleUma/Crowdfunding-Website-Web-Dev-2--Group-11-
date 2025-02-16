// Define the API base URL
const API_BASE_URL = 'http://localhost:3060/api';

// Fetch active fundraisers and display them on the home page
document.addEventListener('DOMContentLoaded', () => {

    // Check if the element with id 'fundraisers-list' exists
    if (document.getElementById('fundraisers-list')) {
        // Fetch all fundraisers from the API
        fetch(`${API_BASE_URL}/fundraisers`)
            .then(response => response.json())
            .then(fundraisers => {
                const list = document.getElementById('fundraisers-list'); // Get the container where fundraisers will be displayed
                // Loop through each fetched fundraiser and create a display element
                fundraisers.forEach(fundraiser => {
                    const div = document.createElement('div');
                    div.classList.add('fundraiser-item'); // Add the CSS class for styling

                    // Add image related to each fundraiser
                    let imgSrc = '';
                    switch (fundraiser.FUNDRAISER_ID) {
                        case 1:
                            imgSrc = 'images/Housefire Recovery.jpg';
                            break;
                        case 2:
                            imgSrc = 'images/School Renovation Fund.jpg';
                            break;
                        case 3:
                            imgSrc = 'images/Help Samantha Recover.jpg';
                            break;
                        case 4:
                            imgSrc = 'images/Hospital Funds.jpg';
                            break;
                        case 5:
                            imgSrc = 'images/Hosting Student Accommodation.jpg';
                            break;
                        case 6:
                            imgSrc = 'images/Save the Rainforest.jpg';
                            break;
                        case 7:
                            imgSrc = 'images/Support Local Artists.jpg';
                            break;
                        case 8:
                            imgSrc = 'images/Clean Water For All.jpg';
                            break;
                        case 9:
                            imgSrc = 'images/Childhood Education.jpg';
                            break;
                        case 10:
                            imgSrc = 'images/Help The Homeless.jpg';
                            break;
                        default:
                            imgSrc = 'images/default-placeholder.jpg'; // Fallback image if none is found
                            break;
                    }

                    // Create the HTML structure with the image and fundraiser details
                    div.innerHTML = `
        <div class="fundraiser-image-wrapper">
            <img src="${imgSrc}" alt="Fundraiser Image" class="fundraiser-image">
        </div>
        <div>
            <h3>${fundraiser.CAPTION}</h3>
            <p>Organiser: ${fundraiser.ORGANIZER}</p>
            <p>Target Funding: ${fundraiser.TARGET_FUNDING} AUD</p>
            <p>Current Funding: ${fundraiser.CURRENT_FUNDING} AUD</p>
            <p>City: ${fundraiser.CITY}</p>
            <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
        </div>
    `;
                    // Append the fundraiser div to the list container
                    list.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching fundraisers:', error)); // Handle fetch error
    }

    // Fetch and display categories in the search fundraisers page
    if (document.getElementById('category')) {
        fetch(`${API_BASE_URL}/categories`)
            .then(response => response.json())
            .then(categories => {
                const categorySelect = document.getElementById('category');
                categorySelect.innerHTML = ''; // Clear existing options
                // Add default "Select a category" option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select a category';
                categorySelect.appendChild(defaultOption);
                // Append each category to the dropdown
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.CATEGORY_ID;
                    option.textContent = category.NAME;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching categories:', error)); // Handle fetch error
    }

    // Handle form submission for searching fundraisers by category
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission
            const categoryId = document.getElementById('category').value; // Get selected category

            // Fetch fundraisers filtered by the selected category
            fetch(`${API_BASE_URL}/fundraisers?categoryId=${categoryId}`)
                .then(response => response.json())
                .then(fundraisers => {
                    const resultsContainer = document.getElementById('search-results');
                    resultsContainer.innerHTML = ''; // Clear previous results

                    // Display a message if no fundraisers are found
                    if (fundraisers.length === 0) {
                        resultsContainer.innerHTML = '<p style="color: red; font-weight: bold;">No fundraisers found.</p>';
                    } else {
                        // Display each fundraiser in the results
                        fundraisers.forEach(fundraiser => {
                            const div = document.createElement('div');
                            div.innerHTML = `
                                <h3>${fundraiser.CAPTION}</h3>
                                <p>Organiser: ${fundraiser.ORGANIZER}</p>
                                <p>Target Funding: ${fundraiser.TARGET_FUNDING} AUD</p>
                                <p>Current Funding: ${fundraiser.CURRENT_FUNDING} AUD</p>
                                <p>City: ${fundraiser.CITY}</p>
                                <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
                            `;
                            resultsContainer.appendChild(div);
                        });
                    }
                })
                .catch(error => console.error('Error fetching searched fundraisers:', error)); // Handle fetch error
        });
    }

    // Fetch fundraiser details and display donations on the fundraiser page
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
    if (fundraiserId && window.location.pathname.includes('fundraiser.html')) {
        fetch(`${API_BASE_URL}/fundraiser/${fundraiserId}`)
            .then(response => response.json())
            .then(data => {
                const { fundraiser, donations } = data;
                const details = document.getElementById('fundraiser-details');

                // Display fundraiser details
                details.innerHTML = `
                    <h2>${fundraiser.CAPTION}</h2>
                    <p>Organiser: ${fundraiser.ORGANIZER}</p>
                    <p>Target Funding: ${fundraiser.TARGET_FUNDING} AUD</p>
                    <p>Current Funding: ${fundraiser.CURRENT_FUNDING} AUD</p>
                    <p>City: ${fundraiser.CITY}</p>
                    <button onclick="window.location.href='donation.html?id=${fundraiser.FUNDRAISER_ID}'">Donate</button>
                `;

                // Display donations related to the fundraiser
                const donationList = document.createElement('div');
                donationList.innerHTML = '<h3>Donations:</h3>';

                // Check if there are any donations
                if (donations.length > 0) {
                    donations.forEach(donation => {
                        const donationDiv = document.createElement('div');
                        donationDiv.classList.add('donation-item');
                        donationDiv.innerHTML = `
                            <p><strong>Amount:</strong> ${donation.AMOUNT} AUD</p>
                            <p><strong>Donor:</strong> ${donation.GIVER}</p>
                            <p><strong>Date:</strong> ${new Date(donation.DATE).toLocaleDateString()}</p>
                        `;
                        donationList.appendChild(donationDiv);
                    });
                } else {
                    donationList.innerHTML += '<p>No donations yet.</p>';
                }

                details.appendChild(donationList);
            })
            .catch(error => console.error('Error fetching fundraiser and donations:', error)); // Handle fetch error
    }

    // Fetch and display the fundraiser details on the donation page
    if (window.location.pathname.includes('donation.html') && fundraiserId) {
        fetch(`${API_BASE_URL}/fundraiser/${fundraiserId}`)
            .then(response => response.json())
            .then(data => {
                const { fundraiser } = data;
                const fundraiserInfo = document.getElementById('fundraiser-info');
                // Display fundraiser details on donation page
                fundraiserInfo.innerHTML = `
                    <h3>${fundraiser.CAPTION}</h3>
                    <p>Organiser: ${fundraiser.ORGANIZER}</p>
                    <p>Target Funding: ${fundraiser.TARGET_FUNDING} AUD</p>
                    <p>Current Funding: ${fundraiser.CURRENT_FUNDING} AUD</p>
                    <p>City: ${fundraiser.CITY}</p>
                `;
                // Populate hidden input field with the fundraiser ID
                document.getElementById('fundraiser-id').value = fundraiserId;
            })
            .catch(error => console.error('Error fetching fundraiser:', error)); // Handle fetch error
    }

    // Handle donation form submission
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const giver = document.getElementById('giver').value.trim();
            const amount = parseFloat(document.getElementById('amount').value.trim());
            const fundraiserId = document.getElementById('fundraiser-id').value;

            // Check if the donation amount is less than the minimum required
            if (amount < 5) {
                document.getElementById('message').innerHTML = '<p class="error-message">The minimum donation is 5 AUD.</p>';
                return;
            }

            const donationData = {
                giver: giver,
                amount: amount,
                fundraiser_id: fundraiserId
            };

            // Send the donation data to the API
            fetch(`${API_BASE_URL}/donation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(donationData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Donation added successfully') {
                        alert(`Thank you for your donation, ${giver}!`);
                        // Redirect back to fundraiser page with updated donations
                        window.location.href = `fundraiser.html?id=${fundraiserId}`;
                    } else {
                        document.getElementById('message').innerHTML = `<p class="error-message">${data.message}</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('message').innerHTML = `<p class="error-message">Something went wrong. Please try again.</p>`;
                });
        });
    }
});
