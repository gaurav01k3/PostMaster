console.log("This is PostManClone");

//Utility function
//1. Utility function to get dom element from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
};

//Intialise no of parameters
let addParamsCount = 0;

//Hide the parameters box initially
let parmetersBox = document.getElementById('parmetersBox');
let requestJsonBox = document.getElementById('requestJsonBox');
parmetersBox.style.display = 'none';


//If the clicks the params box , hide the json box
paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'none';
    parmetersBox.style.display = 'block';
})


//If the user clicks on json box. hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'block';
    parmetersBox.style.display = 'none';
})


//If the user clicks click on + button add more params
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let Params = document.getElementById('Params'); // is div ke andar add krenge
    let string = ` <div class="paramSet form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamsCount + 2} :</label>
    <div class="col-md-4 mx-2">
        <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} key ">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} value ">
    </div>
    <button id="addParams" class="btn btn-danger mx-2 deleteParam">Remove</button>
</div>`;
    addParamsCount++;
    //convert the elemnt string to dom node
    let paramElement = getElementFromString(string); // function ko call kiya
    // console.log(paramElement);
    Params.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName('deleteParam'); //sare element le liye jo add hue the
    for (const item of deleteParam) {
        item.addEventListener('click', (e) => { // isko e (event de diya)
            e.target.parentElement.remove(); // e.target mtlb jo click hua h dot uska parentElement remove joki div h
        })
    };
})

//If user clicks the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //please wait for the response , have patience
    // document.getElementById('responseJsonText').value = "Please wait...Fetching response..";
    document.getElementById('responsePrism').innerHTML = `    <div class="d-flex align-items-center">
    <strong>Fetching data please wait...</strong>
    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
  </div>`;
    //Fetch all the value user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='Request Type :']:checked").value; // value wahan hmne de rkhkhi h
    let contentType = document.querySelector("input[name='Content Type :']:checked").value;

    // log all the values in console for debug
    // console.log(requestType);
    // console.log(contentType);

    //If user has choose params option instead of json collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data); // ise bahar kr rhe h kyuki let me declare kiya h data
    }
    else {
    data = document.getElementById('requestJsonText').value;
    }
    // console.log(requestType);
    // console.log(contentType);
    // console.log(data);

    // If the request type is POST invoke the fetch api to create post req
    if(requestType == 'GET'){
        fetch(url,{
            method: 'GET'
        })
        .then(response => response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        .then(response => response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });


    }

})


