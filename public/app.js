$(document).ready(function () {
  // Toggle Sidebar At Large Screen
  $("#menu-bar-max").click(function () {
    // for max-bar
    if ($('#sidebar').hasClass('mini-sidebar')) {
      $('#sidebar').removeClass('mini-sidebar').animate({
        width: "224px",
      }, {
        duration: 50,
        specialEasing: {
          width: "linear",
        }
      });
      $('.max-bar-item').show(300);
      $('#logo').addClass('mx-20');
      $('#main').addClass('lg:ml-56').removeClass('lg:ml-16');
    }
    // for mini-bar
    else {
      $('#sidebar').addClass('mini-sidebar').animate({
        width: "64px",
      }, {
        duration: 50,
        specialEasing: {
          width: "linear",
        }
      });
      $('#logo').removeClass('mx-20');
      $('.max-bar-item').hide(300);
      $('#main').removeClass('lg:ml-56').addClass('lg:ml-16');
    }
    return false;
  });
  // Toggle Sidebar At Small Screen
  $("#menu-bar-min").click(function () {
    if ($('#sidebar').hasClass('hidden')) {
      $('#sidebar').removeClass('hidden').addClass('flex');
    }
    else if ($('#sidebar').hasClass('mini-sidebar')) {
      $('#sidebar').removeClass('mini-sidebar').animate({
        width: "224px",
      }, {
        duration: 50,
        specialEasing: {
          width: "linear",
        }
      });
      $('.max-bar-item').show(300);
    }
    else {
      $('#sidebar').addClass('hidden').removeClass('flex');
    }
    return false;
  });

  // Toggle mini Sidebar on hover
  $("#sidebar")
    .mouseenter(function () {
      if ($(this).hasClass('mini-sidebar')) {
        $('.max-bar-item').show(300);
        $('#sidebar').animate({
          width: "224px",
        }, {
          duration: 50,
          specialEasing: {
            width: "linear",
          }
        });
      }
    })
    .mouseleave(function () {
      if ($(this).hasClass('mini-sidebar')) {
        $('.max-bar-item').hide(300);
        $('#sidebar').animate({
          width: "64px",
        }, {
          duration: 50,
          specialEasing: {
            width: "linear",
          }
        });
      }
    });

  // Toggle Search Box
  $("#ToggleSearchBox").click(function () {
    $('#SearchBox').toggleClass("hidden");
  });
  // Navbar Show hide popover
  $(".nav-dropdown").click(function () {
    $(this).find(".dropdown-menu").slideToggle("slow");
    $(this).find(".navbar-arrow").toggleClass("rotate-180");
  });

  //  Close popover on click outside
  $(document).on("click", function (event) {
    var $trigger1 = $("#admin-dropdown");
    var $trigger2 = $("#language-dropdown");
    var $trigger3 = $("#filter");  // close Filter popover on click outside
    if ($trigger1 !== event.target && !$trigger1.has(event.target).length) {
      $trigger1.find(".dropdown-menu").slideUp('slow');
      $trigger1.find(".navbar-arrow").removeClass("rotate-180");
    }
    if ($trigger2 !== event.target && !$trigger2.has(event.target).length) {
      $trigger2.find(".dropdown-menu").slideUp('slow');
      $trigger2.find(".navbar-arrow").removeClass("rotate-180");
    }
    // close Filter popover on click outside
    if ($trigger3 !== event.target && !$trigger3.has(event.target).length) {
      $trigger3.find(".filter-menu").slideUp('slow');
    }
  });

  // Sidebar dropdown
  var Sidemenu = function () {
    this.$menuItem = $('#sidebar-menu a');
  };

  function init() {
    var $this = Sidemenu;
    $('#sidebar-menu a').on('click', function (e) {
      if ($(this).parent().hasClass('submenu')) {
        e.preventDefault();
      }
      if (!$(this).hasClass('subdrop')) {
        $('ul', $(this).parents('ul:first')).slideUp(350);
        $('ul', $(this).parents('ul:first')).find(".menu-arrow").removeClass('rotate-90');
        $('a', $(this).parents('ul:first')).removeClass('subdrop');
        $('a', $(this).parents('ul:first')).find(".menu-arrow").removeClass('rotate-90');
        $(this).next('ul').slideDown(350);
        $(this).addClass('subdrop');
        $(this).find(".menu-arrow").addClass('rotate-90');

      } else if ($(this).hasClass('subdrop')) {
        $(this).removeClass('subdrop');
        $(this).next('ul').slideUp(350);
        $(this).find(".menu-arrow").removeClass('rotate-90');
      }
    });
    $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
  }

  // Sidebar Initiate
  init();


  // Table filter
    $("#filter-dropdown").click(function () {
      $('#filter').find(".filter-menu").slideToggle("slow");
    });
    $(".filter-menu").click(function () {
      var UncheckedBoxes = new Array();
      var CheckedBoxes = new Array();
      $('.filter-checkbox:checkbox:not(:checked)').each(function () {
        UncheckedBoxes.push(this.value);
      });
      $('.filter-checkbox:checkbox:checked').each(function () {
        CheckedBoxes.push(this.value);
      });
      var len1 = UncheckedBoxes.length;
      var len2 = CheckedBoxes.length;
      while (len1 > 0) {
        len1--;
        $('.' + UncheckedBoxes[len1]).hide();
      }
      while (len2 > 0) {
        len2--;
        $('.' + CheckedBoxes[len2]).show();
      }
    });

    // Table Search
    $("#table-search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#table-1 tbody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
  });

});


// multiple image upload


const fileTempl = document.getElementById("file-template"),
  imageTempl = document.getElementById("image-template"),
  empty = document.getElementById("empty");

// use to store pre selected files
let FILES = {};

// check if file is of type image and prepend the initialied
// template to the target element
function addFile(target, file) {
  const isImage = file.type.match("image.*"),
    objectURL = URL.createObjectURL(file);

  const clone = isImage
    ? imageTempl.content.cloneNode(true)
    : fileTempl.content.cloneNode(true);

  clone.querySelector("h1").textContent = file.name;
  clone.querySelector("li").id = objectURL;
  clone.querySelector(".delete").dataset.target = objectURL;
  clone.querySelector(".size").textContent =
    file.size > 1024
      ? file.size > 1048576
        ? Math.round(file.size / 1048576) + "mb"
        : Math.round(file.size / 1024) + "kb"
      : file.size + "b";

  isImage &&
    Object.assign(clone.querySelector("img"), {
      src: objectURL,
      alt: file.name
    });

  empty.classList.add("hidden");
  target.prepend(clone);

  FILES[objectURL] = file;
}

const gallery = document.getElementById("gallery"),
  overlay = document.getElementById("overlay");

// click the hidden input of type file if the visible button is clicked
// and capture the selected files
const hidden = document.getElementById("hidden-input");
document.getElementById("button").onclick = () => hidden.click();
hidden.onchange = (e) => {
  for (const file of e.target.files) {
    addFile(gallery, file);
  }
};

// use to check if a file is being dragged
const hasFiles = ({ dataTransfer: { types = [] } }) =>
  types.indexOf("Files") > -1;

// use to drag dragenter and dragleave events.
// this is to know if the outermost parent is dragged over
// without issues due to drag events on its children
let counter = 0;

// reset counter and append file to gallery when file is dropped
function dropHandler(ev) {
  ev.preventDefault();
  for (const file of ev.dataTransfer.files) {
    addFile(gallery, file);
    overlay.classList.remove("draggedover");
    counter = 0;
  }
}

// only react to actual files being dragged
function dragEnterHandler(e) {
  e.preventDefault();
  if (!hasFiles(e)) {
    return;
  }
  ++counter && overlay.classList.add("draggedover");
}

function dragLeaveHandler(e) {
  1 > --counter && overlay.classList.remove("draggedover");
}

function dragOverHandler(e) {
  if (hasFiles(e)) {
    e.preventDefault();
  }
}

// event delegation to caputre delete events
// fron the waste buckets in the file preview cards
gallery.onclick = ({ target }) => {
  if (target.classList.contains("delete")) {
    const ou = target.dataset.target;
    document.getElementById(ou).remove(ou);
    gallery.children.length === 1 && empty.classList.remove("hidden");
    delete FILES[ou];
  }
};

// print all selected files
document.getElementById("submit").onclick = () => {
  alert(`Submitted Files:\n${JSON.stringify(FILES)}`);
  console.log(FILES);
};

// clear entire selection
document.getElementById("cancel").onclick = () => {
  while (gallery.children.length > 0) {
    gallery.lastChild.remove();
  }
  FILES = {};
  empty.classList.remove("hidden");
  gallery.append(empty);
};


// multiple image upload end