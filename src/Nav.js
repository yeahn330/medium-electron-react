import React from 'react';
import { NavLink, Route, Switch, HashRouter } from "react-router-dom";
import Task from './routes/Task';
import Go from './routes/Go';
import UrlMaker from './routes/Url';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
}));

export default function NavTabs({ history }) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	
	const handleChange = (event, value) => {
		
		if (value === 0){ window.location.hash = "#/task"; window.location.reload(); setValue(value);}
		if (value === 1){ window.location.hash = "#/go"; window.location.reload(); setValue(value);}
		if (value === 2){ window.location.hash = "#/url"; window.location.reload(); setValue(value);}
		
  };

  return (
	<div className={classes.root}>
		<HashRouter>
		<AppBar position="static">
			<Tabs
				variant="fullWidth"
				value={value}
				onChange={handleChange}
				>
				<Tab value={0} label="업무 생성기" component={NavLink} to="/task"/>
				<Tab value={1} label="GO이슈 생성기" component={NavLink} to="/go"/>
				<Tab value={2} label="관리자 URL 생성기" component={NavLink} to="/url"/>
			</Tabs>
		</AppBar>

		<Box my={3}>
			<Switch>
				<Route path="/task" component={Task} />
				<Route path="/go" component={Go} />   
				<Route path="/url" component={UrlMaker} />   
			</Switch>
		</Box>
		</HashRouter>
       </div>
  );
}