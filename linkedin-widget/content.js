const widgetHTML = `
  <div id="linkedin-widget" style="position: fixed; bottom: 20px; right: 20px; width: 300px; padding: 10px; background-color: white; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 10px; font-family: Arial, sans-serif; display: none;">
    <h3 style="font-size: 16px; margin-bottom: 10px; font-weight: bold;">Company Information</h3>
    <p id="company-name" style="font-size: 14px; margin-bottom: 5px;"></p>
    <div id="match-score" style="margin-bottom: 5px;">
      <label style="font-size: 14px;">Match Score:</label>
      <progress id="score-bar" max="100" value="0" style="width: 100%;"></progress>
    </div>
    <span id="account-status" style="padding: 5px 10px; font-size: 14px; font-weight: bold; color: white; border-radius: 5px;"></span>
    <br>
    <button id="toggle-widget" style="margin-top: 10px; padding: 5px 10px; font-size: 14px; background-color: #0073b1; color: white; border: none; border-radius: 5px;">Hide Widget</button>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', widgetHTML);

const widget = document.getElementById('linkedin-widget');
const toggleButton = document.getElementById('toggle-widget');
const companyName = document.getElementById('company-name');
const scoreBar = document.getElementById('score-bar');
const accountStatus = document.getElementById('account-status');

const sampleData = {
  companyName: 'TechCorp',
  matchScore: 86,
  accountStatus: 'Target'
};

companyName.textContent = sampleData.companyName;
scoreBar.value = sampleData.matchScore;
accountStatus.textContent = sampleData.accountStatus;
accountStatus.style.backgroundColor = sampleData.accountStatus === 'Target' ? 'green' : 'red';

chrome.storage.local.get('widgetVisible', function(data) {
  if (data.widgetVisible === false) {
    widget.style.display = 'none';
  } else {
    widget.style.display = 'block';
  }
});

toggleButton.addEventListener('click', function() {
  const isVisible = widget.style.display !== 'none';
  chrome.storage.local.set({ 'widgetVisible': !isVisible });
  widget.style.display = isVisible ? 'none' : 'block';
});

