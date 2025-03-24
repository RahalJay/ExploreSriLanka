document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.sidebar nav li');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Initialize modals
    const destinationModal = document.getElementById('destination-modal');
    const recipeModal = document.getElementById('recipe-modal');
    const guidelineModal = document.getElementById('guideline-modal');
    const roadSignModal = document.getElementById('road-sign-modal');
    const eventModal = document.getElementById('event-modal');
    
    // Initialize modal buttons
    const addDestinationBtn = document.getElementById('add-destination-btn');
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const addGuidelineBtn = document.getElementById('add-guideline-btn');
    const addRoadSignBtn = document.getElementById('add-road-sign-btn');
    const addEventBtn = document.getElementById('add-event-btn');
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    // Initialize forms
    const destinationForm = document.getElementById('destination-form');
    const recipeForm = document.getElementById('recipe-form');
    const guidelineForm = document.getElementById('guideline-form');
    const roadSignForm = document.getElementById('road-sign-form');
    const eventForm = document.getElementById('event-form');

    // Navigation handling
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionName = this.getAttribute('data-section');
            
            // Handle logout separately
            if (sectionName === 'logout') {
                if (confirm('Are you sure you want to logout?')) {
                    alert('You have been logged out successfully.');
                    // In a real application, redirect to login page
                    // window.location.href = 'login.html';
                }
                return;
            }
            
            // Update active navigation item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionName) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Modal functions
    function openModal(modal, isEdit = false, itemData = null) {
        // Reset form if not editing
        if (!isEdit) {
            const form = modal.querySelector('form');
            form.reset();
            
            // Reset hidden ID field
            const idField = form.querySelector('input[type="hidden"]');
            if (idField) idField.value = '';
            
            // Update form title for adding new item
            const formTitle = modal.querySelector('h2');
            formTitle.textContent = formTitle.textContent.replace('Edit', 'Add New');
            
            // Hide "current image" sections
            const currentImageDivs = modal.querySelectorAll('[id^="current-"]');
            currentImageDivs.forEach(div => div.classList.add('hidden'));
        } else if (itemData) {
            // Fill form with item data for editing
            fillFormWithData(modal, itemData);
            
            // Update form title for editing
            const formTitle = modal.querySelector('h2');
            formTitle.textContent = formTitle.textContent.replace('Add New', 'Edit');
        }
        
        // Display modal
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    function fillFormWithData(modal, data) {
        // Generic function to fill form fields based on data attributes
        const form = modal.querySelector('form');
        for (const key in data) {
            const field = form.querySelector(`#${key}`);
            if (field) {
                field.value = data[key];
            }
        }
        
        // Show current image info if available
        if (data.imageName) {
            const currentImageDiv = modal.querySelector('[id^="current-"]');
            const imageNameSpan = currentImageDiv.querySelector('span');
            currentImageDiv.classList.remove('hidden');
            imageNameSpan.textContent = data.imageName;
        }
    }

    // Modal open events
    if (addDestinationBtn) {
        addDestinationBtn.addEventListener('click', () => openModal(destinationModal));
    }
    
    if (addRecipeBtn) {
        addRecipeBtn.addEventListener('click', () => openModal(recipeModal));
    }
    
    if (addGuidelineBtn) {
        addGuidelineBtn.addEventListener('click', () => openModal(guidelineModal));
    }
    
    if (addRoadSignBtn) {
        addRoadSignBtn.addEventListener('click', () => openModal(roadSignModal));
    }
    
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => openModal(eventModal));
    }

    // Modal close events
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Edit button functionality
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const section = this.closest('.content-section').id;
            
            // Mock data - in a real application, this would come from an API
            const mockData = getMockDataForItem(section, itemId);
            
            // Open the appropriate modal
            switch(section) {
                case 'destinations':
                    openModal(destinationModal, true, mockData);
                    break;
                case 'food':
                    openModal(recipeModal, true, mockData);
                    break;
                case 'guidelines':
                    openModal(guidelineModal, true, mockData);
                    break;
                case 'road-signs':
                    openModal(roadSignModal, true, mockData);
                    break;
                case 'events':
                    openModal(eventModal, true, mockData);
                    break;
            }
        });
    });

    // Delete button functionality
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const section = this.closest('.content-section').id;
            const row = this.closest('tr');
            
            if (confirm(`Are you sure you want to delete this item (ID: ${itemId})?`)) {
                // In a real application, send delete request to server
                // For demo purposes, just remove the row
                row.remove();
                showNotification('Item deleted successfully!');
            }
        });
    });

    // Form submission handlers
    if (destinationForm) {
        destinationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, destinationModal, 'destination');
        });
    }
    
    if (recipeForm) {
        recipeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, recipeModal, 'recipe');
        });
    }
    
    if (guidelineForm) {
        guidelineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, guidelineModal, 'guideline');
        });
    }
    
    if (roadSignForm) {
        roadSignForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, roadSignModal, 'road sign');
        });
    }
    
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, eventModal, 'event');
        });
    }

    function handleFormSubmit(form, modal, itemType) {
        // Gather form data
        const formData = new FormData(form);
        const itemId = form.querySelector('input[type="hidden"]').value;
        
        // In a real application, send to server via fetch or XMLHttpRequest
        // For demo purposes, just show success message and close modal
        const actionType = itemId ? 'updated' : 'added';
        
        closeModal(modal);
        showNotification(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${actionType} successfully!`);
        
        // Optional: Refresh the table or add new row
        // In a real application, you would update the UI based on server response
        setTimeout(() => {
            if (confirm(`The page needs to refresh to show the ${actionType} ${itemType}. Refresh now?`)) {
                location.reload();
            }
        }, 1000);
    }

    // Notification functionality
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification-popup');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification-popup';
            document.body.appendChild(notification);
            
            // Add styles if not in CSS
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            notification.style.padding = '15px 20px';
            notification.style.borderRadius = '4px';
            notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            notification.style.zIndex = '1000';
            notification.style.transition = 'opacity 0.3s ease-in-out';
        }
        
        // Show notification
        notification.textContent = message;
        notification.style.opacity = '1';
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 3000);
    }

    // Helper function to get mock data for editing
    function getMockDataForItem(section, itemId) {
        // In a real application, this would be an API call
        // Mock data for demonstration purposes
        const mockDataMap = {
            'destinations': {
                '1': {
                    'destination-id': '1',
                    'district-name': 'Jaffna District',
                    'attractions': 'Jaffna Fort, Nallur Temple, Keerimalai Springs',
                    'wildlife': 'Marine life, Birds, Small mammals',
                    'activities': 'Swimming, Boating, Temple visits',
                    'imageName': 'jaffna-map.jpg'
                },
                '2': {
                    'destination-id': '2',
                    'district-name': 'Kilinochchi District',
                    'attractions': 'War Memorial, Elephant Pass, Beaches',
                    'wildlife': 'Elephants, Birds, Reptiles',
                    'activities': 'Wildlife watching, Historical tours',
                    'imageName': 'kilinochchi-map.jpg'
                }
            },
            'food': {
                '1': {
                    'recipe-id': '1',
                    'dish-name': 'Kiribath (Milk rice)',
                    'category': 'Main Dishes',
                    'ingredients': 'Rice\nCoconut milk\nSalt',
                    'price-range': 'LKR 150-200 ($0.45-$0.60)',
                    'imageName': 'kiribath.jpg'
                },
                '2': {
                    'recipe-id': '2',
                    'dish-name': 'Rice and Curry',
                    'category': 'Main Dishes',
                    'ingredients': 'Rice\nCurry (varies)\nSambol\nPickle',
                    'price-range': 'LKR 400-600 ($1.25-$1.85)',
                    'imageName': 'rice-and-curry.jpg'
                }
            },
            'guidelines': {
                '1': {
                    'guideline-id': '1',
                    'guideline-category': 'Religious Practices',
                    'guideline-title': 'Temple Dress Code',
                    'guideline-points': 'Cover shoulders and knees\nRemove shoes before entering\nAvoid wearing hats or sunglasses\nModest clothing preferred',
                    'imageName': 'temple-dress-code.jpg'
                }
            },
            'road-signs': {
                '1': {
                    'road-sign-id': '1',
                    'sign-type': 'Directional informative signs',
                    'sign-title': 'Exit',
                    'sign-description': 'Indicates that Exit from a national highway.',
                    'imageName': 'exit-sign.jpg'
                }
            },
            'events': {
                '1': {
                    'event-id': '1',
                    'event-name': 'Thai Pongal Festival',
                    'event-date': '2025-01-14',
                    'event-end-date': '',
                    'event-location': 'Nationwide',
                    'event-description': 'A harvest festival celebrated by Tamil people.',
                    'imageName': 'thai-pongal.jpg'
                }
            }
        };
        
        return mockDataMap[section] && mockDataMap[section][itemId] 
            ? mockDataMap[section][itemId] 
            : {};
    }

    // Search functionality
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton && searchBar) {
        searchButton.addEventListener('click', function() {
            performSearch(searchBar.value);
        });
        
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    function performSearch(query) {
        if (!query.trim()) {
            showNotification('Please enter a search term');
            return;
        }
        
        query = query.toLowerCase();
        let resultsFound = false;
        
        // Search in all tables
        const tables = document.querySelectorAll('.data-table');
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                const isMatch = text.includes(query);
                
                // Toggle highlighting class
                row.classList.toggle('search-highlight', isMatch);
                
                if (isMatch) {
                    resultsFound = true;
                    
                    // Make sure the section containing the result is visible
                    const section = row.closest('.content-section');
                    if (section && !section.classList.contains('active')) {
                        // Find and click the corresponding nav item
                        const navItem = document.querySelector(`nav li[data-section="${section.id}"]`);
                        if (navItem) {
                            navItem.click();
                        }
                    }
                }
            });
        });
        
        if (resultsFound) {
            showNotification(`Search results found for "${query}"`);
        } else {
            showNotification(`No results found for "${query}"`);
        }
    }

    // Notification bell functionality
    const notificationBell = document.querySelector('.notification');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // In a real application, this would show a dropdown with notifications
            alert('You have 3 new notifications:\n\n- New destination added\n- System maintenance scheduled\n- 5 new user registrations');
        });
    }

    // Add CSS for search highlighting
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: rgba(255, 255, 0, 0.3);
            transition: background-color 0.3s ease;
        }
        .notification-popup {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});