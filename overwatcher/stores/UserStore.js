import  { observable, action } from 'mobx';

class UserStore {
    static instance = null;
    static getInstance() {
        if(UserStore.instance === null)
            UserStore.instance = new UserStore();
        return this.instance;
    }
    constructor() {
        UserStore.instance = this;
    }

    //로그인 확인 여부
    @observable signedOn = false;

    //사용자 정보 object
    @observable userInfo = null;
}

export default UserStore.getInstance();