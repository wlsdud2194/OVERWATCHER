# API Docs



### 사용자 로그인

- method : POST

- URL : http://localhost:8080/api/user/signon



**Request**

Content-Type: application/json

```
{
 "account": "dee",
 "password": "dddd"
}
```



### 사용자 추가

- method : POST

- URL :  /api/user/signup



**Request**

Content-Type: application/json

```
{
 "account": "dee",
 "password": "dddd",
 "name": "홍길동",
 "phone": "010-1234-5678",
 "email": "humg@dgsw.hs.kr"
}
```



### 특정 사용자 정보 : /api/user/account/{사용자 계정}

- method : GET

- URL : /api/user/account/Kim

Accept: application/json



### 사용자 위치 등록 및 다른 유저위치 정보

- method : POST

- method : api/location



**Request**

Content-Type: application/json

```
{
 "userId": 1,
 "account": "dee",
 "lat": 35.1234,
 "lng": 128.1234
}
```



**Response**

Accept: application/json

```
{
 // 내 위치
 "place" : {
   "name" : "dee",
    "lat" : 127.5343,
    "lng" : 36.2314
  },
    
 // 모든 유저의 위치
 "users": [
   {
     "userId": 1
     "name": "Kim",
     "lat" : 127.5343,
     "lng" : 36.2314
   },
   {
     "userId": 2
     "name": "Lee",
     "lat" : 124.1234,
     "lng" : 35.2218
   },
  ]
}
```



### 공지사항 등록

- method : POST

- URL : /api/notice



**Request**

Content-Type: application/json

```
{
 "subject": "새로운 공지사항을 등록합니다.",
 "content": "새로운 공지사항의 내용입니다.",
 "lat" : 35.111111,
 "lng" : 128.22222,
 "time" : "2018-12-19 16:30"
}
```



**Response**

Accept: application/json

```
data: [
    {
        "noticeId": 1
        "subject": "새로운 공지사항을 등록합니다.",
        "content": "새로운 공지사항의 내용입니다.",
        "lat" : 35.111111,
        "lng" : 128.22222,
        "time" : "2018-12-19 16:30"
    },
    {
        "noticeId": 1
        "subject": "새로운 공지사항을 등록합니다.",
        "content": "새로운 공지사항의 내용입니다.",
        "lat" : 35.111111,
        "lng" : 128.22222,
        "time" : "2018-12-19 16:30"
    }
]
```


