// Helper function to create and append a card for feedback data
function createCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');

  card.innerHTML = `
    <h3>${data.name || 'No Name'}</h3>
    <p><strong>Email:</strong> ${data.email || 'No Email'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'No Phone'}</p>
    <p><strong>Suburb:</strong> ${data.suburb || 'No Suburb'}</p>
    <p><strong>Postcode:</strong> ${data.postcode || 'No Postcode'}</p>
    <p><strong>Feedback:</strong> ${data.feedback || 'No Feedback'}</p>
    <p><strong>Story:</strong> ${data.story || 'No Story'}</p>
    <p><strong>Confidential:</strong> ${data.confidential || 'No Confidentiality Info'}</p>
  `;

  container.appendChild(card);
}

// Helper function to create and append a card for questions data
function createQuestionCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');

  card.innerHTML = `
    <h3>${data.name || 'No Name'}</h3>
    <p><strong>Email:</strong> ${data.email || 'No Email'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'No Phone'}</p>
    <p><strong>Suburb:</strong> ${data.suburb || 'No Suburb'}</p>
    <p><strong>Message:</strong> ${data.message || 'No Message'}</p>
  `;

  container.appendChild(card);
}

// Helper function to create and append a card for OurApproachContact data
function createOurApproachContactCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');

  card.innerHTML = `
    <h3>${data.name || 'No Name'}</h3>
    <p><strong>Support:</strong> ${data.support || 'No Support Info'}</p>
    <p><strong>Family Member:</strong> ${data.familyMember || 'No Family Member Info'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'No Phone'}</p>
    <p><strong>Email:</strong> ${data.email || 'No Email'}</p>
    <p><strong>Concern:</strong> ${data.concern || 'No Concern'}</p>
  `;

  container.appendChild(card);
}

// Fetch and display feedback data
fetch('/api/feedback')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch feedback data');
    }
    return response.json();
  })
  .then(data => {
    const feedbackContainer = document.getElementById('feedbackContainer');
    if (data.length === 0) {
      feedbackContainer.innerHTML = '<p>No feedback data available.</p>';
    } else {
      data.forEach(feedback => {
        createCard(feedbackContainer, feedback);
      });
    }
  })
  .catch(error => console.error('Error fetching feedback data:', error));

// Fetch Sidebar Contacts
async function fetchSidebarContacts() {
  try {
    const response = await fetch('/api/sidebar');
    if (!response.ok) {
      throw new Error('Failed to fetch sidebar contacts');
    }
    const sidebarData = await response.json();

    // Populate the sidebar data in the DOM
    const sidebarContainer = document.getElementById('sidebarContainer');
    if (sidebarData.length === 0) {
      sidebarContainer.innerHTML = '<p>No sidebar contact data available.</p>';
    } else {
      sidebarData.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('sidebar-contact');
        contactElement.innerHTML = `
          <strong>Name:</strong> ${contact.name || 'No Name'} <br>
          <strong>Email:</strong> ${contact.email || 'No Email'} <br>
          <strong>Phone:</strong> ${contact.phone || 'No Phone'} <br>
          <strong>Suburb:</strong> ${contact.suburb || 'No Suburb'} <br>
          <strong>Message:</strong> ${contact.message || 'No Message'} <br>
          <hr>
        `;
        sidebarContainer.appendChild(contactElement);
      });
    }
  } catch (error) {
    console.error('Error fetching sidebar contacts:', error);
  }
}

// Fetch and display questions data
async function fetchQuestions() {
  try {
    const response = await fetch('/api/questions');
    if (!response.ok) {
      throw new Error('Failed to fetch questions data');
    }
    const questionsData = await response.json();

    // Populate the questions data in the DOM
    const questionsContainer = document.getElementById('questionsContainer');
    if (questionsData.length === 0) {
      questionsContainer.innerHTML = '<p>No questions data available.</p>';
    } else {
      questionsData.forEach(question => {
        createQuestionCard(questionsContainer, question);
      });
    }
  } catch (error) {
    console.error('Error fetching questions data:', error);
  }
}

// Fetch and display OurApproachContact data
async function fetchOurApproachContacts() {
  try {
    const response = await fetch('/api/ourapproachcontacts');
    if (!response.ok) {
      throw new Error('Failed to fetch Our Approach Contacts data');
    }
    const ourApproachContactsData = await response.json();

    // Populate the Our Approach Contacts data in the DOM
    const ourApproachContactsContainer = document.getElementById('ourApproachContactsContainer');
    if (ourApproachContactsData.length === 0) {
      ourApproachContactsContainer.innerHTML = '<p>No Our Approach Contacts data available.</p>';
    } else {
      ourApproachContactsData.forEach(contact => {
        createOurApproachContactCard(ourApproachContactsContainer, contact);
      });
    }
  } catch (error) {
    console.error('Error fetching Our Approach Contacts data:', error);
  }
}

// Call the functions when the page loads
fetchSidebarContacts();
fetchQuestions();
fetchOurApproachContacts();
