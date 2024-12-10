if (document.body.contentEditable !== 'true') {
    document.body.contentEditable = 'true';
    alert('Inspect is ON');
} else {
    document.body.contentEditable = 'false';
    alert('Inspect is OFF');
}
