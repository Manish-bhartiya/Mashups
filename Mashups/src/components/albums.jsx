import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlbum } from "../features/albums";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
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
    <div className="bg-black">
      <main>
        <section className="p-4">
          <div>
            <h1 className="text-white text-2xl mb-4">Top Albums</h1>
            {albumStatus === "loading" ? (
              <div className="text-white text-center">Loading...</div>
            ) : (
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {Array.isArray(allAlbums) &&
                  allAlbums.map((album) => (
                    <SwiperSlide key={album._id}>
                      <MDBCard className="bg-black shadow-white flex flex-col justify-center items-center hover:shadow-xl">
                        <Link to={`/app/${album.name}`} className="text-center">
                          <MDBCardImage
                            className="rounded-md sm:size-72 lg:size-40 opacity-90 transition-opacity duration-300 hover:opacity-50"
                            src={album.image}
                            alt={`${album.name} cover`}
                            // style={{ height: "150px", width: "150px", objectFit: "cover" }}
                          />
                          <MDBCardBody className="mt-2">
                            <span className="text-sm md:text-lg font-semibold text-white hover:text-gray-400">
                              {album.name}
                            </span>
                          </MDBCardBody>
                        </Link>
                      </MDBCard>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Album;
