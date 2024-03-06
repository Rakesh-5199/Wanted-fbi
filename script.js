async function fetchElijahDetails() {
    try {
        const response = await fetch('https://api.fbi.gov/wanted/v1/list');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.items[getRandomNumber()]; // Get the first item from the items array
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
function getRandomNumber() {
    return Math.floor(Math.random() * 20);
  }
(async () => {
    try {
        const elijahDetails = await fetchElijahDetails();
        const elijahDetailsElement = document.getElementById('elijahDetails');

        const detailsItem = document.createElement('div');
        detailsItem.classList.add('details-item');

        // Creating HTML elements for displaying Elijah's details
        for (const [key, value] of Object.entries(elijahDetails)) {
            if (key === 'images') continue; // Skip images for now
            const label = document.createElement('div');
            label.classList.add('details-label');
            label.textContent = `${key.replace(/_/g, ' ')}:`;

            const info = document.createElement('div');
            info.textContent = value;

            detailsItem.appendChild(label);
            detailsItem.appendChild(info);
        }

        // Creating HTML elements for displaying images
        elijahDetails.images.forEach(image => {
            const imageElement = document.createElement('img');
            imageElement.classList.add('details-image');
            imageElement.src = image.large;
            imageElement.alt = 'Elijah Vue';
            detailsItem.appendChild(imageElement);
        });

        elijahDetailsElement.appendChild(detailsItem);
    } catch (error) {
        console.error('Failed to fetch Elijah Vue details:', error);
    }
})();
