// 필요없어진 코드
// function calcElemArea() {
//     var bodyHeight = $("body").height();
//     var headerHeight = $("header").height();
//     var footerHeight = $("footer").height();

//     $("section").height(bodyHeight - headerHeight - footerHeight);
//     $(".ad").height($("section").height);
// }

/**
 * index.html Init
 */
function mainInit() {
    $("#menu_icon").click(function() {
        $(".menubar ul").animate({
            width: 'toggle'
        }, 700);
    });

    $("#join_btn").click(function(){
        var popupWidth = 420;
        var popupHeight = 420;

        var popupX = (window.screen.width/2) - (popupWidth/2);
        var popupY = (window.screen.height/2) - (popupHeight/2);

        window.open('./src/join.html', 'popup', 'width='+ popupWidth + ', height=' + popupHeight
                    + ', left=' + popupX + ', top=' + popupY
        );
    });

    $("#member_list_btn").click(function(){
        var popupWidth = 770;
        var popupHeight = 720;

        var popupX = (window.screen.width/2) - (popupWidth/2);
        var popupY = (window.screen.height/2) - (popupHeight/2);

        window.open('./src/member_list.html', 'popup', 'width='+ popupWidth + ', height=' + popupHeight
                    + ', left=' + popupX + ', top=' + popupY
        );
    });
}

/**
 * content관련 html Init
 */
function contentsInit() {
    var idx = 0;
    var panel_length = $(".panel").length;
    var slideRunningFlag = false;
    var slideDuration = 300;
    
    //호버했을때 슬라이드 버튼 띄워주기
    $(".wrapper").hover(function () {
        $(".arrows").fadeIn(150);
    }, function () {
        $(".arrows").fadeOut(150);
    });
    
    //이전 슬라이드 버튼
    $(arrow_left).click(function () {
        if (!slideRunningFlag) {
            if (idx == 0)
                return;
    
            slideRunningFlag = true;
    
            $(".panel").eq(idx--).animate({
                width: 'toggle'
            }, slideDuration, function () {
                $(".panel").eq(idx).animate({
                    width: 'toggle'
                }, slideDuration, function () {
                    slideRunningFlag = false;
                });
            });
        }
    });
    
    //다음 슬라이드 버튼
    $(arrow_right).click(function () {
        if (!slideRunningFlag) {
            if (idx == panel_length - 1)
                return;
    
            slideRunningFlag = true;
    
            $(".panel").eq(idx++).animate({
                width: 'toggle'
            }, slideDuration, function () {
                $(".panel").eq(idx).animate({
                    width: 'toggle'
                }, slideDuration, function () {
                    slideRunningFlag = false;
                });
            });
        }
    });
}

/**
 * 회원 관련 함수
 */

function Member(userId, password, userName, gender, phone, email) {
    this.userId = userId;
    this.password = password;
    this.userName = userName;
    this.gender = gender;
    this.phone = phone;
    this.email = email;
    this.joinDate = new Date().getTime();
}

function toTagMember(member) {
    return "<tr><td>" + member.userId + "</td><td>" + member.userName + "</td><td>" + member.gender
             + "</td><td>" + member.phone + "</td><td>" + member.email + "</td><td>" + displayTime(member.joinDate) + "</td></tr>";
}

function displayTime(time) {
    var date = new Date(time);

    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() +
        " " + date.getHours() + ":" + date.getMinutes();
}

//회원가입 함수
function join() {
    var memberList = JSON.parse(localStorage.getItem("memberList"));

    if(!memberList) memberList = [];

    var password = $(this.password).val();
    var pwdChk = $(this.pwdChk).val();

    if(password != pwdChk){
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        $(this.password).val('').focus();
        $(this.pwdChk).val('');
        return false;
    }

    var userId = $(this.userId).val();

    for(var i in memberList) {
        if(memberList[i].userId == userId){
            alert("입력한 아이디가 이미 존재합니다.");
            this.userId.select();
            return false;
        }
    }

    var userName = $(this.userName).val();
    var gender  = $("input[name=gender]:checked").val();
    var phone  = $(this.phone).val();
    var email  = $(this.email).val();

    var mem = new Member(userId, password, userName, gender, phone, email);

    memberList.push(mem);

    var jsonStr = JSON.stringify(memberList);
    localStorage.setItem("memberList", jsonStr);

    alert("회원가입 완료!");

    $("form")[0].reset();

    return true;
}

//회원목록 출력 메소드
function printMemberList() {
    var memberList = JSON.parse(localStorage.getItem("memberList"));
    var $memberTable = $(memberTable);

    $memberTable.html("<tr><th>아이디</th><th>이름</th><th>성별</th><th>전화번호</th><th>이메일</th><th>가입일</th></tr>");

    if(!memberList)
        $memberTable.append("<tr><td colspan='6'>가입된 회원이 없습니다.</td></tr>");
    else {
        $.each(memberList, function(index, elem) {
            $memberTable.append(toTagMember(elem));
        });
    }

    console.log(memberList);

}