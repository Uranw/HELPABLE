// Helper function to create a delete button and attach event listener
function createDeleteButton(collection, id) {
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');

  // Attach event listener for delete
  deleteBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteData(collection, id);
    }
  });

  return deleteBtn;
}

// Function to send a DELETE request to the server
async function deleteData(collection, id) {
  try {
    const response = await fetch(`/api/${collection}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Data deleted successfully');
      // Optionally, remove the card from the UI
      document.getElementById(id).remove();
    } else {
      alert('Failed to delete data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Helper function to create and append a card for feedback data
function createCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');
  card.id = data._id;  // Set the ID for the card

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

  // Append the delete button
  const deleteBtn = createDeleteButton('feedback', data._id);
  card.appendChild(deleteBtn);

  container.appendChild(card);
}

// Helper function to create and append a card for questions data
function createQuestionCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');
  card.id = data._id;  // Set the ID for the card

  card.innerHTML = `
    <h3>${data.name || 'No Name'}</h3>
    <p><strong>Email:</strong> ${data.email || 'No Email'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'No Phone'}</p>
    <p><strong>Suburb:</strong> ${data.suburb || 'No Suburb'}</p>
    <p><strong>Message:</strong> ${data.message || 'No Message'}</p>
  `;

  // Append the delete button
  const deleteBtn = createDeleteButton('questions', data._id);
  card.appendChild(deleteBtn);

  container.appendChild(card);
}

// Helper function to create and append a card for OurApproachContact data
function createOurApproachContactCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');
  card.id = data._id;  // Set the ID for the card

  card.innerHTML = `
    <h3>${data.name || 'No Name'}</h3>
    <p><strong>Support:</strong> ${data.support || 'No Support Info'}</p>
    <p><strong>Family Member:</strong> ${data.familyMember || 'No Family Member Info'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'No Phone'}</p>
    <p><strong>Email:</strong> ${data.email || 'No Email'}</p>
    <p><strong>Concern:</strong> ${data.concern || 'No Concern'}</p>
  `;

  // Append the delete button
  const deleteBtn = createDeleteButton('ourapproachcontact', data._id);
  card.appendChild(deleteBtn);

  container.appendChild(card);
}

// Helper function to create and append a card for form data
function createFormCard(container, data) {
  const card = document.createElement('div');
  card.classList.add('data-card');
  card.id = data._id;  // Set the ID for the card

  card.innerHTML = `
    <h3>${data.name || 'No Name'}</h3>
    <p><strong>Email:</strong> ${data.email || 'No Email'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'No Phone'}</p>
    <p><strong>Suburb:</strong> ${data.suburb || 'No Suburb'}</p>
    <p><strong>Services:</strong> ${data.services.length > 0 ? data.services.join(', ') : 'No Services'}</p>
    <p><strong>Message:</strong> ${data.message || 'No Message'}</p>
  `;

  // Append the delete button
  const deleteBtn = createDeleteButton('forms', data._id);
  card.appendChild(deleteBtn);

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
    const response = await fetch('/api/ourapproachcontact');
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

// Fetch and display form data
async function fetchForms() {
  try {
    const response = await fetch('/api/forms');
    if (!response.ok) {
      throw new Error('Failed to fetch form data');
    }
    const formsData = await response.json();

    // Populate the form data in the DOM
    const formContainer = document.getElementById('formsContainer');
    if (formsData.length === 0) {
      formContainer.innerHTML = '<p>No form data available.</p>';
    } else {
      formsData.forEach(form => {
        createFormCard(formContainer, form);
      });
    }
  } catch (error) {
    console.error('Error fetching form data:', error);
  }
}



// Call the fetch functions when the page loads
fetchQuestions();
fetchOurApproachContacts();
fetchForms();
