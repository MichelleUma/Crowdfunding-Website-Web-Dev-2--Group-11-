function validateForm() {
    const fundraiserID = document.getElementById("fundraiserID").value;
    const organizer = document.getElementById("organizer").value;
    const caption = document.getElementById("caption").value;
    const targetFunding = document.getElementById("targetFunding").value;
    const currentFunding = document.getElementById("currentFunding").value;
    const city = document.getElementById("city").value;
    const active = document.getElementById("active").value;
    const categoryID = document.getElementById("categoryID").value;
   

    const fundraiserIDError = document.getElementById("fundraiserID-error");
    const organizerError = document.getElementById("organizer-error" );
    const captionError = document.getElementById( "caption-error" );
    const targetFundingError = document.getElementById("targetFunding-error");
    const currentFundingError = document.getElementById("currentFunding-error");
    const cityError = document.getElementById("city-error");
    const activeError = document.getElementById("active-error");
    const categoryIDError = document.getElementById("categoryID-error");
 
   fundraiserIDError.textContent = "";
    organizerError.textContent = "";
    captionError.textContent = "";
    targetFundingError.textContent = "";
    currentFundingError.textContent = "";
    cityError.textContent = "";
    activeError.textContent = "";
    categoryIDError.textContent = "";
    

    let isValid = true;

      if (fundraiserID === "") {
       fundraiserIDError.textContent =
            "Please enter Fundraiser ID.";
        isValid = false;
    }

    if (organizer === "") {
        organizerError.textContent =
            "Please enter Organiser";
        isValid = false;
    }

    if (caption === "") {
        captionError.textContent =
            "Please enter Caption.";
        isValid = false;
    }

    if (targetFunding=== "") {
        targetFundingError.textContent =
            "Please enter Target Funding";
        isValid = false;
    }

    if (currentFunding === "") {
        currentFundingError.textContent =
            "Please enter your Current Funding.";
        isValid = false;
    }

    if (city === "") {
        cityError.textContent =
            "Please enter City.";
        isValid = false;
    }

    if (active === "") {
        activeError.textContent =
            "Please enter Active Status.";
        isValid = false;
    }

    if (categoryID === "") {
        categoryIDError.textContent =
            "Please enter your Category ID.";
        isValid = false;
    }

    
  
    return isValid;



    fetch('http://localhost:3060/api/fundraisers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.insert === 'success') {
            alert("Concert added successfully!");
            document.getElementById('form').reset(); // to clear the form                    
        } else if (data.insert === 'error') {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });

}

