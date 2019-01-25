import { observable, action } from "mobx";

class NoticeStore {
    static instance = null;
    static getInstance() {
        if(NoticeStore.instance === null)
            NoticeStore.instance = new NoticeStore();
        return this.instance;
    }

    constructor() {
        NoticeStore.instance = null;
    }

    @observable nextPage = false;

    @observable notice = {
        subject: "",
        content: "",
        lat: null,
        lng: null,
        time: "",
    };

    //받은 공지사항
    @observable responseNotice = [
    ];

    @action handleToggle = () => {
        this.notice = {
            subject: "",
            content: "",
            lat: null,
            lng: null,
            time: "",
        };
        this.nextPage = !(this.nextPage);
    };

    //notice 정보 변경 액션
    @action handleSubjectChange = (value) => {
        this.notice.subject = value;
    };
    @action handleContentChange = (value) => {
        this.notice.content = value;
    };
    @action handlePicked = (date) => {
        // console.log(date.toString().slice(15, 21));
        date = date.toString().slice(16, 21);
        this.notice.time = "2018-12-20 " + date;
    };

    @action getSetLocation = (region) => {
        this.notice = {
            ...this.notice,
            latlng: {
                latitude: region.latitude,
                longitude: region.longitude
            }
        };
    }

    //전송
    @action handleSubmit = async () => {

        try{
            let response = await fetch('http://118.219.10.109:8080/api/notice',{
                method : 'POST',
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(this.notice)
            });
            
            let responseJson = await response.json();
            
            
            // console.log(responseJson);

            if(response.code < 100){
                console.log('공지 등록 실패');
                return;
            }

            console.log('공지 등록 성공');

            alert("공지사항을 등록했습니다.");

        }catch(error){
            alert("실패" + error);
        }
        this.getNotice();
        this.handleToggle();
    }

    //캐치
    @action getNotice = async () => {
        try {
            let response = await fetch('http://118.219.10.109:8080/api/notice',{
                method : 'GET',
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                }
            });

            let responseJson = await response.json();
            
            if(response.code < 400) {
                console.log("공지 불러오기 실패");
                return;
            }

            console.log("공지 불러오기 성공");

            this.responseNotice = responseJson.data;
        }
        catch(error) {
            console.log("error");
        };
    }
}

export default NoticeStore.getInstance();