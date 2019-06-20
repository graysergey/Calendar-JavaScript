const today = new Date();
const MonthAndYear = document.querySelector(`#MonthAndYear`);
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();
const modal = document.querySelector(`.modal`);
const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
let tableBody = document.querySelector(`#calendar-body`);

function showCalendar(year, month) {
  const firstDay = (new Date(year, month)).getDay();

  // set title - month and year
  MonthAndYear.innerHTML = `${months[month]} ${year}`;

  // clear calendar rows
  tableBody.innerHTML = ``;

  // creating cells
  let date = 1;
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < 6; i++) {
    let row = document.createElement(`tr`);

    // creating cels in row
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement(`td`);
        let cellText = document.createTextNode(``);
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const cell = document.createElement(`td`);
        const span = document.createElement(`span`);
        const cellParagraph = document.createElement(`p`);
        const cellDate = document.createTextNode(date);

        cell.classList.add(`cell`);
        cell.setAttribute(`data-id`, `${date}-${months[month]}-${year}`);
        cell.setAttribute(`data-date`, `${date}`);
        span.classList.add(`date`);
        cellParagraph.classList.add(`event-massage`);
        cellParagraph.setAttribute(`data-id`, `${date}-${months[month]}-${year}`);

        // add class for current day
        if (year === todayYear && month === todayMonth && todayDate === date) {
          cell.classList.add(`cell-current`);
        }

        span.appendChild(cellDate);
        cell.appendChild(span);
        cell.appendChild(cellParagraph);
        row.appendChild(cell);
        date++;
      }
    }
    fragment.appendChild(row);
  }
  tableBody.appendChild(fragment);
}
showCalendar(currentYear, currentMonth);

// set previous month
const btnPreviousMonth = document.querySelector(`#btn-previous`);
btnPreviousMonth.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentYear, currentMonth);
});

// set next month
const btnNextMonth = document.querySelector(`#btn-next`);
btnNextMonth.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentYear, currentMonth);
});

// set current month
const btnTodayMonth = document.querySelector(`#btn-today`);
btnTodayMonth.addEventListener(`click`, function (evt) {
  evt.preventDefault();

  // reset current Month and Year
  currentYear = todayYear;
  currentMonth = todayMonth;
  showCalendar(currentYear, currentMonth);
});

// Listener on Cell
tableBody.addEventListener(`click`, function (evt) {
  let target = evt.target;
  let targetId = target.getAttribute(`data-id`);
  let targetDate = target.getAttribute(`data-date`);
  if (targetId !== null) {
    showModal(targetDate, targetId);
  }
});

// show modal
function showModal(idDate, id) {
  const closeButton = modal.querySelector(`.modal-cancel-btn`);
  const saveButton = modal.querySelector(`.modal-save-btn`);

  let modalDate = modal.querySelector(`.modal-date`);
  modal.classList.add(`modal-show`);
  modal.setAttribute(`data-id`, id);
  modalDate.innerHTML = `${idDate} ${months[currentMonth]} ${currentYear}`;

  closeButton.addEventListener(`click`, onCloseButton);
  saveButton.addEventListener(`click`, onSaveButton);
}

// close modal
function onCloseButton() {
  const modalText = modal.querySelector(`.modal-textarea`);
  modalText.value = ` `; // clear textarea text
  modal.classList.toggle(`modal-show`);
}

// save modal information
function onSaveButton(evt) {
  evt.preventDefault();
  const textEvent = modal.querySelector(`.modal-textarea`).value;
  const modalID = modal.getAttribute(`data-id`);
  const cellById = tableBody.querySelector(`td[data-id="${modalID}"]`);
  const cellParagraph = cellById.querySelector(`p`);

  // create layout text event massage
  cellParagraph.innerHTML = textEvent;
  onCloseButton();
}
