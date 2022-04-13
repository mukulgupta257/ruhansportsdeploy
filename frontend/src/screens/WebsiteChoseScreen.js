const WebpageSelectScreen={
    after_render:_=>{

    },
    render:_=>{
        return`
        <div class="main-box-select-webpage">
            <div class="leftbar">
                <img src="./images/logo/logo.png" alt="Logo name" />
                <ul>
                    <a href="#/ground"><li>Cricket Ground</li></a>
                    <a href="#/shop"><li>Cricket Shop</li></a>
                </ul>
            </div>
            <div class="rightbar">
                <div class="ground-card">
                    <img src="https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/ground%20image/gurgaon.jpg?raw=true" alt="gurgaon ground image" />
                    <span>Sports Ground in gurugram</span>
                    <span>Star Shine Sports Cricket Ground<br>
                    Kadarpur Gurugram,Harayana-122102</span>
                    <a href="https://api.whatsapp.com/send/?phone=918800198964&text=Hello%20i%20got%20your%20number%20from%20website%20and%20i%20want%20to%20book%20ground&app_absent=0">
                    Book Now</a>
                </div>
                <div class="ground-card">
                    <img src="https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/ground%20image/gurgaon.jpg?raw=true" alt="gurgaon ground image" />
                    <span>Sports Ground in gurugram</span>
                    <span>Star Shine Sports Cricket Ground<br>
                    Kadarpur Gurugram,Harayana-122102</span>
                    <a href="https://api.whatsapp.com/send/?phone=918800198964&text=Hello%20i%20got%20your%20number%20from%20website%20and%20i%20want%20to%20book%20ground&app_absent=0">
                    Book Now</a>
                </div>
            </div>
        </div>
        `
    }
}

export default WebpageSelectScreen