$(document).ready(function () {
    // Upload handling (your existing code) remains unchanged
    $('#upload-btn').click(() => $('#file-input').click());

    $('#file-input').on('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            $('.loading-row').css('display', 'flex');
            $('.progress-fill').css('width', '0%');
            $('#file-name').text(file.name);
            uploadVideo(file);
        }
    });

    function uploadVideo(file) {
        const formData = new FormData();
        formData.append('video', file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload_endpoint_here', true);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100;
                $('.progress-fill').css('width', percent + '%');
            }
        };
        xhr.onload = function () {
            if (xhr.status === 200) {
                $('.progress-fill').css('width', '100%');
                console.log('Upload successful!');
            } else {
                console.error('Upload failed.');
            }
        };
        xhr.onerror = () => console.error('Error during upload.');
        xhr.send(formData);
    }

    // Modal content for each icon button
    const modalContent = {
        'practice-btn': {
            title: "Practice Mode",
            description: "Learn with our AI model and get feedback. No pressure, just progress!"
        },
        'challenge-btn': {
            title: "Challenge Mode",
            description: "Compete with others and climb the leaderboard. Pressure’s on!"
        }
    };

    let showModalTimeout;
    let hideModalTimeout;

    // Function to show the modal.
    function showModal(buttonId) {
        clearTimeout(hideModalTimeout);
        $('#modal-title').text(modalContent[buttonId].title);
        $('#modal-description').text(modalContent[buttonId].description);
        $('#modal-container')
            .removeClass('out')
            .removeAttr('class')
            .addClass('animation show') // Add 'show' class for fade-in
            .show();
        $('body').addClass('modal-active');
    }

    // Function to hide the modal.
    function hideModal() {
        clearTimeout(showModalTimeout);
        $('#modal-container')
            .removeClass('animation show') // Remove 'show' class for fade-out
            .addClass('out')
            .hide(); // Ensure the modal is hidden
        $('body').removeClass('modal-active');
    }

    // When hovering over the icon buttons, set a timeout to show the modal.
    $('.button').on('mouseenter', function () {
        const buttonId = $(this).attr('id');
        clearTimeout(hideModalTimeout); // Clear any hide timeout
        showModalTimeout = setTimeout(() => showModal(buttonId), 700); // 0.7-second delay
    });

    // Clear the show timeout if the mouse leaves the button before the modal is shown.
    $('.button').on('mouseleave', function () {
        clearTimeout(showModalTimeout);
    });

    // Clear the hide timeout when the mouse enters the modal container.
    $('#modal-container').on('mouseenter', function () {
        clearTimeout(hideModalTimeout);
    });

    // Set a timeout to hide the modal when the mouse leaves the modal container.
    $('#modal-container').on('mouseleave', function () {
        hideModalTimeout = setTimeout(hideModal, 2000); // 2-second delay
    });

    // Hide the modal when hovering over the card.
    $('.card').on('mouseenter', function () {
        hideModalTimeout = setTimeout(hideModal, 1000); // 1-second delay
    });

    // Clear the hide timeout if the mouse leaves the card before the modal is hidden.
    $('.card').on('mouseleave', function () {
        clearTimeout(hideModalTimeout);
    });

    // Hide the modal when hovering over any other part of the screen.
    $(document).on('mouseenter', function (e) {
        if (!$(e.target).closest('#modal-container').length) {
            hideModalTimeout = setTimeout(hideModal, 2000); // 2-second delay
        }
    });

    // Set a timeout to hide the modal when the mouse leaves the button.
    $('.button').on('mouseleave', function () {
        clearTimeout(showModalTimeout);
        hideModalTimeout = setTimeout(hideModal, 2000); // 2-second delay
    });

    // Remove the mouseleave event from the button since we're focusing on the modal
    // $('.button').on('mouseleave', function () { ... });

    // Remove the document-level mousemove listener since we're using hover
    // $(document).on('mousemove', function (e) { ... });
});
