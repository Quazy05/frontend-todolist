export function renderTimePicker(app, returnToScreen) {
  let selectedHour = 9;
  let selectedMinute = 0;
  let selectedPeriod = 'AM';
  
  app.innerHTML = `
    <div class="screen">
      <div class="back-container">
        <button class="back-btn" onclick="goBackFromTimePicker()">←</button>
      </div>
      
      <h2 style="margin-top: 60px; margin-bottom: 30px;">Choose Time</h2>
      
      <div class="time-picker-container">
        <div class="time-display">
          <div class="time-section">
            <button class="time-btn up" onclick="changeHour(1)">▲</button>
            <div class="time-number" id="hourDisplay">${selectedHour.toString().padStart(2, '0')}</div>
            <button class="time-btn down" onclick="changeHour(-1)">▼</button>
          </div>
          
          <div class="time-separator">:</div>
          
          <div class="time-section">
            <button class="time-btn up" onclick="changeMinute(1)">▲</button>
            <div class="time-number" id="minuteDisplay">${selectedMinute.toString().padStart(2, '0')}</div>
            <button class="time-btn down" onclick="changeMinute(-1)">▼</button>
          </div>
          
          <div class="time-section">
            <button class="time-btn up" onclick="changePeriod()">▲</button>
            <div class="time-period" id="periodDisplay">${selectedPeriod}</div>
            <button class="time-btn down" onclick="changePeriod()">▼</button>
          </div>
        </div>
        
        <div class="picker-actions">
          <button class="outline" onclick="goBackFromTimePicker()">Cancel</button>
          <button class="primary" onclick="confirmTime()">Save</button>
        </div>
      </div>
    </div>
  `;
  
  window.changeHour = (direction) => {
    selectedHour += direction;
    if (selectedHour > 12) selectedHour = 1;
    if (selectedHour < 1) selectedHour = 12;
    document.getElementById('hourDisplay').textContent = selectedHour.toString().padStart(2, '0');
  };
  
  window.changeMinute = (direction) => {
    selectedMinute += direction * 5; // Change by 5-minute intervals
    if (selectedMinute > 59) selectedMinute = 0;
    if (selectedMinute < 0) selectedMinute = 55;
    document.getElementById('minuteDisplay').textContent = selectedMinute.toString().padStart(2, '0');
  };
  
  window.changePeriod = () => {
    selectedPeriod = selectedPeriod === 'AM' ? 'PM' : 'AM';
    document.getElementById('periodDisplay').textContent = selectedPeriod;
  };
  
  window.goBackFromTimePicker = () => returnToScreen(app);
  
  window.confirmTime = () => {
    const formattedTime = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    returnToScreen(app);
    // Set the time value after returning to add task screen
    setTimeout(() => {
      const timeInput = document.getElementById('taskTime');
      if (timeInput) timeInput.value = formattedTime;
    }, 100);
  };
}