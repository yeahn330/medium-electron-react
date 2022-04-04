import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  goAgainReg: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  goAgainRegView: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  });

  let elem3=""

export default function GoAgin() {
  
  const classes = useStyles();
  const parseLines = (value) => value.replace(/(\\n)/g, "\n");

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
  
    let goAgainReg = document.getElementById('goAgainReg')
    let goAgainRegView = document.getElementById('goAgainRegView')

    setLoading(true);
    await axios.get("http://139.150.73.246:5000/zens?issueNum="+issueNum.value)
      .then(response => { //데이터는 response.data 안에 들어있다.

        const zens = response.data.ticket;
        goAgainReg.value = "#"+issueNum.value+" / "+zens.custom_fields[9].value+"/null";
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

        goAgainReg.value = "[전화] ["+zens.custom_fields[13].value+"] "+zens.custom_fields[1].value+"관련 빠른연락 요청\n"
        
        let goAgainRegView = document.getElementById('goAgainRegView')
        .value = "1. 고객 정보 :"+zens.custom_fields[13].value+" / "+cloudNm+" / "
        +call+"(성함쓰세요) / #"+issueNum.value+"("+zens.custom_fields[19].value+")\n"
        + "2. 요청 내용 :"+zens.custom_fields[1].value+"관련 빠른연락 요청\n"
        + "3. 요청 사유 :"+zens.raw_subject+"관련 빠른연락 부탁드립니다.\n"
        + "4. 추가 정보 : -"

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

      taskInputInfo.value = "1. 고객 정보 :"+taskTitle2[0]+" / "+taskTitle2[1]+" / "
      +taskInfo[1]+"("+taskInfo[2]+") / "+taskInfo[0]+"(미할당)\n"
      + "2. 요청 내용 :"+taskTitle2[2]+"\n"
      + "3. 요청 사유 :"+taskTitle2[2]+" 부탁드립니다.\n"
      + "4. 추가 정보 : -"

    });
  });

  return (
    <div>
      <Box className={classes.goAgainReg} my={1}>
      <Typography variant="h5">
        &lt; GO 이슈 생성기 &gt;
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
        id="goAgainReg"
        className={classes.goAgainReg}
        minRows={3}
        defaultValue="[클라우드/회사명] 문의문의문의문의문의문의"
      />

      <TextareaAutosize
        id="goAgainRegView"
        className={classes.goAgainRegView}
        minRows={15}
        defaultValue={parseLines("[문제현상]\n1. 문의문의문의문의문의문의\n\n[테스트]\n1.테스트 불가\n1.스테이징 서버에서 확인가능\n\n[고객 요청사항]\n\n\n[첨부파일 복사]\n1. 현상 이미지파일 첨부\n\n[기타정보]\n-")}
      />
    </div>
  );
}