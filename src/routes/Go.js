import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  goReg: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  goRegView: {
    width: '90%',
    margin: '0 5%',
    fontSize: '1rem'
  },
  });

export default function Go() {
  
  const classes = useStyles();
  const parseLines = (value) => value.replace(/(\\n)/g, "\n");

  function goChange() {
    let taskInfo = document.getElementById('goReg').value.split(']');
        
        let goRegView = document.getElementById('goRegView');

        goRegView.value = "[문제현상]\n"
        + "1."+taskInfo[1]+"\n"
        + "\n"
        + "[테스트]\n"
        + "1.테스트 불가\n"
        + "1.스테이징 서버에서 확인가능\n"
        + "\n"
        + "[고객 요청사항]\n"
        + "\n"
        + "\n"
        + "[첨부파일 복사]\n"
        + "1. 현상 이미지파일 첨부\n"
        + "\n"
        + "[기타정보]\n"
        + "-"
  }

  return (
    <Box>
      <Box className={classes.goReg} my={1}>
      <Typography variant="h5">
        &lt; 경리회계 이슈 생성기 &gt;
      </Typography>
      </Box>
      <Box my={2}></Box>
      <TextareaAutosize
        id="goReg"
        className={classes.goReg}
        onChange={goChange}
        minRows={3}
        defaultValue="[클라우드/회사명] 문의문의문의문의문의문의"
      />

      <TextareaAutosize
        id="goRegView"
        className={classes.goRegView}
        minRows={15}
        defaultValue={parseLines("[문제현상]\n1. 문의문의문의문의문의문의\n\n[테스트]\n1.테스트 불가\n1.스테이징 서버에서 확인가능\n\n[고객 요청사항]\n\n\n[첨부파일 복사]\n1. 현상 이미지파일 첨부\n\n[기타정보]\n-")}
      />
    </Box>
  );
}