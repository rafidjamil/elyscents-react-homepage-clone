
import Footer from './components/footer';
import ProductCard from './components/perfumecard';
import './App.css'
import pro1main from './assets/images/pro1main.jpg';
import pro1hover from './assets/images/pro1hover.jpg';
import pro2main from './assets/images/pro2main.jpg';
import pro2hover from './assets/images/pro2hover.jpg';
import pro3main from './assets/images/pro3main.jpg';
import pro3hover from './assets/images/pro3hover.jpg';
import pro4main from './assets/images/pro4main.jpg';
import pro4hover from './assets/images/pro4hover.jpg';
import { ProductCards } from './Fetchapitesting/fetchapi';





const Cataloge = () => {
    return (
        <>
            <div className='cataloge-title'>
                <p>CATALOGUE</p>
            </div>
            <div className='cataloge-cards'>
                {/* <ProductCard Mainimg={pro1main} Hoverimg={pro1hover} beforePrice="2000" price={1800} />
                <ProductCard Mainimg={pro2main} Hoverimg={pro2hover} beforePrice="2000" price={1800} />
                <ProductCard Mainimg={pro3main} Hoverimg={pro3hover} beforePrice={"2000"} price={2000 - 200} />
                <ProductCard Mainimg={pro1main} Hoverimg={pro1hover} beforePrice="2000" price={1800} />
                 <ProductCard Mainimg={pro2main} Hoverimg={pro2hover} beforePrice="2000" price={1800} />
                <ProductCard Mainimg={pro3main} Hoverimg={pro3hover} beforePrice={"2000"} price={2000 - 200} />
                <ProductCard Mainimg={pro4main} Hoverimg={pro4hover} beforePrice={"2000"} price={2000 - 200} /> */}
                <ProductCards/>
            </div>

        </>
    )
}

export default Cataloge