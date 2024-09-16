// Helper function to create and append card
function createCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');

  card.innerHTML = `
    <h3>${data.name}</h3>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Suburb:</strong> ${data.suburb}</p>
    <p><strong>Postcode:</strong> ${data.postcode}</p>
    <p><strong>Feedback:</strong> ${data.feedback}</p>
    <p><strong>Story:</strong> ${data.story}</p>
    <p><strong>Confidential:</strong> ${data.confidential}</p>
  `;

  container.appendChild(card);
}

// Fetch and display feedback data
fetch('/api/feedback')
  .then(response => response.json())
  .then(data => {
    const feedbackContainer = document.getElementById('feedbackContainer');
    data.forEach(feedback => {
      createCard(feedbackContainer, feedback);
    });
  })
  .catch(error => console.error('Error fetching feedback data:', error));

// Fetch and display sidebar question data
fetch('/api/sidebar')
  .then(response => response.json())
  .then(data => {
    console.log('Sidebar Data:', data); // Add this line to check
    const sidebarContainer = document.getElementById('sidebarContainer');
    data.forEach(question => {
      createCard(sidebarContainer, question);
    });
  })
  .catch(error => console.error('Error fetching sidebar questions:', error));

// You can replicate this pattern to fetch other collections (forms, ourapproachs, questions)
