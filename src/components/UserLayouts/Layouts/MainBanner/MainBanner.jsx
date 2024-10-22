import React from 'react'
import BannerSofaImage from '../../../../assets/Chaina Sofa removebg.png'
import MainBannerImage from '../../../../assets/main_Banner.png'
import './MainBanner.css'
const MainBanner = () => {
    return (
        <div>
        <div className='MainPageSection'>
            <div className='container'>
                <div className='MainBanner'>
                    <div className='Banner'>
                        <img className='bannerImg' src={MainBannerImage} alt="" />
                    </div>
                    <div className='bannerContent'>
                        <div className='bannerSection'>
                            <span>70% SALE OFF </span>
                            <h1>FURNITURE AT COST</h1>
                            <p>Suspendisse varius enim in eros elementum
                                tristique. Duis cursus, mi quis viverra ornare, eros
                                dolor interdum nulla.</p>
                                <div>
                                    <button className='moreDetails'>Discover More</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className='MainPageSection'>
            <div className='container'>
                <div className='Banner_Section'>
                    <div className='Banner_text'>
                        <h4>Latest Tranding</h4>
                        <h1>Chaina Sofa</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi distinctio ad voluptatem atque excepturi voluptatum obcaecati quibusdam iste, reprehenderit illo recusandae expedita, consectetur ipsam dolorum eveniet quis deserunt ea ipsa.</p>
                        <button className='Banner_Btn'>
                            Shop Now
                        </button>
                    </div>
                    <div className='Banner_image_section'>
                        <img src={BannerSofaImage} alt="Sofa" />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default MainBanner