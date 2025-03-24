document.addEventListener('DOMContentLoaded', () => {
    const districtData = {
        'Northern': {
            heritage: ['Jaffna Fort', 'Nallur Kovil'],
            wildlife: ['Wilpattu National Park'],
            adventure: ['Kite Surfing in Casuarina Beach'],
            beaches: ['Casuarina Beach', 'Delft Island']
        },
        'Eastern': {
            heritage: ['Trincomalee Hindu Temple', 'Portuguese Ruins'],
            wildlife: ['Maduru Oya National Park'],
            adventure: ['Surfing in Arugam Bay'],
            beaches: ['Arugam Bay', 'Trincomalee Beach']
        },
        'Central': {
            heritage: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple'],
            wildlife: ['Minneriya National Park'],
            adventure: ['Hiking in Knuckles Mountain Range'],
            beaches: ['No direct coastal access']
        },
        'Western': {
            heritage: ['Colombo Dutch Museum', 'Independence Memorial Hall'],
            wildlife: ['Attidiya Bird Sanctuary'],
            adventure: ['Water Sports in Negombo'],
            beaches: ['Negombo Beach', 'Mount Lavinia Beach']
        },
        // Add more districts as needed
    };

    function createDistrictCards() {
        const districtContainer = document.getElementById('district-information');
        
        Object.entries(districtData).forEach(([district, details]) => {
            const districtCard = document.createElement('div');
            districtCard.className = 'col-md-4 mb-4';
            districtCard.innerHTML = `
                <div class="district-card">
                    <div class="card-header">${district} District</div>
                    <div class="card-body">
                        <h5>Highlights</h5>
                        <ul class="district-highlights">
                            <li><strong>Heritage Sites:</strong> ${details.heritage.join(', ')}</li>
                            <li><strong>Wildlife:</strong> ${details.wildlife.join(', ')}</li>
                            <li><strong>Adventure:</strong> ${details.adventure.join(', ')}</li>
                            <li><strong>Beaches:</strong> ${details.beaches.join(', ')}</li>
                        </ul>
                    </div>
                </div>
            `;
            districtContainer.appendChild(districtCard);
        });
    }

    function createInteractiveSriLankaMap() {
        const mapContainer = document.getElementById('sri-lanka-map');
        mapContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600">
                <!-- Simple SVG Map Outline of Sri Lanka -->
                <path 
                    d="M250,100 Q150,250 250,400 Q350,250 250,100 Z" 
                    fill="#4CAF50" 
                    stroke="#2E7D32" 
                    stroke-width="3"
                />
                <!-- Add district markers/texts -->
                <text x="240" y="150" fill="white" font-weight="bold">Northern</text>
                <text x="260" y="250" fill="white" font-weight="bold">Central</text>
                <text x="300" y="350" fill="white" font-weight="bold">Eastern</text>
                <text x="200" y="400" fill="white" font-weight="bold">Western</text>
            </svg>
        `;
    }

    createDistrictCards();
    createInteractiveSriLankaMap();
});