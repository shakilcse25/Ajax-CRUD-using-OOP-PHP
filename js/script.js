var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));

// get pagination
function pagination(totalpages, currentpage) {
  var pagelist = "";
  if (totalpages >= 1) {
    currentpage = parseInt(currentpage);
    pagelist += `<ul class="pagination justify-content-center">`;
    const prevClass = currentpage == 1 ? " disabled" : "";
    pagelist += `<li class="page-item${prevClass}"><a class="page-link" href="#" data-page="${
      currentpage - 1
    }">Previous</a></li>`;
    for (let p = 1; p <= totalpages; p++) {
      const activeClass = currentpage == p ? " active" : "";
      pagelist += `<li class="page-item${activeClass}"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
    }
    const nextClass = currentpage == totalpages ? " disabled" : "";
    pagelist += `<li class="page-item${nextClass}"><a class="page-link" href="#" data-page="${
      currentpage + 1
    }">Next</a></li>`;
    pagelist += `</ul>`;
  }

  $("#pagination").html(pagelist);
}

// get player row
function getprofilerow(profile) {
  var playerRow = "";
  if (profile) {
    const userphoto = profile.photo ? profile.photo : "default.png";
    profileRow = `<tr>
          <td class="align-middle"><img src="uploads/${userphoto}" class="img-thumbnail rounded float-left"></td>
          <td class="align-middle">${profile.fname}</td>
          <td class="align-middle">${profile.lname}</td>
          <td class="align-middle">
            <a href="#" class="btn btn-success mr-3 edituser" data-toggle="modal" data-target="#userModal" title="Edit" data-id="${profile.id}">Update</a>
          </td>
          <td class="align-middle"><a href="#" class="btn btn-danger deleteuser" data-userid="14" title="Delete" data-id="${profile.id}">Delete</a></td>
        </tr>`;
  }
  return profileRow;
}
// get players list
function getprofiles() {

  var pageno = $("#currentpage").val();
  $.ajax({
    url: dir + "/ajax.php",
    type: "GET",
    dataType: "json",
    data: { page: pageno, action: "getusers" },
    beforeSend: function () {
      $("#overlay").fadeIn();
    },
    success: function (rows) {
      console.log(rows);
      if (rows.profiles) {
        var profileslist = "";
        $.each(rows.profiles, function (index, profile) {
          profileslist += getprofilerow(profile);
        });
        $("#userstable tbody").html(profileslist);
        let totalProfiles = rows.count;
        let totalpages = Math.ceil(parseInt(totalProfiles) / 4);
        const currentpage = $("#currentpage").val();
        pagination(totalpages, currentpage);
        $("#overlay").fadeOut();
      }
    },
    error: function () {
      console.log("something went wrong");
    },
  });
}

$(document).ready(function () {
  // add/edit user
  $(document).on("submit", "#addform", function (event) {
    event.preventDefault();
    var alertmsg =
      $("#userid").val().length > 0
        ? "Player has been updated Successfully!"
        : "New Player has been added Successfully!";
    $.ajax({
      url: dir + "/ajax.php",
      type: "POST",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      beforeSend: function () {
        $("#overlay").fadeIn();
      },
      success: function (response) {
        console.log(response);
        if (response) {
          $("#userModal").modal("hide");
          $("#addform")[0].reset();
          $(".message").html(alertmsg).fadeIn().delay(3000).fadeOut();
          getprofiles();
          $("#overlay").fadeOut();
        }
      },
      error: function () {
        console.log("Oops! Something went wrong!");
      },
    });
  });
  // pagination
  $(document).on("click", "ul.pagination li a", function (e) {
    e.preventDefault();
    var $this = $(this);
    const pagenum = $this.data("page");
    $("#currentpage").val(pagenum);
    getprofiles();
    $this.parent().siblings().removeClass("active");
    $this.parent().addClass("active");
  });
  // form reset on new button
  $("#addnewbtn").on("click", function () {
    $("#addform")[0].reset();
    $("#userid").val("");
  });
  //  get user

  $(document).on("click", "#addnewbtn", function () {
    $("#exampleModalLabel").html("Add Profile");
  });

  $(document).on("click", "a.edituser", function () {
    var pid = $(this).data("id");

    $("#exampleModalLabel").html("Update Profile");

    $.ajax({
      url: dir + "/ajax.php",
      type: "GET",
      dataType: "json",
      data: { id: pid, action: "getuser" },
      beforeSend: function () {
        $("#overlay").fadeIn();
      },
      success: function (profile) {
        if (profile) {
          $("#fname").val(profile.fname);
          $("#lname").val(profile.lname);
          $("#userid").val(profile.id);
        }
        $("#overlay").fadeOut();
      },
      error: function () {
        console.log("something went wrong");
      },
    });
  });

  // delete user
  $(document).on("click", "a.deleteuser", function (e) {
    e.preventDefault();
    var pid = $(this).data("id");
    if (confirm("Are you sure want to delete this?")) {
      $.ajax({
        url: dir + "/ajax.php",
        type: "GET",
        dataType: "json",
        data: { id: pid, action: "deleteuser" },
        beforeSend: function () {
          $("#overlay").fadeIn();
        },
        success: function (res) {
          if (res.deleted == 1) {
            $(".message")
              .html("Player has been deleted successfully!")
              .fadeIn()
              .delay(3000)
              .fadeOut();
            getprofiles();
            $("#overlay").fadeOut();
          }
        },
        error: function (e) {
          console.log(e);
          console.log("something went wrong");
        },
      });
    }
  });


  // searching
  $("#searchinput").on("keyup", function () {
    const searchText = $(this).val();
    if (searchText.length > 1) {
      $.ajax({
        url: dir + "/ajax.php",
        type: "GET",
        dataType: "json",
        data: { searchQuery: searchText, action: "search" },
        success: function (profiles) {
          if (profiles) {
            var profileslist = "";
            $.each(profiles, function (index, profile) {
              profileslist += getprofilerow(profile);
            });
            $("#userstable tbody").html(profileslist);
            $("#pagination").hide();
          }
        },
        error: function () {
          console.log("something went wrong");
        },
      });
    } else {
      getprofiles();
      $("#pagination").show();
    }
  });
  // load players
  getprofiles();
});
