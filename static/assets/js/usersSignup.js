$(function(){

    $('#workingstatues').awselect({
        background: "#eeeeee", //the dark blue background
        active_background:"aliceblue", // the light blue background
        placeholder_active_color: "orangered", // the dark blue placeholder color
        option_color:"orangered", // the option colors
        vertical_padding: "0px", //top and bottom padding
        horizontal_padding: "10px", // left and right padding,
        immersive: false // immersive option, demonstrated at the next example
    });

    $('#gender').awselect({
        background: "#eeeeee", //the dark blue background
        active_background:"aliceblue", // the light blue background
        placeholder_active_color: "orangered", // the dark blue placeholder color
        option_color:"orangered", // the option colors
        vertical_padding: "0px", //top and bottom padding
        horizontal_padding: "10px", // left and right padding,
        immersive: false // immersive option, demonstrated at the next example
    });

    $('#title').awselect({
        background: "#eeeeee", //the dark blue background
        active_background:"aliceblue", // the light blue background
        placeholder_active_color: "orangered", // the dark blue placeholder color
        option_color:"orangered", // the option colors
        vertical_padding: "0px", //top and bottom padding
        horizontal_padding: "10px", // left and right padding,
        immersive: false // immersive option, demonstrated at the next example
    });
});

function SubmitForm() {

Swal.fire({
    title: 'Submit Loan Forms?',
    text: "Are you sure you want to proceed!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Successfully!',
        'Your application has been submitted',
        'success'
      )
      document.forms['myFirstForm'].addEventListener('submit', function (event) {
        // Do something with the form's data here
        this.style['display'] = 'none';
        event.preventDefault();
    });
    }else{
      swal(
            "Cancelled","You've cancelled your request" , "error"
          );
          // setTimeout(function () {
          //   window.location.href = "../admin/admin_dashboard.html";
          // }, 1000)
        }
  })
}

        // Image Upload 1
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#imageResult')
                        .attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(function () {
            $('#upload').on('change', function () {
                readURL(input);
            });
        });

        /*  ==========================================
            SHOW UPLOADED IMAGE NAME
        * ========================================== */
        var input = document.getElementById('upload');
        var infoArea = document.getElementById('upload-label');

        input.addEventListener('change', showFileName);
        function showFileName(event) {
            var input = event.srcElement;
            var fileName = input.files[0].name;
            infoArea.textContent = 'File name: ' + fileName;
        }

        // Image Upload 2
        function readURL(uploadd) {
            if (uploadd.files && uploadd.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#imageResultt')
                        .attr('src', e.target.result);
                };
                reader.readAsDataURL(uploadd.files[0]);
            }
        }

        $(function () {
            $('#uploadd').on('change', function () {
                readURL(uploadd);
            });
        });

        /*  ==========================================
            SHOW UPLOADED IMAGE NAME
        * ========================================== */
        var uploadd = document.getElementById('uploadd');
        var infoArea = document.getElementById('upload-labell');

        uploadd.addEventListener('change', showFileName);
        function showFileName(event) {
            var uploadd = event.srcElement;
            var fileName = uploadd.files[0].name;
            infoArea.textContent = 'File name: ' + fileName;
        }