
//----------------------------DATA DEFINE------------------------------
var TagName = {
    
    DANH_SACH_TIVI     : "Danh_sach_Tivi",
    TIVI               : "Tivi",
    NHOM_TI_VI         : "Nhom_Tivi",
    DANH_SACH_BAN_HANG : "Danh_sach_Ban_hang",
    BAN_HANG           : "Ban_hang"
}

var AttributeName = {
    
    TEN                 : "Ten",
    MA_SO               : "Ma_so",
    DON_GIA_BAN         : "Don_gia_Ban",
    DON_GIA_NHAP        : "Don_gia_Nhap",
    SO_LUONG_TON        : "So_luong_Ton",
    DOANH_THU           : "Doanh_thu",
    TRANG_THAI_CON_HANG : "Trang_thai_Con_hang",
    NGAY                :"Ngay",
    DON_GIA             : "Don_gia",
    SO_LUONG            : "So_luong",
    TIEN                : "Tien"
}

var IDDefine = {
    SELECT_GROUP_NAME : "selectGroupName",
    RESULT_WINDOWS  :"CUA_SO_KET_QUA"
}
var xmlFile = "../data/Danh_sach_Tivi.xml"
//--------------------------End of name define-------------------------


/*
 * READ DATA FROM XLM FILE 
 */
function readListTVs(){
    var xmlhttp,xmlDoc;

    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlFile,false);
    if (xmlhttp.overrideMimeType){
        xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    var listTVs = xmlDoc.getElementsByTagName(TagName.DANH_SACH_TIVI)[0]
    return listTVs
}


//IMPLEMENTATION INFORMATIONS
function createHtmlStringListTivis(list){

    var mediaAddress = "../Media"
    var listView = document.createElement("div")
    listView.className = "row"

    var listTVs = list.getElementsByTagName(TagName.TIVI);
    var numberTivis =  listTVs.length;

    for(var tiviIndex = 0; tiviIndex < numberTivis; tiviIndex++){
        
        var name = listTVs[tiviIndex].getAttribute(AttributeName.TEN)
        var id = listTVs[tiviIndex].getAttribute(AttributeName.MA_SO)
        var cost = listTVs[tiviIndex].getAttribute(AttributeName.DON_GIA_BAN)
        var isStillInStock = (listTVs[tiviIndex].getAttribute(AttributeName.TRANG_THAI_CON_HANG) == 'true')? 'còn hàng' : 'hết hàng'

        var imageView = document.createElement("img")
        imageView.src = `${mediaAddress}/${id}.png`
        imageView.style.cssText = `width:150px;height:150px;`
        
        var inforView = document.createElement("div")
        inforView.className = `btn`
        inforView.style.cssText = `text-align:left`
        inforView.innerHTML = `${name}
                               <br /> Đơn giá bán
                               ${cost.toLocaleString("vi")}
                               <br /> trạng thái : ${isStillInStock}`


        var tiviView = document.createElement("div")
        tiviView.className = `col-md-3`
        tiviView.style.cssText = `margin-botton:10px`
        

        tiviView.appendChild(imageView)
        tiviView.appendChild(inforView)

        listView.appendChild(tiviView)
    }

   // var httmlString = listView.outerHTML
    return listView
}

function viewListTVsByGroup(list,_groupName){
   
    var mediaAddress = "../Media"
    var listView = document.createElement("div")
    listView.className = "row"

    var listTVs = list.getElementsByTagName(TagName.TIVI);
    var numberTivis =  listTVs.length;

    for(var tiviIndex = 0; tiviIndex < numberTivis; tiviIndex++){
        
        var groupName = listTVs[tiviIndex].getElementsByTagName(TagName.NHOM_TI_VI)[0].getAttribute(AttributeName.TEN) ;
        if(groupName == _groupName){

            var name = listTVs[tiviIndex].getAttribute(AttributeName.TEN)
            var id = listTVs[tiviIndex].getAttribute(AttributeName.MA_SO)
            var costEnter = listTVs[tiviIndex].getAttribute(AttributeName.DON_GIA_NHAP)
            var quantityOfInventory = listTVs[tiviIndex].getAttribute(AttributeName.SO_LUONG_TON)

            var imageView = document.createElement("img")
            imageView.src = `${mediaAddress}/${id}.png`
            imageView.style.cssText = `width:150px;height:150px;`
            
            var inforView = document.createElement("div")
            inforView.className = `btn`
            inforView.style.cssText = `text-align:left`
            inforView.innerHTML = `${name}
                                <br />đơn giá nhập : ${costEnter} 
                                <br />số lượng tồn : ${quantityOfInventory}`


            var tiviView = document.createElement("div")
            tiviView.className = `col-md-3`
            tiviView.style.cssText = `margin-botton:10px`
            

            tiviView.appendChild(imageView)
            tiviView.appendChild(inforView)

            listView.appendChild(tiviView)
        }
    }

   // var httmlString = listView.outerHTML
    return listView 
}

function getOptionalsGroupTivis(list){
    var select = document.createElement("select");
    select.id = IDDefine.SELECT_GROUP_NAME
    var listOptionals = [];
    var listTVs = list.getElementsByTagName(TagName.TIVI)
    var numberTivis = listTVs.length

    for(var tiviIndex = 0; tiviIndex < numberTivis ; tiviIndex++){
        
        var groupName = listTVs[tiviIndex].getElementsByTagName(TagName.NHOM_TI_VI)[0].getAttribute(AttributeName.TEN)
        if(listOptionals == null){
            listOptionals.push(groupName)
        }
        else{

            var isCanAdded = true;
            for(var i = 0; i < listOptionals.length ; i++){  
                if(listOptionals[i] == groupName){
                    isCanAdded = false;
                    break;
                }
            }

            if(isCanAdded){
                listOptionals.push(groupName);
            }
            
        }
    }
    
    var numberOptionals = listOptionals.length
    for(var optionalsIndex = 0; optionalsIndex < numberOptionals; optionalsIndex++)
    {
        var optional = document.createElement("option")
        optional.innerHTML = listOptionals[optionalsIndex]
        optional.value = listOptionals[optionalsIndex]
        select.appendChild(optional)
    }

    select.onchange = onCbGroupTivisChanged
    return select;
}

function onCbGroupTivisChanged(select){
    var select  = document.getElementById(IDDefine.SELECT_GROUP_NAME)
    var selectedIndex = select.selectedIndex
    var list = readListTVs();
    var groupName = select.options[selectedIndex].value
    var windowView = viewListTVsByGroup(list,groupName)

    var resultWindow = document.getElementById(IDDefine.RESULT_WINDOWS)
    resultWindow.innerHTML = ""
    resultWindow.appendChild(windowView)
}