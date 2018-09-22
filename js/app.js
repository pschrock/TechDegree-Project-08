// number of pulls
// https://randomuser.me/api/?results=5000

// Including/Excluding fields
// https://randomuser.me/api/?inc=gender,name,nat
// https://randomuser.me/api/?exc=login

// fetch address
// https://randomuser.me/api/?results=12&inc=picture,name,email,cell,location,dob

const employeesUl = document.querySelector('.employees');
const modal = document.querySelector('.modal');
const modalCardInfo = document.querySelector('.cardInfo');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
let cards;
let selectedCard;

fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,cell,location,dob')
  .then(response => response.json())
  .then(data => generateEmployeeData(data.results))

function generateEmployeeData(data) {
  for (let i = 0; i < data.length; i += 1) {
    const html = `
      <li class="card">
        <div class="image">
          <img src="${data[i].picture.medium}" alt="${capFirstLetter(data[i].name.first)} ${capFirstLetter(data[i].name.last) + "'s"} Avatar">
        </div>
        <h3 class="name">
          <span>${capFirstLetter(data[i].name.first)}</span>
          <span>${capFirstLetter(data[i].name.last)}</span>
        </h3>
        <div class="email">
          <p>${data[i].email}</p>
        </div>
        <div class="cell">
          <p>${data[i].cell}</p>
        </div>
        <div class="city">
          <p>${capFirstLetter(data[i].location.city)}</p>
        </div>
        <div class="address">
          <p>${data[i].location.street},</p>
          <p>${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
        </div>
        <div class="birthdate">
          <p>${data[i].dob.date}</p>
        </div>
      </li>`;
    employeesUl.innerHTML += html;
  }
  generateCards();
}

function generateModalData(data) {
  const html = `
    <div class="avatar">${data.avatar}</div>
    <h3 class="name">${data.name}</h3>
    <div>${data.email}</div>
    <div>${data.cell}</div>
    <div>${data.city}</div>
    <div class="address">${data.address}</div>
    <div>${data.birthdate}</div>`;
  modalCardInfo.innerHTML = html;
}

function capFirstLetter(string) {
//   let stringSplit = string.split(' ');
//   if (stringSplit.length > 1) {
//     for (let i = 0; i < stringSplit.length; i += 1) {
//       stringSplit[i].charAt(0).toUpperCase() + stringSplit[i].slice(1);
//     }
//   } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
//   }
}

function generateCards() {
  cards = document.querySelectorAll('.card');
}

function person(card) {
  let person = {};
  person.avatar = card.children[0].innerHTML;
  person.name = card.children[1].innerHTML;
  person.email = card.children[2].innerHTML;
  person.cell = card.children[3].innerHTML;
  person.city = card.children[4].innerHTML;
  person.address = card.children[5].innerHTML;
  person.birthdate = card.children[6].innerHTML.split('T')[0];
  return person;
}

function arrows() {
  if (selectedCard.previousElementSibling === null) {
    previous.style.display = 'none';
  } else {
    previous.style.display = 'block';
  }
  if (selectedCard.nextElementSibling === null) {
    next.style.display = 'none';
  } else {
    next.style.display = 'block';
  }
}

employeesUl.addEventListener('click', (e) => {
  if(e.target.tagName === 'LI') {
    selectedCard = e.target;
  } else if (e.target.className !== "") {
    selectedCard = e.target.parentNode;
  } else {
    selectedCard = e.target.parentNode.parentNode;
  }
  generateModalData(person(selectedCard));
  arrows();
  modal.style.display = "block";
})

modal.addEventListener('click', (e) => {
  if (e.target.className === 'close') {
    modal.style.display = "none";
  }
})

next.addEventListener('click', () => {
  selectedCard = selectedCard.nextElementSibling;
  if (selectedCard !== null) {
    generateModalData(person(selectedCard));
  }
  arrows();
})

previous.addEventListener('click', () => {
  selectedCard = selectedCard.previousElementSibling;
  if (selectedCard !== null) {
    generateModalData(person(selectedCard));
  }
  arrows();
})
