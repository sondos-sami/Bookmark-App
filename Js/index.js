 
  var bookmarkNameInput = document.getElementById("bookmark-name");
  var bookmarkUrlInput = document.getElementById("bookmark-url");
  var updateBtn = document.getElementById("btn-update");
  var submitBtn = document.getElementById("btn-submit");
  var index;
  var websiteList = [];

  if (localStorage.getItem("websiteContainer") !== null) {
    websiteList = JSON.parse(localStorage.getItem("websiteContainer"));
    displayWebsites();
  }
  
function addWebsite() {
  if (validationName() && validationUrl()) {
    var website = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    
    websiteList.push(website);
    localStorage.setItem("websiteContainer", JSON.stringify(websiteList));
    clearInput();
    displayWebsites();
   
    Swal.fire({
      icon: 'success',
      title: 'Bookmark Added!',
      text: 'Your bookmark has been saved successfully',
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    // Show error message if validation fails
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Please check your inputs and try again'
    });
  }
}

  function displayWebsites() {
    var cartoona = "";
    for (var i = 0; i < websiteList.length; i++) {
      cartoona += `
        <tr>
          <th>${i + 1}</th>
          <td>${websiteList[i].name}</td>
          <td><a href="${websiteList[i].url}" target="_blank" id="btn-visit">${websiteList[i].url} </a></td>
          <td><button class="btn btn-danger py-1 px-3" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash"></i></button></td>
          <td><button class="btn btn-warning py-1 px-3" onclick="setUpdateInfo(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
        </tr>
      `;
    }
    document.getElementById("text").innerHTML = cartoona;
  }

  function setUpdateInfo(i) {
    bookmarkNameInput.value = websiteList[i].name;
    bookmarkUrlInput.value = websiteList[i].url;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    index = i;
  }

  function updateWebsite() {
    if (validationName() && validationUrl()) {
      var website = {
        name: bookmarkNameInput.value,
        url: bookmarkUrlInput.value,
      };
      websiteList.splice(index, 1, website);
      localStorage.setItem("websiteContainer", JSON.stringify(websiteList));
      submitBtn.classList.remove("d-none");
      updateBtn.classList.add("d-none");
      clearInput();
      displayWebsites();
    }
  }

function deleteWebsite(i) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      websiteList.splice(i, 1);
      localStorage.setItem("websiteContainer", JSON.stringify(websiteList));
      displayWebsites();
      Swal.fire(
        'Deleted!',
        'Your bookmark has been deleted.',
        'success'
      );
    }
  });

  }

  function validationName() {
    var name = bookmarkNameInput.value;
    var msgName = document.getElementById("msgName");

    if (name === "") {
      msgName.textContent = "Name cannot be empty";
      msgName.classList.remove("d-none");
      bookmarkNameInput.classList.add("is-invalid");
      bookmarkNameInput.classList.remove("is-valid");
      return false;
    }

    var isDuplicate = websiteList.some(function (item, i) {
      return (
        item.name.toLowerCase() === name.toLowerCase() &&
        (typeof index === "undefined" || i !== index)
      );
    });

    if (isDuplicate) {
      msgName.textContent = "Name already exists";
      msgName.classList.remove("d-none");
      bookmarkNameInput.classList.add("is-invalid");
      bookmarkNameInput.classList.remove("is-valid");
      return false;
    }

    msgName.classList.add("d-none");
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    return true;
  }

  function validationUrl() {
    var url = bookmarkUrlInput.value;
    var msgUrl = document.getElementById("msgUrl");
   
var urlPatternString = '^([a-zA-Z]+:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$';
var urlPattern= new RegExp(urlPatternString, 'i');

    if (url === "") {
      msgUrl.textContent = "URL cannot be empty";
      msgUrl.classList.remove("d-none");
      bookmarkUrlInput.classList.add("is-invalid");
      bookmarkUrlInput.classList.remove("is-valid");
      return false;
    }
    if(urlPattern.test(url)){
         msgUrl.classList.add("d-none");
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    return true;
    }
    else if (!urlPattern.test(url)) {
      msgUrl.textContent = "Please enter a valid URL starting with http:// or https://";
      msgUrl.classList.remove("d-none");
      bookmarkUrlInput.classList.add("is-invalid");
      bookmarkUrlInput.classList.remove("is-valid");
      return false;
    }

    
  }

  function clearInput() {
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
    bookmarkNameInput.classList.remove("is-valid", "is-invalid");
    bookmarkUrlInput.classList.remove("is-valid", "is-invalid");
    document.getElementById("msgName").classList.add("d-none");
    document.getElementById("msgUrl").classList.add("d-none");
  }
 
