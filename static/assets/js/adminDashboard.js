function approve(id) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-sm btn-success',
      cancelButton: 'btn btn-sm btn-danger'
    },
    buttonsStyling: true
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert and all this approval!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: 'rgb(39, 165, 43)',
    confirmButtonText: 'Yes, approve it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Approved!',
        'You have successfully approved the request',
        'success'
      )
      setTimeout(function () {
        $.ajax({
          url: loadUrl,
          data: {
              'id': id,
          },
          dataType: 'json',
          success: function (data) {
              if (data.approved) {
                console.log(data)
              }
          }
      });
      }, 1500)
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Approval has been cancelled :)',
        'error'
      )
    }
  })
}

function denial(id) {

  Swal.fire({
    title: 'Do you want to denial?',
    text: "You won't be able to revert when denialed!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, denial it!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Denialed!',
        'Your file has been deleted.',
        'success'
      )
      setTimeout(function () {
        $.ajax({
          url: loadDennyUrl,
          data: {
              'id': id,
          },
          dataType: 'json',
          success: function (data) {
              if (data.approved) {
                console.log(data)
              }
          }
      });
      }, 1000)
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
function credited(id) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-sm btn-success',
      cancelButton: 'btn btn-sm btn-danger'
    },
    buttonsStyling: true
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert when credited!",
    icon: 'question',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: 'rgb(255, 163, 26)',
    confirmButtonText: 'Yes, credite it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Credited!',
        'You have successfully credited the account',
        'success'
      )
      setTimeout(function () {
        $.ajax({
          url: loadCreditedUrl,
          data: {
              'id': id,
          },
          dataType: 'json',
          success: function (data) {
              if (data.approved) {
                console.log(data)
              }
          }
      });
          // window.location.href = "../admin/admin_dashboard";
      }, 1500)
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Sorry, the account has not been credited :(',
        'error'
      )
    }
  })
}


function deleteUser(id) {
      var action = confirm("Are you sure you want to delete this user?");
      if (action != false) {
        $.ajax({
            url: '{% url "myadmin:approved"%}',
            data: {
                'id': id,
            },
            dataType: 'json',
            success: function (data) {
                if (data.deleted) {
                  console.log(data)
                }
            }
        });
      }
    }