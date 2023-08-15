document.addEventListener('DOMContentLoaded', function () {
    const charactersPerPage = 20; 
    let currentPage = 1; 
    let totalPages = 1; 
    let charactersData = []; 
  
    
    function getCharactersByPageAndGender(page, gender) {
      const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&gender=${gender}`;
  
      
      fetch(apiUrl)
        .then(response => {
           if (!response.ok) {
            throw new Error('Network response was not ok');
          }
            return response.json();
        })
        .then(data => {
          
          totalPages = data.info.pages;
          
          charactersData = data.results;
          
          displayCharacters(charactersData);
          
          updatePagination();
        })
        .catch(error => {
           console.error('Error fetching data:', error);
        });
    }
  
    
function displayCharacters(characters) {
    const characterListElement = document.getElementById('characterList');
    characterListElement.innerHTML = ''; 
  
    characters.forEach(character => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      const name = document.createElement('p');
      const gender = document.createElement('p');
      const species = document.createElement('p');
      const status = document.createElement('p');
      const origin = document.createElement('p');
      const location = document.createElement('p');
      const moreButton = document.createElement('button');
  
      img.src = character.image;
      img.alt = character.name;
      name.textContent = `Name: ${character.name}`;
      gender.textContent = `Gender: ${character.gender}`;
      species.textContent = `Species: ${character.species}`;
      status.textContent = `Status: ${character.status}`;
      origin.textContent = `Origin: ${character.origin.name}`;
      location.textContent = `Location: ${character.location.name}`;
      moreButton.textContent = 'Ver mas...';
  

       moreButton.addEventListener('click', function () {
        showModal(character);
      });
  
      li.appendChild(img);
      li.appendChild(name);
      li.appendChild(gender);
      li.appendChild(species);
      li.appendChild(status);
      li.appendChild(origin);
      li.appendChild(location);
      li.appendChild(moreButton);
      characterListElement.appendChild(li);
    });
  }
  
  
    // Mostrar la página especificada
    function showPage(page) {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        getCharactersByPageAndGender(currentPage, getSelectedGender());
      }
    }
  
    // Página siguiente
    function nextPage() {
      showPage(currentPage + 1);
    }
  
    // Página anterior
    function prevPage() {
      showPage(currentPage - 1);
    }
  
    // Primera página
    function firstPage() {
      showPage(1);
    }
  
    // Ultima página
    function lastPage() {
      showPage(totalPages);
    }
  
    // Seleccionar genero
    function getSelectedGender() {
      const genderSelect = document.getElementById('genderSelect');
      return genderSelect.value;
    }
  
    
    function updatePagination() {
      const prevButton = document.getElementById('prevButton');
      const nextButton = document.getElementById('nextButton');
      const currentPageElement = document.getElementById('currentPage');
      const totalPagesElement = document.getElementById('totalPages');
  
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
      currentPageElement.textContent = currentPage;
      totalPagesElement.textContent = totalPages;
    }
  
    
    document.getElementById('prevButton').addEventListener('click', prevPage);
    document.getElementById('nextButton').addEventListener('click', nextPage);
    document.getElementById('firstButton').addEventListener('click', firstPage);
    document.getElementById('lastButton').addEventListener('click', lastPage);
    document.getElementById('genderSelect').addEventListener('change', () => {
      showPage(1);
    });
  
    // Inicialmente, mostramos la primera página
    showPage(currentPage);
  });
  
  // Modal para ver mas
function showModal(character) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
  
    const closeButton = document.createElement('span');
    closeButton.textContent = 'X';
    closeButton.classList.add('modal-close');
    closeButton.addEventListener('click', function () {
      modalContainer.style.display = 'none';
    });
  
    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
  
    const name = document.createElement('p');
    name.textContent = `Name: ${character.name}`;
  
    const gender = document.createElement('p');
    gender.textContent = `Gender: ${character.gender}`;
  
    const species = document.createElement('p');
    species.textContent = `Species: ${character.species}`;
  
    const status = document.createElement('p');
    status.textContent = `Status: ${character.status}`;
  
    const origin = document.createElement('p');
    origin.textContent = `Origin: ${character.origin.name}`;
  
    const location = document.createElement('p');
    location.textContent = `Location: ${character.location.name}`;
  
    modalContent.appendChild(closeButton);
    modalContent.appendChild(img);
    modalContent.appendChild(name);
    modalContent.appendChild(gender);
    modalContent.appendChild(species);
    modalContent.appendChild(status);
    modalContent.appendChild(origin);
    modalContent.appendChild(location);
  
    modalContainer.appendChild(modalContent);
  
    document.body.appendChild(modalContainer);
    modalContainer.style.display = 'flex';
  }
  