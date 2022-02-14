import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import baseUrl from '../Helpers/baseUrl'
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  const productList = products.map((product) => {
    return (
      <div className="card" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>$ {product.price}</p>
        </div>
        <div className="card-action">
          <Link href={"/product/[id]"} as={`/product/${product._id}`}>
            View product
          </Link>
        </div>
      </div>
    );
  });

  // console.log(products);
  return <div className="rootcard">{productList}</div>;
}

export async function getStaticProps() {
  const response = await fetch(`${baseUrl}/api/products`);
  const data = await response.json();
  return {
    props: {
      products: data,
    },
  };
}
