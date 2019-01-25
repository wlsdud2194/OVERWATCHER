import { observable, action } from 'mobx';
import { Permissions, Location } from 'expo';
import UserStore from './UserStore';

class MapStore {
    static instance = null;
    static getInstance() {
        if(MapStore.instance === null)
            MapStore.instance = new MapStore();
        return this.instance;
    }
    constructor() {
        MapStore.instance = null;
    }

    @observable markers = [];
    @observable placeMarkers = null;

    @observable region = {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.002,
    };

    @action getLocation = (location) => {
        console.log("위치 저장 성공");

        this.region = {
            ...this.region,
            latitude : location.coords.latitude,
            longitude : location.coords.longitude,
        };
    };

    @action getMarkers = async () => {
        try {
            const { userId, account } = UserStore.userInfo;
            console.log("gkgkg" + userId + account);

            let requestObject = {
                userId,
                account,
                lat: this.region.latitude,
                lng: this.region.longitude
            };

            let response = await fetch('http://118.219.10.109:8080/api/location',{
                method : 'POST',
                headers:{
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                },body : JSON.stringify(requestObject)
            });

            let responseJson = await response.json();
            
            if(response.code < 200) {
                console.log("마커 불러오기 실패");
                return;
            }

            console.log("마커 불러오기 성공");

            console.log(JSON.stringify(responseJson));

            this.markers = responseJson.data.users;
            this.placeMarkers = responseJson.data.place;
        } 
        catch(error) {
            console.log(error);
        };

        setInterval(()=>this.getMarkers(),2000);
    }
}

export default MapStore.getInstance();