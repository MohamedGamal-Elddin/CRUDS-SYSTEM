// global variables
let documentHtml = document;
let dataContainer = [];
let index = 0 ; // when update data
let siteName = documentHtml.getElementById('siteName'),
    siteUrl = documentHtml.getElementById('siteUrl'),
    btnAdd = documentHtml.getElementById('btnAdd'),
    btnUpdate = documentHtml.getElementById('btnUpdate'),
    tableBody = documentHtml.getElementById('tableBody'),
    searchBook = documentHtml.getElementById('searchBook'),
    alertName = documentHtml.getElementById("alertName"),
    alertUrl = documentHtml.getElementById("alertUrl"),
    alertExists = documentHtml.getElementById("alertExists"),
    updateInfo = documentHtml.getElementById('updateInfo')


// check local storage is empty or in it books
  if(getLocalStorage() !== null){
    dataContainer = getLocalStorage()
    displayData()
  }



// events
btnAdd.onclick = function (){
  addData()

}
btnUpdate.onclick = function (){
  updatingData()

}

searchBook.oninput = function(){      
  displayData()    
}

// functions
function addData(){
  if ((nameValidation() === true) & (urlValidation() === true)) {
    let book = {
      theName: siteName.value,
      theUrl: siteUrl.value,
    };
    dataContainer.push(book);
    // console.log(dataContainer);
    displayData();
    setLocalStorage();
    resetInputs();
  }
  // let dataObj = {
  //   theName : siteName.value,
  //   theUrl : siteUrl.value,
  // };
  // dataContainer.push(dataObj);
  // setLocalStorage();
  // displayData()

};

function displayData(){
  let data = ''
  for(let i=0 ; i<dataContainer.length ; i++){
    if(dataContainer[i].theName.toLowerCase().includes(searchBook.value.toLowerCase())){
      data += `
              <tr>
                <td>${i+1}</td>
                <td>${dataContainer[i].theName.replaceAll(searchBook.value.toLowerCase(),`<span class='bg-info'>${searchBook.value.toLowerCase()}</span>`)}</td>
                <td>
                    ${dataContainer[i].theUrl}
                </td>
                <td>
                  <a href="${dataContainer[i].theUrl}" target="_blank" class="btn btn-outline-dark">
                    <i class="fa-regular fa-eye"></i>
                  </a>
                  <button class="btn btn-outline-warning mx-2" onclick='takingData(${i})'>
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button class="btn btn-outline-danger" onclick='deleteItem(${i})'>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>    
      
      
              `
    }
  };
  tableBody.innerHTML = data
}

function resetInputs(){
  siteName.value = '';
  siteUrl.value = '';
}
function deleteItem(i){
  dataContainer.splice(i,1);
  setLocalStorage();
  displayData()
}

function setLocalStorage(){
  localStorage.setItem('books',JSON.stringify(dataContainer))
}

function getLocalStorage(){
  return JSON.parse(localStorage.getItem('books'))

}

function takingData(i){ // take data from book mark
  btnAdd.classList.add('d-none');
  btnUpdate.classList.remove('d-none');
  siteName.value = dataContainer.at(i).theName;
  siteUrl.value = dataContainer.at(i).theUrl;
  index = i  

}

function updatingData(){
  // if(document.getElementById('alertExists').classList.contains('d-none')){
    btnAdd.classList.remove('d-none');
    btnUpdate.classList.add('d-none');
    let book = {
      theName:siteName.value,
      theUrl:siteUrl.value,
    };
    dataContainer.splice(index,1,book);
    setLocalStorage()
    displayData();
    resetInputs()
  // }else{
    // document.getElementById('alertExists').classList.add('d-none')
  // }
}

function nameValidation() {
  if (siteName.value === "") {
    alertName.classList.remove("d-none"); //show alert
    return false;
  } else {
    alertName.classList.add("d-none"); //hide alert
    return true;
  }
}

function urlValidation() {
  if (siteUrl.value === "") {
    alertUrl.classList.remove("d-none"); //show alert
    return false;
  } else {
    var isExists = false;

    for (var i = 0; i < dataContainer.length; i++) {
      // filter array
      if (dataContainer[i].theUrl === siteUrl.value) {
        isExists = true; // exite
        break;
      }
    }

    if (isExists === true) {
      // true
      alertExists.classList.remove("d-none"); // show alert url is exite
      return false;
    } else {
      alertExists.classList.add("d-none"); // hide alert url is exite
    }

    alertUrl.classList.add("d-none"); //hide alert required

    return true;
  }
}