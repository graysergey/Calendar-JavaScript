const today = new Date();
const MonthAndYear = document.querySelector(`#MonthAndYear`);
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();
// const modal = document.querySelector(`.modal`);
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
