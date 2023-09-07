const breedListElement = document.getElementById("breed-list");
const breedDetailsElement = document.getElementById("breed-details");

// Fetch the data from the API
fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
        const breeds = data.message;

        // Loop through the breeds and create list items
        for (const breed in breeds) {
            const listItem = document.createElement("li");
            listItem.textContent = breed;
            breedListElement.appendChild(listItem);

            // Add a click event listener to each breed item
            listItem.addEventListener("click", () => {
                // Fetch and display breed details
                fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                    .then((response) => response.json())
                    .then((data) => {
                        const imageUrl = data.message;
                        breedDetailsElement.innerHTML = `
                            <h2>${breed}</h2>
                            <img src="${imageUrl}" alt="${breed}" />
                        `;
                    })
                    .catch((error) => {
                        console.error("Error fetching breed details:", error);
                    });
            });
        }
    })
    .catch((error) => {
        console.error("Error fetching breed list:", error);
    });
