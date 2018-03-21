
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

var xmlFile = "../data/Danh_sach_Tivi.xml"
//--------------------------End of name define-------------------------


/*
 * READ DATA FROM XLM FILE 
 */
function readListTVsFromXMLFile(){
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
function createHtmlStringListTVInfor(list){

    var mediaAddress = "../Media"
    var listView = document.createElement("div")
    listView.className = "row"

    var listTVs = list.getElementsByTagName(TagName.TIVI);
    var numberTivis =  listTVs.length;

    for(var tiviIndex = 0; tiviIndex < numberTivis; tiviIndex++){
        
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
                               <br /> Đơn giá nhập
                               ${costEnter.toLocaleString("vi")}
                               <br /> số lượng tồn : ${quantityOfInventory}`


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