import React from 'react';
import { NavLink, Route, Switch, HashRouter } from "react-router-dom";
import Task from './routes/Task';
import Go from './routes/Go';
import GoAgain from './routes/GoAgain';
import UrlMaker from './routes/Url';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
}));

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
		vertical: 'bottom',
		horizontal: 'center',
		}}
		transformOrigin={{
		vertical: 'top',
		horizontal: 'center',
		}}
	  {...props}
	/>
  ))(({ theme }) => ({
	'& .MuiPaper-root': {
	  borderRadius: 4,
	  marginTop: theme.spacing(1),
	  minWidth: 180,
	  boxShadow:
		'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
	  '& .MuiMenu-list': {
		padding: '4px ',
	  },
	},
  }));


export default function NavTabs({ history }) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	
	const handleChange = (event, value) => {
		if (value === 0){ window.location.hash = "#/task"; window.location.reload(); setValue(value);}
		if (value === 1){ window.location.hash = "#/go"; window.location.reload(); setValue(value);}
		if (value === 2){ window.location.hash = "#/url"; window.location.reload(); setValue(value);}
		if (value === 3){ window.location.hash = "#/goagain"; window.location.reload(); setValue(value);}
		
		setAnchorEl(event.target.value);
  	};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////
	const ColorButton = styled(Button)(({ theme }) => ({
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 15,
		color: 'white',
		padding: '11px 10px',
		margin: '0 30px',
		border: '1px solid',
		lineHeight: 1.5,
		backgroundColor: '#2196f3',
		borderColor: '#2196f3',
	}));

  return (
	<div className={classes.root}>
		<HashRouter>
		<AppBar position="static">
			<Tabs
				variant="fullWidth"
				value={value}
				onChange={handleChange}
				>
				
				<div>
					<ColorButton 
						id="demo-positioned-button"
						aria-controls={open && 'demo-positioned-menu'}
						aria-haspopup="true"
						aria-expanded={open && 'true'}
						onClick={handleClick}
					>
						이슈 생성기
					</ColorButton>
					<StyledMenu
						id="demo-positioned-menu"
						MenuListProps={{
						  'aria-labelledby': 'demo-positioned-button',
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleChange}
					>
						<MenuItem onClick={handleChange} value={1} component={NavLink} to="/go" >경리회계 이슈생성</MenuItem>
						<MenuItem onClick={handleChange} value={3} component={NavLink} to="/goagain" >GO 이슈생성</MenuItem>
					</StyledMenu>
				</div>
				
				<Tab value={0} label="설치형 전달" component={NavLink} to="/task"/>
				<Tab value={2} label="관리자 URL 생성기" component={NavLink} to="/url"/>
				
			</Tabs>
		</AppBar>

		<Box my={3}>
			<Switch>
				<Route path="/task" component={Task} />
				<Route path="/go" component={Go} />   
				<Route path="/url" component={UrlMaker} />   
				<Route path="/goagain" component={GoAgain} />
			</Switch>
		</Box>
		</HashRouter>
       </div>
  );
}