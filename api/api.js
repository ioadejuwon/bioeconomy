console.log('api page is loaded');
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    container.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500); // Match the transition duration
    }, 3000);
}


// Disable Dropzone auto-discovery
Dropzone.autoDiscover = false;

// Initialize Dropzone only on the #dropzoneArea div
var myDropzone = new Dropzone("#dropzoneArea", {
    url: "inc/api_abstracts.php",
    autoProcessQueue: false,  // Prevent automatic upload
    parallelUploads: 5,  // Allows multiple files
    uploadMultiple: true,
    addRemoveLinks: true,
    acceptedFiles: "image/*,application/pdf",
    paramName: "files[]",  // Matches PHP handling for multiple files

    init: function () {
        var dzInstance = this;

        document.getElementById("submitBtn").addEventListener("click", function (e) {
            e.preventDefault(); // Prevent form from submitting immediately

            // Append form data to Dropzone request
            dzInstance.options.params = {
                fname: document.querySelector("[name='fname']").value,
                lname: document.querySelector("[name='lname']").value,
                email: document.querySelector("[name='email']").value,
                phone: document.querySelector("[name='phone']").value,
                mode: document.querySelector("[name='mode']").value
            };

            // Process file uploads
            dzInstance.processQueue();
        });

        // After successful upload, submit the form
        dzInstance.on("successmultiple", function (files, response) {
            document.getElementById("edit-images-dropzone").submit();
        });
    }
});

