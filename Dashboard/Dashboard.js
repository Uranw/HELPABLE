// Helper function to create and append card
function createCard(container, data) {
    const card = document.createElement('div');
    card.classList.add('data-card');
  
    card.innerHTML = `
      <h3>${data.name}</h3>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `;
  
    container.appendChild(card);
  }
  
  // Fetch feedback data
  fetch('/api/feedback')
    .then(response => response.json())
    .then(data => {
      const feedbackContainer = document.getElementById('feedbackContainer');
      data.forEach(feedback => {
        createCard(feedbackContainer, feedback);
      });
    })
    .catch(error => console.error('Error fetching feedback data:', error));
  
  // Fetch sidebar question data
  fetch('/api/sidebar')
    .then(response => response.json())
    .then(data => {
      const sidebarContainer = document.getElementById('sidebarContainer');
      data.forEach(question => {
        createCard(sidebarContainer, question);
      });
    })
    .catch(error => console.error('Error fetching sidebar questions:', error));
