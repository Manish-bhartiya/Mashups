// Cart.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylist } from "../features/playlistslice";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/bundle';

import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import Album from "./albums";

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
    <div className="">
      <main>
        <section>
          <div>
            <h1 className="text-white text-3xl mb-4">Artists</h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {Array.isArray(playlists) &&
                playlists.map((playlist) => (
                  <SwiperSlide key={playlist._id}>
                    <MDBCard className="bg-black flex flex-col justify-center items-center hover:shadow-2xl ">
                      <MDBCardImage
                        className="rounded-full opacity-90 transition-opacity duration-300 hover:opacity-50  "
                        src={playlist.image}
                        alt={`${playlist.name} cover`}
                        style={{ height: "150px", width: "150px", objectFit: "cover" }}
                       
                      />
                      <MDBCardBody className="ml-6">
                        <Link
                          to={`/playlist/${playlist.name}`}
                          className="text-lg font-semibold text-white hover:text-gray-400"
                        >
                          {playlist.name}
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

export default Cart;
