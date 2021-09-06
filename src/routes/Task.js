import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
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
    fontSize: '1rem'
  },
  });
  let elem=""

  function addEventHandler_task(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener (eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent ('on' + eventType, handler); 
  }

  function addEventHandler_task1(elem1,elem2, eventType, handler) {
    if (elem1.addEventListener){
        elem1.addEventListener (eventType, handler, false);
        elem2.addEventListener (eventType, handler, false);}
    else if (elem.attachEvent)
        elem.attachEvent ('on' + eventType, handler); 
  }

export default function Task() {
  const classes = useStyles();

    addEventHandler_task(document, 'DOMContentLoaded', function() {
    addEventHandler_task1(document.getElementById("taskTitle"),document.getElementById("taskContent"), 'change', function() {
        
        let taskInfo = document.getElementById('taskTitle').value.split('/');
        let taskTitle = document.getElementById('taskContent').value.split(']');
        let taskTitle2 = taskTitle[1].split('/');

        let taskInputInfo = document.getElementById('taskInputInfo')

        taskInputInfo.value = "1. 고객 정보 :"+taskTitle2[0]+"/"+taskTitle2[1]+"/ "
        +taskInfo[1]+"("+taskInfo[2]+") / "+taskInfo[0]+"(미할당)\n"
        + "2. 요청 내용 :"+taskTitle2[2]+"\n"
        + "3. 요청 사유 :"+taskTitle2[2]+" 부탁드립니다.\n"
        + "4. 추가 정보 : -"

      });
  });

  return (
    <div>
      <Box className={classes.taskInputInfo} my={1}>
      <Typography variant="h5">
        &lt; 업무생성기 &gt;
      </Typography>
      </Box>
      <Box my={2}></Box>
      <Box className={classes.taskInputInfo} my={1}>
      <div>문의번호/연락처/담당자</div>
      </Box>
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
        defaultValue="[DO] 다산기공 / 설치형 / 메일발송지연으로 빠른 연락요청"
      />

      <TextareaAutosize
        id="taskInputInfo"
        className={classes.taskInputInfo}
        minRows={4}
        placeholder="1. 고객 정보 : 다산기공 / 설치형 / 063-260-7938 (이다빈)
2. 요청 내용 : 메일발송지연으로 빠른 연락요청
3. 요청 사유 : 메일발송지연으로 빠른 연락요청 부탁드립니다.
4. 추가 정보 : 온라인문의 불가"
      />
    </div>
  );
}