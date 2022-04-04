import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  cloudNn: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  adminUrlOpen: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem',
    display: 'none',
  },
  });

export default function UrlMaker() {

  const classes = useStyles();

  function addEventHandler_url(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener (eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent ('on' + eventType, handler); 
  }

  addEventHandler_url(document, 'DOMContentLoaded', function() {
    addEventHandler_url(document.getElementById("cloudNn"), 'change', function() {
      let cloudNnSiteurl;
      let cloudNumSp;

      let sccUrl = "";
      let cloudnn = "";
      let sitenn = "";

      let adminUrlOpen = document.getElementById('adminUrlOpen')

      cloudNnSiteurl = document.getElementById('cloudNn').value
      cloudNumSp = (JSON.stringify(cloudNnSiteurl)).split('cloud');
      cloudnn = cloudNumSp[1].split('.daouoffice');
      if(cloudnn[0] === "1"){
        cloudnn = "";
      }else{cloudnn = cloudnn[0];}

      sitenn = (JSON.stringify(cloudNnSiteurl)).split('/');
		  sccUrl = "https://cloud"+cloudnn+".daouoffice.com:8443/go/admin/company?companyId="+sitenn[7];

      adminUrlOpen.value = sccUrl;

      addEventHandler_url(document.getElementById("urlClick"), 'click', function() {
        window.shell.openExternal(sccUrl);
        window.location.reload();
      });

    });

    addEventHandler_url(document.getElementById("domsClick"), 'click', function() {
      axios({
        url: 'http://127.0.0.1:5000/domsAutoLogin',
        method: 'get'
      });

    });
  });

  return (
    <div>
      <Box className={classes.cloudNn} my={1}>
      <Typography variant="h5">
        &lt; 관리자 URL 생성기 &gt;
      </Typography>
      </Box>
      <Box my={2}></Box>

      <TextareaAutosize
        id="cloudNn"
        className={classes.cloudNn}
        minRows={2}
      />

      <TextareaAutosize
        id="adminUrlOpen"
        className={classes.adminUrlOpen}
        minRows={2}
      />

      <Button 
        id="urlClick"
        variant="contained" 
        color="primary"
        className={classes.cloudNn}
      >
      ### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 관리자페이지 URL 이동 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;###
      </Button>
      <Box my={1}></Box>
      <Button 
        id="domsClick"
        variant="contained" 
        color="primary"
        className={classes.cloudNn}
      >
      ### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 돔스 자동로그인 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;### 추가예정
      </Button>
      
    </div>
  );
}