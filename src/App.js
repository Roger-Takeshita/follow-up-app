import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ApplicationPage from './pages/ApplicationPage/ApplicationPage';
import NewApplicationPage from './pages/NewApplicationPage/NewApplicationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ResumesPage from './pages/ResumesPage/ResumesPage';
import AboutPage from './pages/AboutPage/AboutPage';
import HowToUsePage from './pages/HowToUsePage/HowToUSePage';
import SearchPage from './pages/SearchPage/SearchPage';
import userService from './utils/userService';
import apiService from './utils/apiService';
import GitHubIcon from '@material-ui/icons/GitHub';
import { connect } from 'react-redux';
import { setResumes } from './redux/resume';
import { setApplications } from './redux/application';
import { toggleDataFlag } from './redux/dataFlag';

function App({ setApplications, setResumes, userFirstName, history, dataFlag, toggleDataFlag }) {
    let pages = userService.getUser() ? (
        dataFlag ? (
            <Switch>
                <Route exact path="/search" render={({ history }) => <SearchPage history={history} />} />
                <Route exact path="/howtouse" render={({ history }) => <HowToUsePage history={history} />} />
                <Route exact path="/about" render={({ history }) => <AboutPage history={history} />} />
                <Route
                    exact
                    path="/application/:id"
                    render={({ history, match }) => <ApplicationPage history={history} match={match} />}
                />
                <Route
                    exact
                    path="/resumes/:id"
                    render={({ history, match }) => <ResumesPage history={history} match={match} />}
                />
                <Route exact path="/new" render={({ history }) => <NewApplicationPage history={history} />} />
                <Route exact path="/profile" render={({ history }) => <ProfilePage history={history} />} />
                <Route exact path="/resumes" render={({ history }) => <ResumesPage history={history} />} />
                <Route exact path="/" render={() => <HomePage />} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
        ) : (
            'Loading...'
        )
    ) : (
        <Switch>
            <Route exact path="/howtouse" render={({ history }) => <HowToUsePage history={history} />} />
            <Route exact path="/about" render={({ history }) => <AboutPage history={history} />} />
            <Route exact path="/login" render={({ history }) => <LoginPage history={history} />} />
            <Route exact path="/signup" render={({ history }) => <SignupPage history={history} />} />
            <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
        </Switch>
    );

    useEffect(() => {
        async function getData() {
            if (userFirstName && !dataFlag) {
                const [resumes, applications] = await Promise.all([
                    apiService.getData('/api/resumes'),
                    apiService.getData('/api/applications')
                ]);
                await setApplications(applications);
                await setResumes(resumes);
                toggleDataFlag(true);
            }
        }
        getData();
    }, [userFirstName, setApplications, setResumes, dataFlag, toggleDataFlag]);

    return (
        <div className="App">
            <Navbar history={history} />
            <main>{pages}</main>
            <footer>
                <div>
                    <a href="https://github.com/roger-takeshita" target="blank">
                        <span>Developed by</span>&nbsp;Roger Takeshita&nbsp;
                        <GitHubIcon />
                    </a>
                </div>
            </footer>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userFirstName: state.user ? state.user.firstName : '',
    dataFlag: state.toggleFlag
});

const mapsDispatchToProps = (dispatch) => ({
    setResumes: (data) => dispatch(setResumes(data)),
    setApplications: (data) => dispatch(setApplications(data)),
    toggleDataFlag: () => dispatch(toggleDataFlag())
});

export default connect(mapStateToProps, mapsDispatchToProps)(App);
