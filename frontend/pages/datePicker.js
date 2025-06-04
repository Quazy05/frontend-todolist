export function renderDatePicker(app, returnToScreen) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  app.innerHTML = `
    <div class="screen">
      <div class="back-container">
        <button class="back-btn" onclick="goBackFromDatePicker()">←</button>
      </div>

      <h2 style="margin-top: 60px; margin-bottom: 30px;">Choose Date</h2>

      <div class="date-picker-container">
        <div class="calendar-header">
          <button class="nav-btn" onclick="changeMonth(-1)">‹</button>
          <h3 id="monthYear">${getMonthName(currentMonth)} ${currentYear}</h3>
          <button class="nav-btn" onclick="changeMonth(1)">›</button>
        </div>

        <div class="calendar-grid" id="calendarGrid">
          ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `
            <div class="day-header">${day}</div>`).join('')}
        </div>

        <div class="picker-actions">
          <button class="outline" onclick="goBackFromDatePicker()">Cancel</button>
          <button class="primary" onclick="confirmDate()">Choose Date</button>
        </div>
      </div>
    </div>
  `;

  let selectedDate = null;
  let displayMonth = currentMonth;
  let displayYear = currentYear;

  function generateCalendar() {
    const firstDay = new Date(displayYear, displayMonth, 1).getDay();
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const calendarGrid = document.getElementById('calendarGrid');

    // Remove old days (keep only 7 headers)
    while (calendarGrid.children.length > 7) {
      calendarGrid.removeChild(calendarGrid.lastChild);
    }

    // Add empty slots before first date
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day empty';
      calendarGrid.appendChild(empty);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.textContent = day;

      if (
        displayYear === currentDate.getFullYear() &&
        displayMonth === currentDate.getMonth() &&
        day === currentDate.getDate()
      ) {
        dayElement.classList.add('today');
      }

      dayElement.addEventListener('click', () => selectDate(day));
      calendarGrid.appendChild(dayElement);
    }
  }

  function selectDate(day) {
    document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
    const clicked = Array.from(document.querySelectorAll('.day')).find(el => el.textContent == day);
    if (clicked) {
      clicked.classList.add('selected');
      selectedDate = day;
    }
  }

  window.changeMonth = (direction) => {
    displayMonth += direction;
    if (displayMonth > 11) {
      displayMonth = 0;
      displayYear++;
    } else if (displayMonth < 0) {
      displayMonth = 11;
      displayYear--;
    }

    document.getElementById('monthYear').textContent = `${getMonthName(displayMonth)} ${displayYear}`;
    generateCalendar();
  };

  window.goBackFromDatePicker = () => returnToScreen(app);

  window.confirmDate = () => {
    if (selectedDate) {
      const formattedDate = `${getMonthName(displayMonth)} ${selectedDate}, ${displayYear}`;
      returnToScreen(app);
      setTimeout(() => {
        const dateInput = document.getElementById('taskDate');
        if (dateInput) dateInput.value = formattedDate;
      }, 100);
    } else {
      alert('Please select a date');
    }
  };

  generateCalendar();
}

function getMonthName(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
}
