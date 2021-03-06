import { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  zensInputInfo: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  taskInputInfo: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  taskContent: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  taskTitle: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem',
    display: 'none',
  },
  });
  let elem3=""

export default function Task() {
  const classes = useStyles();

  function addEventHandler_task(elem, eventType, handler) {
    if (elem.addEventListener){
      elem.addEventListener (eventType, handler, false);
    }
    else if (elem.attachEvent)
        elem.attachEvent ('on' + eventType, handler); 
  }

  function addEventHandler_task1(elem1,elem2, eventType, handler) {
    if (elem1.addEventListener){
        elem1.addEventListener (eventType, handler, false);
        elem2.addEventListener (eventType, handler, false);}
    else if (elem3.attachEvent)
        elem3.attachEvent ('on' + eventType, handler); 
  }

  const [loading, setLoading] = useState(false);

  const fetchZens = async () => {
    let issueNum = document.getElementById('issueNum');
  
    let taskTitle = document.getElementById('taskTitle')
    let taskContent = document.getElementById('taskContent')
    let taskInputInfo = document.getElementById('taskInputInfo')

    setLoading(true);
    await axios.get("http://139.150.73.246:5000/zens?issueNum="+issueNum.value)
      .then(response => { //데이터는 response.data 안에 들어있다.

        const zens = response.data.ticket;              
        taskTitle.value = "#"+issueNum.value+" / "+zens.custom_fields[9].value+"/null";
        let cloudNm = "null"

        if(zens.custom_fields[10].value === "서비스형"){
          cloudNm = zens.custom_fields[2].value.split('_');
          cloudNm = cloudNm[0]+cloudNm[2];
        } else {
          cloudNm = '설치형'
        }
        let call = ""
        if(zens.custom_fields[14].value === null){
          call = "연락처쓰세요"
        }else {
          call = zens.custom_fields[14].value
        }

        taskContent.value = "[전화]["+zens.custom_fields[13].value+"] "+zens.custom_fields[1].value+"관련 빠른연락 요청\n"
        
        taskInputInfo.value = "안녕하세요, 고객지원팀 안영은 입니다.\n하기 사항 확인 부탁드립니다.\n\n1. 고객 정보 :"+zens.custom_fields[13].value+" / "+cloudNm+" / "
        +call+"(성함쓰세요) / #"+issueNum.value+"("+zens.custom_fields[19].value+")\n"
        + "2. 요청 내용 :"+zens.custom_fields[1].value+"관련 빠른연락 요청\n"
        + "3. 요청 사유 :"+zens.raw_subject+"관련 빠른연락 부탁드립니다.\n"
        + "4. 추가 정보 : -\n\n감사합니다."

      });
      setLoading(false);
  }

    addEventHandler_task(document, 'DOMContentLoaded', function() {
      addEventHandler_task(document.getElementById("inquireBtn"), 'click', function() {
        fetchZens();
    });

    addEventHandler_task(document.getElementById("issueNum"), 'keyup', function() {
      if (window.event.keyCode === 13) { fetchZens(); }
    });
   

    addEventHandler_task1(document.getElementById("taskTitle"),document.getElementById("taskContent"), 'change', function() {
        
      let taskInfo = document.getElementById('taskTitle').value.split('/');
      let taskTitle = document.getElementById('taskContent').value.split(']');
      let taskTitle2 = taskTitle[1].split('/');

      let taskInputInfo = document.getElementById('taskInputInfo')

      taskInputInfo.value = "안녕하세요, 고객지원팀 안영은 입니다.\n\n1. 고객 정보 :"+taskTitle2[0]+" / "+taskTitle2[1]+" / "
      +taskInfo[1]+"("+taskInfo[2]+") / "+taskInfo[0]+"(미할당)\n"
      + "2. 요청 내용 :"+taskTitle2[2]+"\n"
      + "3. 요청 사유 :"+taskTitle2[2]+" 부탁드립니다.\n"
      + "4. 추가 정보 : -"

    });
  });

  return (
    <div>
      <Box className={classes.taskInputInfo}>
      <Typography variant="h5">
        &lt; 설치형 전달 &gt;
      </Typography>
      </Box>
      <Box my={2}></Box>
      <Box className={classes.zensInputInfo}>
      <TextField 
        id="issueNum" 
        defaultValue=""
        InputLabelProps={{shrink: true,}}
        label="문의번호 입력" 
        type="search" 
        variant="standard" 
      />
      <Button id="inquireBtn" variant="contained" color="primary" >
        {loading?"조회중...":"조회하기"}
      </Button>
        
      <Box my={2}></Box>
      </Box>

      <TextareaAutosize
        id="taskTitle"
        className={classes.taskTitle}
        minRows={2}
        placeholder="문의번호/연락처/담당자"
        defaultValue="#11268/063-260-7938/이다빈"
      />

      <TextareaAutosize
        id="taskTitle"
        className={classes.taskTitle}
        minRows={2}
        placeholder="문의번호/연락처/담당자"
        defaultValue="#11268/063-260-7938/이다빈"
      />

      <TextareaAutosize
        id="taskContent"
        className={classes.taskContent}
        minRows={2}
        defaultValue="[전화] [미래엔] 업그레이드관련 빠른연락 요청"/>

      <TextareaAutosize
        id="taskInputInfo"
        className={classes.taskInputInfo}
        aria-label="minimum height"
        minRows={6}
        placeholder="1. 고객 정보 :고객사 / 설치형 / 연락처쓰세요(성함쓰세요) / #35298(업데이트_재분배_요청)
2. 요청 내용 :업그레이드관련 빠른연락 요청
3. 요청 사유 :[미래엔] 그룹웨어 3.4.6.0 업그레이드 작업관련 빠른연락 부탁드립니다.
4. 추가 정보 : -"
      />

    </div>
  );
}