const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'home-bg':"url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-hero-image-bg.jpg')",
        'home-bg2':"url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-shop-men-image-thumbnail.jpg')",
        'home-bg3':"url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-shop-women-image-tumbnail.jpg')",
        'home-bg4':"url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-cta-image-bg.jpg')",
        'home-bg5':"url('https://cdn.pixelbin.io/v2/black-bread-289bfa/-6ZJSm/t.resize(w:1600)/clarks-banner/1710138111Clarks_Web_September-02.webp?compress=true&q=70')",
        'formal-bg':"url('https://cdn.pixelbin.io/v2/black-bread-289bfa/-6ZJSm/original/clarks-cms_images/1707809251Web_Banner_Size_Web_Banner_705x397_Clarks_Feb_24_Banners_120224.webp')",
        'women-bg':"url('https://www.jennexplores.com/wp-content/uploads/2020/06/Wasootch-Ridge-Hike-4-768x960.jpg')",
        'men-bg':"url('https://static.wixstatic.com/media/818f01_0531e27a3bb14a4dba365aec4daad2dc~mv2.jpg/v1/fill/w_963,h_722,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818f01_0531e27a3bb14a4dba365aec4daad2dc~mv2.jpg')",
        'kid-bg':"url('https://marcusandmack.com/wp-content/uploads/2024/05/Screen-Shot-2024-05-13-at-4.31.09-PM.png')",
        'classic-bg':"url('https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2024/august/240819-fl-rec8oglnf-classics-multivendor/240819-fl-rec8oGLnf-classics-multivendor-1up.jpg')",
        'home-bg6':"url('https://www.bata.com/dw/image/v2/BCLG_PRD/on/demandware.static/-/Sites-bata-in-Library/default/dw32d7d46c/Hero%20Banner%20Slider/Everyday.jpg?sw=1403&q=100')",
        'home-bg7':"url('https://www.footasylum.com/images/categories/catHeader-MustHave-060319.jpg')",
        'home-bg8':"url('https://dosi-in.com/images/facebook_brand/136/dosiin-d0b65c5c53657f897af6862c44d8a5e2136526.jpg')",
        'home-bg9':"url('https://sneakermatchtees.com/wp-content/uploads/2014/06/Jordan-1-banner.jpg')"

      }
    },
  },

  plugins: [
  
  ],
});
