$(document).ready(function () {
    // Upload handling
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

    function resizeSketchRect() {
        const modal = document.querySelector('.modal');
        const rect = document.querySelector('.modal-svg rect');

        const modalWidth = modal.offsetWidth;
        const modalHeight = modal.offsetHeight;

        // Set rect size to match modal
        rect.setAttribute('width', modalWidth);
        rect.setAttribute('height', modalHeight);

        // Update the stroke-dash values based on perimeter
        const perimeter = 2 * (modalWidth + modalHeight);
        rect.style.strokeDasharray = perimeter;
        rect.style.strokeDashoffset = perimeter;
    }

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

    // Modal logic
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

    $('.button').click(function () {
        const buttonId = $(this).attr('id');
        $('#modal-title').text(modalContent[buttonId].title);
        $('#modal-description').text(modalContent[buttonId].description);
        $('#modal-container')
            .removeClass('out')
            .removeAttr('class')
            .addClass('animation')
            .show();
        resizeSketchRect();
        $('body').addClass('modal-active');
    });

    $('#modal-container').click(function (e) {
        if ($(e.target).closest('.modal').length === 0) {
            $(this).removeClass('animation').addClass('out');
            $('body').removeClass('modal-active');
            setTimeout(() => $(this).hide(), 500);
        }
    });
});