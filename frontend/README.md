node_modules 다시 설치: npm install
server 띄우기: npm run dev

router: npm install react-router-dom
CSS(스타일): npm install styled-components
아이콘: npm install react-icons
redux라이브러리 : npm install react-redux @reduxjs/toolkit
json-server(RestfulAPI): npm install -g json-server
        gpt에게 restful 가 뭔지 공부
api 라이브러리 : npm install axios 
query 라이브러리 : npm install @tanstack/react-query
antd 라이브러리 : npm install antd 
aGrid 라이브러리 : npm install ag-grid-react ag-grid-community
chart 라이브러리 : npm install chart.js react-chartjs-2


git add .
git commit -u "  "


reducer
dispatch: 함수를 실행하는 함수
action: 전체 object 파라미터 (인수)
action.type: 함수의 타입
action.payload: state 변화시킬 수 있는 인수 


useState => useReducer => useContext => redux(slice, query)

context: state, 내부함수(reducers)
redux: state, 내부함수(reducers), 외부함수(extraReducers: api)

Restful API 
get 전체 방식 : url => return: 테이블(json구조)
get 하나 데이터 : url + id => return : 오브젝트 (row 테이블의 행)
post 방식 : url, object => return : object
put 방식 : url + id, object => return : object
delete 방식 : url + id => return : id 






