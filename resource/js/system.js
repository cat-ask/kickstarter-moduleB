export default class System{
    constructor(list){
        this.fundList = list;
    }

    investor_list_popup_more=e=>{
        let idx = e.target.dataset.idx;
        let fund = this.fundList[idx];
        let data = this.fundList[idx].investorList;
        let title = "상세정보";
        let content = ``;
        if(e.target.classList.contains("highFundMoreBtn")) {
            content += `<div class="highFundBox" style="justify-content:flex-start; margin:0; padding-top:0px;">
                            <div class="highFundInfo">
                                <h5 class="highFundInfoTitle">${fund.name}</h5>
                                <div class="highFundPrograssBox" data-achieve="${fund.achieve}"><div class="highFundPrograssBar" style="width:${fund.achieve}%;"></div></div>
                                <p class="highFundInfoText"><span class="green"><i class="fa fa-krw green mr-5"></i>${fund.current.toLocaleString()}</span> <span class="highFundInfoCate">현재금액</span></p>
                                <p class="highFundInfoSubTitle">${fund.achieve.toLocaleString()}%<span class="highFundInfoCate">달성율</span></p>
                                <p class="highFundInfoText">${fund.endDate}<span class="highFundInfoCate">모집마감일</span></p>
                            </div>
                        </div>`;
        }
        content += `<div id="investorPopupMoreList">
                        <p style="margin:10px; font-weight:bold; font-size:1.2em;">투자자목록</p>`
        data.forEach(x=>{
            content += `<div class="investorPopupMoreBox">
                            <h5 class="investorPopupMoreTitle"><span class="mr-5">Email</span>${x.email}</h5>
                            <p class="investorPopupMoreSubTitle"><span class="mr-5">투자 날짜</span>${x.datetime}</p>
                            <p class="investorPopupMoreText"> <span class="mr-5">투자 금액</span> <i class="fa fa-krw green mr-5"></i>${x.pay.toLocaleString()}</p>
                        </div>`;
        })             
        content+=`</div>`;

        this.make_popup(title,content);
    }

    form_success_msg(box){
        box.querySelector(".formWarnningMsg").innerHTML = "";
        box.querySelector(".formWarnningMsg").classList.remove("open");

        box.querySelector(".formInput").classList.remove("warnning");
        box.querySelector(".formInputIcon").classList.remove("warnning");

        box.querySelector(".formInput").classList.add("success");
        box.querySelector(".formInputIcon").classList.add("success");

        if(box.querySelector(".formInputIcon").classList.contains("fa-remove")) box.querySelector(".formInputIcon").classList.replace("fa-remove","fa-check");

        if(!document.querySelector("form .warnning")) document.querySelector(".formBtn").classList.add("success");
        else document.querySelector(".formBtn").classList.remove("success");
    }

    form_warnning_msg(box,msg){
        box.querySelector(".formWarnningMsg").innerHTML = msg;
        box.querySelector(".formWarnningMsg").classList.add("open");

        box.querySelector(".formInput").classList.add("warnning");
        box.querySelector(".formInputIcon").classList.add("warnning");
        box.querySelector(".formInputIcon").classList.replace("fa-check","fa-remove");

        if(!document.querySelector("form .warnning")) document.querySelector(".formBtn").classList.add("success");
        else document.querySelector(".formBtn").classList.remove("success");
    }

    make_popup(title,content){
        let dom = document.createElement("div");
        dom.innerHTML = `<div id="popupBc">
                            <div id="popup">
                                <div id="popupHeader">
                                    <h5 id="popupTitle">${title}</h5>
                                    <button id="popupClose"><i class="fa fa-remove"></i></button>
                                </div>
                                <div id="popupContent">
                                    ${content}
                                </div>
                            </div>
                        </div>`;
        document.querySelector("#wrap").appendChild(dom.firstChild);
        $("#popupBc").fadeIn(600);
        document.querySelector("#popupClose").addEventListener("click",this.popup_close_process);
    }

    popup_close_process(){
        $("#popupBc").fadeOut(600,()=>{
            document.querySelector("#wrap").removeChild(document.querySelector("#popupBc"));
        });
    }

    make_toast(msg){
        let dom = document.createElement("div");
        let id = Date.now();
        dom.innerHTML = `<div class="toast" id="${id}"><button class="toastClose"><i class="fa fa-remove"></i></button>${msg}</div>`;

        dom.querySelector(".toastClose").addEventListener("click",e=>{document.querySelector("#toast_bc").removeChild(e.target.parentNode);});
        document.querySelector("#toast_bc").appendChild(dom.firstChild);

        $("#"+id).show();
        setInterval(()=>{
            $("#"+id).hide();
        },3000,()=>{$("#"+id).remove();});
    }
}