if (document.body.contentEditable !== 'true') {
    document.body.contentEditable = 'true';
    alert('ContentEditable is ON');
} else {
    document.body.contentEditable = 'false';
    alert('ContentEditable is OFF');
}
