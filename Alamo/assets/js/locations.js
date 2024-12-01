// List of locations
const locations = [
	"Oklahoma City, OK",
	"Lubbock, TX",
	"Dallas, TX",
	"Fort Worth, TX",
	"El Paso, TX",
	"Hobbes, NM",
	"Las Cruces, NM",
	"Roswell, NM"
];

// Reference to the location dropdown
const locationDropdown = document.getElementById('location-dropdown');

// Populate the dropdown dynamically
locations.forEach(location => {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.href = "#"; // Modify as needed
	a.textContent = location;
	li.appendChild(a);
	locationDropdown.appendChild(li);
});