// Disable Dropzone auto-discovery
Dropzone.autoDiscover = false;

var myDropzone = new Dropzone("#dropzoneArea", {
    url: "inc/abstracts.php",
    autoProcessQueue: false,  // Prevent auto upload
    parallelUploads: 5,  // Allow multiple files
    uploadMultiple: true,
    addRemoveLinks: true,
    acceptedFiles: ".pdf,.doc,.docx", // Only allow PDFs and Word documents
    dictInvalidFileType: "Only PDF and DOC/DOCX files are allowed.",
    paramName: "file",  // Matches PHP handling

    init: function () {
        var dzInstance = this;

        document.getElementById("submitBtn").addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default form submission

            // Check if files are added
            if (dzInstance.files.length === 0) {
                // alert("Please upload at least one file.");
                showNotification("Please upload at least one file.", "info");
                return;
            }

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

        // On successful file upload, show a success message
        dzInstance.on("successmultiple", function (files, response) {
            if (response.status === "success") {
                // alert(response.message);
                // showNotification(response.message, "success");
                dzInstance.removeAllFiles(true); // Clears Dropzone files
                document.getElementById("abstracts-dropzone").reset(); // Resets the entire form, including the input field
                // window.location.href = "success_page.php"; // Redirect to success page
            } else if (response.status === "info") {
                showNotification(response.message, "info");
            } else {
                showNotification(response.message, "error");
            }
        });

        dzInstance.on("error", function (file, message) {
            // alert("Upload failed: " + message);
            showNotification('Upload failed: '+ message, "error");
        });

        // dzInstance.on("queuecomplete", function () {
        //     // console.log("All uploads completed.");
        //     showNotification('All uploads completed.', "success");
        // });
        dzInstance.on("queuecomplete", function () {
            showNotification('All uploads completed.', "success");            
        });
        
    }
});
