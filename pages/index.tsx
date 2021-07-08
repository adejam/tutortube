import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home(): JSX.Element {
  const categories = [
    { category: "html" },
    { category: "css" },
    { category: "javascript" },
    { category: "react" },
    { category: "next" },
    { category: "bootstrap" },
  ];
  return (
    <div className="bg-white">
      <Head>
        <title>Tutortube | Home</title>
      </Head>
      <div className="bg-white d-flex wrap p-10">
        <div className="col-md-6 col-sm-6 welcome-div mh-full flex-0 h-500 d-flex wrap justify-center align-center">
          <Image
            src={`/assets/download.jpg`}
            className="w-full"
            alt="Welcome Photo"
            width={300}
            height={300}
          />
        </div>
        <div className="col-md-6 col-sm-6 d-flex flex-column justify-center align-center flex-0">
          <h2 className="mb-10">Learn Front End Web Development</h2>
          <button type="button" className="btn">
            Courses
          </button>
        </div>
      </div>
      <div className="mw-1200 mx-auto d-flex wrap justify-between">
        {categories.map((category, index) => (
          <div key={index} className="col-md-4 col-lg-2 p-10 col-sm-4 flex-0">
            <div className="b-block h-150">
              <h3 className="bg-primary ta-center h-full w-full">
                <Link href={`/videos/${category.category}`}>
                  <a className="h-full w-full d-flex justify-center align-center">
                    <span>{category.category}</span>
                  </a>
                </Link>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
