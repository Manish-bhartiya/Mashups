import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlbum } from "../features/albums";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/bundle';

import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";

function Album() {
  const dispatch = useDispatch();
  const allAlbums = useSelector((state) => state.album.allAlbums);
  const albumStatus = useSelector((state) => state.album.status);

  useEffect(() => {
    if (albumStatus === "idle") {
      dispatch(fetchAlbum());
    }
  }, [albumStatus, dispatch]);

  return (
    <div className=" bg-black">
      <main className="">
        <section className="">
          <div className="">
            <h1 className="text-white text-3xl mb-4">Top Albums </h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {Array.isArray(allAlbums) &&
                allAlbums.map((album) => (
                  <SwiperSlide key={album._id} className="">
                    <MDBCard className=" bg-black flex  flex-col justify-center items-center hover:shadow-xl">
                      <MDBCardImage
                        className=" rounded-md opacity-90 transition-opacity duration-300 hover:opacity-50"
                        src={album.image}
                        alt={`${album.name} cover`}
                        style={{ height: "150px",width:"150px", objectFit: "cover" }}
                      />
                      <MDBCardBody>
                        <Link
                          to={`/app/${album.name}`}
                          
                          className="text-lg font-semibold  text-white hover:text-gray-400"
                        >
                          {album.name}
                        </Link>
                      </MDBCardBody>
                    </MDBCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Album;
