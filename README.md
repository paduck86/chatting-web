# chatting-web

1. 데모URL : http://ec2-52-34-166-228.us-west-2.compute.amazonaws.com
  - 테스트 브라우져 : chrome
  - 관리자계정 : admin@admin.com / admin
  - 일반유저: 회원가입후 사용가능
  
2. 사용기술
  - front-end : javascript es6, reactjs (flux architecture & alt library), jquery, html, css
  - back-end : nodejs, mongoDB
  - server : express, nginx
  - OS : Amazon RMI (Centos6)
  - tools : npm, bower (의존성주입 툴) / sass,less (css 빌드 툴) / gulp, browserify ( front-end 빌드 툴)
  
3. 지원기능

  1) 로그인
     - 로그인 페이지 : 로그인성공시 jsonwebtoken 발급, email & 비밀번호 유효성 체크
     - 회원가입 페이지 : 회원가입, 프로필 등록시 이미지 preview
     - 권한처리 : 일반 user 로 로그인 시, 대화목록에 admin 만 보임,
                   관리자로 로그인 시, 대화목록에 모든 user 보임,
                   api 서버로 접근하는 url 은 jsonwebtoken 인증 처리함.

  2) 채팅화면
     - 고객별 대화창
        - 고객1, 고객2, 고객3등 클릭시 각각의 개별 대화창 표시 (기존의 대화목록 load함)
        - 고객명 부분에 마지막 대화내용 표시
        - 고객의 프로필 사진 나타남
     - 실시간 대화창
        - 대화내용 및 전송시간
     - 대화내용 검색기능 
     - 일반 텍스트 및 사진전송
     - DB에 저장된 고객정보 표시
     - 날짜별 대화메모기능
        - 입력/수정/저장/삭제 가능
        - 메모내용 DB에 저장

4. 참고
  1) 디자인 
     - quickblox : http://quickblox.com/developers/Q-municate
  2) reactjs
     - https://scotch.io/tutorials/learning-react-getting-started-and-concepts
     - http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/
     - http://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/
