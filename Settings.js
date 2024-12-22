// Open a new blank page
const newWindow = window.open('about:blank', '_blank');

// Ensure the window opened successfully
if (newWindow) {
    // Set the document title
    newWindow.document.title = 'Settings';

    // Add content to the page
    newWindow.document.body.innerHTML = `
        <h1>Settings</h1>
        <p>Executor Level: 1</p>
        <p>Version: 1.5</p>
        <p>User: Paid</p>
        <p>Credits: Menu By Wasd, Drawn On Website By Legend7269, Blooket Cheats By Glixzzy, Prodigy Menu By Wasd, Prodigy Cheats Made By rxzyx</p>
    `;

    // Optionally, you can style the page
    const style = newWindow.document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        p {
            margin: 5px 0;
        }
    `;
    newWindow.document.head.appendChild(style);
} else {
    alert('Failed to open a new window. Make sure pop-ups are allowed.');
}
