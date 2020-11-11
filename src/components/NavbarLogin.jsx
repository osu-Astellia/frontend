


import {useState} from 'react';
import {Dropdown, Input, Button, Loader, Message, Icon, Avatar} from 'rsuite';
import {ModalWindow} from './ModalWindow';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useCookies } from 'react-cookie'



const LoginItem     = ({ login, logout }) => {

    const [showLoginModal, setLModal] = useState(false);

    const [username, setUsername] = useState('');
    const  [password, setPassword] = useState('');
    const [catpcha, setCaptcha] = useState('');




    const [status, setStatus] = useState('idle');
    const [response, setResponse] = useState('');
    
    //eslint-disable-next-line
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    

    const handleLogin = async (event) => {
        setStatus('working');
        if(event) event.preventDefault();

        await fetch('/frontend/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                login: username,
                password: password,
                ip: '127.0.0.1',
                captcha_key: catpcha,
                is_bancho: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            let r = await res.json();

            
            if(!res.ok) {
                 setResponse(r.result);
                 setStatus('rejected');
            };
            return r;
        }).then(res => {

            if(res.token) {
                setCookie('token', res.token);
                setLModal(false);
                setStatus('idle');
                login(res.token);
            }
            console.log(res);
        }).catch(console.log);
      
    }
    return (<div>
        <ModalWindow
        title="Log In"
        description={
           (() => {


            if(status !== 'idle' && status !== 'rejected') return <Loader style={{padding: '30px 0'}} size="lg" content="Working..." />
            return (<form onSubmit={handleLogin} style={{textAlign: 'center'}}>
                {(() => {
                    if(status === 'rejected' && response !== '') return (<Message  showIcon
                        type="error"
                        title="Error"
                        description={response}/>)
                })()}
            <Input
             style={{width: '100%', marginTop: '20px'}}
             placeholder="Username" 
             type="username" 
             value={username} 
             onChange={(val) => {setUsername(val)}}
             />


            <Input
             style={{width: '100%', marginTop: '20px'}}
             placeholder="Password" 
             type="password" 
             value={password} 
             onChange={(val) => {setPassword(val)}}
             />

             <GoogleReCaptchaProvider reCaptchaKey="6LeOJ6cZAAAAAPlDWXxpvyzSrVU4Xep9LzN7vwKy">
                <GoogleReCaptcha onVerify={(response) => setCaptcha(response)}  />
             </GoogleReCaptchaProvider>
             
             <Button style={{marginTop: '20px', textAlign: 'center'}} onClick={handleLogin} appearance="primary">Log In</Button></form>)
             
             
           })()
           // if(status != 'idle') return;
               
        }

        show={showLoginModal}
        close={() => setLModal(false)}
        onConfirm={handleLogin}
        hasBottom={true}
        />

        <Dropdown title={<Avatar style={{margin: '-25%'}} src="/img/guest.png" circle/>} placement="bottomEnd">
            <Dropdown.Item icon={<Icon icon="sign-in" />}><Button onClick={() => setLModal(true)} >Log in</Button></Dropdown.Item>
        </Dropdown>
        
    </div>)
    
}

export default LoginItem;