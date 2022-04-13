import { clearUser, getUserInfo } from "../localStorage.js"

const Header={
    render:_=>{

        const {name, isAdmin}=getUserInfo();
        return`
        <a href="#"><img src="./images/logo/logo.png" /></a>
        <div id="nav-bar">
            <a href="#/ground" id="ground-head"}>Ground </a>
            <a href="#/shop">Shop</a>
            ${name ?``:`<a href="#/contactus">Contact us</a>`}
            ${name ?`<a href="#/profile">${name}</a>`:`<a href="#/signin"><button class="login-btn">Login</button></a>`}
            ${name ?`<a id='signout-btn'>Signout</a>`:``}
            ${isAdmin?`<a href="/#/dashboard">DashBoard</a>`:``}
        </div>
        `
    },
    after_render:_=>{
        const {name}=getUserInfo();
        if(name){
            document.getElementById('signout-btn').addEventListener('click',_=>{
            document.location.hash="/"
            clearUser()
            document.location.hash="/"
           })
        }
    }
}

export default Header