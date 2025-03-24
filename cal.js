class SriLankanFestivalCalendar {
    constructor() {
        this.months = [
            'January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August', 
            'September', 'October', 'November', 'December'
        ];

        this.festivalData = {
            January: {
                religious: [
                    { name: "National Day", description: "Commemorates Sri Lanka's independence from British rule in 1948." }
                ],
                cultural: [
                    { name: "Thai Pongal", description: "Tamil harvest festival celebrating agricultural prosperity." }
                ],
                special: []
            },
            April: {
                religious: [
                    { name: "Vesak Full Moon Poya", description: "Buddhist festival commemorating Buddha's birth, enlightenment, and death." }
                ],
                cultural: [
                    { name: "Sinhala & Tamil New Year", description: "Traditional New Year festival marking the end of the harvest season." }
                ],
                special: []
            },
            May: {
                religious: [
                    { name: "Vesak Full Moon Poya", description: "Buddhist festival commemorating Buddha's birth, enlightenment, and death." }
                ],
                cultural: [],
                special: []
            },
            July: {
                religious: [],
                cultural: [
                    { name: "Kandy Esala Perahera", description: "Famous Buddhist festival with traditional dancers, musicians, and decorated elephants." }
                ],
                special: []
            },
            December: {
                religious: [
                    { name: "Christmas", description: "Christian celebration of the birth of Jesus Christ." }
                ],
                cultural: [],
                special: []
            }
        };

        this.initCalendar();
        this.initModal();
    }

    initCalendar() {
        const monthGrid = document.getElementById('monthGrid');
        this.months.forEach(month => {
            const monthBox = document.createElement('div');
            monthBox.classList.add('month-box');
            monthBox.textContent = month;
            monthBox.addEventListener('click', () => this.showMonthFestivals(month));
            monthGrid.appendChild(monthBox);
        });
    }

    initModal() {
        const modal = document.getElementById('festivalModal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        }

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    showMonthFestivals(month) {
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const modal = document.getElementById('festivalModal');
        
        modalTitle.textContent = `${month} Festivals`;

        const festivalsInMonth = this.festivalData[month] || {};
        
        // Clear previous content
        modalContent.innerHTML = '';

        // Religious Festivals
        if (festivalsInMonth.religious.length > 0) {
            const religiousSection = this.createFestivalSection('Religious Festivals', festivalsInMonth.religious);
            modalContent.appendChild(religiousSection);
        }
        
        // Cultural Festivals
        if (festivalsInMonth.cultural.length > 0) {
            const culturalSection = this.createFestivalSection('Cultural Festivals', festivalsInMonth.cultural);
            modalContent.appendChild(culturalSection);
        }
        
        // Special Days
        if (festivalsInMonth.special.length > 0) {
            const specialSection = this.createFestivalSection('Special Days', festivalsInMonth.special);
            modalContent.appendChild(specialSection);
        }
        
        // If no festivals
        if (modalContent.children.length === 0) {
            modalContent.innerHTML = '<p>No special festivals this month.</p>';
        }

        // Fade in the modal content
        modal.style.display = 'block';
        modalContent.classList.remove('fade-out');
        modalContent.classList.add('fade-in');
    }

    createFestivalSection(title, festivals) {
        const section = document.createElement('div');
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);

        festivals.forEach(festival => {
            const festivalDiv = document.createElement('div');
            festivalDiv.classList.add('festival');
            
            const festivalName = document.createElement('h4');
            festivalName.textContent = festival.name;
            festivalDiv.appendChild(festivalName);

            const festivalDesc = document.createElement('p');
            festivalDesc.textContent = festival.description;
            festivalDiv.appendChild(festivalDesc);

            section.appendChild(festivalDiv);
        });

        return section;
    }
}

new SriLankanFestivalCalendar();
