const swalScript = document.createElement('script');
swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(swalScript);

swalScript.onload = () => {
  if (document.body.contentEditable !== 'true') {
    document.body.contentEditable = 'true';
    Swal.fire({
      title: "Inspect Toggled",
      text: "You Can Edit The Website Now.",
      icon: "success"
    });
  } else {
    document.body.contentEditable = 'false';
    Swal.fire({
      title: "Inspect Disabled",
      text: "You Can No Longer Edit The Website",
      icon: "warning"
    });
  }
};
