import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylist } from "../features/playlistslice";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";

import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";

function Cart() {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlist.playlists);
  const playlistStatus = useSelector((state) => state.playlist.status);

  useEffect(() => {
    if (playlistStatus === "idle") {
      dispatch(fetchPlaylist());
    }
  }, [playlistStatus, dispatch]);

  return (
    <div className="min-h-screen bg-black px-4 py-6">
      <main>
        <section>
          <div>
            <h1 className="text-white text-3xl mb-6">Artists</h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={2} // Adjust for mobile
              breakpoints={{
                640: { slidesPerView: 3 }, // For larger screens
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {Array.isArray(playlists) &&
                playlists.map((playlist) => (
                  <SwiperSlide key={playlist._id}>
                    <MDBCard className="bg-black flex flex-col justify-center items-center hover:shadow-2xl p-2">
                      {/* Wrap both image and name in a single Link */}
                      <Link to={`/playlist/${playlist.name}`} className="text-center">
                        <MDBCardImage
                          component="img"
                          className="rounded-full opacity-90 transition-opacity duration-300 hover:opacity-50"
                          src={playlist.image}
                          alt={`${playlist.name} cover`}
                          style={{
                            height: "120px", // Adjusted height for better mobile fit
                            width: "120px",
                            objectFit: "cover",
                          }}
                        />
                        <MDBCardBody className="mt-2">
                          <span className="text-md font-semibold text-white hover:text-gray-400">
                            {playlist.name}
                          </span>
                        </MDBCardBody>
                      </Link>
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

export default Cart;
