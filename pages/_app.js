import { AuthProvider } from "@/Contexts/AccountContext";
import { UnfinishedCardsProvider } from "@/components/UnfinishedCardsContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
   
  }

.swiper_container {
  height: 440px;
  padding: 2rem 0;
  position: relative;
}
.swiper-slide {
  width: 700px;
  height: 100rem;
  position: relative;
}

.swiper-slide-shadow-left,
.swiper-slide-shadow-right {
  display: none;
}



.slider-controler .swiper-button-next {
  left: 90% !important;
  transform: translateX(-58%) !important;
}

.slider-controler .slider-arrow {
  top: 50%;
  background: var(--white);
  width: 4.5rem;
  height: 3.5rem;
  border-radius: 50%;
  left: 10%;
  transform: translateX(-42%);
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.slider-controler .slider-arrow ion-icon {

  color: #222224;
}

.swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.swiper-pagination .swiper-pagination-bullet-active {
  background: blue;
}

.swiper-pagination {
  position: relative;
  width: 15rem !important;

}








`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <UnfinishedCardsProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </UnfinishedCardsProvider>
      </AuthProvider>
    </>
  );
}
