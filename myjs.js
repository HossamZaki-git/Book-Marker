arr=[];
site_name=document.getElementById("first");
site_url=document.getElementById("second");
var view=document.getElementById("view");
var NV=document.getElementById("valid_name");
var UV=document.getElementById("valid_url");

function reshow()
{
   for(i=0;i<arr.length;i++)
   {
    view.innerHTML+=`
    <div class="maincolor d-flex justify-content-around align-items-center inner" id="${i}">
                <h2>${arr[i].name}</h2>
                <div class="d-flex align-content-start w-75 ms-5" id="${i}node">
                    <a href="${arr[i].url}" target="_blank"><button class="btn btn-primary ms-3">Visit</button></a>
                    <button class="btn btn-danger ms-3" onclick="del(${i})">Delete</button>
                </div>
    </div>
    `
   }

}

function restore()
{
    localStorage.setItem("web",JSON.stringify(arr));
}

if(localStorage.getItem("web")!=null)
{
    arr=JSON.parse(localStorage.getItem("web"));
    reshow();
}

function clear()
{
    site_name.value=site_url.value="";
}

function vaild_name(x)
{
    temp=/^[A-Z].*$/;
    if(!temp.test(x))
    {
        NV.style.visibility="visible";
        return false;
    }
    return true;
}

function valid_url(x)
{
    if(x.length==0 || x=="")
    {
        UV.style.visibility="visible";
        return false;
    }
    return true;
}


function create_product()
{
    NV.style.visibility="hidden";
    UV.style.visibility="hidden";
    pr={
        name:site_name.value,
        url:site_url.value
    }
    if(!vaild_name(pr.name) || !valid_url(pr.url)){return;}
    arr.push(pr);
    view.innerHTML+=`
    <div class="maincolor d-flex justify-content-around align-items-center inner" id="${arr.length-1}">
                <h2>${pr.name}</h2>
                <div class="d-flex align-content-start w-75 ms-5" id="${arr.length-1}node">
                    <a href="${pr.url}" target="_blank"><button class="btn btn-primary ms-3">Visit</button></a>
                    <button class="btn btn-danger ms-3" onclick="del(${arr.length-1})">Delete</button>
                </div>
    </div>
    `
    clear();
    restore();
}

function del(ind)
{
    todel=document.getElementById(`${ind}`);
    todel.id="#";
    for(i=ind+1;i<arr.length;i++)
    {
        temp=document.getElementById(i);
        temp.id--;
        node=document.getElementById(`${i}node`);
        node.id=(`${i-1}node`);
        node.innerHTML=`
                <div class="d-flex align-content-start w-75 ms-5" id="${i-1}node">
                    <a href="${arr[i].url}" target="_blank"><button class="btn btn-primary ms-3">Visit</button></a>
                    <button class="btn btn-danger ms-3" onclick="del(${i-1})">Delete</button>
                </div>
        `
    }
    arr.splice(ind,1);
    todel.remove();
    restore();
}

var ALL=document;

function check(x)
{
    if(x=="Enter")
    {
        create_product();
    }
}

ALL.addEventListener("keyup",function(e){check(e.code);});




