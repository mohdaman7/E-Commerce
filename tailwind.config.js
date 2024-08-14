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
        'kid-bg':"url('https://marcusandmack.com/wp-content/uploads/2024/05/Screen-Shot-2024-05-13-at-4.31.09-PM.png')"
      }
    },
  },

  plugins: [
  
  ],
});
