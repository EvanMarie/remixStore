import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { Product } from "~/lib/interface";
import { client } from "~/lib/sanity";

interface iAppProps {
  products: Product[];
}

export async function loader({}: LoaderFunctionArgs) {
  const query = `*[_type == "product"]{
  price, name, slug, "imageUrl": image[0].asset->url}`;

  const products = await client.fetch(query);

  return json({ products });
}

export default function IndexPage() {
  const { products } = useLoaderData<typeof loader>() as iAppProps;

  return (
    <>
      <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12 h-[100vh]">
        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
          <p className="mb-4 font-semibold text-purple-400 md:mb-6 md:text-lg xl:text-xl">
            Welcome, friend!
          </p>
          <h1 className="text-purple-200 mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl drop-shadow-xl">
            DarkViolet.ai's <span className="text-cyan-400">Art Bazaar</span>
          </h1>
          <p className="mb-8 leading-relaxed text-zinc-200 md:mb-12 lg:w-4/5 xl:text-lg">
            DarkViolet.ai is where art and AI come together. Purchase the art
            here!
          </p>
          <div>
            <Link
              to="#products"
              className="rounded-lg bg-purple-400 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-purple-300 transition duration-100 md:text-base"
            >
              The Art
            </Link>
          </div>
        </div>
        <div className="flex items-center h-[100vh] overflow-hidden rounded-lg  w-fit lg:w-5/12 xl:w-7/12">
          <img
            src="/dv006.png"
            alt="someone special"
            className="h-[75%] w-full object-cover object-center mx-auto shadow-lg rounded-lg"
          />
        </div>
      </section>
      <section id="products" className="h-[100vh] pt-12">
        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
          <h1 className="text-purple-200 mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl drop-shadow-xl">
            DarkViolet.ai:
            <h1 className="text-cyan-400">Purchase the art here!</h1>
          </h1>
        </div>
        <div className="mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.slug.current}
              to={`/product/${product.slug.current}`}
              className="group relative"
            >
              <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80 shadow-xl">
                <img
                  src={product.imageUrl}
                  alt={`Product: ${product.name}`}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-pink-200">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-purple-400">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
