import React, {forwardRef, useState} from 'react';
import { Navbar, Nav, Icon, Dropdown} from 'rsuite';
import { Link } from 'react-router-dom';
import LoginItem from './NavbarLogin';
import { useCookies } from 'react-cookie';
import './Navbar.less';

const MyLink = forwardRef((props, ref) => {
    const { href, as, ...rest } = props;
    return (
      <Link to={href} {...rest}></Link>
    );
  });
  

const Navlink = props =>  <Nav.Item componentClass={MyLink} {...props} />;
const DropdownLink = props => <Dropdown.Item componentClass={MyLink} {...props} />;

const AstelliaNavbar = ({ logout }) => {

    const [user, setUser] = useState({});

    //eslint-disable-next-line
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    

    let logInUser = async(userToken) => {
      await fetch('/frontend/api/v1/user/@me', {
        headers: {
          'Authorization': userToken
        }
      }).then(res => res.json()).then(d => {

        if(d.constructor.name === 'Array') {

          d[0].avatar = `/frontend/api/v1/avatar/${d[0].id}`;
          d[0].url = `/users/${d[0].id}`;
          setCookie('token', userToken);
          setCookie('user', JSON.stringify(d));

          return d[0];
        }
      }).catch(e => {});


    }

    
    if(cookie.token) logInUser(cookie.token).then(setUser);
    console.log(user);
    return (
<Navbar style={{padding: '0 30px'}}>
    <Navbar.Header>
     
          <img onClick={() => window.location.href = '/'} widt={40} height={40} className="logo" src="/img/logo.png" alt="logo"/>
         
    </Navbar.Header>
    <Navbar.Body>
      <Nav>
        <Navlink to="/leaderboard" icon={<Icon icon="bars"/>}>Leaderboard</Navlink>
        <Dropdown title="Community" icon={<Icon icon="group" />}>
            <DropdownLink to="/discord" onClick={() => {window.location.href = 'https://discord.gg/hG37Tz7'}} icon={<Icon icon="comments" />}>Discord</DropdownLink>
        </Dropdown>
      </Nav>
      <Nav pullRight>
          {(() => {

              if(!cookie.user) return <LoginItem login={logInUser}/>;

              return (<div>


        <Dropdown title={<div style={{margin: '-25%', backgroundImage: `url(${cookie.user[0].avatar})`}} alt="avatar" className="astellia__avatar__logged" />} placement="bottomEnd">
                  <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                    <p>Signed in as</p>
                    <strong>{cookie.user[0].username}</strong>
                  </Dropdown.Item>

                  <Dropdown.Item divider />

                  <DropdownLink icon={<Icon icon="user"/>} to={cookie.user[0].url}>Your profile</DropdownLink>
        </Dropdown>
        
              </div>)
              
          })()}
        
      </Nav>
    </Navbar.Body>
  </Navbar>
    )
}

export default AstelliaNavbar;