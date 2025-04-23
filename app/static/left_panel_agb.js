// // Create left panel container
// const leftPanel = document.createElement("div");
// leftPanel.style.width = "250px";
// leftPanel.style.height = "100vh";
// leftPanel.style.backgroundColor =  "#FFFFFF"; // "#3498db"// "#2c3e50" Dark blue shade
// leftPanel.style.color = "white";
// leftPanel.style.display = "flex";
// leftPanel.style.flexDirection = "column";
// leftPanel.style.alignItems = "center";
// leftPanel.style.padding = "20px"; // Add some spacing at the top
// leftPanel.style.position = "fixed";
// leftPanel.style.left = "0";
// leftPanel.style.top = "0";
// leftPanel.style.boxShadow = "2px 0 5px rgba(0, 0, 0, 0.2)";


// // Create logo element
// const logo = document.createElement("img");
// logo.src = "/static/images/logo_only.png";
// logo.alt = "Logo";
// logo.style.width = "120px";
// logo.style.marginBottom = "20px";

// // Create button element
// const button = document.createElement("button");
// button.innerText = "Estimate Revenue";
// button.style.padding = "5px 5px";
// button.style.fontSize = "17px";
// button.style.fontWeight= "bold"; 
// button.style.border = "none";
// button.style.backgroundColor = "green"; // green color
// button.style.color = "white";
// button.style.cursor = "pointer";
// button.style.borderRadius = "5px";
// button.style.transition = "0.3s";
// button.style.transition = "background-color 0.3s, color 0.3s"; // Smooth transition
// // Fix: Properly align icon and text
// button.style.display = "flex";
// button.style.alignItems = "center"; // Align icon and text vertically
// button.style.justifyContent = "center"; // Center content
// button.style.gap = "10px"; // Space between icon and text


// // Create circle container for the icon
// const iconContainer = document.createElement("div");
// iconContainer.style.width = "30px";
// iconContainer.style.height = "30px";
// iconContainer.style.borderRadius = "50%"; // Makes it a circle
// iconContainer.style.backgroundColor = "white"; // White circle
// iconContainer.style.display = "flex";
// iconContainer.style.alignItems = "center";
// iconContainer.style.justifyContent = "center";

// // Create dollar icon
// const icon = document.createElement("i");
// icon.className = "fas fa-dollar-sign"; // Font Awesome dollar sign icon
// icon.style.fontSize = "16px"; // Adjust icon size
// icon.style.color = "#3498db"; // Match button background color

// // Add icon inside the circle container
// iconContainer.appendChild(icon);

// // Add circle icon to button
// button.prepend(iconContainer);


// button.addEventListener("mouseover", () => {
//   button.style.backgroundColor = "#006400"; // Darker green on hover
// });

// button.addEventListener("mouseout", () => {
//   button.style.backgroundColor = "green";
// });

// button.addEventListener("click", () => {
//   const draw_data = draw.getAll().features[0];
//   if (draw_data == null){
//     alert("Please draw an polygon to define the area of interest!")
//     return;
//   } else {
//     // modalprop.style.display = "block";
//     $('#propModal').modal('show');
  
//   }
// });

// // Create button element
// const button_risk = document.createElement("button");
// button_risk.innerText = "Estimate Revenue";
// button_risk.style.padding = "5px 5px";
// button_risk.style.fontSize = "17px";
// button_risk.style.fontWeight= "bold"; 
// button_risk.style.border = "none";
// button_risk.style.backgroundColor = "green"; // green color
// button_risk.style.color = "white";
// button_risk.style.cursor = "pointer";
// button_risk.style.borderRadius = "5px";
// button_risk.style.transition = "0.3s";
// button_risk.style.transition = "background-color 0.3s, color 0.3s"; // Smooth transition
// // Fix: Properly align icon and text
// button_risk.style.display = "flex";
// button_risk.style.alignItems = "center"; // Align icon and text vertically
// button_risk.style.justifyContent = "center"; // Center content
// button_risk.style.gap = "10px"; // Space between icon and text


// // Append elements to left panel
// leftPanel.appendChild(logo);
// leftPanel.appendChild(button);

// // Append left panel to body
// document.body.appendChild(leftPanel);


// Create left panel
const leftPanel = document.createElement("div");
leftPanel.style.width = "280px";
leftPanel.style.height = "100vh"; 
leftPanel.style.position = "fixed";
leftPanel.style.left = "0";
leftPanel.style.top = "0";
leftPanel.style.backgroundColor = "#FFFFFF"; 
leftPanel.style.display = "flex";
leftPanel.style.flexDirection = "column";
leftPanel.style.alignItems = "center";
leftPanel.style.padding = "20px";
leftPanel.style.boxShadow = "2px 0 5px rgba(0, 0, 0, 0.2)";

// Create logo
const logo = document.createElement("img");
logo.src = "/static/images/logo_only.png";
logo.alt = "Logo";
logo.style.width = "120px";
logo.style.marginBottom = "20px";

// Function to create a button with an icon inside a circle
function createButton(text, iconClass, bgColor, hoverBgColor, iconColor, hoverIconColor) {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.padding = "10px 20px";
    button.style.fontSize = "18px";
    button.style.border = "none";
    button.style.backgroundColor = "green"; // Initial color
    button.style.color = "white"; // Text color
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.transition = "background-color 0.3s, color 0.3s";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.gap = "10px";
    button.style.width = "250px"; // Ensure buttons have the same width
    button.style.marginBottom = "15px"; // Space between buttons

    // Create circular icon container
    const iconContainer = document.createElement("div");
    iconContainer.style.width = "30px";
    iconContainer.style.height = "30px";
    iconContainer.style.borderRadius = "50%"; // Makes it a circle
    iconContainer.style.backgroundColor = "white"; // White circle
    iconContainer.style.display = "flex";
    iconContainer.style.alignItems = "center";
    iconContainer.style.justifyContent = "center";

    // Create icon
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.fontSize = "16px";
    icon.style.color = iconColor; // Initial icon color

    // Add icon inside the circle
    iconContainer.appendChild(icon);
    button.prepend(iconContainer);

    // Hover effects
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = hoverBgColor;
        icon.style.color = hoverIconColor;
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = bgColor;
        icon.style.color = iconColor;
    });

    return button;
}

// Create "Click Me" button with a dollar icon
const dollarButton = createButton(
    "Revenue Estimate",
    "fas fa-dollar-sign",
    "#3498db",  // Blue background
    "#006400",  // Deep green on hover
    "#3498db",  // Blue icon color
    "#006400"   // Green icon color on hover
);

// Create "Risk Assessment" button with a warning icon
const riskButton = createButton(
    "Risk Assessment",
    "fas fa-exclamation-triangle",
    "#e74c3c",  // Red background
    "#8B0000",  // Dark red on hover
    "#e74c3c",  // Red icon color
    "#8B0000"   // Dark red icon color on hover
);

const topControls = document.createElement('div');
topControls.style.display = 'flex';
topControls.style.flexDirection = 'column';
topControls.style.alignItems = 'center';
topControls.style.width = '100%';

// Append logo and main buttons into topControls
topControls.appendChild(logo);
topControls.appendChild(dollarButton);
topControls.appendChild(riskButton);

// Clear any existing children and re‑append topControls first
leftPanel.innerHTML = '';
leftPanel.appendChild(topControls);

// 2. Create the projects section as a grey box
const projectSection = document.createElement('div');
projectSection.style.width = '100%';
projectSection.style.marginTop = '20px';
projectSection.style.backgroundColor = '#f0f0f0';
projectSection.style.padding = '10px';
projectSection.style.borderRadius = '4px';
projectSection.style.overflowY = 'auto';
// Reserve space under topControls (adjust 200px if topControls grows)
projectSection.style.maxHeight = 'calc(100vh - 200px)';

// Header
const projectHeader = document.createElement('h5');
projectHeader.textContent = 'Your Projects';
projectHeader.style.margin = '0 0 10px';
projectHeader.style.fontSize = '16px';
projectHeader.style.textAlign = 'center';
projectSection.appendChild(projectHeader);

// List container
const projectList = document.createElement('div');
projectList.id = 'projectList';
projectList.style.display = 'flex';
projectList.style.flexDirection = 'column';
projectList.style.gap = '10px';
projectSection.appendChild(projectList);



// 3. Fetch projects and render as dark grey buttons
fetch('/projects/1')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  })
  .then(projects => {
    const list = document.getElementById('projectList');
    list.innerHTML = '';
    projects.forEach(p => {
      const btn = document.createElement('button');
      btn.textContent = `Project #${p.project_id}`;
      btn.style.backgroundColor = '#6c757d';   // dark grey
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.width = '100%';
      btn.style.borderRadius = '4px';
      btn.style.padding = '8px';
      btn.style.textAlign = 'left';
      btn.style.cursor = 'pointer';

      btn.addEventListener('mouseover', () => btn.style.backgroundColor = '#5a6268');
      btn.addEventListener('mouseout',  () => btn.style.backgroundColor = '#6c757d');
      btn.addEventListener('click',    () => {
        alert(`Selected Project ${p.project_id}`);
        // TODO: load project details or zoom map
      });

      list.appendChild(btn);
    });
  })
  .catch(err => {
    console.error(err);
    projectList.innerHTML = '<div class="text-danger">Unable to load projects.</div>';
  });



dollarButton.addEventListener("click", () => {
  const draw_data = draw.getAll().features[0];
  if (draw_data == null){
    alert("Please draw a polygon to define the area of interest!")
    return;
  } else {
    // modalprop.style.display = "block";
    $('#propModal').modal('show');
  
  }
});

// Append elements to the left panel
leftPanel.appendChild(logo);
leftPanel.appendChild(dollarButton);
leftPanel.appendChild(riskButton);
leftPanel.appendChild(projectSection);
// Append the left panel to the body
document.body.appendChild(leftPanel);
